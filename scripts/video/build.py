# Assembles each video: 4K frames + narration + burned-in subtitles and callouts -> MP4 (and an .srt for upload).
#   python scripts/video/build.py [demo|tech|team|all]
# Output: out/video/proofline-<video>.mp4 and .srt
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BUILD = os.path.join(ROOT, "out", "video", "build")
OUT = os.path.join(ROOT, "out", "video")
SPEC = json.load(open(os.path.join(ROOT, "scripts", "video", "scenes.json"), encoding="utf-8"))
TIMINGS = json.load(open(os.path.join(BUILD, "timings.json"), encoding="utf-8"))


def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower())


def chunks(text, max_words=9):
    """Subtitle lines: split at sentence and clause ends, then keep each line short."""
    parts = re.split(r"(?<=[.?!;:])\s+|(?<=,)\s+(?=\S+\s+\S+\s+\S+)", text)
    out = []
    for p in parts:
        words = p.split()
        while len(words) > max_words:
            cut = max_words if len(words) - max_words >= 3 else len(words) - 3
            out.append(" ".join(words[:cut]))
            words = words[cut:]
        if words:
            out.append(" ".join(words))
    # Merge fragments shorter than four words into a neighbour, so no line flashes by on its own.
    # A fragment joins the line before it, unless that line ends a sentence; then it starts the next line.
    merged, carry = [], ""
    for line in out:
        line = (carry + " " + line).strip() if carry else line
        carry = ""
        short = len(line.split()) < 4
        prev_ends = bool(merged) and merged[-1].rstrip()[-1:] in ".?!"
        if merged and short and not prev_ends and len(merged[-1].split()) + len(line.split()) <= max_words + 3:
            merged[-1] = merged[-1] + " " + line
        elif short and (prev_ends or not merged) and line.rstrip()[-1:] not in ".?!":
            carry = line
        else:
            merged.append(line)
    if carry:
        merged.append(carry)
    return merged


def spoken_tokens(text):
    t = f" {text} "
    for k, v in SPEC["speak"].items():
        t = t.replace(k, v)
    return [n for n in (norm(w) for w in t.split()) if n]


def subtitle_events(scene, timing, offset):
    """Align every spoken word, in order, to the narration's word timings; each line starts at its first word."""
    lines = chunks(scene["say"])
    bounds = [(norm(w["w"]), w["t"]) for w in timing["words"]]
    pos, starts = 0, []
    for line in lines:
        first = None
        for tok in spoken_tokens(line):
            for j in range(pos, min(pos + 4, len(bounds))):
                if bounds[j][0] == tok or bounds[j][0].startswith(tok) or tok.startswith(bounds[j][0]):
                    if first is None:
                        first = bounds[j][1]
                    pos = j + 1
                    break
        starts.append(first if first is not None else (starts[-1] + 0.8 if starts else 0.0))
    events = []
    for i, line in enumerate(lines):
        s = starts[i]
        e = starts[i + 1] if i + 1 < len(lines) else timing["dur"] + 0.25
        events.append((offset + s, offset + max(s + 0.6, e), line))
    return events


def ts_ass(t):
    h, r = divmod(t, 3600)
    m, s = divmod(r, 60)
    return f"{int(h)}:{int(m):02d}:{s:05.2f}"


def ts_srt(t):
    ms = int(round(t * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def ass_escape(s):
    return s.replace("{", "(").replace("}", ")")


def build(name):
    rec = json.load(open(os.path.join(BUILD, name, "record.json"), encoding="utf-8"))
    fps = rec["fps"]
    video = SPEC["videos"][name]
    timing = {t["id"]: t for t in TIMINGS[name]}
    scenes = {s["id"]: s for s in video["scenes"]}
    total = len(rec["frames"]) / fps

    # 1. Frames -> concat list (runs of the same frame collapse into one entry).
    lst = os.path.join(BUILD, name, "frames.txt")
    with open(lst, "w", encoding="utf-8") as f:
        run_file, run_len = None, 0
        for fr in rec["frames"] + [None]:
            if fr == run_file:
                run_len += 1
                continue
            if run_file is not None:
                f.write(f"file 'frames/{run_file}'\nduration {run_len / fps:.6f}\n")
            run_file, run_len = fr, 1
        f.write(f"file 'frames/{rec['frames'][-1]}'\n")

    # 2. Narration placed at each scene's start.
    inputs, filters = [], []
    for i, s in enumerate(rec["scenes"]):
        inputs += ["-i", timing[s["id"]]["mp3"]]
        ms = int(round(s["start"] / fps * 1000))
        filters.append(f"[{i}:a]adelay={ms}|{ms}[a{i}]")
    mix = "".join(f"[a{i}]" for i in range(len(rec["scenes"])))
    filters.append(f"{mix}amix=inputs={len(rec['scenes'])}:normalize=0,apad,atrim=0:{total:.3f},loudnorm=I=-16:TP=-1.5:LRA=11[out]")
    audio = os.path.join(BUILD, name, "narration.m4a")
    subprocess.run(["ffmpeg", "-y", "-v", "error", *inputs, "-filter_complex", ";".join(filters), "-map", "[out]", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", audio], check=True)

    # 3. Subtitles, callouts, badge and end card (ASS, burned in) and a plain .srt for upload.
    subs, overlays = [], []
    for s in rec["scenes"]:
        off = s["start"] / fps
        end = off + s["frames"] / fps
        sc = scenes[s["id"]]
        subs += subtitle_events(sc, timing[s["id"]], off)
        end_card = max(off, end - 3.6) if sc.get("end") else None
        if sc.get("callout"):
            at = 0.5
            if sc.get("callout_at"):
                hits = [w["t"] for w in timing[s["id"]]["words"] if norm(w["w"]) == norm(sc["callout_at"])]
                at = hits[0] if hits else at
            overlays.append(("Callout", off + at, (end_card or end) - 0.05, sc["callout"]))
        if end_card is not None:
            overlays.append(("Callout", end_card, end, sc["end"]))
    overlays.append(("Badge", 0, total, SPEC["badge"]))
    ass = os.path.join(BUILD, name, "subs.ass")
    with open(ass, "w", encoding="utf-8") as f:
        f.write(
            "[Script Info]\nScriptType: v4.00+\nPlayResX: 3840\nPlayResY: 2160\nWrapStyle: 0\nScaledBorderAndShadow: yes\n\n"
            "[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n"
            "Style: Sub,Segoe UI Semibold,84,&H00FFFFFF,&H00FFFFFF,&H30271811,&H00000000,0,0,0,0,100,100,0,0,3,22,0,2,500,500,110,1\n"
            "Style: Callout,Segoe UI,84,&H00FFFFFF,&H00FFFFFF,&H00E5464F,&H00000000,1,0,0,0,100,100,0,0,3,24,0,8,300,300,205,1\n"
            "Style: End,Segoe UI,88,&H00FFFFFF,&H00FFFFFF,&H00D84E1D,&H00000000,1,0,0,0,100,100,0,0,3,30,0,5,300,300,0,1\n"
            "Style: Badge,Segoe UI Semibold,50,&H00FFFFFF,&H00FFFFFF,&H40271811,&H00000000,0,0,0,0,100,100,0,0,3,16,0,3,60,70,60,1\n"
            "Style: Badge2,Segoe UI Semibold,44,&H00FFFFFF,&H00FFFFFF,&H40271811,&H00000000,0,0,0,0,100,100,0,0,3,14,0,1,70,60,60,1\n\n"
            "[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n"
        )
        for st, s, e, text in overlays:
            fade = "{\\fad(250,250)}" if st in ("Callout", "End") else ""
            f.write(f"Dialogue: 1,{ts_ass(s)},{ts_ass(e)},{st},,0,0,0,,{fade}{ass_escape(text)}\n")
        for s, e, text in subs:
            f.write(f"Dialogue: 0,{ts_ass(s)},{ts_ass(e)},Sub,,0,0,0,,{ass_escape(text)}\n")
    with open(os.path.join(OUT, f"proofline-{name}.srt"), "w", encoding="utf-8") as f:
        for i, (s, e, text) in enumerate(subs, 1):
            f.write(f"{i}\n{ts_srt(s)} --> {ts_srt(e)}\n{text}\n\n")

    # 4. Encode 4K30 H.264 with the overlays burned in.
    mp4 = os.path.join(OUT, f"proofline-{name}.mp4")
    subprocess.run([
        "ffmpeg", "-y", "-v", "error", "-stats",
        "-f", "concat", "-safe", "0", "-i", "frames.txt", "-i", "narration.m4a",
        "-vf", f"fps={fps},scale=3840:2160:flags=lanczos,format=yuv420p,ass=subs.ass",
        "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-profile:v", "high", "-level", "5.1", "-pix_fmt", "yuv420p",
        "-c:a", "copy", "-t", f"{total:.3f}", "-movflags", "+faststart",
        "-metadata", f"title={video['title']}", mp4,
    ], check=True, cwd=os.path.join(BUILD, name))
    print(f"{name}: {mp4} ({total:.1f}s)")


for n in (SPEC["videos"].keys() if len(sys.argv) < 2 or sys.argv[1] == "all" else [sys.argv[1]]):
    build(n)
