# Generates the narration for each scene (edge-tts neural voice) with word timings for subtitles.
#   python scripts/video/tts.py
# Output: out/video/build/<video>/<scene>.mp3 and timings.json
import asyncio
import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SPEC = json.load(open(os.path.join(ROOT, "scripts", "video", "scenes.json"), encoding="utf-8"))
BUILD = os.path.join(ROOT, "out", "video", "build")

import edge_tts


def spoken(text):
    t = f" {text} "
    for k, v in SPEC["speak"].items():
        t = t.replace(k, v)
    return t.strip()


def duration(path):
    out = subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path])
    return float(out.decode().strip())


async def one(video, scene, rate):
    folder = os.path.join(BUILD, video)
    os.makedirs(folder, exist_ok=True)
    mp3 = os.path.join(folder, f"{scene['id']}.mp3")
    words = []
    c = edge_tts.Communicate(spoken(scene["say"]), SPEC["voice"], rate=rate, boundary="WordBoundary")
    with open(mp3, "wb") as f:
        async for chunk in c.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                words.append({"t": chunk["offset"] / 1e7, "d": chunk["duration"] / 1e7, "w": chunk["text"]})
    return {"id": scene["id"], "mp3": mp3, "dur": duration(mp3), "words": words}


async def main():
    # Optional scene ids on the command line regenerate only those scenes and keep the rest unchanged.
    only = set(sys.argv[1:])
    path = os.path.join(BUILD, "timings.json")
    old = json.load(open(path, encoding="utf-8")) if only and os.path.exists(path) else {}
    timings = {}
    for video, v in SPEC["videos"].items():
        prev = {x["id"]: x for x in old.get(video, [])}
        timings[video] = [prev[s["id"]] if only and s["id"] not in only and s["id"] in prev else await one(video, s, v.get("rate", SPEC["rate"])) for s in v["scenes"]]
        total = sum(x["dur"] + v.get("pad", 0.35) for x in timings[video])
        print(f"{video}: video {total:.1f}s  " + "  ".join(f"{x['id']}={x['dur']:.1f}" for x in timings[video]))
    json.dump(timings, open(os.path.join(BUILD, "timings.json"), "w", encoding="utf-8"), indent=1)


asyncio.run(main())
