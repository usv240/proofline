"use client";

import Link from "next/link";
import { useState } from "react";
import type { RuleRecord, RuleResult } from "@/lib/engine/types";
import { InfoButton } from "./InfoButton";
import { VerdictChip, type VerdictKind } from "./Verdict";

export function ProofPanel({ rule }: { rule: RuleRecord }) {
  const [ctx, setCtx] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function showContext() {
    setLoading(true);
    try {
      const texts: Record<string, string> = await (await fetch("/data/source_texts.json")).json();
      const t = rule.source_doc_id ? texts[rule.source_doc_id] : undefined;
      if (t && rule.x_span) {
        const s = Math.max(0, rule.x_span.start - 400);
        const e = Math.min(t.length, rule.x_span.end + 400);
        setCtx(`${s > 0 ? "... " : ""}${t.slice(s, rule.x_span.start)}[[${t.slice(rule.x_span.start, rule.x_span.end)}]]${t.slice(rule.x_span.end, e)}${e < t.length ? " ..." : ""}`);
      } else setCtx("Source text not available for this record.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-3 space-y-3">
      <div className="flex items-center text-[14px] font-medium text-muted">
        The law&apos;s own words <InfoButton k="proof" />
      </div>
      <blockquote className="law-quote">&ldquo;{rule.quoted_span}&rdquo;</blockquote>
      <dl className="grid gap-x-6 gap-y-1 text-[15px] sm:grid-cols-[auto_1fr]">
        <dt className="text-muted">Citation</dt>
        <dd className="font-medium">{rule.citation}</dd>
        <dt className="text-muted">Source</dt>
        <dd>
          <a href={rule.source_url} target="_blank" rel="noreferrer" className="break-all text-brand underline underline-offset-2">
            {rule.source_doc_id}: {rule.source_url.replace(/^https?:\/\//, "").slice(0, 70)}
          </a>
        </dd>
        <dt className="text-muted">Retrieved</dt>
        <dd>{rule.x_retrieved_at ?? "not stated"}</dd>
        <dt className="flex items-center text-muted">Source kind <InfoButton k="source" /></dt>
        <dd>{rule.x_source_kind === "official_corpus" ? "Official pack" : "Fetched by Proofline (link-only in the official pack)"}</dd>
        <dt className="flex items-center text-muted">Confidence <InfoButton k="confidence" /></dt>
        <dd>
          {rule.confidence !== null ? `${Math.round(rule.confidence * 100)}%` : "not rated"}
          {rule.x_challenge && (
            <span className="text-muted"> · second check: {rule.x_challenge.verdict === "support" ? "supported" : rule.x_challenge.verdict === "partial" ? "partly supported, corrected" : rule.x_challenge.verdict}</span>
          )}
        </dd>
        {rule.effective_date && (<><dt className="text-muted">Effective</dt><dd>{rule.effective_date}</dd></>)}
      </dl>
      {rule.x_details.length > 0 && (
        <div>
          <p className="text-[14px] font-medium text-muted">Also in this rule</p>
          <ul className="mt-1 space-y-2">
            {rule.x_details.map((d, i) => (
              <li key={i} className="text-[15px]">
                {d.text}
                <span className="mt-0.5 block font-serif text-[14px] text-muted">&ldquo;{d.quoted_span.slice(0, 260)}{d.quoted_span.length > 260 ? "..." : ""}&rdquo;</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        {ctx === null ? (
          <button type="button" onClick={showContext} className="text-[15px] text-brand underline underline-offset-2">
            {loading ? "Loading source..." : "Show the quote inside the source text"}
          </button>
        ) : (
          <p className="whitespace-pre-wrap rounded-lg border border-border p-3 font-serif text-[14px] leading-relaxed text-muted">
            {ctx.split(/\[\[|\]\]/).map((part, i) => (i === 1 ? <mark key={i} className="bg-[var(--unk-bg)] text-text">{part}</mark> : <span key={i}>{part}</span>))}
          </p>
        )}
      </div>
    </div>
  );
}

export function RuleCard({ rule, result, addressId, lang = "en" }: { rule: RuleRecord & { x_plain_es?: string }; result: RuleResult; addressId?: string; lang?: "en" | "es" }) {
  const [open, setOpen] = useState(false);
  const kind = result.result as VerdictKind;
  const pfCats = ["rent_increase_limits", "security_deposits", "application_screening_fees", "algorithmic_rent_setting"];
  return (
    <article className="rounded-xl border border-border bg-bg p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <VerdictChip kind={kind} lang={lang} />
        <span className="text-muted"><InfoButton k={`v.${kind}` as never} /></span>
        <span className="rounded-md bg-surface px-2 py-0.5 text-[13px] text-muted">{rule.level === "state" ? `State: ${rule.jurisdiction}` : `City: ${rule.jurisdiction}`}</span>
        {result.conflict_flag && (
          <span className="inline-flex items-center rounded-md px-2 py-0.5 text-[13px]" style={{ background: "var(--bad-bg)", color: "var(--bad-fg)" }}>
            Possible conflict <InfoButton k="conflict" />
          </span>
        )}
      </div>
      <h3 className="mt-2 text-[18px] font-semibold leading-snug">{rule.title}</h3>
      <p className="mt-1" lang={lang}>{lang === "es" && rule.x_plain_es ? rule.x_plain_es : rule.x_plain || rule.requirement}</p>
      {lang === "es" && <p className="mt-1 text-[13px] text-muted">La cita legal y los detalles estan en ingles, como en la fuente original.</p>}
      {rule.key_value && (
        <p className="mt-2 text-[15px]"><span className="text-muted">Key number: </span><span className="font-medium tabular">{rule.key_value}</span></p>
      )}
      <p className="mt-2 text-[15px] text-muted">{result.explanation}</p>
      {result.conflict_note && result.conflict_flag && <p className="mt-2 text-[15px]" style={{ color: "var(--bad-fg)" }}>{result.conflict_note}</p>}
      {result.deciding && (
        <div className="mt-3 rounded-lg p-3" style={{ background: "var(--unk-bg)", color: "var(--unk-fg)" }}>
          <p className="flex items-center font-medium">One fact settles it <InfoButton k="settle" /></p>
          <p className="text-text">{result.deciding.question}</p>
          <p className="mt-1 text-[15px] text-text">How to find out: {result.deciding.how_to_find}</p>
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="h-11 rounded-lg border border-border px-4 text-[15px] font-medium hover:bg-surface"
        >
          {open ? "Hide proof" : "Show proof"}
        </button>
        {addressId && pfCats.includes(rule.category) && (result.result === "applies" || result.result === "unknown") && (
          <Link href={`/preflight?address=${addressId}&kind=${rule.category}`} className="inline-flex h-11 items-center rounded-lg border border-border px-4 text-[15px] hover:bg-surface">
            Check a change
          </Link>
        )}
      </div>
      {open && <ProofPanel rule={rule} />}
    </article>
  );
}
