"use client";

import { useMemo, useState } from "react";
import { lookupAddress } from "@/lib/engine/lookup";
import type { AddressFacts, NoRuleFinding, RuleRecord } from "@/lib/engine/types";

type R = RuleRecord & { x_plain_es?: string };

const T = {
  en: {
    title: "Your Rights Card", home: "Your home", protections: "Rules that protect this home", notSure: "Not sure yet: check this",
    later: "Starts later", proposed: "Proposed, not law", none: "No rule at this level", help: "Where to get help",
    asof: "As of", disclaimer: "This card explains what housing laws say. It is not legal advice. For advice, contact legal aid or a tenant rights group.",
    quoteNote: "Each rule lists its official source. Read the law's exact words at the link below.", print: "Print", lang: "Espanol", how: "How to find out",
    legal: "Legal city", mailing: "mailing city",
  },
  es: {
    title: "Su tarjeta de derechos", home: "Su vivienda", protections: "Reglas que protegen esta vivienda", notSure: "Aun no se sabe: verifique esto",
    later: "Empieza despues", proposed: "Propuesta, no es ley", none: "No hay regla a este nivel", help: "Donde pedir ayuda",
    asof: "Al", disclaimer: "Esta tarjeta explica lo que dicen las leyes de vivienda. No es asesoria legal. Para recibir asesoria, contacte a una oficina de ayuda legal o a un grupo de derechos de inquilinos.",
    quoteNote: "Cada regla indica su fuente oficial. El texto legal original esta en ingles.", print: "Imprimir", lang: "English", how: "Como averiguarlo",
    legal: "Ciudad legal", mailing: "ciudad postal",
  },
};

const HELP: Record<string, [string, string]> = {
  CA: ["LawHelpCA", "lawhelpca.org"], NJ: ["Legal Services of New Jersey", "lsnj.org"], MA: ["MassLegalHelp", "masslegalhelp.org"],
};

export function RightsCard({ address, rules, noRule, url }: { address: AddressFacts; rules: R[]; noRule: NoRuleFinding[]; url: string }) {
  const [lang, setLang] = useState<"en" | "es">("en");
  const t = T[lang];
  const asOf = "2026-10-01";
  const res = useMemo(() => lookupAddress(rules, address, asOf), [rules, address]);
  const get = (id: string) => rules.find((r) => r.team_rule_id === id)!;
  const line = (r: R) => (lang === "es" && r.x_plain_es ? r.x_plain_es : r.x_plain || r.requirement);
  const group = (k: string) => res.filter((x) => x.result === k);

  return (
    <div lang={lang} className="mx-auto max-w-[720px] px-4 py-8 print:py-0">
      <div className="no-print mb-4 flex gap-2">
        <button type="button" onClick={() => setLang(lang === "en" ? "es" : "en")} className="h-11 rounded-lg border border-border px-4">{t.lang}</button>
        <button type="button" onClick={() => window.print()} className="h-11 rounded-lg bg-brand px-4 font-medium text-brand-ink">{t.print}</button>
      </div>
      <article className="rounded-2xl border border-border p-6 print:border-0 print:p-0">
        <h1 className="text-[28px] font-semibold">{t.title}</h1>
        <p className="text-muted">{t.asof} {asOf}</p>
        <h2 className="mt-4 text-[20px] font-semibold">{t.home}</h2>
        <p>{address.street_address}, {address.city}, {address.state}</p>
        <p className="text-[15px] text-muted">{t.legal}: {address.city}{address.postal_city !== address.city ? ` (${t.mailing}: ${address.postal_city})` : ""}</p>

        <h2 className="mt-5 text-[20px] font-semibold">{t.protections}</h2>
        <ul className="mt-2 space-y-2">
          {group("applies").map((x) => { const r = get(x.team_rule_id); return (
            <li key={x.team_rule_id} className="border-l-4 pl-3" style={{ borderColor: "var(--ok-fg)" }}>
              <span aria-hidden>&#10003; </span>{line(r)} <span className="block text-[13px] text-muted">{r.citation}</span>
            </li>); })}
        </ul>

        {group("unknown").length > 0 && (<>
          <h2 className="mt-5 text-[20px] font-semibold">{t.notSure}</h2>
          <ul className="mt-2 space-y-2">
            {group("unknown").map((x) => { const r = get(x.team_rule_id); return (
              <li key={x.team_rule_id} className="border-l-4 pl-3" style={{ borderColor: "var(--unk-fg)" }}>
                <span aria-hidden>? </span>{line(r)}
                {x.deciding && <span className="block text-[15px]">{x.deciding.question} {t.how}: {x.deciding.how_to_find}</span>}
                <span className="block text-[13px] text-muted">{r.citation}</span>
              </li>); })}
          </ul></>)}

        {group("not_yet_effective").length > 0 && (<>
          <h2 className="mt-5 text-[20px] font-semibold">{t.later}</h2>
          <ul className="mt-2 space-y-1">{group("not_yet_effective").map((x) => { const r = get(x.team_rule_id); return <li key={x.team_rule_id}>{line(r)} ({r.x_lifecycle.effective_date})</li>; })}</ul></>)}

        {group("pending").length > 0 && (<>
          <h2 className="mt-5 text-[20px] font-semibold">{t.proposed}</h2>
          <ul className="mt-2 space-y-1">{group("pending").map((x) => <li key={x.team_rule_id}>{get(x.team_rule_id).title}</li>)}</ul></>)}

        {noRule.length > 0 && (<>
          <h2 className="mt-5 text-[20px] font-semibold">{t.none}</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-muted">{noRule.slice(0, 8).map((n) => <li key={`${n.jurisdiction}${n.category}`}>{n.jurisdiction}: {n.category.replace(/_/g, " ")}</li>)}</ul></>)}

        <h2 className="mt-5 text-[20px] font-semibold">{t.help}</h2>
        <p>{HELP[address.state][0]}: {HELP[address.state][1]}</p>
        <p className="mt-4 text-[14px] text-muted">{t.quoteNote}</p>
        <p className="text-[14px]">{url}</p>
        <p className="mt-4 border-t border-border pt-3 text-[14px]">{t.disclaimer}</p>
      </article>
    </div>
  );
}
