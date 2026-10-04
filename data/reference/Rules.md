# Rules.md — Rental Housing Law Navigator: Extracted Rules

**As of:** 2026-10-01 (default query date) · **Scope:** 3 states (CA, NJ, MA) × 10 cities × 6 categories
**Categories:** rent_increase_limits · just_cause_eviction · security_deposits · application_screening_fees · screening_restrictions · algorithmic_rent_setting
**Sources:** Corpus `corpus/text/D###.txt` (quoted spans verified verbatim against the corpus by script) + link-only sources and online research (marked **NOT IN CORPUS**).

> **Not legal advice.** Prototype extraction for the hackathon; not reviewed by counsel.

## Build status

| Region | Status |
|---|---|
| California (state) | ✅ Done (47 rules) |
| Massachusetts, Boston, Cambridge | ✅ Done (~33 rules + explicit "no rule" findings) |
| Los Angeles, San Francisco, Santa Ana | ✅ Done (42 rule blocks: LA 18, SF 14, Santa Ana 10) |
| San Diego, Berkeley | ✅ Done (42 rules: SD 19, Berkeley 23) |
| New Jersey, Jersey City, Hoboken, Newark | ✅ Done (47 rules) |

---

# PART 1 — CALIFORNIA (STATE)

# California — STATE-level rental housing rules (exhaustive extraction)

Snapshot date: 2026-10-01. Corpus docs read completely: D016, D022, D023, D024, D025, D026, D027 (all retrieved 2026-10-01 22:35 UTC from official sources). Link-only docs: D015 (fetched OK), D017 (fetched OK), D028 (fetched OK); D018–D021 (law.justia.com) returned HTTP 403 to both WebFetch and curl — they are mirrors of the same code sections already in the corpus (search metadata shows Justia's current edition is "2025 California Code"), so no additional content was lost; noted per-rule where relevant.

Quoted spans are copied verbatim from the corpus text files (curly apostrophes/quotes preserved). Every span below was machine-verified to appear in the named corpus file.

Format note: the quoted span for each rule appears on the line(s) immediately after `**Quoted span**:` as a `>` blockquote.

---

## CATEGORY 1 — rent_increase_limits

### CA-STATE-RENT_INCREASE_LIMITS-1
- **Rule ID**: CA-STATE-RENT_INCREASE_LIMITS-1
- **Jurisdiction**: CA · **Level**: state · **Category**: rent_increase_limits
- **Status** (2026-10-01): in_force
- **Title**: Tenant Protection Act (AB 1482) statewide annual rent-increase cap — 5% + CPI, max 10%
- **Requirement**: In any 12-month period an owner of covered residential real property may not raise the gross rental rate more than 5% plus the regional percentage change in CPI, or 10%, whichever is lower, measured against the lowest gross rent charged in the prior 12 months. Owner-offered discounts/concessions are excluded from "lowest rent" and must be separately itemized in the lease.
- **Key value**: min(5% + CPI change, 10%) per rolling 12 months. Regional CPI (April-to-April); for increases effective 2025-08-01 to 2026-07-31 industry calculators show LA/Orange 8.0%, Riverside/San Bernardino 7.5%, San Diego 8.8%, SF-Oakland 5-county 6.3%, all other counties 7.7% (CAA / AACSC, research only — not in corpus).
- **Coverage conditions**: All "residential real property" (any dwelling or unit intended for human habitation, incl. mobilehome-park units) in California unless exempt. Applies to increases on/after 2019-03-15 (anti-gouging look-back: rent on 2020-01-01 reset to 2019-03-15 rent + max allowed if over-raised). Mobilehome tenancies: applies to increases on/after 2021-02-18.
- **Exemptions** (§1947.12(d), (j)):
  1. Deed-restricted / regulatory-agreement affordable housing for very low, low, or moderate income (H&S §50093) or housing subject to a subsidy agreement for such households.
  2. Dormitories owned and operated by an institution of higher education or a K-12 school.
  3. Housing already subject to a local rent/price control ordinance (Costa-Hawkins-consistent) that restricts annual increases to LESS than the state formula.
  4. Housing issued a certificate of occupancy within the previous 15 years (rolling), unless a mobilehome.
  5. Separately alienable property (single-family home, condo, townhome, incl. mobilehome) IF (A) owner is NOT a REIT, a corporation, or an LLC with any corporate member, or mobilehome park management (§798.2), AND (B) tenant was given the prescribed written exemption notice (in the rental agreement for tenancies commenced/renewed on/after 2020-07-01; 2022-07-01 for mobilehomes).
  6. Owner-occupied duplex (two units in one structure, owner occupied one as principal residence at start of tenancy and continues to, neither unit an ADU/JADU).
  7. Homeowner of a mobilehome (§798.9) — §1947.12(j).
- **Effective date**: Original AB 1482 (Stats. 2019, ch. 597) effective 2020-01-01 with look-back to 2019-03-15. Current section repealed-and-re-added by SB 567 (Stats. 2023, ch. 290), effective 2024-01-01, operative 2024-04-01. Sunset: repealed 2030-01-01 by its own terms (§1947.12(o)).
- **Penalty / remedy**: §1947.12(k): tenant civil action for injunctive relief; damages equal to the excess rent demanded/accepted/received/retained; discretionary attorney's fees and costs; up to 3x the excess upon showing of willfulness, oppression, fraud, or malice. Attorney General, city attorney, or county counsel may enforce and seek injunction; irreparable harm presumed; 3-year statute of limitations from accrual. Waivers void (§1947.12(l)).
- **Interaction with local law**: Yields to stricter local rent control — §1947.12(d)(3) exempts housing under a local ordinance restricting increases to less than the state cap. Does not expand or limit local authority under Costa-Hawkins (Civ. Code §1954.50 et seq.) (§1947.12(m)). Local ordinances cannot be used to exceed Costa-Hawkins limits. Result: state cap is a floor/backstop; where a local cap is lower, local controls.
- **Citation**: Cal. Civ. Code §1947.12(a)(1), (d), (h)–(o)
- **Source doc id**: D024 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1947.12 (also D019 Justia mirror, 403 on fetch)
- **Quoted span**:
  > an owner of residential real property shall not, over the course of any 12-month period, increase the gross rental rate for a dwelling or a unit more than 5 percent plus the percentage change in the cost of living, or 10 percent, whichever is lower, of the lowest gross rental rate charged for that dwelling or unit at any time during the 12 months prior to the effective date of the increase.
- **Confidence**: 0.98
- **Notes / open questions / conflicts**: Dual dates: original TPA effective 2020-01-01 (with 2019-03-15 look-back) vs. current text operative 2024-04-01 (SB 567 re-enactment). The 15-year CO exemption is rolling (a 2012 building becomes covered in 2027). Exemption (5) requires BOTH owner-type and the written notice — if the notice was never given, a qualifying single-family home is still covered. SB 522 (2025, would have removed the 15-year exemption for post-disaster rebuilt units) stalled on Assembly inactive file 2025-09-10 (two-year bill; not enacted as of snapshot).

### CA-STATE-RENT_INCREASE_LIMITS-2
- **Rule ID**: CA-STATE-RENT_INCREASE_LIMITS-2
- **Jurisdiction**: CA · **Level**: state · **Category**: rent_increase_limits
- **Status** (2026-10-01): in_force
- **Title**: Maximum two rent increases per 12 months for a continuing tenant
- **Requirement**: Where the same tenant remains in occupancy over a 12-month period, the gross rental rate may be raised in no more than two increments in that period, and the cumulative amount must still fit within the 5%+CPI/10% cap.
- **Key value**: ≤ 2 increments per rolling 12 months
- **Coverage conditions**: Same as RENT_INCREASE_LIMITS-1 (covered residential real property, continuing tenant).
- **Exemptions**: Same as RENT_INCREASE_LIMITS-1.
- **Effective date**: 2020-01-01 (AB 1482); current text operative 2024-04-01; sunset 2030-01-01.
- **Penalty / remedy**: Same as §1947.12(k) (see RENT_INCREASE_LIMITS-1).
- **Interaction with local law**: Yields to stricter local rent control (local ordinances commonly allow only one increase per year).
- **Citation**: Cal. Civ. Code §1947.12(a)(2)
- **Source doc id**: D024 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1947.12
- **Quoted span**:
  > If the same tenant remains in occupancy of a unit of residential real property over any 12-month period, the gross rental rate for the unit of residential real property shall not be increased in more than two increments over that 12-month period, subject to the other restrictions of this subdivision governing gross rental rate increase.
- **Confidence**: 0.97
- **Notes**: None.

### CA-STATE-RENT_INCREASE_LIMITS-3
- **Rule ID**: CA-STATE-RENT_INCREASE_LIMITS-3
- **Jurisdiction**: CA · **Level**: state · **Category**: rent_increase_limits
- **Status** (2026-10-01): in_force
- **Title**: Vacancy decontrol — initial rent for a new tenancy is uncapped
- **Requirement**: When no tenant from the prior tenancy remains in lawful possession, the owner may set the initial rent for the new tenancy at any level; the cap applies only to subsequent increases.
- **Key value**: Initial rent unrestricted; cap resets at new tenancy
- **Coverage conditions**: All property subject to §1947.12.
- **Exemptions**: N/A (this is itself a carve-out). Note: a tenant may not sublease at a total rent exceeding the allowable rate (§1947.12(c)).
- **Effective date**: 2020-01-01; current text operative 2024-04-01; sunset 2030-01-01.
- **Penalty / remedy**: N/A for the decontrol itself; sublease overcharge actionable under §1947.12(k).
- **Interaction with local law**: Consistent with Costa-Hawkins vacancy decontrol (Civ. Code §1954.53), which also binds local rent control.
- **Citation**: Cal. Civ. Code §1947.12(b), (c)
- **Source doc id**: D024 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1947.12
- **Quoted span**:
  > For a new tenancy in which no tenant from the prior tenancy remains in lawful possession of the residential real property, the owner may establish the initial rental rate not subject to subdivision (a). Subdivision (a) is only applicable to subsequent increases after that initial rental rate has been established.
- **Confidence**: 0.97
- **Notes**: None.

### CA-STATE-RENT_INCREASE_LIMITS-4
- **Rule ID**: CA-STATE-RENT_INCREASE_LIMITS-4
- **Jurisdiction**: CA · **Level**: state · **Category**: rent_increase_limits
- **Status** (2026-10-01): in_force
- **Title**: CPI definition and computation window for the rent cap (regional index, April-to-April, August 1 switchover)
- **Requirement**: "Percentage change in the cost of living" is the April-over-April change in the CPI-U for the metropolitan area where the property sits (LA-Long Beach-Anaheim; Riverside-San Bernardino-Ontario; San Diego-Carlsbad; SF-Oakland-Hayward; or any newer BLS metro index), otherwise the California CPI-U published by DIR. Increases effective before Aug 1 use the prior year's April-to-April change; increases on/after Aug 1 use the current year's April-to-April change; rounded to nearest 0.1%.
- **Key value**: April→April CPI-U; switch date August 1 each year; rounding 0.1%
- **Coverage conditions**: Same as RENT_INCREASE_LIMITS-1. County of property determines index: Los Angeles, Orange → LA index; Riverside, San Bernardino → Riverside index; San Diego → SD index; Alameda, Contra Costa, Marin, San Francisco, San Mateo → SF index; all others → California CPI-U (DIR).
- **Exemptions**: Same as RENT_INCREASE_LIMITS-1.
- **Effective date**: 2020-01-01; current text operative 2024-04-01; sunset 2030-01-01.
- **Penalty / remedy**: Miscalculation leading to excess rent → §1947.12(k).
- **Interaction with local law**: Local rent control ordinances use their own indices/formulas; where lower, local governs.
- **Citation**: Cal. Civ. Code §1947.12(g)(1), (g)(3)
- **Source doc id**: D024 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1947.12
- **Quoted span**:
  > The percentage change shall be the percentage change in the amount published for April of that calendar year and April of the immediately preceding calendar year.
- **Confidence**: 0.95
- **Notes**: No single statewide number — the cap is county-dependent. Address lookup must map county → CPI region.

### CA-STATE-RENT_INCREASE_LIMITS-5
- **Rule ID**: CA-STATE-RENT_INCREASE_LIMITS-5
- **Jurisdiction**: CA · **Level**: state · **Category**: rent_increase_limits
- **Status** (2026-10-01): in_force
- **Title**: Written exemption notice required to claim the single-family/condo (separately alienable) exemption from the rent cap
- **Requirement**: A non-corporate owner of a separately alienable dwelling (SFR/condo/townhome) is exempt from the rent cap only if tenants have been given the statutory exemption statement; for tenancies commenced or renewed on/after 2020-07-01 (2022-07-01 for mobilehomes) the statement must be in the rental agreement.
- **Key value**: Prescribed statement; in lease for tenancies on/after 2020-07-01
- **Coverage conditions**: Separately alienable residential property whose owner is not a REIT, corporation, LLC with a corporate member, or mobilehome park management.
- **Exemptions**: Pre-2020-07-01 tenancies may (but need not) receive the notice in the rental agreement (may be given separately).
- **Effective date**: 2020-01-01 (notice form); in-lease requirement from 2020-07-01; sunset 2030-01-01.
- **Penalty / remedy**: Failure to give notice → property is NOT exempt → rent cap and §1947.12(k) remedies apply.
- **Interaction with local law**: N/A.
- **Citation**: Cal. Civ. Code §1947.12(d)(5)(B)
- **Source doc id**: D024 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1947.12
- **Quoted span**:
  > For a tenancy commenced or renewed on or after July 1, 2020, or July 1, 2022, if the lease is for a tenancy in a mobilehome, the notice required under clause (i) must be provided in the rental agreement.
- **Confidence**: 0.95
- **Notes**: Parallel provision for just cause at §1946.2(e)(8)(B) — see JUST_CAUSE_EVICTION-8. The statement text itself is quoted there.

### CA-STATE-RENT_INCREASE_LIMITS-6
- **Rule ID**: CA-STATE-RENT_INCREASE_LIMITS-6
- **Jurisdiction**: CA · **Level**: state · **Category**: rent_increase_limits
- **Status** (2026-10-01): in_force
- **Title**: Rent increase notice period — 30 days (≤10%) / 90 days (>10%) under Civ. Code §827, incorporated by §1947.12(e)
- **Requirement**: Every rent increase must be noticed in writing per Civ. Code §827: at least 30 days before the effective date if the increase (alone or cumulative over the prior 12 months) is 10% or less; at least 90 days if greater than 10%; +5 days if served by mail (CCP §1013).
- **Key value**: 30 days (≤10%) / 90 days (>10%)
- **Coverage conditions**: §827 applies to ALL month-to-month/periodic residential tenancies statewide (not only TPA-covered). §1947.12(e) cross-references it for cap-covered units.
- **Exemptions**: Fixed-term leases mid-term (no increase permitted absent lease clause); subsidized tenancies where increase results from recertification (30 days regardless) per §827(b)(3) (research).
- **Effective date**: §827 long-standing; 90-day tier added by AB 1110 (2019) effective 2020-01-01 (research).
- **Penalty / remedy**: Defective notice is ineffective; increase not collectable until valid notice period runs.
- **Interaction with local law**: Local ordinances may require longer notice/extra content; stricter local applies.
- **Citation**: Cal. Civ. Code §1947.12(e); Cal. Civ. Code §827(b)
- **Source doc id**: D024 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1947.12 (§827 text confirmed via https://codes.findlaw.com/ca/civil-code/civ-sect-827/ — research)
- **Quoted span**:
  > An owner shall provide notice of any increase in the rental rate, pursuant to subdivision (a), to each tenant in accordance with Section 827.
- **Confidence**: 0.9
- **Notes**: §827 itself is not in corpus; the 30/90-day figures come from web research (FindLaw statutory text), flagged accordingly.

### CA-STATE-RENT_INCREASE_LIMITS-7
- **Rule ID**: CA-STATE-RENT_INCREASE_LIMITS-7
- **Jurisdiction**: CA · **Level**: state · **Category**: rent_increase_limits
- **Status** (2026-10-01): in_force
- **Title**: Civil liability for demanding or retaining rent above the TPA cap
- **Requirement**: An owner who demands, accepts, receives, or retains rent above the §1947.12 maximum is liable to the tenant for injunctive relief, the overcharge, discretionary attorney's fees, and up to treble the overcharge for willful/oppressive/fraudulent/malicious conduct; AG/city attorney/county counsel may enforce.
- **Key value**: Overcharge damages; up to 3x if willful; 3-year limitations period
- **Coverage conditions**: Any owner of property subject to §1947.12(a).
- **Exemptions**: Safe harbor for over-increases between 2019-03-15 and 2020-01-01 (rent reset, no liability for overpayment) and for mobilehomes between 2021-02-18 and 2022-01-01.
- **Effective date**: Private right of action and treble damages added by SB 567, operative 2024-04-01; sunset 2030-01-01.
- **Penalty / remedy**: As stated.
- **Interaction with local law**: Cumulative with local remedies where local ordinance also applies (but §1947.12(d)(3) means a lower local cap displaces the state cap).
- **Citation**: Cal. Civ. Code §1947.12(k)
- **Source doc id**: D024 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1947.12
- **Quoted span**:
  > An owner who demands, accepts, receives, or retains any payment of rent in excess of the maximum rent allowed by this section shall be liable in a civil action to the tenant from whom those payments are demanded, accepted, received, or retained for all of the following:
- **Confidence**: 0.97
- **Notes**: Pre-SB 567 (before 2024-04-01) the statute had no express private remedy.

---

## CATEGORY 2 — just_cause_eviction

### CA-STATE-JUST_CAUSE_EVICTION-1
- **Rule ID**: CA-STATE-JUST_CAUSE_EVICTION-1
- **Jurisdiction**: CA · **Level**: state · **Category**: just_cause_eviction
- **Status** (2026-10-01): in_force
- **Title**: Tenant Protection Act just-cause requirement after 12 months of occupancy
- **Requirement**: After a tenant has continuously and lawfully occupied a unit for 12 months, the owner may not terminate the tenancy without a statutory at-fault or no-fault just cause, which must be stated in the written termination notice. If adult tenants were added before an existing tenant reached 24 months, just cause applies only once all tenants have 12+ months or any one tenant has 24+ months.
- **Key value**: 12 months occupancy (or 24 months for one tenant when adults added)
- **Coverage conditions**: Any "residential real property" (dwelling/unit intended for human habitation, incl. mobilehome-park units) in California unless exempt.
- **Exemptions** (§1946.2(e), (i), (l)):
  1. Transient/tourist hotel occupancy (§1940(b)).
  2. Nonprofit hospital, religious facility, extended care facility, licensed RCFE, adult residential facility.
  3. Dormitories of higher-ed institutions or K-12 schools.
  4. Units where tenant shares bath or kitchen with an owner who maintains principal residence there.
  5. Single-family owner-occupied residences where owner-occupant rents no more than two units or bedrooms (incl. ADU/JADU); and owner-occupied mobilehome.
  6. Owner-occupied duplex (owner occupied one unit as principal residence at tenancy start and continues; neither unit an ADU/JADU).
  7. Housing issued a certificate of occupancy within the previous 15 years (rolling), unless mobilehome.
  8. Separately alienable property (SFR/condo/townhome/mobilehome) IF owner is not a REIT, corporation, LLC with corporate member, or mobilehome park management AND tenant received the statutory exemption notice (in lease for tenancies commenced/renewed on/after 2020-07-01; 2022-07-01 mobilehomes).
  9. Deed-restricted/regulatory-agreement affordable housing (very low/low/moderate, H&S §50093) or housing under a subsidy agreement for such households.
  10. Property under a local just-cause ordinance adopted on/before 2019-09-01, or adopted/amended after that date and "more protective" with a binding local finding (local ordinance applies instead) — §1946.2(i).
  11. Homeowner of a mobilehome (§798.9) — §1946.2(l).
- **Effective date**: Original AB 1482 effective 2020-01-01. Current section repealed-and-re-added by SB 567 (Stats. 2023, ch. 290), operative 2024-04-01. Latest amendment AB 1529 (Stats. 2025, ch. 203), effective 2026-01-01 (expanded (b)(1)(F) criminal-activity ground to criminal activity on or off property directed at owner/agent). Sunset: repealed 2030-01-01 (§1946.2(n)).
- **Penalty / remedy**: Noncompliant notice is void (§1946.2(g)). §1946.2(h): owner who attempts to recover possession in material violation liable for actual damages, discretionary attorney's fees/costs, up to 3x actual damages plus punitive damages for willful/oppressive/fraudulent/malicious conduct; AG/city attorney/county counsel may seek injunction. Waiver void (§1946.2(j)).
- **Interaction with local law**: Yields to local just-cause ordinances adopted on/before 2019-09-01 (local applies regardless of strength) and to post-2019-09-01 ordinances that are more protective with a binding finding; a property is never subject to both; post-2019-09-01 ordinances that are LESS protective are unenforceable while the state law exists (§1946.2(i)(3)).
- **Citation**: Cal. Civ. Code §1946.2(a), (e), (g)–(n)
- **Source doc id**: D023 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1946.2 (also D018 Justia mirror, 403 on fetch)
- **Quoted span**:
  > after a tenant has continuously and lawfully occupied a residential real property for 12 months, the owner of the residential real property shall not terminate a tenancy without just cause, which shall be stated in the written notice to terminate tenancy.
- **Confidence**: 0.98
- **Notes / open questions / conflicts**: Dual dates (2020-01-01 original; 2024-04-01 SB 567 re-enactment; 2026-01-01 AB 1529 amendment). Corpus text is the AB 1529 version (header: "Amended by Stats. 2025, Ch. 203, Sec. 1. (AB 1529) Effective January 1, 2026"). Exemption 8 requires BOTH owner-type and notice. SB 522 (2025) would have narrowed exemption 7 for disaster-rebuilt units — not enacted (inactive file 2025-09-10).

### CA-STATE-JUST_CAUSE_EVICTION-2
- **Rule ID**: CA-STATE-JUST_CAUSE_EVICTION-2
- **Jurisdiction**: CA · **Level**: state · **Category**: just_cause_eviction
- **Status** (2026-10-01): in_force
- **Title**: Enumerated at-fault just causes
- **Requirement**: At-fault just cause is limited to: (A) rent default; (B) breach of a material lease term after written notice to correct; (C) nuisance; (D) waste; (E) refusal to sign a similar renewal of a written lease that expired on/after 2020-01-01 (2022-01-01 mobilehomes); (F) criminal activity on the property/common areas, or criminal activity or criminal threat (Pen. Code §422(a)) on or off the property directed at owner/agent; (G) unauthorized assignment/sublet; (H) refusal to allow lawful entry; (I) unlawful purpose; (J) employee/agent/licensee failing to vacate after termination; (K) failure to deliver possession after tenant's own notice/offer to surrender.
- **Key value**: 11 enumerated at-fault grounds (A)–(K)
- **Coverage conditions**: Tenancies subject to §1946.2(a).
- **Exemptions**: As JUST_CAUSE_EVICTION-1.
- **Effective date**: 2020-01-01; operative text 2024-04-01; (F) broadened by AB 1529 effective 2026-01-01; sunset 2030-01-01.
- **Penalty / remedy**: As JUST_CAUSE_EVICTION-1 (void notice; §1946.2(h) damages).
- **Interaction with local law**: Local ordinance may further limit grounds (then local applies if qualifying under §1946.2(i)).
- **Citation**: Cal. Civ. Code §1946.2(b)(1)
- **Source doc id**: D023 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1946.2
- **Quoted span**:
  > Criminal activity by the tenant on the residential real property, including any common areas, or any criminal activity or criminal threat, as defined in subdivision (a) of Section 422 of the Penal Code, on or off the residential real property, that is directed at any owner or agent of the owner of
- **Confidence**: 0.96
- **Notes**: Pre-2026 text covered only criminal *threats* directed at owner/agent; AB 1529 added "criminal activity ... on or off the residential real property".

### CA-STATE-JUST_CAUSE_EVICTION-3
- **Rule ID**: CA-STATE-JUST_CAUSE_EVICTION-3
- **Jurisdiction**: CA · **Level**: state · **Category**: just_cause_eviction
- **Status** (2026-10-01): in_force
- **Title**: No-fault just causes — owner/relative move-in conditions (90-day move-in, 12-month occupancy, 25% owner test)
- **Requirement**: No-fault just causes are: (A) owner or owner's spouse, domestic partner, children, grandchildren, parents, or grandparents intend to occupy as primary residence for ≥12 continuous months; (B) withdrawal from rental market; (C) compliance with government/court order or local ordinance requiring vacancy; (D) demolition or substantial remodel. For (A): for leases on/after 2020-07-01 the tenant must agree in writing or the lease must contain an owner-move-in clause; not available if the intended occupant already lives on the property or a similar unit is vacant; notice must name the occupant and relationship and advise tenant may request proof; occupant must move in within 90 days and stay 12 months, else owner must re-offer the unit at the prior rent and reimburse moving costs; "owner" means a natural person with ≥25% recorded interest (or any interest if 100% family-owned, or through LLC/partnership with ≥25% beneficial interest / family trust).
- **Key value**: Move-in within 90 days; occupy ≥12 consecutive months; ≥25% natural-person ownership
- **Coverage conditions**: Tenancies subject to §1946.2(a).
- **Exemptions**: As JUST_CAUSE_EVICTION-1. Intended occupant's death after move-in is not a violation.
- **Effective date**: 2020-01-01; move-in/90-day/25% details added by SB 567, operative 2024-04-01; sunset 2030-01-01.
- **Penalty / remedy**: Void notice; §1946.2(h) damages; re-offer + moving expense reimbursement obligation if occupancy conditions fail.
- **Interaction with local law**: Local ordinances may impose stricter owner move-in rules (e.g., longer occupancy, higher relocation) — local applies if qualifying under §1946.2(i).
- **Citation**: Cal. Civ. Code §1946.2(b)(2)(A)–(C)
- **Source doc id**: D023 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1946.2
- **Quoted span**:
  > Clause (i) applies only if the intended occupant moves into the rental unit within 90 days after the tenant vacates and occupies the rental unit as a primary residence for at least 12 consecutive months.
- **Confidence**: 0.96
- **Notes**: Corporate/REIT owners cannot use owner move-in (natural person requirement).

### CA-STATE-JUST_CAUSE_EVICTION-4
- **Rule ID**: CA-STATE-JUST_CAUSE_EVICTION-4
- **Jurisdiction**: CA · **Level**: state · **Category**: just_cause_eviction
- **Status** (2026-10-01): in_force
- **Title**: Substantial remodel / demolition — definition and mandatory notice contents
- **Requirement**: "Substantial remodel" means replacement/substantial modification of a structural, electrical, plumbing, or mechanical system requiring a permit, or abatement of hazardous materials (lead, mold, asbestos), that cannot be done safely with the tenant in place and requires vacancy for ≥30 consecutive days; cosmetic work does not qualify. The notice must state intent, include the prescribed re-rent-offer statement, describe the work and duration (or demolition date), attach permits (or the signed contractor contract for permit-free hazmat abatement), and tell the tenant to provide contact info if interested in reoccupying.
- **Key value**: Permit-required work; ≥30 consecutive days vacancy; permits attached to notice
- **Coverage conditions**: Tenancies subject to §1946.2(a).
- **Exemptions**: As JUST_CAUSE_EVICTION-1.
- **Effective date**: Definition from 2020-01-01; notice content/permit requirements added by SB 567, operative 2024-04-01; sunset 2030-01-01.
- **Penalty / remedy**: Void notice; §1946.2(h) damages; if remodel not commenced/completed, owner must offer re-rental at prior rent/terms.
- **Interaction with local law**: Local ordinances may be stricter.
- **Citation**: Cal. Civ. Code §1946.2(b)(2)(D)
- **Source doc id**: D023 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1946.2
- **Quoted span**:
  > “substantially remodel” means either of the following that cannot be reasonably accomplished in a safe manner that allows the tenant to remain living in the place and that requires the tenant to vacate the residential real property for at least 30 consecutive days:
- **Confidence**: 0.96
- **Notes**: None.

### CA-STATE-JUST_CAUSE_EVICTION-5
- **Rule ID**: CA-STATE-JUST_CAUSE_EVICTION-5
- **Jurisdiction**: CA · **Level**: state · **Category**: just_cause_eviction
- **Status** (2026-10-01): in_force
- **Title**: Opportunity to cure before terminating for a curable lease violation
- **Requirement**: Before serving a termination notice for a curable violation, the owner must first serve a notice to cure (CCP §1161(3)); only if uncured within the notice period may a 3-day notice to quit without opportunity to cure follow.
- **Key value**: Notice-to-cure first; then 3-day quit
- **Coverage conditions**: Tenancies subject to §1946.2(a).
- **Exemptions**: As JUST_CAUSE_EVICTION-1; non-curable grounds (nuisance, waste, criminal activity, etc.) not subject.
- **Effective date**: 2020-01-01; operative text 2024-04-01; sunset 2030-01-01.
- **Penalty / remedy**: Notice void; §1946.2(h).
- **Interaction with local law**: Local ordinances may add cure rights.
- **Citation**: Cal. Civ. Code §1946.2(c)
- **Source doc id**: D023 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1946.2
- **Quoted span**:
  > If the violation is not cured within the time period set forth in the notice, a three-day notice to quit without an opportunity to cure may thereafter be served to terminate the tenancy.
- **Confidence**: 0.95
- **Notes**: None.

### CA-STATE-JUST_CAUSE_EVICTION-6
- **Rule ID**: CA-STATE-JUST_CAUSE_EVICTION-6
- **Jurisdiction**: CA · **Level**: state · **Category**: just_cause_eviction
- **Status** (2026-10-01): in_force
- **Title**: Relocation assistance for no-fault terminations — one month's rent or final-month rent waiver, paid within 15 days
- **Requirement**: For any no-fault termination the owner must, regardless of tenant income, either pay relocation assistance equal to one month of the rent in effect when the notice was issued (within 15 calendar days of serving the notice) or waive in writing the final month's rent before it is due; the notice must inform the tenant of this right (and state the waived amount if waiver chosen). Strict compliance required or the notice is void.
- **Key value**: 1 month's rent; payable within 15 calendar days of notice service
- **Coverage conditions**: Tenancies subject to §1946.2(a) terminated for no-fault just cause.
- **Exemptions**: Tenant found at fault for the condition triggering a government vacate order is not entitled to relocation assistance (§1946.2(b)(2)(C)(ii)). Credited against any other legally required relocation assistance; recoverable as damages if tenant holds over.
- **Effective date**: 2020-01-01; operative text 2024-04-01; sunset 2030-01-01.
- **Penalty / remedy**: Non-strict compliance → notice void (§1946.2(d)(4)); §1946.2(h) damages.
- **Interaction with local law**: Local ordinances with higher relocation amounts apply instead (and are a basis for "more protective" status); state payment is credited against other required relocation.
- **Citation**: Cal. Civ. Code §1946.2(d)
- **Source doc id**: D023 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1946.2
- **Quoted span**:
  > The amount of relocation assistance or rent waiver shall be equal to one month of the tenant’s rent that was in effect when the owner issued the notice to terminate the tenancy.
- **Confidence**: 0.97
- **Notes**: None.

### CA-STATE-JUST_CAUSE_EVICTION-7
- **Rule ID**: CA-STATE-JUST_CAUSE_EVICTION-7
- **Jurisdiction**: CA · **Level**: state · **Category**: just_cause_eviction
- **Status** (2026-10-01): in_force
- **Title**: Mandatory TPA disclosure to tenants (12-point type) in lease/addendum
- **Requirement**: Owners of covered property must give tenants the prescribed notice (rent-cap and just-cause disclosure) in ≥12-point type: in the lease, as an addendum, or as a signed written notice for tenancies commenced/renewed on/after 2020-07-01 (2022-07-01 mobilehomes); for earlier tenancies, by written notice no later than 2020-08-01 (2022-08-01 mobilehomes). Subject to Civ. Code §1632 (translation).
- **Key value**: 12-point type; deadline 2020-08-01 for pre-existing tenancies
- **Coverage conditions**: All property subject to §1946.2 (not exempt).
- **Exemptions**: Exempt properties under §1946.2(e) instead give the exemption notice (see JUST_CAUSE_EVICTION-8).
- **Effective date**: 2020-01-01 / 2020-07-01 / 2020-08-01; sunset 2030-01-01.
- **Penalty / remedy**: §1946.2(g): failure to comply with any provision renders a termination notice void.
- **Interaction with local law**: N/A.
- **Citation**: Cal. Civ. Code §1946.2(f)
- **Source doc id**: D023 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1946.2
- **Quoted span**:
  > The notification or lease provision shall be in no less than 12-point type, and shall include the following:
- **Confidence**: 0.95
- **Notes**: Prescribed text begins "California law limits the amount your rent can be increased. See Section 1947.12 of the Civil Code for more information." (corpus D023).

### CA-STATE-JUST_CAUSE_EVICTION-8
- **Rule ID**: CA-STATE-JUST_CAUSE_EVICTION-8
- **Jurisdiction**: CA · **Level**: state · **Category**: just_cause_eviction
- **Status** (2026-10-01): in_force
- **Title**: Exemption notice required for separately alienable (SFR/condo) property owned by non-corporate owners
- **Requirement**: To claim the single-family/condo exemption from just cause (and rent cap), the owner must give tenants the prescribed exemption statement; for tenancies commenced/renewed on/after 2020-07-01 (2022-07-01 mobilehomes) it must be in the rental agreement.
- **Key value**: Prescribed statement; in lease from 2020-07-01
- **Coverage conditions**: Separately alienable dwelling; owner not a REIT, corporation, LLC with a corporate member, or mobilehome park management.
- **Exemptions**: Pre-2020-07-01 tenancies: notice may be given outside the rental agreement.
- **Effective date**: 2020-01-01 / 2020-07-01; sunset 2030-01-01.
- **Penalty / remedy**: Without the notice the property is covered by §1946.2 (and §1947.12); termination notices lacking just cause are void.
- **Interaction with local law**: N/A.
- **Citation**: Cal. Civ. Code §1946.2(e)(8)(B)
- **Source doc id**: D023 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1946.2
- **Quoted span**:
  > This property is not subject to the rent limits imposed by Section 1947.12 of the Civil Code and is not subject to the just cause requirements of Section 1946.2 of the Civil Code.
- **Confidence**: 0.96
- **Notes**: Same statement appears in D024 (§1947.12(d)(5)(B)).

### CA-STATE-JUST_CAUSE_EVICTION-9
- **Rule ID**: CA-STATE-JUST_CAUSE_EVICTION-9
- **Jurisdiction**: CA · **Level**: state · **Category**: just_cause_eviction
- **Status** (2026-10-01): in_force
- **Title**: Civil remedies for wrongful recovery of possession (actual, treble, punitive damages; public enforcement)
- **Requirement**: An owner who attempts to recover possession in material violation of §1946.2 is liable for actual damages, discretionary attorney's fees and costs, and up to three times actual damages plus punitive damages for willful/oppressive/fraudulent/malicious conduct; the AG, city attorney, or county counsel may seek injunctive relief.
- **Key value**: Actual damages; up to 3x + punitive if willful
- **Coverage conditions**: Any owner of property subject to §1946.2.
- **Exemptions**: N/A.
- **Effective date**: Added by SB 567, operative 2024-04-01; sunset 2030-01-01.
- **Penalty / remedy**: As stated.
- **Interaction with local law**: N/A (local ordinance remedies apply where local ordinance governs instead).
- **Citation**: Cal. Civ. Code §1946.2(h)
- **Source doc id**: D023 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1946.2
- **Quoted span**:
  > An owner who attempts to recover possession of a rental unit in material violation of this section shall be liable to the tenant in a civil action for all of the following:
- **Confidence**: 0.97
- **Notes**: None.

### CA-STATE-JUST_CAUSE_EVICTION-10
- **Rule ID**: CA-STATE-JUST_CAUSE_EVICTION-10
- **Jurisdiction**: CA · **Level**: state · **Category**: just_cause_eviction
- **Status** (2026-10-01): in_force
- **Title**: Relationship to local just-cause ordinances (grandfathered or "more protective" local law displaces state law)
- **Requirement**: §1946.2 does not apply where a local just-cause ordinance was adopted on/before 2019-09-01, or was adopted/amended after that date and is more protective (consistent grounds, further limits or higher relocation or added protections, plus a binding local finding). No property is subject to both; less-protective post-2019 ordinances are unenforceable while §1946.2 exists.
- **Key value**: Cutoff 2019-09-01; "more protective" test with binding finding
- **Coverage conditions**: Any residential property in a jurisdiction with a local just-cause ordinance.
- **Exemptions**: N/A.
- **Effective date**: 2020-01-01; operative text 2024-04-01; sunset 2030-01-01.
- **Penalty / remedy**: N/A.
- **Interaction with local law**: This IS the interaction rule — state yields to grandfathered or more-protective local ordinances.
- **Citation**: Cal. Civ. Code §1946.2(i)
- **Source doc id**: D023 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1946.2
- **Quoted span**:
  > A residential real property shall not be subject to both a local ordinance requiring just cause for termination of a residential tenancy and this section.
- **Confidence**: 0.97
- **Notes**: Address lookup must know whether the city/county has a just-cause ordinance and its adoption date.

---

## CATEGORY 3 — security_deposits

### CA-STATE-SECURITY_DEPOSITS-1
- **Rule ID**: CA-STATE-SECURITY_DEPOSITS-1
- **Jurisdiction**: CA · **Level**: state · **Category**: security_deposits
- **Status** (2026-10-01): in_force
- **Title**: Security deposit cap — one month's rent (AB 12), two months for qualifying small landlords
- **Requirement**: A landlord may not demand or receive security (however denominated, incl. pet/cleaning/last-month deposits) exceeding one month's rent in addition to first month's rent. Small landlords (natural person or LLC of natural persons, incl. family-trust settlors/beneficiaries, owning ≤2 residential rental properties with ≤4 total units) may collect up to two months' rent — except from service members, who always get the one-month cap.
- **Key value**: 1 month's rent (2 months for small landlords; 1 month for service members regardless)
- **Coverage conditions**: All residential rental property used as the tenant's dwelling; security collected or demanded on/after 2024-07-01.
- **Exemptions**: (c)(6) security collected before 2024-07-01 (grandfathered); (c)(2) advance payment of ≥6 months' rent on a lease of ≥6 months is permitted; (c)(3) mutually agreed fee for tenant-requested alterations; small-landlord 2-month exception (above); §1950.6 screening fees are not "security".
- **Effective date**: 2024-07-01 (AB 12, Stats. 2023, ch. 733, signed 2023-10-11). Service-member written-statement provision (c)(4): 2025-04-01. Current section text amended by AB 414 effective 2026-01-01.
- **Penalty / remedy**: §1950.5(m): bad-faith claim/retention → statutory damages up to 2x the deposit plus actual damages; landlord bears burden of proof on reasonableness; small claims available (§1950.5(o)).
- **Interaction with local law**: Local ordinances may add requirements (e.g., interest payment, local caps) — stricter local applies; state law sets the ceiling statewide.
- **Citation**: Cal. Civ. Code §1950.5(c)(1), (c)(5), (c)(6)
- **Source doc id**: D025 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5 (also D020 Justia mirror, 403 on fetch)
- **Quoted span**:
  > a landlord shall not demand or receive security, however denominated, in an amount or value in excess of an amount equal to one month’s rent, in addition to any rent for the first month paid on or before initial occupancy.
- **Confidence**: 0.98
- **Notes / open questions**: Pre-AB 12 cap was 2 months unfurnished / 3 months furnished. One blog claims 2024-01-01 effective date — incorrect; §1950.5(c)(6) in corpus confirms 2024-07-01. Small-landlord test counts properties and units across the owner's whole portfolio (address lookup needs owner portfolio size).

### CA-STATE-SECURITY_DEPOSITS-2
- **Rule ID**: CA-STATE-SECURITY_DEPOSITS-2
- **Jurisdiction**: CA · **Level**: state · **Category**: security_deposits
- **Status** (2026-10-01): in_force
- **Title**: Small-landlord two-month exception — eligibility definition
- **Requirement**: The two-month cap is available only if the landlord is a natural person (incl. family-trust settlor/beneficiary) or an LLC whose members are all natural persons, AND owns no more than two residential rental properties that collectively include no more than four dwelling units offered for rent. Not available against service members, and a landlord may not refuse to rent to a service member because of that limit.
- **Key value**: ≤2 properties AND ≤4 units; natural-person ownership
- **Coverage conditions**: Owner-level test (portfolio-wide).
- **Exemptions**: Service members (one-month cap always applies).
- **Effective date**: 2024-07-01; sunset none.
- **Penalty / remedy**: Overcollection → §1950.5(m) up to 2x; refusal to rent to service member because of cap is itself prohibited.
- **Interaction with local law**: Stricter local caps would govern.
- **Citation**: Cal. Civ. Code §1950.5(c)(5)(A)–(C)
- **Source doc id**: D025 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5
- **Quoted span**:
  > The landlord is a natural person or a limited liability company in which all members are natural persons.
- **Confidence**: 0.97
- **Notes**: Corporate, REIT, or mixed-member LLC owners never qualify.

### CA-STATE-SECURITY_DEPOSITS-3
- **Rule ID**: CA-STATE-SECURITY_DEPOSITS-3
- **Jurisdiction**: CA · **Level**: state · **Category**: security_deposits
- **Status** (2026-10-01): in_force
- **Title**: Return of deposit and itemized statement within 21 calendar days; documentation of deductions
- **Requirement**: No later than 21 calendar days after the tenant vacates, the landlord must furnish an itemized statement of deductions and return the balance. With the statement the landlord must include receipts/invoices for work and materials (or describe work, hours and rate if done in-house), plus the §1950.5(g) photographs with a written cost explanation. If repairs cannot be completed or invoices are not in hand within 21 days, a good-faith estimate may be used and finalized within 14 days of completion/receipt. Documentation is not required if total deductions ≤ $125 or the tenant waived (waiver only valid if signed at/after notice of termination), but must be supplied within 14 days of a tenant request made within 14 days of the statement.
- **Key value**: 21 calendar days; $125 documentation threshold; 14-day follow-up
- **Coverage conditions**: All residential security deposits.
- **Exemptions**: $125 threshold / post-notice waiver (documentation only — not the 21-day return itself).
- **Effective date**: 21-day rule long-standing (reduced from 3 weeks/2 weeks historically); photo-delivery requirement (h)(2)(D) 2025-04-01 (AB 2801); electronic/email statement options 2026-01-01 (AB 414).
- **Penalty / remedy**: §1950.5(h)(7): landlord forfeits any claim to the security if it in bad faith fails to comply with subdivision (h); §1950.5(m) up to 2x statutory damages.
- **Interaction with local law**: Local ordinances may add (e.g., interest) but cannot lengthen the state deadline.
- **Citation**: Cal. Civ. Code §1950.5(h)(1)–(7)
- **Source doc id**: D025 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5
- **Quoted span**:
  > No later than 21 calendar days after the tenant has vacated the premises, but not earlier than the time that either the landlord or the tenant provides a notice to terminate the tenancy under Section 1946 or 1946.1, Section 1161 of the Code of Civil Procedure,
- **Confidence**: 0.97
- **Notes**: Multiple adult tenants: check payable to all adult tenants unless written agreement specifying allocation (§1950.5(h)(1)(C)).

### CA-STATE-SECURITY_DEPOSITS-4
- **Rule ID**: CA-STATE-SECURITY_DEPOSITS-4
- **Jurisdiction**: CA · **Level**: state · **Category**: security_deposits
- **Status** (2026-10-01): in_force
- **Title**: Permissible uses of the deposit; no deductions for ordinary wear and tear, pre-existing conditions, or routine professional cleaning
- **Requirement**: The deposit may be used only for unpaid rent, repair of tenant-caused damage beyond ordinary wear and tear, cleaning to return the unit to move-in cleanliness, and restoring/replacing personal property if the lease so provides — and only in amounts reasonably necessary. No claims for pre-existing defects, ordinary wear and tear (cumulative across tenancies), or professional carpet/other professional cleaning unless reasonably necessary to restore move-in condition.
- **Key value**: 4 permitted purposes; reasonable amounts only
- **Coverage conditions**: All residential security deposits.
- **Exemptions**: N/A.
- **Effective date**: Long-standing; (e)(2)(C) professional-cleaning limit added by AB 2801, effective 2025-01-01 (research — bill effective date; subdivision text in corpus).
- **Penalty / remedy**: §1950.5(m) up to 2x; landlord bears burden of proof.
- **Interaction with local law**: N/A.
- **Citation**: Cal. Civ. Code §1950.5(b), (e)
- **Source doc id**: D025 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5
- **Quoted span**:
  > The landlord shall not require a tenant to pay for, or assert a claim against the tenant or the security for, professional carpet cleaning or other professional cleaning services, unless reasonably necessary to return the premises to the condition it was in at the inception of tenancy, exclusive of ordinary wear and tear.
- **Confidence**: 0.95
- **Notes**: "Security" is defined broadly to include any fee/deposit/charge imposed at tenancy start to process a new tenant or as advance rent, except §1950.6 screening fees (§1950.5(b)).

### CA-STATE-SECURITY_DEPOSITS-5
- **Rule ID**: CA-STATE-SECURITY_DEPOSITS-5
- **Jurisdiction**: CA · **Level**: state · **Category**: security_deposits
- **Status** (2026-10-01): in_force
- **Title**: Tenant's right to a pre-move-out initial inspection with 48 hours' written notice
- **Requirement**: Within a reasonable time after either party gives notice of termination (or before lease end), the landlord must notify the tenant in writing of the option to request an initial inspection and to be present; if requested, the inspection occurs no earlier than two weeks before move-out, with ≥48 hours' written notice (waivable in writing), followed by an itemized statement of proposed deductions (including text of §1950.5(b)(1)–(4)) so the tenant can cure. Deductions not identified at inspection generally cannot later be taken (with exceptions for items hidden by possessions or arising afterward).
- **Key value**: 48 hours' notice; ≤2 weeks before move-out
- **Coverage conditions**: All residential tenancies.
- **Exemptions**: Not required when the tenancy is terminated under CCP §1161(2), (3), or (4) (nonpayment/breach/nuisance evictions); discharged if tenant does not request.
- **Effective date**: 2003-01-01 (AB 2330 of 2002 — research); long-standing.
- **Penalty / remedy**: §1950.5(m).
- **Interaction with local law**: N/A.
- **Citation**: Cal. Civ. Code §1950.5(f)
- **Source doc id**: D025 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5
- **Quoted span**:
  > Within a reasonable time after notification of either party’s intention to terminate the tenancy, or before the end of the lease term, the landlord shall notify the tenant in writing of the tenant’s option to request an initial inspection and of the tenant’s right to be present at the inspection.
- **Confidence**: 0.95
- **Notes**: None.

### CA-STATE-SECURITY_DEPOSITS-6
- **Rule ID**: CA-STATE-SECURITY_DEPOSITS-6
- **Jurisdiction**: CA · **Level**: state · **Category**: security_deposits
- **Status** (2026-10-01): in_force
- **Title**: Mandatory move-in / move-out / post-repair photographs (AB 2801)
- **Requirement**: Beginning 2025-04-01 the landlord must photograph the unit within a reasonable time after possession is returned (before any repairs/cleaning to be deducted) and again after the work is completed; for tenancies beginning on/after 2025-07-01 the landlord must also photograph the unit immediately before or at the inception of tenancy. Photos must accompany the itemized statement for any repair/cleaning deduction (mail, email, flash drive, or link).
- **Key value**: Move-out photos from 2025-04-01; move-in photos for tenancies from 2025-07-01
- **Coverage conditions**: All residential tenancies (move-in photo duty only for tenancies starting on/after 2025-07-01).
- **Exemptions**: None stated.
- **Effective date**: 2025-04-01 (move-out/after-repair) and 2025-07-01 (move-in) — AB 2801 (Stats. 2024, signed 2024-09-19).
- **Penalty / remedy**: Deductions unsupported by photos are not properly documented → risk of forfeiture under §1950.5(h)(7) and 2x damages under §1950.5(m).
- **Interaction with local law**: N/A.
- **Citation**: Cal. Civ. Code §1950.5(g), (h)(2)(D)
- **Source doc id**: D025 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5
- **Quoted span**:
  > Beginning April 1, 2025, the landlord shall take photographs of the unit within a reasonable time after the possession of the unit is returned to the landlord, but prior to any repairs or cleanings for which the landlord will make a deduction from or claim against the security deposit pursuant to this section, and shall also take photographs of the unit within a reasonable time after such repairs or cleanings are completed.
- **Confidence**: 0.97
- **Notes**: Dual phase-in dates; sources agree.

### CA-STATE-SECURITY_DEPOSITS-7
- **Rule ID**: CA-STATE-SECURITY_DEPOSITS-7
- **Jurisdiction**: CA · **Level**: state · **Category**: security_deposits
- **Status** (2026-10-01): in_force
- **Title**: Electronic return of deposit when rent/deposit was paid electronically (AB 414)
- **Requirement**: If the landlord received the security or rent electronically, the remaining deposit must be returned electronically to an account designated by the tenant in writing (or another electronic method agreed in writing), unless the parties agree in writing to another method; the landlord must notify the tenant in writing of this right around the time of termination notice. Successors in interest have the same duty only if they received rent electronically. Otherwise return is by personal delivery or first-class-mailed check.
- **Key value**: Electronic refund mandatory where payments were electronic
- **Coverage conditions**: Residential tenancies where any security or rent payment was received electronically.
- **Exemptions**: Written agreement designating a different return method; terminations under CCP §1161(2)–(4) (notice requirement only).
- **Effective date**: 2026-01-01 (AB 414, Stats. 2025, ch. 340, approved 2025-10-06).
- **Penalty / remedy**: §1950.5(h)(7), (m).
- **Interaction with local law**: N/A.
- **Citation**: Cal. Civ. Code §1950.5(h)(1)(A)(ii)
- **Source doc id**: D025 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5
- **Quoted span**:
  > If the landlord received the security or rental payments from the tenant electronically, the landlord shall return the remainder of the security electronically to a bank account or other financial
- **Confidence**: 0.95
- **Notes**: One property-management blog describes electronic return as optional; the statutory text ("shall") and Senate Judiciary analysis make it mandatory absent written agreement.

### CA-STATE-SECURITY_DEPOSITS-8
- **Rule ID**: CA-STATE-SECURITY_DEPOSITS-8
- **Jurisdiction**: CA · **Level**: state · **Category**: security_deposits
- **Status** (2026-10-01): in_force
- **Title**: No "nonrefundable" deposits or fees
- **Requirement**: A lease may not characterize any security as nonrefundable; all move-in deposits/fees (other than §1950.6 screening fees) are refundable security subject to §1950.5.
- **Key value**: Nonrefundable clauses prohibited
- **Coverage conditions**: All residential leases.
- **Exemptions**: §1950.6 application screening fee (defined as nonrefundable by that section).
- **Effective date**: Long-standing (1985 amendments declaratory).
- **Penalty / remedy**: Clause void; §1950.5(m).
- **Interaction with local law**: N/A.
- **Citation**: Cal. Civ. Code §1950.5(n)
- **Source doc id**: D025 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5
- **Quoted span**:
  > A lease or rental agreement shall not contain a provision characterizing any security as “nonrefundable.”
- **Confidence**: 0.97
- **Notes**: None.

### CA-STATE-SECURITY_DEPOSITS-9
- **Rule ID**: CA-STATE-SECURITY_DEPOSITS-9
- **Jurisdiction**: CA · **Level**: state · **Category**: security_deposits
- **Status** (2026-10-01): in_force
- **Title**: Bad-faith retention penalty — up to twice the deposit; landlord bears burden of proof
- **Requirement**: Bad-faith claim or retention of any part of the security (or bad-faith demand for replacement security) exposes the landlord/successor to statutory damages up to twice the deposit plus actual damages; the court may award without a specific request; the landlord has the burden of proving reasonableness of amounts claimed.
- **Key value**: Up to 2x deposit + actual damages
- **Coverage conditions**: All residential deposits.
- **Exemptions**: Successor with good-faith belief after reasonable investigation (§1950.5(k)(3)).
- **Effective date**: Long-standing.
- **Penalty / remedy**: As stated; small claims permitted.
- **Interaction with local law**: Local penalties may be cumulative.
- **Citation**: Cal. Civ. Code §1950.5(m), (o)
- **Source doc id**: D025 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5
- **Quoted span**:
  > may subject the landlord or the landlord’s successors in interest to statutory damages of up to twice the amount of the security, in addition to actual damages.
- **Confidence**: 0.97
- **Notes**: None.

### CA-STATE-SECURITY_DEPOSITS-10
- **Rule ID**: CA-STATE-SECURITY_DEPOSITS-10
- **Jurisdiction**: CA · **Level**: state · **Category**: security_deposits
- **Status** (2026-10-01): in_force
- **Title**: Transfer of deposits on sale; successor liability
- **Requirement**: On termination of the landlord's interest (sale, death, receivership, etc.), the landlord must within a reasonable time either transfer the remaining deposit to the successor and notify the tenant (names/addresses/phones of successors, amount, claims), or return it to the tenant with an accounting. Before a voluntary transfer the seller must give the buyer a written statement of deposits and deductions. Noncompliance → successor jointly and severally liable; successor may not demand replacement security until restitution/accounting.
- **Key value**: Transfer-or-return; joint and several successor liability
- **Coverage conditions**: Any transfer of a residential rental property with tenants in place.
- **Exemptions**: Good-faith successor after reasonable investigation not liable for 2x damages.
- **Effective date**: Long-standing.
- **Penalty / remedy**: §1950.5(k), (m).
- **Interaction with local law**: N/A.
- **Citation**: Cal. Civ. Code §1950.5(i)–(l)
- **Source doc id**: D025 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5
- **Quoted span**:
  > Transfer the portion of the security remaining after any lawful deductions are made under subdivision (e) to the landlord’s successor in interest.
- **Confidence**: 0.95
- **Notes**: None.

### CA-STATE-SECURITY_DEPOSITS-11
- **Rule ID**: CA-STATE-SECURITY_DEPOSITS-11
- **Jurisdiction**: CA · **Level**: state · **Category**: security_deposits
- **Status** (2026-10-01): in_force
- **Title**: Service-member protections — written explanation for above-standard deposit; refund of excess after 6 months
- **Requirement**: From 2025-04-01, a landlord charging a service member a higher-than-standard/advertised deposit due to credit, housing history, etc. must give a written statement before lease signing of the amount and reason; the extra must be refunded after no more than six months of residency if not in arrears, with the refund date stated in the lease. Service members are never subject to the small-landlord two-month cap.
- **Key value**: Written statement at signing; excess refunded ≤6 months
- **Coverage conditions**: Tenant is a "service member" (Mil. & Vet. Code §400).
- **Exemptions**: N/A.
- **Effective date**: 2025-04-01 (c)(4); (c)(5)(B) from 2024-07-01.
- **Penalty / remedy**: §1950.5(m).
- **Interaction with local law**: N/A.
- **Citation**: Cal. Civ. Code §1950.5(c)(4), (c)(5)(B)
- **Source doc id**: D025 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5
- **Quoted span**:
  > Subparagraph (A) shall not apply if the prospective tenant is a service member.
- **Confidence**: 0.95
- **Notes**: None.

### Security deposits — explicit "no state rule" items
- **Interest on deposits**: No California state statute requires landlords to pay interest on security deposits. Interest requirements exist only under local ordinances (e.g., San Francisco, Los Angeles, Berkeley, Santa Monica, West Hollywood, etc. — research). → At state level: **no rule**; address lookup must consult local layer.
- **Separate/escrow account**: No state requirement to hold deposits in a separate account (§1950.5(d) only makes the tenant's claim prior to landlord's creditors).

---

## CATEGORY 4 — application_screening_fees

### CA-STATE-APPLICATION_SCREENING_FEES-1
- **Rule ID**: CA-STATE-APPLICATION_SCREENING_FEES-1
- **Jurisdiction**: CA · **Level**: state · **Category**: application_screening_fees
- **Status** (2026-10-01): in_force
- **Title**: Application screening fee cap — actual out-of-pocket cost, never more than $30 (1997 base) adjusted by CPI since 1998-01-01
- **Requirement**: A landlord/agent may charge an applicant (incl. guarantors/cosigners) a screening fee no greater than the actual out-of-pocket cost of gathering information (screening service, credit report) plus the reasonable value of time spent, and in no case more than $30 per applicant as adjusted annually for CPI increases beginning 1998-01-01.
- **Key value**: lesser of actual cost or $30 × CPI adjustment since 1998. Industry (CAA) figure for 2026: $65.86 per applicant (2025: $63.90). No official state-published figure exists — see Notes.
- **Coverage conditions**: Every residential rental applicant statewide; "landlord" = owner of residential rental property; applies regardless of owner size (no small-landlord exemption).
- **Exemptions**: §1950.6(l) does not preempt federal/state housing-assistance program rules on deposits/fees. Landlords who accept a reusable tenant screening report under Civ. Code §1950.1 may not charge a fee for that application (research — §1950.1; corpus §1950.6(g) only permits acceptance).
- **Effective date**: Original 1997-01-01 (AB 2330? — base year per statute: CPI adjustment "beginning on January 1, 1998"); procedural overhaul AB 2493 effective 2025-01-01; technical amendment AB 1170 (Stats. 2025, ch. 67) effective 2026-01-01 (corpus header).
- **Penalty / remedy**: No express statutory penalty in §1950.6; excess fee recoverable as unlawful charge (UCL/B&P §17200, Civ. Code §1950.6 private action in small claims — research). Fee is not "security" under §1950.5 nor an "advance fee" under B&P §10026.
- **Interaction with local law**: Local jurisdictions may compute their own CPI-based caps (e.g., Berkeley Rent Board publishes a 2026 maximum of $68.96 using regional CPI — research) or impose stricter rules; stricter local applies.
- **Citation**: Cal. Civ. Code §1950.6(a), (b), (j), (k)
- **Source doc id**: D026 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.6 (also D017 https://california.public.law/codes/civil_code_section_1950.6 — fetched; text identical, "updated Jan. 1, 2026", no CPI figure shown)
- **Quoted span**:
  > In no case shall the amount of the application screening fee charged by the landlord or their agent be greater than thirty dollars ($30) per applicant. The thirty dollar ($30) application screening fee may be adjusted annually by the landlord or their agent commensurate with an increase in the Consumer Price Index, beginning on January 1, 1998.
- **Confidence**: 0.9 (statute) / 0.6 (2026 dollar figure)
- **Notes / open questions / conflicts**: FLAG — the statute publishes no adjusted amount and no state agency publishes one; the $65.86 (2026) figure is an industry calculation (California Apartment Association) repeated by property-management sources; the $30 base and CPI mechanism are the only authoritative facts. README caveat confirmed: no single official 2026 figure. Record as "≈$65.86 (industry, unofficial)".

### CA-STATE-APPLICATION_SCREENING_FEES-2
- **Rule ID**: CA-STATE-APPLICATION_SCREENING_FEES-2
- **Jurisdiction**: CA · **Level**: state · **Category**: application_screening_fees
- **Status** (2026-10-01): in_force
- **Title**: No screening fee when no unit is available or will be within a reasonable period
- **Requirement**: A landlord/agent may not charge a screening fee when it knows or should know that no rental unit is available at the time or will be available within a reasonable period.
- **Key value**: Zero fee if no unit available
- **Coverage conditions**: All residential rental applications.
- **Exemptions**: None.
- **Effective date**: Long-standing (pre-2025); renumbered (c)(1) by AB 2493 effective 2025-01-01.
- **Penalty / remedy**: Fee unlawfully collected; refund/UCL exposure (research).
- **Interaction with local law**: N/A.
- **Citation**: Cal. Civ. Code §1950.6(c)(1)
- **Source doc id**: D026 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.6
- **Quoted span**:
  > A landlord or their agent shall not charge an applicant an application screening fee when they know or should have known that no rental unit is available at that time or will be available within a reasonable period of time.
- **Confidence**: 0.97
- **Notes**: None.

### CA-STATE-APPLICATION_SCREENING_FEES-3
- **Rule ID**: CA-STATE-APPLICATION_SCREENING_FEES-3
- **Jurisdiction**: CA · **Level**: state · **Category**: application_screening_fees
- **Status** (2026-10-01): in_force
- **Title**: Fee may be charged only under one of two processes — first-come/first-qualified with written criteria, or full refund to all non-selected applicants (AB 2493)
- **Requirement**: At the time of collecting a fee the landlord must offer either (A) a process where completed applications are considered in order received against written screening criteria provided with the application form, the first qualifying applicant is approved, and no applicant is charged until actually considered (inadvertent concurrent-collection cured by refund or credit within 7 days); or (B) a process refunding the entire fee to every applicant not selected, for any reason, within 7 days of selecting a tenant or 30 days of application, whichever is first.
- **Key value**: Option A: written criteria + order-of-receipt + first-qualified approved; Option B: full refund within 7 days of selection / 30 days of application
- **Coverage conditions**: All residential rental applications where any fee is charged; applies to all landlords regardless of size.
- **Exemptions**: Under Option A, no refund owed to an applicant denied after consideration for failing criteria.
- **Effective date**: 2025-01-01 (AB 2493, Stats. 2024, ch. 966, approved 2024-09-29).
- **Penalty / remedy**: Fee not lawfully collected if neither process is offered (refund exposure; UCL — research).
- **Interaction with local law**: Stricter local rules apply.
- **Citation**: Cal. Civ. Code §1950.6(c)(2)
- **Source doc id**: D026 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.6
- **Quoted span**:
  > An application screening process in which the landlord or their agent returns the entire screening fee to any applicant who is not selected for tenancy, regardless of the reason, within 7 days of selecting an applicant for tenancy or 30 days of when the application was submitted, whichever occurs first.
- **Confidence**: 0.96
- **Notes**: This is also the only state-level "timing" rule on screening order (see SCREENING_RESTRICTIONS-7).

### CA-STATE-APPLICATION_SCREENING_FEES-4
- **Rule ID**: CA-STATE-APPLICATION_SCREENING_FEES-4
- **Jurisdiction**: CA · **Level**: state · **Category**: application_screening_fees
- **Status** (2026-10-01): in_force
- **Title**: Itemized receipt for the screening fee
- **Requirement**: The landlord/agent must give the applicant (personally, by mail, or by agreed email) a receipt itemizing out-of-pocket expenses and time spent to obtain and process the applicant's information.
- **Key value**: Itemized receipt required
- **Coverage conditions**: Any application for which a fee is paid.
- **Exemptions**: None.
- **Effective date**: Long-standing; email option added 2025-01-01.
- **Penalty / remedy**: None express; supports refund claims.
- **Interaction with local law**: N/A.
- **Citation**: Cal. Civ. Code §1950.6(d)
- **Source doc id**: D026 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.6
- **Quoted span**:
  > The landlord or their agent shall provide, personally, or by mail, the applicant with a receipt for the fee paid by the applicant, which receipt shall itemize the out-of-pocket expenses and time spent by the landlord or their agent to obtain and process the information about the applicant.
- **Confidence**: 0.97
- **Notes**: None.

### CA-STATE-APPLICATION_SCREENING_FEES-5
- **Rule ID**: CA-STATE-APPLICATION_SCREENING_FEES-5
- **Jurisdiction**: CA · **Level**: state · **Category**: application_screening_fees
- **Status** (2026-10-01): in_force
- **Title**: Refund of unused portion if no reference check or credit report is obtained
- **Requirement**: If the landlord/agent does not perform a personal reference check or does not obtain a consumer credit report, any portion of the fee not used for authorized purposes must be returned to the applicant.
- **Key value**: Refund unused fee
- **Coverage conditions**: Any paid application.
- **Exemptions**: None.
- **Effective date**: Long-standing.
- **Penalty / remedy**: Refund obligation.
- **Interaction with local law**: N/A.
- **Citation**: Cal. Civ. Code §1950.6(e)
- **Source doc id**: D026 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.6
- **Quoted span**:
  > the landlord or their agent shall return any amount of the screening fee that is not used for the purposes authorized by this section to the applicant.
- **Confidence**: 0.96
- **Notes**: None.

### CA-STATE-APPLICATION_SCREENING_FEES-6
- **Rule ID**: CA-STATE-APPLICATION_SCREENING_FEES-6
- **Jurisdiction**: CA · **Level**: state · **Category**: application_screening_fees
- **Status** (2026-10-01): in_force
- **Title**: Copy of consumer credit report to applicant within 7 days (automatic, no request needed)
- **Requirement**: If a screening fee was paid, the landlord/agent must provide the applicant a copy of their consumer credit report by personal delivery, mail, or email within seven days of receiving it.
- **Key value**: 7 days
- **Coverage conditions**: Any paid application where a credit report is pulled.
- **Exemptions**: None.
- **Effective date**: Pre-2025 version required a copy "if requested"; AB 2493 (2025-01-01) made delivery automatic within 7 days.
- **Penalty / remedy**: None express; FCRA/ICRAA remedies may apply (research).
- **Interaction with local law**: N/A.
- **Citation**: Cal. Civ. Code §1950.6(f)
- **Source doc id**: D026 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.6
- **Quoted span**:
  > If an application screening fee has been paid by the applicant, the landlord or their agent shall provide a copy of the consumer credit report to the applicant who is the subject of that report by personal delivery, mail, or email within seven days of the landlord or their agent receiving the report.
- **Confidence**: 0.96
- **Notes**: None.

### CA-STATE-APPLICATION_SCREENING_FEES-7
- **Rule ID**: CA-STATE-APPLICATION_SCREENING_FEES-7
- **Jurisdiction**: CA · **Level**: state · **Category**: application_screening_fees
- **Status** (2026-10-01): in_force
- **Title**: Reusable tenant screening reports (Civ. Code §1950.1) — landlord may accept; if accepted, no fee may be charged
- **Requirement**: Nothing in §1950.6 prevents a landlord from accepting a reusable screening report under §1950.1 (AB 2559, 2022). Under §1950.1 a landlord that elects to accept reusable reports may not charge the applicant a screening fee or a fee to access the report (research — §1950.1 not in corpus). Acceptance is optional for landlords.
- **Key value**: Optional acceptance; $0 fee when accepted
- **Coverage conditions**: Landlords electing to accept reusable reports.
- **Exemptions**: Landlords may decline to accept reusable reports.
- **Effective date**: 2023-01-01 (AB 2559 — research).
- **Penalty / remedy**: None express.
- **Interaction with local law**: N/A.
- **Citation**: Cal. Civ. Code §1950.6(g); Cal. Civ. Code §1950.1
- **Source doc id**: D026 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.6
- **Quoted span**:
  > Nothing in this section prevents a landlord from accepting a reusable screening report pursuant to Section 1950.1.
- **Confidence**: 0.85
- **Notes**: §1950.1 details are from research only.

---

## CATEGORY 5 — screening_restrictions (criminal history, source of income, timing)

### CA-STATE-SCREENING_RESTRICTIONS-1
- **Rule ID**: CA-STATE-SCREENING_RESTRICTIONS-1
- **Jurisdiction**: CA · **Level**: state · **Category**: screening_restrictions
- **Status** (2026-10-01): in_force
- **Title**: Source-of-income discrimination prohibited — Section 8 / HUD-VASH and other housing subsidies are protected income (SB 329 / SB 222)
- **Requirement**: Housing providers may not discriminate against or harass any person because of source of income, which includes lawful verifiable income paid to the tenant, to a representative, or to the landlord on behalf of the tenant — expressly including Section 8 Housing Choice Vouchers and HUD-VASH vouchers. Voucher holders must be screened under the same criteria as other applicants; refusing to complete program paperwork/inspections is discrimination. Inquiry about the level or source of income is permitted.
- **Key value**: "No Section 8" policies unlawful; vouchers = protected income
- **Coverage conditions**: Applies to owners of any "housing accommodation" statewide, plus agents, property managers, tenant screening companies, brokers, lenders, HOAs, housing authorities (per CRD). Covers SFRs, condos, apartments, mobilehomes, short-term rentals, etc.
- **Exemptions**: FEHA owner-occupant exemption — owner occupying the home and renting to one additional person may exclude on protected characteristics (Gov. Code §12927(c)(2)(A); CRD D016) but still cannot publish discriminatory statements; shared-living single-sex preference; senior housing age limits. Landlord is not a "representative of the tenant" (so payments to landlord are not SOI) EXCEPT for HUD-VASH — but subsidies "paid to a housing owner or landlord on behalf of a tenant" are expressly included by SB 329.
- **Effective date**: SB 329 (Stats. 2019, ch. 600) and SB 222 (Stats. 2019, ch. 601) effective 2020-01-01. Current text amended by SB 267 effective 2024-01-01.
- **Penalty / remedy**: FEHA remedies: out-of-pocket losses, emotional distress damages, civil penalties/punitive damages, injunction, attorney's fees (CRD). Administrative complaint to CRD within 1 year; civil suit within 2 years (tolled during CRD processing).
- **Interaction with local law**: Floor — local SOI ordinances (pre-existing in many CA cities) may add protections; stricter local applies.
- **Citation**: Cal. Gov. Code §12955(a), (p)(1)–(2); §12927(c)
- **Source doc id**: D027 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12955 (also D021 Justia mirror 403; D015 CAA article confirms SB 329 effective 2020-01-01; D016 CRD page)
- **Quoted span**:
  > “source of income” means lawful, verifiable income paid directly to a tenant, or to a representative of a tenant, or paid to a housing owner or landlord on behalf of a tenant, including federal, state, or local public assistance, and federal, state, or local housing subsidies, including, but not limited to, federal housing assistance vouchers issued under Section 8 of the United States Housing Act of 1937 (42 U.S.C. Sec. 1437f).
- **Confidence**: 0.97
- **Notes**: SB 329 does not literally "mandate acceptance" of vouchers but makes refusing on that basis unlawful; practical effect is mandatory participation when the applicant otherwise qualifies.

### CA-STATE-SCREENING_RESTRICTIONS-2
- **Rule ID**: CA-STATE-SCREENING_RESTRICTIONS-2
- **Jurisdiction**: CA · **Level**: state · **Category**: screening_restrictions
- **Status** (2026-10-01): in_force
- **Title**: Income-to-rent standards for subsidy holders must be based on the tenant's portion of rent
- **Requirement**: Where there is a government rent subsidy, a housing provider may not apply a financial or income standard (e.g., 2.5x or 3x rent) that is not based on the portion of rent the tenant actually pays.
- **Key value**: Income ratio applied to tenant share only
- **Coverage conditions**: Any applicant with a government rent subsidy.
- **Exemptions**: Owner may still verify employment, request landlord references, verify identity (§12955(o)(2)).
- **Effective date**: 2020-01-01 (SB 329).
- **Penalty / remedy**: FEHA remedies.
- **Interaction with local law**: Floor.
- **Citation**: Cal. Gov. Code §12955(o)(1)(A)
- **Source doc id**: D027 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12955
- **Quoted span**:
  > Use a financial or income standard in assessing eligibility for the rental of housing that is not based on the portion of the rent to be paid by the tenant.
- **Confidence**: 0.97
- **Notes**: None.

### CA-STATE-SCREENING_RESTRICTIONS-3
- **Rule ID**: CA-STATE-SCREENING_RESTRICTIONS-3
- **Jurisdiction**: CA · **Level**: state · **Category**: screening_restrictions
- **Status** (2026-10-01): in_force
- **Title**: Credit history of subsidy holders — must offer alternative evidence of ability to pay (SB 267)
- **Requirement**: Where there is a government rent subsidy, a provider may not use credit history in the application process without offering the applicant the option to provide lawful, verifiable alternative evidence of ability to pay their rent portion (benefit statements, pay records, bank statements); if offered, the provider must give reasonable time and reasonably consider it in lieu of credit history.
- **Key value**: Alternative-evidence option mandatory before using credit history
- **Coverage conditions**: Applicants with a government rent subsidy.
- **Exemptions**: §12955(o)(2) verification of employment/identity/references still allowed.
- **Effective date**: 2024-01-01 (SB 267, Stats. 2023, ch. 776).
- **Penalty / remedy**: FEHA remedies.
- **Interaction with local law**: Floor.
- **Citation**: Cal. Gov. Code §12955(o)(1)(B)
- **Source doc id**: D027 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12955 (D015 CAA article also summarizes)
- **Quoted span**:
  > Use a person’s credit history as part of the application process for a rental accommodation without offering the applicant the option, at the applicant’s discretion, of providing lawful, verifiable alternative evidence of the applicant’s reasonable ability to pay
- **Confidence**: 0.97
- **Notes**: None.

### CA-STATE-SCREENING_RESTRICTIONS-4
- **Rule ID**: CA-STATE-SCREENING_RESTRICTIONS-4
- **Jurisdiction**: CA · **Level**: state · **Category**: screening_restrictions
- **Status** (2026-10-01): in_force
- **Title**: Household aggregate-income rule — unmarried co-applicants' incomes must be combined like married couples'
- **Requirement**: A provider may not use an income standard that fails to count the aggregate income of persons residing or proposing to reside together on the same basis as married persons.
- **Key value**: Aggregate household income
- **Coverage conditions**: All rental applications.
- **Exemptions**: None.
- **Effective date**: Long-standing (pre-2020).
- **Penalty / remedy**: FEHA remedies.
- **Interaction with local law**: Floor.
- **Citation**: Cal. Gov. Code §12955(n)
- **Source doc id**: D027 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12955
- **Quoted span**:
  > To use a financial or income standard in the rental of housing that fails to account for the aggregate income of persons residing together or proposing to reside together on the same basis as the aggregate income
- **Confidence**: 0.95
- **Notes**: None.

### CA-STATE-SCREENING_RESTRICTIONS-5
- **Rule ID**: CA-STATE-SCREENING_RESTRICTIONS-5
- **Jurisdiction**: CA · **Level**: state · **Category**: screening_restrictions
- **Status** (2026-10-01): in_force
- **Title**: Criminal-history screening limits — FEHA regulations (2 CCR §§12264–12271); no statewide Fair Chance Housing statute
- **Requirement**: Criminal history is not itself a protected class, but under the Civil Rights Council regulations (effective 2020-01-01) a provider: may not have blanket bans on applicants with criminal records; may not seek, consider, or act on arrests not resulting in conviction, law-enforcement contacts, diversion/deferred-entry participation, infractions, sealed/expunged/dismissed/pardoned convictions, or juvenile adjudications; may deny only for a "directly-related conviction" (direct and specific negative bearing on a substantial, legitimate, nondiscriminatory interest such as resident safety) considering nature/severity and time elapsed; and must consider whether a less discriminatory alternative exists. Practices with disparate impact on protected classes are unlawful absent legally sufficient justification (§12266). Compliance with federal/state laws requiring consideration (e.g., lifetime sex-offender registration, meth manufacture in federally assisted housing) is an affirmative defense (§12270). Local ordinances providing additional, more-protective limits are not displaced (§12271).
- **Key value**: No blanket bans; no arrests-only; directly-related conviction test; 7-year reporting ceiling (Civ. Code §1785.13) with courts able to consider shorter look-backs
- **Coverage conditions**: All housing providers covered by FEHA (statewide, all property types).
- **Exemptions**: FEHA owner-occupant/shared-living exemptions; conduct required by specific federal/state law (§12270 affirmative defense).
- **Effective date**: 2020-01-01 (2 CCR Art. 24, filed 2019-09-16, Register 2019 No. 38). No sunset.
- **Penalty / remedy**: FEHA remedies (CRD complaint within 1 year; civil suit within 2 years).
- **Interaction with local law**: Expressly does not exempt compliance with more-protective local fair-chance ordinances (e.g., Oakland, Berkeley, San Francisco, Richmond, Los Angeles' Fair Chance for Renters — local layer). State sets the floor.
- **Citation**: Cal. Code Regs. tit. 2, §§12264–12271 (esp. §12266, §12269, §12270, §12271); Cal. Gov. Code §12955(a), (k); §12955.8
- **Source doc id**: D016 · **Source URL**: https://calcivilrights.ca.gov/housing/ (regulation text confirmed at https://www.law.cornell.edu/regulations/california/2-CCR-12269 — research; D015 CAA article confirms 2020-01-01 effective date)
- **Quoted span**:
  > If a housing provider intends to deny someone’s application based on a criminal conviction, it must be directly-related to someone’s ability to be a good tenant and to not be a threat to the health and safety of others and the property.
- **Confidence**: 0.93
- **Notes / open questions**: CONFIRMED: California has NO statewide fair-chance housing statute (no ban-the-box timing rule, no mandatory conditional-offer-first sequence, no mandatory individualized-assessment notice procedure at state level); the regulations "encourage" but do not require written-policy notice and an opportunity to present mitigating information. The regulations are not in the corpus; D016 (CRD page) is the corpus anchor. Zillow/Findigs summaries claiming a hard "7-year" state limit overstate — the 7 years is the ICRAA reporting limit (Civ. Code §1785.13(a)(6)), not a FEHA rule.

### CA-STATE-SCREENING_RESTRICTIONS-6
- **Rule ID**: CA-STATE-SCREENING_RESTRICTIONS-6
- **Jurisdiction**: CA · **Level**: state · **Category**: screening_restrictions
- **Status** (2026-10-01): in_force
- **Title**: Discriminatory advertisements and statements prohibited (incl. "No Section 8", "no criminal history")
- **Requirement**: No person may make, print, or publish any notice, statement, or advertisement about a rental that indicates a preference, limitation, or discrimination based on a protected characteristic including source of income. Applies even to housing providers otherwise exempt from FEHA (owner-occupants).
- **Key value**: Ads/statements prohibited regardless of exemption
- **Coverage conditions**: Any person (owners, agents, listing platforms).
- **Exemptions**: None (owner-occupant exemption does not extend to advertising).
- **Effective date**: Long-standing; SOI added to subdivision (c) via SB 329 (2020-01-01).
- **Penalty / remedy**: FEHA remedies.
- **Interaction with local law**: Floor.
- **Citation**: Cal. Gov. Code §12955(c)
- **Source doc id**: D027 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12955
- **Quoted span**:
  > For any person to make, print, or publish, or cause to be made, printed, or published any notice, statement, or advertisement, with respect to the sale or rental of a housing accommodation that indicates any preference, limitation, or discrimination based on
- **Confidence**: 0.96
- **Notes**: D016 confirms: "Advertising a preference or limitation based on a tenant's source of income, such as including in an a 'No Section 8.'" is an example of SOI discrimination.

### CA-STATE-SCREENING_RESTRICTIONS-7
- **Rule ID**: CA-STATE-SCREENING_RESTRICTIONS-7
- **Jurisdiction**: CA · **Level**: state · **Category**: screening_restrictions
- **Status** (2026-10-01): in_force (partial) / no rule (timing of background checks)
- **Title**: Screening TIMING — no statewide sequencing rule for background checks; only order-of-receipt rule tied to fee collection
- **Requirement**: California has no state statute dictating WHEN in the application process a landlord may run a criminal or credit check (no conditional-offer-first requirement). The only state timing rules are: (i) under §1950.6(c)(2)(A), if a fee is charged, completed applications must be considered in order received and fees may not be charged until the application is actually considered; (ii) §1950.6(f) credit report copy within 7 days; (iii) §12955(o)(1)(B) — alternative-evidence offer must precede reliance on credit history for subsidy holders, with "reasonable time" to respond.
- **Key value**: No state ban-the-box timing; order-of-receipt consideration when fee charged
- **Coverage conditions**: Statewide; (i)–(ii) only where a screening fee is charged.
- **Exemptions**: N/A.
- **Effective date**: 2025-01-01 for (i) (AB 2493).
- **Penalty / remedy**: As in APPLICATION_SCREENING_FEES-3/-6; FEHA for (iii).
- **Interaction with local law**: Local fair-chance ordinances (e.g., Oakland, Berkeley, Richmond, Alameda County, San Francisco, Los Angeles) impose sequencing/individualized-assessment rules — local layer governs where applicable.
- **Citation**: Cal. Civ. Code §1950.6(c)(2)(A)(i)–(iii); Cal. Gov. Code §12955(o)(1)(B)(ii)
- **Source doc id**: D026 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.6
- **Quoted span**:
  > Completed applications are considered, as provided for in the landlord’s established screening criteria, in the order in which the completed applications were received. The landlord’s screening criteria shall be provided to the applicant in writing together with the application form.
- **Confidence**: 0.9
- **Notes**: Explicit "no rule at state level" for background-check timing; recorded so the category's "timing" sub-element is not silently missed.

### CA-STATE-SCREENING_RESTRICTIONS-8
- **Rule ID**: CA-STATE-SCREENING_RESTRICTIONS-8
- **Jurisdiction**: CA · **Level**: state · **Category**: screening_restrictions
- **Status** (2026-10-01): in_force
- **Title**: FEHA protected characteristics and prohibited inquiries in tenant screening
- **Requirement**: Owners may not discriminate, harass, or make written/oral inquiries concerning race, color, religion, sex, gender, gender identity/expression, sexual orientation, marital status, national origin, ancestry, familial status, disability, veteran/military status, or genetic information (plus, via Unruh §12955(d): citizenship, immigration status, primary language, age); perceived and associational characteristics covered. Screening companies and property managers are covered. Inquiry about source/level of income IS permitted.
- **Key value**: 15+ protected classes; inquiry ban (except income)
- **Coverage conditions**: All housing accommodations statewide.
- **Exemptions**: Owner-occupant renting to one person; shared-living sex preference; senior housing (55+/62+); age preferences under federally approved programs.
- **Effective date**: Long-standing; veteran/military status added 2020-01-01 (SB 222); current text 2024-01-01 (SB 267).
- **Penalty / remedy**: FEHA remedies; retaliation prohibited (§12955(f)).
- **Interaction with local law**: Floor.
- **Citation**: Cal. Gov. Code §12955(a), (b), (d), (m)
- **Source doc id**: D027 · **Source URL**: https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=12955
- **Quoted span**:
  > For the owner of any housing accommodation to discriminate against or harass any person because of the race, color, religion, sex, gender, gender identity, gender expression, sexual orientation, marital status, national origin, ancestry, familial status, source of income, disability, veteran or military status, or genetic information of that person.
- **Confidence**: 0.96
- **Notes**: D016 adds that service/emotional-support animals cannot be charged pet deposits/rent and that higher deposits for families with children or Section 8 applicants are discriminatory — relevant cross-over to deposits.

---

## CATEGORY 6 — algorithmic_rent_setting

### CA-STATE-ALGORITHMIC_RENT_SETTING-1
- **Rule ID**: CA-STATE-ALGORITHMIC_RENT_SETTING-1
- **Jurisdiction**: CA · **Level**: state · **Category**: algorithmic_rent_setting
- **Status** (2026-10-01): in_force
- **Title**: Cartwright Act — unlawful to use or distribute a "common pricing algorithm" as part of a price-fixing contract, combination, or conspiracy (AB 325, B&P §16729(a))
- **Requirement**: It is unlawful for any person (incl. landlords and software vendors like revenue-management providers) to use or distribute a common pricing algorithm — any methodology/software used by two or more persons that uses competitor data to recommend, align, stabilize, set, or otherwise influence a price or commercial term — as part of a contract, combination, or conspiracy to restrain trade. "Price" includes rent; "commercial term" includes availability/level of service/output (e.g., occupancy levels). Per se illegal; no proof of anticompetitive effect required.
- **Key value**: Shared algorithm + competitor data + agreement = per se Cartwright Act violation
- **Coverage conditions**: Any person doing business in California (landlords, property managers, software vendors); applies to rental housing pricing/occupancy recommendations using competitor (nonpublic or public) data shared across two or more users. Not limited by property type, year built, or unit count.
- **Exemptions**: Proprietary algorithms using only the business's own data (not "common"); end consumers excluded from "person"; nothing in §16729 impairs other antitrust laws. No express exemption for public-data-only algorithms (open question).
- **Effective date**: 2026-01-01 (AB 325, Stats. 2025, ch. 338, approved and filed 2025-10-06).
- **Penalty / remedy**: Cartwright Act remedies: private treble damages, injunction, attorney's fees (B&P §16750); criminal penalties and new civil penalties increased by SB 763 (see ALGORITHMIC_RENT_SETTING-4).
- **Interaction with local law**: Does not preempt local ordinances; stricter local bans exist (San Francisco Police Code Art. 59, 2024, bans sale/use of algorithms combining nonpublic competitor data; San Diego ordinance effective 2025-06-12; Berkeley ordinance adopted 2025-03 but enforcement deferred to 2026-03 after RealPage lawsuit). Local layer must be checked.
- **Citation**: Cal. Bus. & Prof. Code §16729(a), (d) (added by AB 325, Stats. 2025, ch. 338)
- **Source doc id**: D022 · **Source URL**: https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB325 (D028 Cleary Gottlieb memo 2026-01-06 confirms in force 2026-01-01)
- **Quoted span**:
  > It shall be unlawful for a person to use or distribute a common pricing algorithm as part of a contract, combination in the form of a trust, or conspiracy to restrain trade or commerce in violation of this chapter.
- **Confidence**: 0.95
- **Notes / open questions**: AB 325 does NOT ban algorithmic rent-setting per se — it targets shared algorithms used collusively or coercively. The earlier 2024 state bill (SB 1154, Hurtado) that would have banned nonpublic-competitor-data algorithms outright failed. Pending litigation signal: a federal court enjoined New York's broader algorithmic-rent ban on First Amendment grounds (2026) — relevance to §16729 untested.

### CA-STATE-ALGORITHMIC_RENT_SETTING-2
- **Rule ID**: CA-STATE-ALGORITHMIC_RENT_SETTING-2
- **Jurisdiction**: CA · **Level**: state · **Category**: algorithmic_rent_setting
- **Status** (2026-10-01): in_force
- **Title**: Coercion prohibition — unlawful to use/distribute a common pricing algorithm while coercing another to adopt its recommended price or term (B&P §16729(b))
- **Requirement**: Independently of any conspiracy, it is unlawful to use or distribute a common pricing algorithm if the person coerces another person to set or adopt a recommended price or commercial term for the same or similar products/services in California (e.g., a vendor penalizing landlords who decline recommended rents, or mandatory-acceptance features).
- **Key value**: Coercion to adopt algorithmic recommendations unlawful (no agreement needed)
- **Coverage conditions**: Any person in California; aimed at vendors and multi-property operators.
- **Exemptions**: Same as -1 (proprietary own-data tools; end consumers).
- **Effective date**: 2026-01-01.
- **Penalty / remedy**: Cartwright Act remedies; SB 763 penalties.
- **Interaction with local law**: Local bans may be stricter.
- **Citation**: Cal. Bus. & Prof. Code §16729(b)
- **Source doc id**: D022 · **Source URL**: https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB325
- **Quoted span**:
  > It shall be unlawful for a person to use or distribute a common pricing algorithm if the person coerces another person to set or adopt a recommended price or commercial term recommended by the common pricing algorithm for the same or similar products or services in the jurisdiction of this state.
- **Confidence**: 0.95
- **Notes**: "Coerces" is undefined; Senate Judiciary analysis describes it as imposing negative consequences for failing to accept the recommendation (D028/research). Open for courts.

### CA-STATE-ALGORITHMIC_RENT_SETTING-3
- **Rule ID**: CA-STATE-ALGORITHMIC_RENT_SETTING-3
- **Jurisdiction**: CA · **Level**: state · **Category**: algorithmic_rent_setting
- **Status** (2026-10-01): in_force
- **Title**: Relaxed pleading standard for Cartwright Act claims (B&P §16756.1) — plausibility only; no need to exclude independent action
- **Requirement**: A Cartwright Act complaint (including algorithmic rent-fixing suits against landlords/vendors) need only plausibly allege a contract, combination, or conspiracy; it need not plead facts excluding the possibility of independent action (rejecting federal "plus factor" pleading).
- **Key value**: Plausibility pleading; no "plus factors" required
- **Coverage conditions**: All Cartwright Act litigation in California courts.
- **Exemptions**: N/A.
- **Effective date**: 2026-01-01.
- **Penalty / remedy**: Procedural — increases litigation exposure.
- **Interaction with local law**: N/A.
- **Citation**: Cal. Bus. & Prof. Code §16756.1
- **Source doc id**: D022 · **Source URL**: https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB325
- **Quoted span**:
  > it is sufficient to contain factual allegations demonstrating that the existence of a contract, combination in the form of a trust, or conspiracy to restrain trade or commerce is plausible, and the complaint shall not be required to allege facts tending to exclude the possibility of independent action.
- **Confidence**: 0.95
- **Notes**: None.

### CA-STATE-ALGORITHMIC_RENT_SETTING-4
- **Rule ID**: CA-STATE-ALGORITHMIC_RENT_SETTING-4
- **Jurisdiction**: CA · **Level**: state · **Category**: algorithmic_rent_setting
- **Status** (2026-10-01): in_force
- **Title**: Increased Cartwright Act penalties (SB 763) — criminal fines up to $6M (corporations) / $1M (individuals); new civil penalty up to $1M per violation
- **Requirement**: Violations of the Cartwright Act (including §16729 algorithmic violations) are crimes; SB 763 raised the maximum corporate criminal fine from $1M to $6M (or twice gain/loss), individual fine from $250K to $1M (or twice gain/loss), and created a civil penalty of up to $1M per violation in actions by the Attorney General or district attorneys, cumulative with other remedies (including UCL $2,500/violation penalties).
- **Key value**: $6M corp / $1M individual criminal; up to $1M civil per violation
- **Coverage conditions**: Any person violating the Cartwright Act in California.
- **Exemptions**: N/A.
- **Effective date**: 2026-01-01 (SB 763, "Conspiracy Against Trade: Punishment", signed October 2025 — research/D028).
- **Penalty / remedy**: As stated; private treble damages/injunction/fees unchanged.
- **Interaction with local law**: Cumulative with local ordinance penalties (e.g., Berkeley $1,000/violation).
- **Citation**: Cal. Bus. & Prof. Code §§16755, 16755.1, 16762 (as amended/added by SB 763, 2025)
- **Source doc id**: D022 (criminal nature of Cartwright violations) + D028 (penalty figures) · **Source URL**: https://www.clearygottlieb.com/news-and-insights/publication-listing/californias-antitrust-law-amendments-kick-in-targeting-algorithmic-pricing
- **Quoted span**:
  > Because the bill would expand the scope of activities prohibited by the Cartwright Act, the violation of which is punishable as a crime, the bill would impose a state-mandated local program.
- **Confidence**: 0.85
- **Notes / open questions**: SB 763 text is not in corpus; figures from Cleary Gottlieb (D028) and multiple law-firm alerts (Alston, WilmerHale, Paul Weiss). Prison terms not changed per sources.

### Algorithmic rent setting — explicit "no state rule" item
- **Outright ban on algorithmic/revenue-management rent software**: NONE at California state level. AB 325 restricts collusive/coercive use of *common* pricing algorithms; a landlord's unilateral use of proprietary, own-data pricing tools is lawful under state law. Outright/nonpublic-data bans exist only locally (San Francisco 2024; San Diego 2025; Berkeley adopted-but-deferred). → State level: **no per-se ban**; address lookup must consult city layer.

---

## Cross-cutting status summary (as of 2026-10-01)

| Category | State rules | Status | Sunset |
|---|---|---|---|
| rent_increase_limits | 7 (§1947.12 + §827 via (e)) | in_force | 2030-01-01 |
| just_cause_eviction | 10 (§1946.2) | in_force | 2030-01-01 |
| security_deposits | 11 (§1950.5) + 2 explicit no-rule notes | in_force | none |
| application_screening_fees | 7 (§1950.6; §1950.1) | in_force | none |
| screening_restrictions | 8 (Gov. §12955; 2 CCR 12264-71) incl. explicit no-timing-rule | in_force | none |
| algorithmic_rent_setting | 4 (B&P §16729, §16756.1, SB 763 penalties) + explicit no-per-se-ban note | in_force since 2026-01-01 | none |

Pending/failed items noted: SB 522 (2025, TPA disaster-rebuild) — stalled (two-year bill, not enacted); SB 1154 (2024, algorithm ban) — failed.

---

## Address-lookup facts needed

For each rule family, the building/owner facts that determine coverage, and the result when the fact is missing.

| Fact | Rules depending on it | Why | If missing |
|---|---|---|---|
| **Certificate-of-occupancy date / year built** (rolling 15-year test: CO issued within 15 years of today → exempt) | RENT_INCREASE_LIMITS-1..7; JUST_CAUSE_EVICTION-1..10 | §1947.12(d)(4), §1946.2(e)(7) exempt new construction | → "unknown" (cannot determine TPA coverage); flag that CO date (not permit date) controls and that the exemption expires as the building ages |
| **Property type: separately alienable (SFR / condo / townhome / mobilehome) vs. multifamily** | RENT_INCREASE_LIMITS-1, -5; JUST_CAUSE_EVICTION-1, -8 | Separately alienable units can be exempt (§1947.12(d)(5), §1946.2(e)(8)) | → "unknown" |
| **Owner entity type: natural person / family trust / LLC (all natural members?) / LLC with corporate member / corporation / REIT / mobilehome park management** | RENT_INCREASE_LIMITS-1, -5; JUST_CAUSE_EVICTION-1, -3, -8; SECURITY_DEPOSITS-1, -2 | SFR exemption requires non-corporate owner; owner move-in requires natural person ≥25%; small-landlord deposit exception requires natural person/all-natural LLC | → "unknown"; if property type is SFR/condo but owner type unknown, TPA coverage = "unknown" |
| **Whether the statutory exemption notice was given / included in lease (and tenancy start/renewal date vs. 2020-07-01)** | RENT_INCREASE_LIMITS-5; JUST_CAUSE_EVICTION-8 | Exemption fails without notice | → "unknown" (treat as possibly covered; recommend verifying lease) |
| **Owner-occupancy status** (owner lives on site; number of units/bedrooms rented; shared kitchen/bath; duplex) | JUST_CAUSE_EVICTION-1 (exemptions 4–6); RENT_INCREASE_LIMITS-1 (exemption 6); SCREENING_RESTRICTIONS-1, -5, -8 (FEHA owner-occupant exemption) | Owner-occupied SFR renting ≤2 rooms/units, owner-occupied duplex, shared facilities are exempt | → "unknown" |
| **Unit count on parcel (1, 2, 3+)** | JUST_CAUSE_EVICTION-1 (duplex exemption); RENT_INCREASE_LIMITS-1 | Duplex exemption needs exactly two units in one structure, neither an ADU/JADU | → "unknown" |
| **ADU / JADU presence** | JUST_CAUSE_EVICTION-1; RENT_INCREASE_LIMITS-1 | Duplex exemption excluded if either unit is ADU/JADU; owner-occupied SFR exemption counts ADU/JADU as rented units | → "unknown" |
| **Owner's total portfolio: number of residential rental properties (≤2) and total units offered for rent (≤4)** | SECURITY_DEPOSITS-1, -2 | Small-landlord two-month deposit exception | → "unknown" → default to one-month cap display with note |
| **Deed restriction / regulatory agreement / subsidy status (affordable housing, LIHTC, Section 8 project-based)** | RENT_INCREASE_LIMITS-1; JUST_CAUSE_EVICTION-1; APPLICATION_SCREENING_FEES-1 (§1950.6(l)) | Deed-restricted affordable housing exempt from TPA; program rules may override fee rules | → "unknown" |
| **Facility type** (hotel/transient, dormitory, RCFE, hospital, religious facility, mobilehome park) | JUST_CAUSE_EVICTION-1; RENT_INCREASE_LIMITS-1 | Listed categorical exemptions | → assume ordinary residential unless flagged; "unknown" if ambiguous |
| **Is the unit a mobilehome (and owner vs. renter of the mobilehome)?** | RENT_INCREASE_LIMITS-1; JUST_CAUSE_EVICTION-1 | Different dates (2021-02-18 / 2022-07-01), 15-year exemption inapplicable, homeowner-of-mobilehome excluded | → "unknown" |
| **County (→ CPI region)** | RENT_INCREASE_LIMITS-4 | Determines which CPI-U index sets the cap | → cannot compute numeric cap; show formula only |
| **City / county local ordinance status**: local rent control (and whether its cap is lower than state), local just-cause ordinance (adoption date vs. 2019-09-01; "more protective" finding), local deposit-interest rule, local screening-fee cap, local fair-chance ordinance, local algorithmic-pricing ban | All categories (interaction fields) | State law yields to or coexists with local rules | → report state rule with "local overlay unknown" |
| **Tenancy facts** (tenancy start date; months of continuous occupancy; whether adults added; lease commenced/renewed on/after 2020-07-01; security collected before/after 2024-07-01; tenancy began on/after 2025-07-01) | JUST_CAUSE_EVICTION-1, -3, -7, -8; SECURITY_DEPOSITS-1, -6, -7; RENT_INCREASE_LIMITS-5 | Phase-in dates and 12/24-month triggers | → "unknown" (rule applies prospectively; coverage of a specific tenancy undetermined) |
| **Tenant status: service member; government rent subsidy holder** | SECURITY_DEPOSITS-1, -2, -11; SCREENING_RESTRICTIONS-2, -3 | Service member always one-month cap; subsidy holders get income-standard and credit-history protections | → "unknown"; display general rule |
| **Payment method (electronic rent/deposit receipt)** | SECURITY_DEPOSITS-7 | Electronic refund mandate | → "unknown" |
| **Whether a screening fee is charged; which §1950.6(c)(2) process used; whether reusable report accepted** | APPLICATION_SCREENING_FEES-1..7; SCREENING_RESTRICTIONS-7 | Fee rules trigger only when a fee is charged | → "unknown" |
| **Pricing software in use: shared/multi-user? uses competitor data? vendor imposes consequences for declining recommendations?** | ALGORITHMIC_RENT_SETTING-1, -2 | "Common pricing algorithm" requires ≥2 users + competitor data; coercion test | → "unknown" (state rule applies to conduct, not building; always display as applicable-if-used) |

Default result policy: when a coverage-determinative fact is absent, return **"unknown"** for that rule's applicability rather than "covered" or "exempt", and list the missing fact(s). Rules with no building-dependent conditions (FEHA screening restrictions, §1950.6 fee rules, §827 notice, §1950.5 return/photo/inspection rules, AB 325) should be shown as **applicable statewide** regardless of missing building facts.


---

# PART 2 — MASSACHUSETTS, BOSTON, CAMBRIDGE

# Rental-Housing Rule Extraction — Massachusetts (state), Boston, Cambridge

Query date: **2026-10-01**. Corpus read in full: D010, D011, D012, D013, D014, D029, D031, D045, D046, D047, D048, D049, D050, D051, D052, D053, D057, D058. Link-only docs fetched: D030 (Cambridge Day), D054 (MassLandlords), D055 (massrealestatelawblog), D059 (WBUR). D056 (803 CMR 5.00 PDF) returned HTTP 403 as in the manifest; content confirmed via Cornell LII mirror + WebSearch.

Corpus dir: `C:\Hackathons\Hack-Nation 7th Global AI Hackathon\07 - 7th Hackathon-20261003T231527Z-1-001\07 - 7th Hackathon\03 RealPage - Codebase and Data\participant-final-no-hour16 3\corpus\text\`

**Quoted spans** are copied character-for-character from the corpus text file named in "Source doc id" (string-matchable). Spans marked **NOT IN CORPUS** come from online sources only and must not be string-matched against corpus files. Note: boston.gov / cambridgema.gov captures contain curly apostrophes (’) in some sentences; quotes below preserve them.

---

## 0. Summary matrix (what exists at each level)

| Category | MA (state) | Boston, MA | Cambridge, MA |
|---|---|---|---|
| rent_increase_limits | **NO CAP.** c.40P §4 bans local rent control; IP 25-21 ballot question **failed** (SJC 2026-06-23). Only procedural rule: c.186 §12 notice to change terms; c.186 §18 retaliation presumption. | **NO RULE** (preempted by c.40P). H.3744 home-rule petition **failed** (study order 2024-09-09). | **NO RULE** (preempted by c.40P; Cambridge rent control ended 1 Jan 1995). |
| just_cause_eviction | **NO just-cause statute.** Notice-to-quit rules c.186 §§11, 12, 31; retaliation c.186 §18; summary process c.239. | **No just cause.** HSNA (CBC 10-11) notice-of-rights + city filing, in force 2020-11-06. | **No just cause.** Tenants Rights & Resources Notification Ord. ch. 8.71, in force 2020-10-14. |
| security_deposits | c.186 §15B: max 1 month; separate MA bank acct; 5% interest; statement of condition; 30-day return; treble damages. | **NO local rule**; state governs. | **NO local rule**; state governs. |
| application_screening_fees | c.186 §15B(1)(b): application fees effectively prohibited (only first, last, deposit, lock/key); c.112 §87DDD½ broker fee paid by engaging party (eff. 2025-08-01). | **NO local rule**; state governs. | **NO local rule**; state governs. |
| screening_restrictions | c.151B §4(10) source-of-income/Section 8; §4(6),(7),(11) protected classes + inquiry ban; 803 CMR 5.00 CORI; c.239 §16 eviction-record sealing (eff. 2025-05-05). **No statewide fair-chance (criminal history) housing ban.** | Boston Fair Housing Commission: "Rental Assistance" protected; Fair Chance Tenant Selection Policy (2017) only for DND-funded / IDP units. | Fair Housing Ord. ch. 14.04: source of income + 15 classes; owner-occupied 2-family exemption. |
| algorithmic_rent_setting | **NO law in force.** S.2983 (Senate W&M) and H.5222 (House W&M) **pending** since 2026-03-12. | **NO ordinance.** Hearing order Docket #0251 (2025-01-15) only. | **NO ordinance.** Policy order (June 2026) directing city manager to return options — not law. |

**T4**: if S.2983 or H.5222 were enacted, affected set = ALL MA sample addresses (all 60 Boston rows + all 50 Cambridge rows), since both are statewide and have no unit-count / year-built thresholds.
**T5**: IP 25-21 status = failed; affected set = EMPTY. Never report a rent cap for Boston or Cambridge.

---

## 1. MASSACHUSETTS — STATE LEVEL

### 1.1 rent_increase_limits

#### MA-STATE-RENT-1 — Negative finding: no statewide rent cap; local rent control prohibited (c.40P)
- **Rule ID**: MA-STATE-RENT-1
- **Jurisdiction**: MA · **Level**: state · **Category**: rent_increase_limits
- **Status**: in_force (the *prohibition* is in force; the *finding* is "no cap exists")
- **Title**: Massachusetts Rent Control Prohibition Act — no rent increase limit at any level
- **Requirement**: Massachusetts has no statewide limit on residential rent increases, and G.L. c.40P §4 forbids any city or town from enacting, maintaining or enforcing rent control of any kind (the "local option" in §4(a)-(c) is illusory: voluntary compliance, owners of <10 units and units with fair market rent >$400 excluded, municipality must compensate owners from general funds; no municipality has accepted it).
- **Key value**: none (no cap)
- **Coverage conditions**: All residential rental units in Massachusetts.
- **Exemptions**: N/A. (Theoretical c.40P acceptance route unused by any municipality since 1994.)
- **Effective date**: 1995-01-01 (St. 1994, c.368, approved by voters as Question 9 on 1994-11-08)
- **Penalty / remedy**: N/A (preemption; local ordinance would be void).
- **Interaction with other levels**: Preempts Boston and Cambridge → BOS-RENT-1, CAM-RENT-1 are "no rule". Would have been repealed by IP 25-21 (MA-STATE-RENT-P1, failed). Boston H.3744 (BOS-RENT-P1) sought a special-law exception; failed.
- **Citation**: M.G.L. c.40P §4
- **Source doc id**: D048 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartI/TitleVII/Chapter40P/Section4
- **Quoted span**: `Section 4. No city or town may enact, maintain or enforce rent control of any kind, except that any city or town that accepts this chapter may adopt rent control regulation that provides:`
- **Confidence**: 0.98
- **Notes**: §4(b) also bars local regulation of "evictions, condominium conversion" via rent-control regulation — supports the negative just-cause findings at city level. Second supporting span (D048): `(b) such regulation may not include the regulation of occupancy, services, evictions, condominium conversion or the removal of properties from such regulation, nor may such regulation apply to any rental unit that is owned by a person or entity owning less than ten rental units or that has a fair market rent exceeding $400; and`
- **Address-lookup facts needed**: state only (any MA address). No unit/year facts needed.

#### MA-STATE-RENT-P1 — FAILED: Initiative Petition 25-21 (statewide rent cap) struck by SJC
- **Rule ID**: MA-STATE-RENT-P1 (maps to dev test id MA-RENT-P1)
- **Jurisdiction**: MA · **Level**: state · **Category**: rent_increase_limits
- **Status**: failed
- **Title**: "An Initiative Petition to Protect Tenants by Limiting Rent Increases" (IP 25-21) — removed from Nov 2026 ballot
- **Requirement**: Would have repealed c.40P and capped annual residential rent increases at the lesser of CPI change or 5%. Struck from the 2026 ballot by the Supreme Judicial Court on 2026-06-23 (Cella v. Attorney General, SJC-13893) because its religious-purpose exemption made it a petition that "relates to religion, religious practices or religious institutions", excluded under Art. 48 of the Amendments to the MA Constitution.
- **Key value**: lesser of CPI or 5% (never took effect)
- **Coverage conditions (as proposed)**: all residential units statewide.
- **Exemptions (as proposed)**: owner-occupied buildings of ≤4 units; buildings <10 years old; certain publicly regulated/subsidized units; short-term rentals; units in facilities operated solely for educational, religious or nonprofit purposes.
- **Effective date**: none (never enacted)
- **Penalty / remedy**: N/A
- **Interaction with other levels**: Would have repealed MA-STATE-RENT-1 (c.40P). Because it failed, no rent cap exists at state, Boston or Cambridge level. Proponents (Keep Massachusetts Home) say they may refile for 2028.
- **Citation**: Cella v. Attorney General, SJC-13893 (Mass. June 23, 2026); Initiative Petition 25-21
- **Source doc id**: D059 (link-only), D055 (link-only) · **Source URL**: https://www.wbur.org/news/2026/06/23/massachusetts-high-court-rent-control-ballot-question-struck ; https://massrealestatelawblog.com/tag/cella-v-attorney-general/
- **Quoted span**: NOT IN CORPUS — WBUR: "Four voters who oppose rent control brought the lawsuit before the Supreme Judicial Court." ; massrealestatelawblog: the petition "sought to repeal G.L. c. 40P" and cap increases at "the CPI change or 5%".
- **Confidence**: 0.95
- **Notes**: T5 expects status=failed and empty affected set. Legislative compromise bill lobbied before 2026-07-01 did not pass (WBUR: "top lawmakers balked"). Boston City Council had passed a 9-3 resolution supporting the question (non-binding).
- **Address-lookup facts needed**: none (affected set is empty by definition).

#### MA-STATE-RENT-2 — Procedural only: rent change on a tenancy at will requires valid termination-plus-offer notice (no cap)
- **Rule ID**: MA-STATE-RENT-2
- **Jurisdiction**: MA · **Level**: state · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: c.186 §12 — notice to change terms (incl. rent) of a tenancy at will
- **Requirement**: A landlord can raise rent on a tenant at will only by giving the same written notice required to terminate the tenancy (rental interval or 30 days, whichever is longer; 3 months if rent is payable at intervals ≥3 months) together with an offer of a new tenancy on different terms. There is no limit on the amount.
- **Key value**: notice = max(rental period, 30 days); no amount cap
- **Coverage conditions**: tenancies at will (month-to-month). Lease tenants: rent fixed by lease for its term.
- **Exemptions**: none stated.
- **Effective date**: long-standing (amended, offer-of-new-tenancy language)
- **Penalty / remedy**: defective notice is ineffective; retaliatory increase within 6 months of protected activity is presumptively unlawful under c.186 §18 (MA-STATE-JCE-4).
- **Interaction with other levels**: none; no local rent rules exist.
- **Citation**: M.G.L. c.186 §12
- **Source doc id**: D051 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartII/TitleI/Chapter186/Section12
- **Quoted span**: `Such written notice may include an offer to establish a new tenancy for the same premises on terms different from that of the tenancy being terminated and the validity of such written notice shall not be affected by the inclusion of such offer.`
- **Confidence**: 0.9
- **Notes**: Included so the category is not empty of in-force text; it is NOT a rent cap. Downstream should treat "rent_increase_limits: no cap" as the headline.
- **Address-lookup facts needed**: tenancy type (lease vs at-will) — not in address data → "unknown" for applicability of notice period; the "no cap" finding needs no facts.

### 1.2 just_cause_eviction

#### MA-STATE-JCE-1 — Negative finding: no statewide just-cause eviction requirement; no-fault termination by notice (c.186 §12)
- **Rule ID**: MA-STATE-JCE-1
- **Jurisdiction**: MA · **Level**: state · **Category**: just_cause_eviction
- **Status**: in_force (notice rule in force; finding = no just-cause requirement)
- **Title**: No just-cause eviction statute — tenancy at will terminable on notice without cause
- **Requirement**: Massachusetts has no statewide just-cause eviction law. A landlord may end a tenancy at will for any lawful (non-retaliatory, non-discriminatory) reason or none by written notice equal to the rental interval or 30 days (whichever longer; 3 months if rent payable at intervals ≥3 months), then must obtain possession through summary process under c.239 — self-help eviction is unlawful.
- **Key value**: no-fault notice = max(rental period, 30 days); 3 months if rent period ≥3 months
- **Coverage conditions**: all residential tenancies at will statewide. Lease tenants: lease expires by its terms (no notice to quit required) or per lease provisions.
- **Exemptions**: Federally/state-subsidized housing programs impose their own good-cause rules by program regulation (outside state law) — relevant to Boston "SUBSD HOUSING S-8" rows (use_code A/125). Condominium-conversion evictions are separately regulated (St. 1983, c.527 — 1-year notice; 2 years for elderly/handicapped/low-income; relocation payment) — NOT IN CORPUS.
- **Effective date**: long-standing
- **Penalty / remedy**: Defective notice defeats the summary process case; c.239 §9 allows court stay up to 6 months in no-fault cases (12 months for elderly/handicapped) — NOT IN CORPUS.
- **Interaction with other levels**: c.40P §4(b) prevents municipalities from regulating evictions via rent control; Boston (H.3744) sought special-law authority for just cause — failed. Boston HSNA and Cambridge ch. 8.71 add notice-of-rights duties only (BOS-JCE-1, CAM-JCE-1).
- **Citation**: M.G.L. c.186 §12; M.G.L. c.239 (summary process)
- **Source doc id**: D051 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartII/TitleI/Chapter186/Section12
- **Quoted span**: `Section 12. Estates at will may be determined by either party by three months' notice in writing for that purpose given to the other party; and, if the rent reserved is payable at periods of less than three months, the time of such notice shall be sufficient if it is equal to the interval between the days of payment or thirty days, whichever is longer.`
- **Confidence**: 0.95
- **Notes**: The absence of a just-cause statute is established by the structure of c.186 §12 (no cause element) and confirmed by secondary sources (masslegalresources.com 2026-08-22: "Massachusetts has no statewide just-cause requirement"). Statewide just-cause bills have been filed in prior sessions and not enacted.
- **Address-lookup facts needed**: subsidized status (Boston use_code A/125 "SUBSD HOUSING S- 8" suggests program-level good-cause rules → flag "unknown/program rules may apply").

#### MA-STATE-JCE-2 — Nonpayment of rent: 14-day notice to quit; cure rights (c.186 §§11, 12)
- **Rule ID**: MA-STATE-JCE-2
- **Jurisdiction**: MA · **Level**: state · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: 14-day notice to quit for nonpayment; tenant cure rights
- **Requirement**: For nonpayment, a 14-day written notice to quit terminates a lease (§11) or tenancy at will (§12). A lease tenant may cure by paying all rent due with interest and costs on or before the answer date; a tenant at will who has not received a similar notice in the prior 12 months may cure by paying within 10 days of receipt, and the notice must contain the statutory cure-rights language or the cure window extends to the answer date.
- **Key value**: 14 days' notice; 10-day cure (at-will, once per 12 months)
- **Coverage conditions**: all residential tenancies statewide.
- **Exemptions**: none; special 7-day continuance where nonpayment was caused by government delay in subsistence/rental payment delivery.
- **Effective date**: long-standing
- **Penalty / remedy**: omission of cure notice extends cure period to answer date (does not void notice).
- **Interaction with other levels**: c.186 §31 form must accompany nonpayment notices (MA-STATE-JCE-3); Boston HSNA / Cambridge ch. 8.71 notices must also accompany.
- **Citation**: M.G.L. c.186 §11; M.G.L. c.186 §12
- **Source doc id**: D050 (lease), D051 (at-will) · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartII/TitleI/Chapter186/Section11
- **Quoted span** (D050): `Section 11. Upon the neglect or refusal to pay the rent due under a written lease, fourteen days' notice to quit, given in writing by the landlord to the tenant, shall be sufficient to determine the lease, unless the tenant, on or before the day the answer is due, in an action by the landlord to recover possession of the premises, pays or tenders to the landlord or to his attorney all rent then due, with interest and costs of suit.`
- **Supporting span** (D051): `Every notice to determine an estate at will for nonpayment of rent shall contain the following notification to the tenant: ''If you have not received a notice to quit for nonpayment of rent within the last twelve months, you have a right to prevent termination of your tenancy by paying or tendering to your landlord, your landlord's attorney or the person to whom you customarily pay your rent the full amount of rent due within ten days after your receipt of this notice.''`
- **Confidence**: 0.97
- **Address-lookup facts needed**: none (statewide).

#### MA-STATE-JCE-3 — Nonpayment notice to quit must be accompanied by EOHLC rights/resources form (c.186 §31)
- **Rule ID**: MA-STATE-JCE-3
- **Jurisdiction**: MA · **Level**: state · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Notice to quit for nonpayment — mandatory attestation form and "THIS NOTICE TO QUIT IS NOT AN EVICTION" statement
- **Requirement**: Every written notice to quit for nonpayment of rent to a residential tenant must be accompanied by an EOHLC form documenting repayment agreements and listing rental assistance (incl. RAFT), court rules and eviction restrictions, in English plus the 5 most common languages. Courts (including Boston Municipal Court) may not accept a nonpayment summary process filing without proof of delivery of the form.
- **Key value**: form required; filing bar absent proof of delivery
- **Coverage conditions**: residential nonpayment evictions statewide.
- **Exemptions**: none.
- **Effective date**: 2021 (St. 2020, c.257 §1 as made permanent; codified §31) — confirm exact date if needed.
- **Penalty / remedy**: court shall not accept summary process filing without proof of delivery.
- **Interaction with other levels**: Stacks with Boston HSNA (BOS-JCE-1) and Cambridge ch. 8.71 (CAM-JCE-1) notice duties.
- **Citation**: M.G.L. c.186 §31
- **Source doc id**: D058 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartII/TitleI/Chapter186/Section31
- **Quoted span**: `No court having jurisdiction over an action for summary process pursuant to chapter 239, including the Boston municipal court department, shall, in an eviction for nonpayment of rent for a residential dwelling unit, accept for filing a writ, summons or complaint without proof of delivery of the form required under this section.`
- **Confidence**: 0.95
- **Address-lookup facts needed**: none.

#### MA-STATE-JCE-4 — Retaliation protection: rebuttable presumption for 6 months (c.186 §18)
- **Rule ID**: MA-STATE-JCE-4
- **Jurisdiction**: MA · **Level**: state · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Anti-reprisal — notice to quit, rent increase or term change within 6 months of protected activity presumed retaliatory
- **Requirement**: A landlord may not retaliate against a tenant for code complaints, enforcement actions, tenants'-union activity, etc.; any termination notice (other than for nonpayment), rent increase or substantial alteration of terms within 6 months after such activity creates a rebuttable presumption of reprisal, rebuttable only by clear and convincing evidence of independent justification. Waivers are void.
- **Key value**: 6-month presumption; damages 1–3 months' rent or actual damages (greater) + attorney's fees
- **Coverage conditions**: all residential premises statewide.
- **Exemptions**: notices for nonpayment of rent are outside the presumption.
- **Effective date**: long-standing
- **Penalty / remedy**: not less than 1 nor more than 3 months' rent, or actual damages, whichever greater, plus costs and reasonable attorney's fee; also a defense to possession under c.239 §2A (NOT IN CORPUS).
- **Interaction with other levels**: the only statewide limit on no-fault terminations and rent increases; applies in Boston and Cambridge.
- **Citation**: M.G.L. c.186 §18
- **Source doc id**: D053 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartII/TitleI/Chapter186/Section18
- **Quoted span**: `The receipt of any notice of termination of tenancy, except for nonpayment of rent, or, of increase in rent, or, of any substantial alteration in the terms of tenancy within six months after the tenant has commenced, proceeded with, or obtained relief in such action, exercised such rights, made such report or complaint, or organized or joined such tenants' union or within six months after any other person has taken such action or actions on behalf of the tenant or in, or relating to, the building in which the tenant resides, shall create a rebuttable presumption that such notice or other action is a reprisal against the tenant for engaging in such activities.`
- **Confidence**: 0.97
- **Address-lookup facts needed**: none.

### 1.3 security_deposits

#### MA-STATE-DEP-1 — Security deposit cap: one month's rent (c.186 §15B(1)(b)(iii))
- **Rule ID**: MA-STATE-DEP-1
- **Jurisdiction**: MA · **Level**: state · **Category**: security_deposits
- **Status**: in_force
- **Title**: Security deposit may not exceed first month's rent
- **Requirement**: At or before the start of a tenancy, a lessor or lessor's agent may not require a security deposit greater than one month's rent, and after commencement may never demand a deposit above that amount. The statute authorizes EOHLC to allow an optional, capped (≤1 month total) fee in lieu of a deposit by regulation — no such regulation has been promulgated as of 2026-10-01.
- **Key value**: 1 month's rent
- **Coverage conditions**: all residential tenancies statewide (lessor and, since 2025-08-01, "agent of the lessor").
- **Exemptions**: §15B(9): leases/occupancies of 100 days or less for vacation or recreational purposes. **No owner-occupied exemption** (unlike c.151B §4(7)).
- **Effective date**: cap long-standing; "or agent of the lessor" language effective 2025-08-01 (St. 2025, c.9 §§54–55)
- **Penalty / remedy**: §15B(7) treble damages (3× deposit + 5% interest + costs + attorney's fees) for failure to deposit in proper account, failure to transfer on sale, or failure to return within 30 days; §15B(8) conflicting lease terms void.
- **Interaction with other levels**: Boston and Cambridge impose no additional deposit rules (BOS-DEP-1, CAM-DEP-1).
- **Citation**: M.G.L. c.186 §15B(1)(b)(iii); §15B(1)(d); §15B(9)
- **Source doc id**: D052 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartII/TitleI/Chapter186/Section15B
- **Quoted span**: `(iii) a security deposit equal to the first month's rent provided that such security deposit is deposited as required by subsection (3) and that the tenant is given the statement of condition as required by subsection (2);`
- **Supporting span** (D052, §15B(1)(d)): `(d) No lessor or successor in interest shall at any time subsequent to the commencement of a tenancy demand rent in advance in excess of the current month's rent or a security deposit in excess of the amount allowed by this section.`
- **Exemption span** (D052): `(9) The provisions of this section shall not apply to any lease, rental, occupancy or tenancy of one hundred days or less in duration which lease or rental is for a vacation or recreational purpose.`
- **Confidence**: 0.98
- **Notes**: Fee-in-lieu authority added by St. 2024, c.150 (Affordable Homes Act) §50; EOHLC regulations index shows no implementing regulation (checked Oct 2026 via search) → treat fee-in-lieu as not available.
- **Address-lookup facts needed**: none (statewide, no unit/age thresholds).

#### MA-STATE-DEP-2 — Deposit handling: separate MA bank account, receipts, statement of condition, 5% interest, 30-day return (c.186 §15B(2)-(7))
- **Rule ID**: MA-STATE-DEP-2
- **Jurisdiction**: MA · **Level**: state · **Category**: security_deposits
- **Status**: in_force
- **Title**: Security deposit custody, interest, itemization and return rules
- **Requirement**: Deposits remain tenant property, must be held in a separate interest-bearing account in a Massachusetts bank beyond creditors' reach, with a bank receipt within 30 days; landlord must give a signed receipt, a statement of condition within 10 days, maintain inspectable records 2 years, pay 5% (or actual bank) interest annually if held ≥1 year, and return the deposit within 30 days of tenancy end with a sworn itemized damage list and evidence. Only unpaid rent/water, tax escalation under §15C, and tenant-caused damage beyond wear and tear may be deducted.
- **Key value**: 5% interest; 30-day return; 10-day statement of condition; 30-day bank receipt
- **Coverage conditions**: any lessor of residential real property who takes a deposit.
- **Exemptions**: §15B(9) vacation/recreational ≤100 days.
- **Effective date**: long-standing
- **Penalty / remedy**: forfeiture of right to retain any portion (§15B(6)); treble damages + 5% interest + costs + attorney's fees (§15B(7)) for violations of (6)(a), (d), (e); immediate return for failure to give bank receipt or allow record inspection.
- **Interaction with other levels**: none local.
- **Citation**: M.G.L. c.186 §15B(2), (3), (4), (6), (7)
- **Source doc id**: D052 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartII/TitleI/Chapter186/Section15B
- **Quoted span**: `(7) If the lessor or his agent fails to comply with clauses (a), (d), or (e) of subsection 6, the tenant shall be awarded damages in an amount equal to three times the amount of such security deposit or balance thereof to which the tenant is entitled plus interest at the rate of five per cent from the date when such payment became due, together with court costs and reasonable attorney's fees.`
- **Supporting span** (D052, §15B(3)(a)): `(3) (a) Any security deposit received by such lessor shall be held in a separate, interest-bearing account in a bank, located within the commonwealth under such terms as will place such deposit beyond the claim of creditors of the lessor, including a foreclosing mortgagee or trustee in bankruptcy, and as will provide for its transfer to a subsequent owner of said property.`
- **Supporting span** (D052, §15B(4)): `(4) The lessor shall, within thirty days after the termination of occupancy under a tenancy-at-will or the end of the tenancy as specified in a valid written lease agreement, return to the tenant the security deposit or any balance thereof;`
- **Confidence**: 0.97
- **Address-lookup facts needed**: none.

#### MA-STATE-DEP-3 — Last month's rent in advance: receipt + 5% interest; treble damages for unpaid interest (c.186 §15B(2)(a))
- **Rule ID**: MA-STATE-DEP-3
- **Jurisdiction**: MA · **Level**: state · **Category**: security_deposits
- **Status**: in_force
- **Title**: Last month's rent prepayment — receipt and annual 5% interest
- **Requirement**: A lessor who collects last month's rent in advance must give a receipt with specified contents and pay 5% (or actual bank) interest yearly from day one, with tenant right to deduct from rent if unpaid 30 days after each anniversary.
- **Key value**: 5% interest on last month's rent
- **Coverage conditions**: any residential lessor collecting last month's rent in advance.
- **Exemptions**: §15B(9).
- **Effective date**: long-standing
- **Penalty / remedy**: 3× unpaid interest + costs + attorney's fees if interest not paid within 30 days after tenancy ends.
- **Citation**: M.G.L. c.186 §15B(2)(a), (7A)
- **Source doc id**: D052 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartII/TitleI/Chapter186/Section15B
- **Quoted span**: `Any lessor or his agent who receives said rent in advance for the last month of tenancy shall, beginning with the first day of tenancy, pay interest at the rate of five per cent per year or other such lesser amount of interest as has been received from the bank where the deposit has been held.`
- **Confidence**: 0.95
- **Address-lookup facts needed**: none.

### 1.4 application_screening_fees

#### MA-STATE-FEE-1 — Application / screening fees prohibited: only first, last, deposit, lock/key may be collected (c.186 §15B(1)(b))
- **Rule ID**: MA-STATE-FEE-1
- **Jurisdiction**: MA · **Level**: state · **Category**: application_screening_fees
- **Status**: in_force
- **Title**: Up-front charges limited to four items — landlord application, credit-check, pet, amenity and "holding" fees unlawful
- **Requirement**: At or before the start of a tenancy, neither the lessor nor the lessor's agent may require a tenant or prospective tenant to pay anything other than first month's rent, last month's rent, a security deposit ≤1 month, and the purchase/installation cost of a key and lock. Massachusetts courts (e.g., Perry v. Equity Residential Mgmt., D. Mass. 2014) and practitioner guidance treat landlord application and screening fees as barred by this list; requiring applicants to pay a third-party screening service is likewise regarded as a violation.
- **Key value**: $0 application fee (closed list of 4 permitted charges)
- **Coverage conditions**: all residential tenancies statewide; applies to lessors and (since 2025-08-01) agents of the lessor collecting on the lessor's behalf.
- **Exemptions**: §15B(9) vacation/recreational ≤100 days. Licensed brokers acting under their own tenant-side contract may charge brokerage fees (see MA-STATE-FEE-2 and 254 CMR 7.00 disclosure rules) — but not on the landlord's behalf.
- **Effective date**: list long-standing; "or agent of the lessor … to the lessor or to an agent of the lessor" amendment effective 2025-08-01 (St. 2025, c.9 §§54, 55; see §136).
- **Penalty / remedy**: c.186 §15B(7) treble damages where deposit rules are breached; c.93A unfair-practice liability (940 CMR 3.17(4)(a) prohibits requiring amounts beyond §15B — NOT IN CORPUS); Perry v. Equity Residential: treble damages + attorney's fees.
- **Interaction with other levels**: No Boston or Cambridge fee ordinance (BOS-FEE-1, CAM-FEE-1). Boston Office of Housing Stability republishes the state broker-fee rule.
- **Citation**: M.G.L. c.186 §15B(1)(b)(i)–(iv), as amended by St. 2025, c.9 §§54–55
- **Source doc id**: D052; D054 (link-only) · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartII/TitleI/Chapter186/Section15B ; https://masslandlords.net/can-massachusetts-landlords-charge-an-application-fee/
- **Quoted span** (D052): `(b) At or prior to the commencement of any tenancy, no lessor or agent of the lessor may require a tenant or prospective tenant to pay, to the lessor or to an agent of the lessor, any amount in excess of the following:`
- **Supporting span** (D052): `(iv) the purchase and installation cost for a key and lock.`
- **Online (NOT IN CORPUS, D054)**: "Application fees, pet fees, cleaning fees, amenity fees, and all other charges are forbidden." ; "Landlords should not require their applicants to pay a third party."
- **Confidence**: 0.93
- **Notes / open questions**: The statute never uses the word "application fee"; the prohibition is by negative implication from a closed list, consistently applied by courts/AG. Some practitioners note landlords may still have the tenant pay a screening vendor *after* approval? — majority view (D054) says no. Keep conflict_flag=false but note interpretive basis.
- **Address-lookup facts needed**: none.

#### MA-STATE-FEE-2 — Broker fee paid only by the party who engaged the broker (c.112 §87DDD½, eff. 2025-08-01)
- **Rule ID**: MA-STATE-FEE-2
- **Jurisdiction**: MA · **Level**: state · **Category**: application_screening_fees
- **Status**: in_force
- **Title**: Residential rental broker fees — tenant pays only if tenant engaged the broker
- **Requirement**: A licensed broker/salesperson may contract solely with a prospective tenant or solely with a landlord; any fee may be paid only by the party who originally engaged and contracted with the broker. Landlords may not shift their broker's fee to tenants; dual-fee representation is barred.
- **Key value**: landlord-hired broker fee → $0 to tenant
- **Coverage conditions**: all residential rentals statewide; fees for services rendered before 2025-08-01 grandfathered per Board of Registration guidance.
- **Exemptions**: none ("Are there any exceptions to this new rule? No." — mass.gov FAQ, NOT IN CORPUS).
- **Effective date**: 2025-08-01 (St. 2025, c.9 §43, FY2026 budget signed 2025-07-04; see §136)
- **Penalty / remedy**: Board of Registration of Real Estate Brokers discipline (c.112 §87AAA); c.93A exposure (NOT IN CORPUS).
- **Interaction with other levels**: complements MA-STATE-FEE-1 (agent-of-lessor language added same date). No local overlay.
- **Citation**: M.G.L. c.112 §87DDD½ (as amended by St. 2025, c.9 §43)
- **Source doc id**: D057 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXVI/Chapter112/Section87DDD%201~2
- **Quoted span**: `Any fee shall only be paid by the party, lessor or tenant who originally engaged and entered into a contract with the licensed broker or salesperson.`
- **Confidence**: 0.97
- **Address-lookup facts needed**: none.

#### MA-STATE-FEE-3 — Late fees barred until rent is 30 days overdue (c.186 §15B(1)(c))
- **Rule ID**: MA-STATE-FEE-3
- **Jurisdiction**: MA · **Level**: state · **Category**: application_screening_fees
- **Status**: in_force
- **Title**: No interest or penalty for late rent until 30 days past due
- **Requirement**: No lease or rental agreement may impose interest or a penalty for non-payment of rent until 30 days after the rent was due.
- **Key value**: 30-day grace before any late fee
- **Coverage conditions**: all residential leases statewide. **Exemptions**: §15B(9).
- **Effective date**: long-standing · **Penalty / remedy**: provision void (§15B(8)); c.93A.
- **Citation**: M.G.L. c.186 §15B(1)(c)
- **Source doc id**: D052 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartII/TitleI/Chapter186/Section15B
- **Quoted span**: `(c) No lease or other rental agreement shall impose any interest or penalty for failure to pay rent until thirty days after such rent shall have been due.`
- **Confidence**: 0.95 · **Notes**: ancillary fee rule; categorize under fees for completeness.
- **Address-lookup facts needed**: none.

### 1.5 screening_restrictions

#### MA-STATE-SCR-1 — Source-of-income / housing-subsidy (Section 8) discrimination ban (c.151B §4(10))
- **Rule ID**: MA-STATE-SCR-1
- **Jurisdiction**: MA · **Level**: state · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: No discrimination against public-assistance recipients or housing-subsidy (voucher) holders, including because of program requirements
- **Requirement**: Any person furnishing rental accommodations may not discriminate against an individual because they receive federal/state/local public assistance or a housing subsidy (incl. rental assistance/supplements such as Section 8 or MRVP), or because of any requirement of such a program (e.g., refusing inspections or the HAP contract).
- **Key value**: Section 8 / voucher refusal = unlawful
- **Coverage conditions**: "any person furnishing … rental accommodations" — **no owner-occupied or small-building exemption in §4(10)** (contrast §4(7) and §4(11)).
- **Exemptions**: none in §4(10). (Minimum-income screening that applies to the tenant's share only is permitted per MCAD guidance — NOT IN CORPUS.)
- **Effective date**: long-standing (subsidy-requirement clause added 1989/1990s)
- **Penalty / remedy**: MCAD complaint (c.151B §5) — actual damages, emotional distress, civil penalties up to $10,000/$25,000/$50,000 for repeat violations, attorney's fees; private action in Superior Court (c.151B §9) — NOT IN CORPUS.
- **Interaction with other levels**: Boston (BOS-SCR-1) and Cambridge (CAM-SCR-1) independently protect "rental assistance" / "source of income" with local enforcement; state rule governs everywhere in MA.
- **Citation**: M.G.L. c.151B §4(10)
- **Source doc id**: D049 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter151B/Section4
- **Quoted span**: `10. For any person furnishing credit, services or rental accommodations to discriminate against any individual who is a recipient of federal, state, or local public assistance, including medical assistance, or who is a tenant receiving federal, state, or local housing subsidies, including rental assistance or rental supplements, because the individual is such a recipient, or because of any requirement of such public assistance, rental assistance, or housing subsidy program.`
- **Confidence**: 0.98
- **Address-lookup facts needed**: none for applicability; Boston use_code A/125 "SUBSD HOUSING S- 8" rows are directly relevant.

#### MA-STATE-SCR-2 — Protected-class discrimination and pre-rental inquiry ban in housing (c.151B §4(6), (7), (7B))
- **Rule ID**: MA-STATE-SCR-2
- **Jurisdiction**: MA · **Level**: state · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: Fair housing — refusal, differential terms, and written/oral inquiries about protected characteristics prohibited
- **Requirement**: Owners, lessees, brokers, managing agents of publicly assisted, multiple-dwelling (≥3 units) or contiguously located housing (§4(6)) and of "other covered housing accommodations" (§4(7)) may not refuse to rent, discriminate in terms, or make any written or oral inquiry or record concerning race, religious creed, color, national origin, sex, gender identity, sexual orientation, age, genetic information, ancestry, marital status, veteran/armed-forces status, blindness/hearing impairment or other handicap (incl. guide dog). §4(7B) bans discriminatory advertising incl. on "public assistance recipiency" and children.
- **Key value**: inquiry ban + 15 protected classes
- **Coverage conditions**: §4(6): publicly assisted, multiple dwelling (3+ units) or contiguously located housing — no owner-occupancy exemption. §4(7): all other covered housing.
- **Exemptions**: §4(7) proviso — leasing of a single apartment in an owner-occupied two-family dwelling; "age" does not apply to minors or to qualifying elderly/55+/62+ housing. Religious-organization preference (final paragraphs). Reasonable modification cost-shifting rules in §4(7A).
- **Effective date**: long-standing
- **Penalty / remedy**: MCAD / Superior Court remedies (c.151B §§5, 9).
- **Interaction with other levels**: Boston Fair Housing Commission and Cambridge HRC enforce parallel local ordinances with additional classes (Boston: gender expression, military status; Cambridge: relationship status, family structure, source of income).
- **Citation**: M.G.L. c.151B §4(6), §4(7), §4(7B)
- **Source doc id**: D049 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter151B/Section4
- **Quoted span** (exemption, §4(7)): `provided, however, that this subsection shall not apply to the leasing of a single apartment or flat in a two family dwelling, the other occupancy unit of which is occupied by the owner as his residence.`
- **Supporting span** (§4(7B)): `national origin, genetic information, ancestry, children, marital status, public assistance recipiency, or handicap or an intention to make any such preference, limitation or discrimination except where otherwise legally permitted.`
- **Confidence**: 0.95
- **Address-lookup facts needed**: unit count (≥3 → §4(6) with no owner-occupancy exemption; 2-family owner-occupied → §4(7) exemption). Boston "A/" rows lack unit counts (use_description "APT 7-30 UNITS" implies ≥7 → §4(6) applies); Cambridge rows have unit counts (all ≥4 in sample). Owner-occupancy is never in the data → "unknown" only matters for 2-unit buildings (none in MA sample).

#### MA-STATE-SCR-3 — Familial status (children) discrimination ban with small-owner exemptions (c.151B §4(11))
- **Rule ID**: MA-STATE-SCR-3
- **Jurisdiction**: MA · **Level**: state · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: No refusal to rent because applicant has children; lead-paint not a lawful basis
- **Requirement**: Covered housing providers may not refuse or discriminate because a person has or will have children occupying the unit (occupancy limits under other law still apply); findings involving lead paint are referred to the Childhood Lead Poisoning Prevention Program.
- **Key value**: familial status protected
- **Coverage conditions**: publicly assisted, multiple dwelling, contiguously located, or other covered housing.
- **Exemptions**: (1) dwellings of ≤3 apartments where one is occupied by an elderly (65+) or infirm person for whom children would be a hardship; (2) temporary (≤1 yr) lease/sublease of owner's principal residence; (3) single unit in owner-occupied two-family dwelling.
- **Effective date**: long-standing · **Penalty / remedy**: MCAD / court.
- **Citation**: M.G.L. c.151B §4(11)
- **Source doc id**: D049 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter151B/Section4
- **Quoted span**: `(3) The leasing of a single dwelling unit in a two family dwelling, the other occupancy unit of which is occupied by the owner as his residence.`
- **Confidence**: 0.93
- **Address-lookup facts needed**: unit count; owner-occupancy (not in data).

#### MA-STATE-SCR-4 — CORI use in tenant screening: final-step-only access, pre-adverse-action disclosures (803 CMR 5.00)
- **Rule ID**: MA-STATE-SCR-4
- **Jurisdiction**: MA · **Level**: state · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: DCJIS regulations on criminal offender record information for housing applicants
- **Requirement**: Landlords, property managers and real-estate agents may obtain "standard access" CORI on a market-rate housing applicant only as the final step of the application process (5.04(2)), only for the applicant (not other household members), after iCORI registration (5.03) and with a CORI policy where required (5.07). Before any adverse housing decision based on CORI or other criminal history, the provider must notify the applicant, give a copy of the record and identify its source, identify the specific information relied upon, give the applicant an opportunity to dispute accuracy, provide DCJIS record-correction information, and document compliance (5.14(1)). Public housing authorities/subsidized managers follow 5.05 and 5.14(2) with appeal information.
- **Key value**: CORI = final step; copy + dispute opportunity before denial
- **Coverage conditions**: any landlord/PM/agent/PHA in MA requesting CORI or using other criminal history information.
- **Exemptions**: none; the regulation does not restrict *which* convictions may be considered (no statewide fair-chance housing rule — see MA-STATE-SCR-6).
- **Effective date**: 2012 (CORI Reform); amended eff. 2017-02-24 and 2021-06-11
- **Penalty / remedy**: DCJIS audits (5.16); c.6 §§168, 172, 178 criminal/civil penalties for CORI misuse (NOT IN CORPUS).
- **Interaction with other levels**: Boston Fair Chance Tenant Selection Policy (BOS-SCR-2) layers substantive look-back limits for DND-funded/IDP units only; Cambridge has no local CORI rule.
- **Citation**: 803 CMR 5.00, esp. 5.04, 5.14 (authority: M.G.L. c.6 §§167A, 172)
- **Source doc id**: D056 (link-only; 403 at capture) · **Source URL**: https://www.mass.gov/doc/803-cmr-5-criminal-offender-record-information-cori-housing/download (mirror: https://www.law.cornell.edu/regulations/massachusetts/department-803-CMR/title-803-CMR-5.00)
- **Quoted span**: NOT IN CORPUS — 803 CMR 5.04(2): CORI "shall only be requested for a housing applicant as the final step in the application process."
- **Confidence**: 0.85
- **Notes**: Mass.gov download blocked (403) for the corpus and for this agent; text verified via Cornell LII section pages (5.04, 5.14) and MassLandlords summary.
- **Address-lookup facts needed**: subsidized vs market-rate (A/125 rows → 5.05/5.14(2) PHA/subsidized track).

#### MA-STATE-SCR-5 — Eviction-record sealing; CRAs may not report sealed records; applications must carry "no record" notice (c.239 §16, eff. 2025-05-05)
- **Rule ID**: MA-STATE-SCR-5
- **Jurisdiction**: MA · **Level**: state · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: Sealed eviction records excluded from tenant screening
- **Requirement**: Tenants may petition to seal summary-process records (no-fault: any time after conclusion; dismissals/tenant wins: any time; nonpayment: after 4 years or upon satisfaction of judgment; fault: after 7 years). Consumer reporting agencies may not disclose or score sealed records and must purge within 30 days of sealing; any housing or credit application asking about prior evictions must state that an applicant with a sealed record "may answer 'no record'".
- **Key value**: sealed eviction records off-limits; mandatory application notice
- **Coverage conditions**: all housing/credit screening in MA; all CRAs reporting on MA residents.
- **Exemptions**: records still publicly inspectable within 30 days of the report may be reported; sealed records accessible only for public-safety, scholarly, journalistic, governmental purposes (never commercial).
- **Effective date**: 2025-05-05 (St. 2024, c.150 — Affordable Homes Act, signed 2024-08-06)
- **Penalty / remedy**: CRA violation — actual damages, costs, attorney's fees; AG enforcement; application-notice violation actionable only after AG written warning and 90-day cure failure.
- **Interaction with other levels**: none local (Cambridge Office of Housing Liaison runs sealing clinics; not a rule).
- **Citation**: M.G.L. c.239 §16(b)–(e½), (i), (j)
- **Source doc id**: none (NOT IN CORPUS) · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartIII/TitleIII/Chapter239/Section16
- **Quoted span**: NOT IN CORPUS — §16(j): "An applicant for housing or credit with a sealed record on file with the court pursuant to section 16 of chapter 239 of the General Laws may answer 'no record' to an inquiry relative to that sealed court record."
- **Confidence**: 0.88
- **Address-lookup facts needed**: none.

#### MA-STATE-SCR-6 — Negative finding: no statewide fair-chance (criminal-history) housing law; no statewide credit-score or income-ratio screening limits
- **Rule ID**: MA-STATE-SCR-6
- **Jurisdiction**: MA · **Level**: state · **Category**: screening_restrictions
- **Status**: in_force (finding of absence)
- **Title**: No statewide substantive limit on criminal-history, credit-score or income-ratio tenant screening
- **Requirement**: Massachusetts law regulates *how* CORI is obtained and used (803 CMR 5.00) and bars discrimination on protected classes/source of income, but contains no statewide rule limiting which convictions a private landlord may consider, no look-back period, no ban on credit-score screening, and no rent-to-income ratio cap. c.151B §4(9) (criminal-record inquiry limits) applies to employers only. Fair-chance housing bills have been filed in prior sessions and not enacted.
- **Key value**: none
- **Coverage conditions**: N/A. **Exemptions**: N/A.
- **Effective date**: N/A · **Penalty / remedy**: N/A (disparate-impact liability under c.151B/FHA remains possible).
- **Interaction with other levels**: Boston's 2017 Fair Chance Tenant Selection Policy (BOS-SCR-2) fills this gap only for city-funded/IDP units; Cambridge has no local equivalent.
- **Citation**: M.G.L. c.151B §4(9) (employment-only scope); absence confirmed in 803 CMR 5.00 structure
- **Source doc id**: D049 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter151B/Section4
- **Quoted span** (D049, showing §4(9) is employer-scoped): `9. For an employer, himself or through his agent, in connection with an application for employment, or the terms, conditions, or privileges of employment, or the transfer, promotion, bonding, or discharge of any person, or in any other matter relating to the employment of any person, to request any information,`
- **Confidence**: 0.88
- **Address-lookup facts needed**: none.

### 1.6 algorithmic_rent_setting

#### MA-STATE-ALG-1 — Negative finding: no algorithmic rent-setting statute in force in Massachusetts
- **Rule ID**: MA-STATE-ALG-1
- **Jurisdiction**: MA · **Level**: state · **Category**: algorithmic_rent_setting
- **Status**: in_force (finding of absence)
- **Title**: No enacted Massachusetts law on algorithmic rent setting as of 2026-10-01
- **Requirement**: Massachusetts has not enacted any statute restricting landlord use of algorithmic rent-recommendation software. Two bills (S.2983, H.5222) were reported favorably by the Joint Committee on Housing on 2026-03-12 and sit in Ways and Means. Existing constraints come only from general antitrust/consumer law (c.93, c.93A) and from AG Campbell's participation in the DOJ/multistate RealPage litigation (settlements with LivCor $7M, Greystar, RealPage 2025) — litigation outcomes, not rules.
- **Key value**: none
- **Coverage conditions**: N/A. **Exemptions**: N/A. **Effective date**: N/A. **Penalty / remedy**: N/A.
- **Interaction with other levels**: Boston (BOS-ALG-1) and Cambridge (CAM-ALG-1) also have no ordinance; Cambridge policy order (June 2026) is pre-ordinance.
- **Citation**: absence; see pending S.2983 / H.5222 (D045–D047)
- **Source doc id**: D046 · **Source URL**: https://malegislature.gov/Bills/194/S2983
- **Quoted span** (status line showing not enacted): `Bill reported favorably by committee and referred to the committee on`
- **Confidence**: 0.95
- **Address-lookup facts needed**: none.

#### MA-STATE-ALG-P1 — PENDING: S.2983, "An Act prohibiting algorithmic rent setting" (new c.186 §15G)
- **Rule ID**: MA-STATE-ALG-P1 (maps to dev test id MA-ALG-P1)
- **Jurisdiction**: MA · **Level**: state · **Category**: algorithmic_rent_setting
- **Status**: pending
- **Title**: S.2983 (194th General Court) — landlord ban on use of algorithmic devices / coordinators to set rent or occupancy
- **Requirement**: Would add c.186 §15G: no lessor or landlord shall employ, use or rely upon an "algorithmic device" or "coordinator" when setting rent, changing rent at renewal, otherwise determining what to charge, or determining occupancy levels. "Algorithmic device" = ML/AI computational process using nonpublic competitor data to advise on rent; "coordinating function" = collecting nonpublic rent/supply/lease-date data from ≥2 landlords, analyzing it, and recommending rents/renewal terms/occupancy; a landlord doing this for its own benefit is itself a "coordinator".
- **Key value**: prohibition; $5,000 civil penalty per violation (each rent determination = separate violation); c.93A §2 violation
- **Coverage conditions (if enacted)**: every residential dwelling unit in MA (house, apartment, ADU, other primary residence); all lessors/landlords regardless of portfolio size or building age. **Affected set for T4 = all MA addresses.**
- **Exemptions (as drafted)**: trade-association reports published ≤ monthly using aggregated anonymous data; products used to set rent/income limits under affordable-housing program guidelines.
- **Effective date**: none specified (would default to 90 days after enactment unless emergency preamble).
- **Penalty / remedy**: c.93A remedies; civil penalty ≤$5,000/violation; costs, attorney's, expert and investigation fees to prevailing plaintiffs, AG or municipality.
- **Interaction with other levels**: would create a statewide floor; expressly contemplates municipal enforcement; no preemption clause. Boston/Cambridge have no ordinance to conflict with.
- **Bill history**: consolidated new draft of S.994 (Friedman, Cyr) and S.1016 (Moore, Jehlen, Eldridge); reported from Housing 2026-03-12 and referred to Senate Ways and Means; **no further action** as of 2026-10-01 (formal session ended 2026-07-31; informal sessions continue, so still technically pending until 2027-01-05).
- **Citation**: 194th General Court, S.2983 (proposed M.G.L. c.186 §15G)
- **Source doc id**: D046, D047 · **Source URL**: https://malegislature.gov/Bills/194/S2983 ; https://malegislature.gov/Bills/194/S2983/BillHistory
- **Quoted span** (D046 line 11): `An Act prohibiting algorithmic rent setting`
- **Supporting span** (D046 line 12): `Senate, March 12, 2026 -- The committee on Housing, to whom was referred the petitions (accompanied by bill, Senate, No. 994) of Cindy F. Friedman and Julian Cyr for legislation to prohibit algorithmic rent setting; and (accompanied by bill, Senate, No. 1016) of Michael O. Moore, Patricia D. Jehlen and James B. Eldridge for legislation to establish the Preventing Algorithmic Rent Fixing in the Rental Housing Market Act., report the accompanying bill (Senate, No. 2983).`
- **Operative text (NOT IN CORPUS, from S.2983.Html)**: "no lessor or landlord shall employ, use or rely upon an algorithmic device or coordinator."
- **Confidence**: 0.93
- **Address-lookup facts needed**: state = MA only (jurisdiction resolution of postal_city Dorchester/Roxbury/etc. → Boston, MA; all 110 MA rows affected if enacted).

#### MA-STATE-ALG-P2 — PENDING: H.5222, "An Act relative to preventing algorithmic rent fixing in the rental housing market" (new c.40Z)
- **Rule ID**: MA-STATE-ALG-P2 (maps to dev test id MA-ALG-P2)
- **Jurisdiction**: MA · **Level**: state · **Category**: algorithmic_rent_setting
- **Status**: pending
- **Title**: H.5222 (194th General Court) — ban on contracting with rent-coordination service providers; antitrust-style enforcement
- **Requirement**: Would insert new Chapter 40Z. §2(a): no real estate lessor (or agent/subcontractor) may subscribe to, contract with, or exchange anything of value for the services of a "service provider" that performs a "coordination" function (collecting rent/price/supply/occupancy/lease-date data, analyzing it computationally, and recommending rents, lease terms or occupancy to lessors; publishing fair-market rent from public data is not a recommendation). §2(b): no service provider shall facilitate an agreement not to compete among lessors. §3: violation = unfair method of competition under c.93 and c.93A; interest on damages; pre-dispute arbitration/class waivers unenforceable at plaintiff's election; fees/costs to plaintiffs, AG or municipality. §4: relaxed antitrust pleading standard.
- **Key value**: contracting ban (lessor side) + facilitation ban (vendor side); c.93/c.93A
- **Coverage conditions (if enacted)**: any entity owning real property and renting any part as a residential dwelling unit in MA; residential dwelling unit excludes inpatient medical, licensed long-term care, and detention facilities. **Affected set for T4 = all MA addresses** (Boston use_code A/118 "ELDERLY HOME" row may warrant an "unknown" flag if it is a licensed long-term-care facility).
- **Exemptions (as drafted)**: public-data fair-market-rent publications; facility exclusions above.
- **Effective date**: none specified.
- **Penalty / remedy**: c.93A (incl. potential multiple damages via c.93A §9/§11), interest, fees; AG and municipal enforcement.
- **Interaction with other levels**: broader than S.2983 (does not require "nonpublic" data; reaches vendors). If both pass, conference would reconcile. No local ordinance to conflict with.
- **Bill history**: new draft of H.1564 (Sabadosa); reported from Housing 2026-03-12 (report filed 2026-03-06 by Rep. Haggerty), referred to House Ways and Means; **no further action** as of 2026-10-01.
- **Citation**: 194th General Court, H.5222 (proposed M.G.L. c.40Z)
- **Source doc id**: D045 · **Source URL**: https://malegislature.gov/Bills/194/H5222
- **Quoted span** (D045 line 11): `An Act relative to preventing algorithmic rent fixing in the rental housing market`
- **Supporting span** (D045 lines 43–44): `Bill reported favorably by committee and referred to the committee on` / `House Ways and Means`
- **Operative text (NOT IN CORPUS, from H5222 bill text)**: lessors may not "subscribe to, contract with or otherwise exchange anything of value in return for the services of a service provider." ; "No service provider shall facilitate an agreement to not compete among real estate lessors".
- **Confidence**: 0.93
- **Address-lookup facts needed**: state = MA; facility type for A/118 "ELDERLY HOME" (licensed LTC exclusion) → unknown.

---

## 2. BOSTON, MA — CITY LEVEL

### 2.1 rent_increase_limits

#### BOS-RENT-1 — Negative finding: no Boston rent cap (preempted by c.40P; home-rule petition failed)
- **Rule ID**: BOS-RENT-1
- **Jurisdiction**: Boston, MA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force (finding of absence)
- **Title**: Boston has no rent stabilization or rent increase limit
- **Requirement**: Boston's rent control ended 1 Jan 1995 under c.40P (St. 1994, c.368 / Question 9). The city cannot enact rent control without a special act of the Legislature; its 2023 home-rule petition (H.3744) was sent to study and died. No Boston ordinance limits rent increases.
- **Key value**: none
- **Coverage conditions**: all Boston addresses (incl. postal cities Dorchester, Roxbury, Mattapan, Jamaica Plain, Hyde Park, East Boston, South Boston, Charlestown, Brighton, Allston, Roslindale, West Roxbury).
- **Exemptions**: N/A.
- **Effective date**: 1995-01-01 (end of prior control)
- **Penalty / remedy**: N/A.
- **Interaction with other levels**: governed by MA-STATE-RENT-1; MA-STATE-RENT-P1 (failed) would have applied; BOS-RENT-P1 (failed) would have authorized a local cap.
- **Citation**: M.G.L. c.40P §4; H.3744 (193rd) study order
- **Source doc id**: D048 (preemption), D011 (failed petition) · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartI/TitleVII/Chapter40P/Section4
- **Quoted span** (D048): `No city or town may enact, maintain or enforce rent control of any kind`
- **Confidence**: 0.97
- **Address-lookup facts needed**: jurisdiction resolution of postal_city → Boston.

#### BOS-RENT-P1 — FAILED (not enacted): H.3744 home-rule petition for Boston rent stabilization and eviction protections
- **Rule ID**: BOS-RENT-P1 (also relevant to just_cause_eviction — see BOS-JCE-2)
- **Jurisdiction**: Boston, MA · **Level**: city · **Category**: rent_increase_limits
- **Status**: failed (sent to study order 2024-09-09; 193rd session expired 2025-01-01; not refiled in 194th). *If the team's pipeline prefers "pending/not enacted" per the task brief, note that either way nothing is in force.*
- **Title**: "An Act petition for a special law authorizing the city of Boston to implement rent stabilization and tenant eviction protections" (H.3744, 193rd General Court)
- **Requirement**: Would have authorized Boston to cap annual rent increases at CPI + 6% (max 10%), adopt just-cause eviction regulations with relocation payments for no-fault evictions, and regulate condo/co-op conversions. Approved by Boston City Council 11-2 on 2023-03-08 and by Mayor Wu; filed 2023-04-10; hearing 2023-11-14; repeatedly extended; accompanied study order H.5035 on 2024-09-09 (effectively killed).
- **Key value**: CPI + 6%, capped at 10% (never in force)
- **Coverage conditions (as proposed)**: Boston rental units.
- **Exemptions (as proposed)**: owner-occupied buildings ≤6 units; units ≤15 years old (new construction); hotels/temporary rentals; nonprofit, dormitory, public housing and voucher-program units (per news coverage, NOT IN CORPUS).
- **Effective date**: none.
- **Penalty / remedy**: N/A.
- **Interaction with other levels**: special-law exception to c.40P; would have been needed because of MA-STATE-RENT-1.
- **Citation**: 193rd General Court, H.3744 (HD.4216); study order H.5035
- **Source doc id**: D011 · **Source URL**: https://malegislature.gov/Bills/193/H3744
- **Quoted span** (D011 line 11): `An Act petition for a special law authorizing the city of Boston to implement rent stabilization and tenant eviction protections`
- **Supporting span** (D011 lines 69–70): `Accompanied a study order, see` / `H5035`
- **Confidence**: 0.95
- **Notes**: No 194th-session refile found (search of malegislature + news, Oct 2026). Mayor Wu pivoted to supporting IP 25-21 (struck). Statewide local-option bill H.2328 (Rogers/Montaño) also sent to study 2026-08-13 (H.5647).
- **Address-lookup facts needed**: none (not in force).

### 2.2 just_cause_eviction

#### BOS-JCE-1 — Housing Stability Notification Act: Notice of Tenants' Rights and Resources + city filing with every notice to quit / non-renewal (CBC 10-11)
- **Rule ID**: BOS-JCE-1
- **Jurisdiction**: Boston, MA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Housing Stability Notification Act (HSNA), City of Boston Code, Ordinances, Ch. X, §10-11
- **Requirement**: Any landlord or foreclosing owner ending a tenancy or post-foreclosure occupancy in Boston must deliver the City's Notice of Tenants' Rights and Resources (available in 12 languages) at the same time as the notice to quit or notice of non-renewal/expiration, and must file a copy of the notice to quit/non-renewal with tenant contact information and a certificate of compliance via the Office of Housing Stability's online portal. Rights cannot be waived. Non-compliance does not halt the eviction.
- **Key value**: notice-of-rights + city filing; $300/day after first warning
- **Coverage conditions**: all residential landlords/foreclosing owners in Boston, any building size (incl. owner-occupied, single units).
- **Exemptions**: residences in a hospital, skilled nursing facility or health facility; non-profit facilities whose primary purpose is short-term treatment/assistance/therapy for alcohol, drug or substance abuse.
- **Effective date**: 2020-11-06 (passed October 2020; amended Aug 2021)
- **Penalty / remedy**: enforced by Inspectional Services on referral from Office of Fair Housing and Equity: 1st offense warning; 2nd and subsequent offenses $300 per day (Sec. 10-11.7); failure to file with City also up to $300/day. Does NOT stop the eviction.
- **Interaction with other levels**: stacks on c.186 §§11, 12, 31 notices (MA-STATE-JCE-2/3). Provides no substantive just-cause requirement (see BOS-JCE-2).
- **Citation**: City of Boston Code, Ordinances, Ch. X, §10-11 (10-11.1–10-11.7), "Housing Stability Notification Act"
- **Source doc id**: D013, D014 · **Source URL**: https://www.boston.gov/housing-stability-notification-act ; https://www.boston.gov/sites/default/files/file/2020/11/Housing%20Stability%20Notification%20Act%20Tenant%20FAQs.pdf
- **Quoted span** (D013 line 41): `The Housing Stability Notification Act requires any landlord to provide renters with a Notice of Tenant’s Rights and Resources when planning to end a tenancy agreement.`
- **Supporting span** (D014 line 38): `The HSNA becomes effective on November 6, 2020.`
- **Supporting span** (D013 line 88): `Failure to submit this information may result in a fine up to $300 per day.`
- **Supporting span** (D013 line 106): `Housing Stability Notification Act (Sec. 10-11.7)`
- **Confidence**: 0.96
- **Address-lookup facts needed**: jurisdiction = Boston. Facility type (A/118 "ELDERLY HOME" — if a skilled nursing/health facility → exempt; otherwise applies) → "unknown" for that row.

#### BOS-JCE-2 — Negative finding: Boston has no just-cause eviction ordinance
- **Rule ID**: BOS-JCE-2
- **Jurisdiction**: Boston, MA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force (finding of absence)
- **Title**: No just-cause eviction requirement in Boston
- **Requirement**: Boston cannot regulate evictions through rent-control regulation (c.40P §4(b)) and has no general home-rule authority to impose just-cause requirements without a special act; its 2017–2018 "Jim Brooks Community Stabilization Act" petition and 2023 H.3744 petition both failed. Only notice-of-rights (HSNA) and, narrowly, the Boston condominium-conversion ordinance (CBC 10-2, tenant notice/relocation on conversion — NOT IN CORPUS) exist.
- **Key value**: none
- **Coverage conditions**: all Boston addresses. **Exemptions**: N/A.
- **Effective date**: N/A · **Penalty / remedy**: N/A.
- **Interaction with other levels**: governed by MA-STATE-JCE-1..4; BOS-RENT-P1 would have authorized just cause.
- **Citation**: M.G.L. c.40P §4(b); H.3744 (failed)
- **Source doc id**: D011; D014 (HSNA FAQ states it does not stop evictions) · **Source URL**: https://malegislature.gov/Bills/193/H3744
- **Quoted span** (D014 line 103): `If a landlord violates the HSNA, it DOES NOT halt the eviction process.`
- **Confidence**: 0.93
- **Address-lookup facts needed**: subsidized status (A/125 rows: program good-cause rules → unknown).

### 2.3 security_deposits

#### BOS-DEP-1 — Negative finding: no Boston security-deposit rule; state c.186 §15B governs
- **Rule ID**: BOS-DEP-1
- **Jurisdiction**: Boston, MA · **Level**: city · **Category**: security_deposits
- **Status**: in_force (finding of absence)
- **Title**: No local deposit cap, interest rate or handling rule in Boston
- **Requirement**: Boston has no ordinance on security deposits; M.G.L. c.186 §15B (1-month cap, separate account, 5% interest, 30-day return, treble damages) applies uniformly. Boston's Office of Housing Stability publishes only state-law guidance.
- **Key value**: none (state: 1 month)
- **Coverage conditions / Exemptions**: N/A.
- **Effective date**: N/A · **Penalty / remedy**: N/A.
- **Interaction with other levels**: MA-STATE-DEP-1..3 apply.
- **Citation**: absence (City of Boston Code Ch. X contains no deposit provision); M.G.L. c.186 §15B
- **Source doc id**: D052 (state rule) · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartII/TitleI/Chapter186/Section15B
- **Quoted span** (D052): `(iii) a security deposit equal to the first month's rent provided that such security deposit is deposited as required by subsection (3)`
- **Confidence**: 0.95
- **Notes**: Searched boston.gov and amlegal Boston code; nothing on deposits beyond state-law explainers.
- **Address-lookup facts needed**: none.

### 2.4 application_screening_fees

#### BOS-FEE-1 — Negative finding: no Boston application/broker fee ordinance; state law governs
- **Rule ID**: BOS-FEE-1
- **Jurisdiction**: Boston, MA · **Level**: city · **Category**: application_screening_fees
- **Status**: in_force (finding of absence)
- **Title**: No local fee rule in Boston
- **Requirement**: Boston has not enacted any ordinance on application, screening or broker fees. The state closed list in c.186 §15B(1)(b) and the 2025 broker-fee amendment to c.112 §87DDD½ apply; Boston's Office of Housing Stability page "Broker Fees: What To Know About The New Law" merely explains the state rule.
- **Key value**: none (state: $0 application fee; landlord pays landlord-hired broker)
- **Coverage conditions / Exemptions**: N/A. **Effective date**: N/A. **Penalty / remedy**: N/A.
- **Interaction with other levels**: MA-STATE-FEE-1..3 apply.
- **Citation**: absence; M.G.L. c.186 §15B(1)(b); c.112 §87DDD½
- **Source doc id**: D057 (state rule) · **Source URL**: https://www.boston.gov/departments/housing/office-housing-stability/broker-fees-3-things-know-about-new-law (NOT IN CORPUS) ; https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXVI/Chapter112/Section87DDD%201~2
- **Quoted span** (D057): `Any fee shall only be paid by the party, lessor or tenant who originally engaged and entered into a contract with the licensed broker or salesperson.`
- **Confidence**: 0.95
- **Address-lookup facts needed**: none.

### 2.5 screening_restrictions

#### BOS-SCR-1 — Boston Fair Housing Commission: discrimination ban incl. "Rental Assistance" (Section 8), gender expression, military status
- **Rule ID**: BOS-SCR-1
- **Jurisdiction**: Boston, MA · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: Boston Fair Housing Regulations / Fair Housing Commission enforcement (City of Boston Code Ch. X, §10-3; Commission regulations)
- **Requirement**: In Boston it is illegal to discriminate in renting (or selling/financing) housing on the basis of race, color, religion, disability, national origin, ancestry, sex, gender identity, gender expression, age, sexual orientation, marital status, rental assistance (e.g., Section 8, SSDI or veterans vouchers), family status, or military status. Telling a prospect "we don't accept rental assistance", steering, false unavailability, lead-paint-based refusal of families, or different fees/terms are listed examples. Complaints go to the Boston Fair Housing Commission (a HUD Fair Housing Assistance Program agency).
- **Key value**: 15 protected classes incl. rental assistance
- **Coverage conditions**: all housing in the City of Boston.
- **Exemptions**: Boston regulations track state/federal exemptions (owner-occupied small buildings for certain classes) — the corpus page lists none; treat as "see state c.151B exemptions" with low confidence.
- **Effective date**: Commission est. 1982 (St. 1982, c.? / CBC 10-3); regulations amended periodically — date not in corpus.
- **Penalty / remedy**: Commission investigation, conciliation, hearing; damages and civil penalties under Commission regulations (amounts not in corpus); referral to MCAD/HUD.
- **Interaction with other levels**: parallels MA-STATE-SCR-1/2 (c.151B §4(6),(7),(10)); adds explicit "gender expression" and "military status"; state law governs outside Boston.
- **Citation**: City of Boston Code, Ordinances, Ch. X, §10-3 (Boston Fair Housing Commission) and Boston Fair Housing Commission Regulations (cite per boston.gov page)
- **Source doc id**: D012 · **Source URL**: https://www.boston.gov/departments/fair-housing-and-equity/boston-fair-housing-regulations
- **Quoted span** (D012 line 60): `In the City of Boston, it’s illegal to discriminate when renting, buying, selling, or securing financing for any housing.`
- **Supporting span** (D012 line 88): `The landlord tells you they don't accept rental assistance. This includes Section`
- **Confidence**: 0.85
- **Notes / open questions**: The corpus page is a summary; the exact ordinance/regulation section numbers and penalty schedule are not in corpus → confidence reduced. Protected list in corpus: Race, Color, Religion, Disability, National Origin, Ancestry, Sex, Gender Identity, Gender Expression, Age, Sexual Orientation, Marital Status, Rental Assistance, Family Status, Military Status.
- **Address-lookup facts needed**: jurisdiction = Boston.

#### BOS-SCR-2 — Boston Fair Chance Tenant Selection Policy (DND, Feb 2017): criminal-history and credit-score limits for city-funded / IDP units only
- **Rule ID**: BOS-SCR-2
- **Jurisdiction**: Boston, MA · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force (administrative policy, not an ordinance)
- **Title**: Boston Fair Chance Tenant Selection Policy (Department of Neighborhood Development, now Mayor's Office of Housing; February 2017)
- **Requirement**: Housing providers that receive DND funding and/or land, or have income-restricted units under the BPDA Inclusionary Development Policy, may not impose blanket criminal-history bans and must do individualized review; they must not consider arrests without conviction, sealed/expunged/relieved convictions, juvenile records, or convictions more than 5 years old (unless directly related to the housing/safety risk); must not use credit *scores* to approve/deny, and may use credit *history* only in lieu of rental history; lack of credit history is not a basis for rejection; must consider mitigating evidence and (where feasible) offer an appeal. Also applied to the Office of Fair Housing and Equity Affirmative Marketing Program.
- **Key value**: 5-year conviction look-back; no credit-score screening
- **Coverage conditions**: ONLY housing providers receiving DND funding/land or with IDP income-restricted units (plus affirmative-marketing program participants). Not applicable to purely private market-rate buildings.
- **Exemptions**: direct relationship between conviction and housing sought / unreasonable risk of substantial harm; current criminal behavior; conflicting federal or state criminal-history requirements preempt (e.g., HUD lifetime sex-offender registration and methamphetamine-production bars).
- **Effective date**: 2017-02 (policy date "February 2017")
- **Penalty / remedy**: contractual / funding-condition enforcement by DND/MOH; no statutory penalty.
- **Interaction with other levels**: operates within 803 CMR 5.00 procedures (MA-STATE-SCR-4); narrower than a fair-chance ordinance; Boston has no general fair-chance housing ordinance for private landlords.
- **Citation**: City of Boston DND, "Boston Fair Chance Tenant Selection Policy" (Feb. 2017)
- **Source doc id**: D010 · **Source URL**: https://drive.google.com/file/d/1j4U3fDtmnYuwcUWhx5BMUcXc1bnKT8Ku/view?usp=sharing
- **Quoted span** (D010 line 20, within-line substring): `Inclusionary Development Policy will not impose a blanket policy that denies`
- **Supporting span** (D010 line 32): `d) A conviction more than 5 years old. Tenant selection policy related to arrests and`
- **Supporting span** (D010 line 100): `a) The agent agrees not to use the applicant credit score to approve or deny housing`
- **Confidence**: 0.85
- **Notes**: D010 is a Google-Drive PDF capture labelled "official city-linked policy"; it is a funding-condition policy, not codified law. Lines in D010 carry trailing spaces — match on within-line substrings.
- **Address-lookup facts needed**: whether the property has DND funding or IDP units — NOT in sample data (use_code A/125 "SUBSD HOUSING S- 8" suggests subsidy but not necessarily DND/IDP) → result "unknown" for Boston rows; "A/" rows also lack unit counts.

### 2.6 algorithmic_rent_setting

#### BOS-ALG-1 — Negative finding: no Boston ordinance on algorithmic rent setting (hearing order only)
- **Rule ID**: BOS-ALG-1
- **Jurisdiction**: Boston, MA · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: in_force (finding of absence)
- **Title**: Boston has not enacted an algorithmic rent-pricing ordinance
- **Requirement**: As of 2026-10-01 the Boston City Council has only adopted hearing orders — Docket #0251 (filed for the 2025-01-15 meeting): "Order for a hearing to investigate the use, impact, and potential ban of algorithmic price setting in the Boston rental housing market" — and, per industry press, ordered a study in January 2026. No ordinance text has been filed or passed. Boston has no home-rule barrier to such an ordinance (it would rest on police power, like Providence's), so the absence is a policy choice, not preemption.
- **Key value**: none
- **Coverage conditions / Exemptions**: N/A. **Effective date**: N/A. **Penalty / remedy**: N/A.
- **Interaction with other levels**: If S.2983/H.5222 (MA-STATE-ALG-P1/P2) pass, they would cover Boston. Boston Docket #0695 (Sept 2026) concerns the Assessment of Fair Housing, not algorithms.
- **Citation**: absence; Boston City Council Docket #0251 (Jan. 15, 2025 agenda)
- **Source doc id**: none (NOT IN CORPUS) · **Source URL**: https://boston.legistar.com/View.ashx?G=AC4A50E2-9128-4EA8-8ACF-04F7A6E02E82&GUID=3466D2E0-2586-4C39-8AA8-9F34C938FCAA&ID=1270688&M=A
- **Quoted span**: NOT IN CORPUS — "0251 Order for a hearing to investigate the use, impact, and potential ban of algorithmic price setting in the Boston rental housing market."
- **Confidence**: 0.9
- **Address-lookup facts needed**: none.

---

## 3. CAMBRIDGE, MA — CITY LEVEL

### 3.1 rent_increase_limits

#### CAM-RENT-1 — Negative finding: no Cambridge rent cap (rent control abolished 1995; preempted by c.40P)
- **Rule ID**: CAM-RENT-1
- **Jurisdiction**: Cambridge, MA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force (finding of absence)
- **Title**: Cambridge has no rent control or rent increase limit
- **Requirement**: Cambridge's rent control (1970–1994) was abolished effective 1995-01-01 by the statewide Question 9 / c.40P. Cambridge may not enact rent control without a special act; none has been granted. No Cambridge ordinance limits rent increases. IP 25-21 would have restored a statewide cap but was struck.
- **Key value**: none
- **Coverage conditions**: all Cambridge addresses. **Exemptions**: N/A.
- **Effective date**: 1995-01-01 · **Penalty / remedy**: N/A.
- **Interaction with other levels**: MA-STATE-RENT-1 (preemption); MA-STATE-RENT-P1 (failed).
- **Citation**: M.G.L. c.40P §4
- **Source doc id**: D048 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartI/TitleVII/Chapter40P/Section4
- **Quoted span** (D048): `No city or town may enact, maintain or enforce rent control of any kind`
- **Confidence**: 0.97
- **Notes**: Cambridge legislators (Rep. Rogers) sponsored statewide local-option bill H.2328 — sent to study 2026-08-13. T5: never report a rent cap for Cambridge.
- **Address-lookup facts needed**: jurisdiction = Cambridge (postal_city "Cambridge" in all 50 rows).

### 3.2 just_cause_eviction

#### CAM-JCE-1 — Tenants' Rights and Resources Notification Ordinance (CMC ch. 8.71): information packet at lease start and at any termination step
- **Rule ID**: CAM-JCE-1
- **Jurisdiction**: Cambridge, MA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Cambridge Municipal Code Chapter 8.71 — Tenants' Rights and Resources Notification Ordinance
- **Requirement**: Owners, landlords and management companies must give every tenant/lawful occupant (including tenants at will) the City's Tenants' Rights and Resources information packet (multilingual) when a lease is signed / tenancy begins / first month's rent is tendered, and again whenever legal steps to terminate a tenancy are taken (notice to quit, summary process). Renewals do not re-trigger. No signature required. Does not restrict grounds for eviction.
- **Key value**: notice packet; $300 per day of violation
- **Coverage conditions**: all residential rental agreements in Cambridge, including a single unit in an owner-occupied building.
- **Exemptions**: units in a hospital, skilled nursing facility or health facility; non-profit facility whose primary purpose is short-term substance-abuse treatment (Sec. 8.71.030 definition); Short-Term Rental Units under Zoning Ord. Art. 4 §4.60.
- **Effective date**: 2020-10-14 (passed by City Council 2020-09-14; effective 30 days later)
- **Penalty / remedy**: Sec. 8.71.070 — fine of $300 for each day's violation.
- **Interaction with other levels**: stacks on c.186 §§11, 12, 31 (MA-STATE-JCE-2/3); analogous to Boston HSNA (BOS-JCE-1) but also required at tenancy *start* and without a city-filing duty.
- **Citation**: Cambridge Municipal Code ch. 8.71 (8.71.030 definitions; 8.71.070 Violation Penalty)
- **Source doc id**: D031 · **Source URL**: https://www.cambridgema.gov/tenantrights
- **Quoted span** (D031 line 24): `The City of Cambridge Tenants Rights and Resources Ordinance, Chapter 8.71 of the Cambridge Municipal Code was established to inform and educate both residential tenants and landlords in Cambridge of their rights and responsibilities as a landlord or tenant.`
- **Supporting span** (D031 line 49): `You may be fined $300 for each day’s violation.`
- **Supporting span** (D031 line 40): `This Ordinance does not prevent a landlord from initiating an eviction action if otherwise allowed by law.`
- **Confidence**: 0.95
- **Address-lookup facts needed**: jurisdiction = Cambridge; facility type (none of the 50 Cambridge rows look like health facilities — all use codes 111/112 apartments).

#### CAM-JCE-2 — Negative finding: no just-cause eviction ordinance in Cambridge
- **Rule ID**: CAM-JCE-2
- **Jurisdiction**: Cambridge, MA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force (finding of absence)
- **Title**: No just-cause requirement in Cambridge
- **Requirement**: Cambridge cannot regulate eviction grounds through rent control (c.40P §4(b)) and has adopted no just-cause ordinance; ch. 8.71 expressly preserves landlords' right to evict "if otherwise allowed by law". State notice/retaliation rules govern.
- **Key value**: none · **Coverage conditions / Exemptions**: N/A · **Effective date**: N/A · **Penalty / remedy**: N/A
- **Interaction with other levels**: MA-STATE-JCE-1..4 apply.
- **Citation**: M.G.L. c.40P §4(b); CMC ch. 8.71 (preserves eviction rights)
- **Source doc id**: D031, D048 · **Source URL**: https://www.cambridgema.gov/tenantrights
- **Quoted span** (D031 line 40): `This Ordinance does not prevent a landlord from initiating an eviction action if otherwise allowed by law.`
- **Confidence**: 0.93
- **Address-lookup facts needed**: none.

### 3.3 security_deposits

#### CAM-DEP-1 — Negative finding: no Cambridge security-deposit rule; state c.186 §15B governs
- **Rule ID**: CAM-DEP-1
- **Jurisdiction**: Cambridge, MA · **Level**: city · **Category**: security_deposits
- **Status**: in_force (finding of absence)
- **Title**: No local deposit rule in Cambridge
- **Requirement**: Cambridge has no ordinance on deposits; the Cambridge tenant-rights packet simply restates M.G.L. c.186 §15B (1-month cap, separate account, interest, 30-day return).
- **Key value**: none (state: 1 month) · **Coverage / Exemptions**: N/A · **Effective date**: N/A · **Penalty / remedy**: N/A
- **Interaction with other levels**: MA-STATE-DEP-1..3.
- **Citation**: absence; M.G.L. c.186 §15B
- **Source doc id**: D052 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartII/TitleI/Chapter186/Section15B
- **Quoted span** (D052): `(d) No lessor or successor in interest shall at any time subsequent to the commencement of a tenancy demand rent in advance in excess of the current month's rent or a security deposit in excess of the amount allowed by this section.`
- **Confidence**: 0.95
- **Address-lookup facts needed**: none.

### 3.4 application_screening_fees

#### CAM-FEE-1 — Negative finding: no Cambridge application/broker fee ordinance; state law governs
- **Rule ID**: CAM-FEE-1
- **Jurisdiction**: Cambridge, MA · **Level**: city · **Category**: application_screening_fees
- **Status**: in_force (finding of absence)
- **Title**: No local fee rule in Cambridge
- **Requirement**: No Cambridge ordinance addresses application, screening or broker fees; c.186 §15B(1)(b) and c.112 §87DDD½ apply.
- **Key value**: none (state: $0 application fee; landlord pays landlord-hired broker) · **Coverage / Exemptions**: N/A · **Effective date**: N/A · **Penalty / remedy**: N/A
- **Interaction with other levels**: MA-STATE-FEE-1..3.
- **Citation**: absence; M.G.L. c.186 §15B(1)(b); c.112 §87DDD½
- **Source doc id**: D052, D057 · **Source URL**: https://malegislature.gov/Laws/GeneralLaws/PartII/TitleI/Chapter186/Section15B
- **Quoted span** (D052): `(b) At or prior to the commencement of any tenancy, no lessor or agent of the lessor may require a tenant or prospective tenant to pay, to the lessor or to an agent of the lessor, any amount in excess of the following:`
- **Confidence**: 0.95
- **Address-lookup facts needed**: none.

### 3.5 screening_restrictions

#### CAM-SCR-1 — Cambridge Fair Housing Ordinance (CMC ch. 14.04) and Human Rights Ordinance (ch. 2.76): source of income + 15 protected classes; owner-occupied 2-family exemption
- **Rule ID**: CAM-SCR-1
- **Jurisdiction**: Cambridge, MA · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: Cambridge Fair Housing Ordinance — discrimination in viewing/renting, terms, advertising, reasonable accommodation
- **Requirement**: In Cambridge it is unlawful to discriminate in real-estate transactions (viewing or renting an apartment, terms and conditions of tenancy, refusing reasonable accommodation absent undue hardship, advertising) on the basis of disability, race, color, national origin or ancestry, family status, source of income (expressly including Section 8 and public benefits), marital status, sex, gender identity or expression, sexual orientation, age, religious creed, military status, relationship status, or family structure. Landlords may apply any reasonable, uniformly applied standard (ability to pay rent; ability to care for the unit and respect others' rights).
- **Key value**: source of income (Section 8) protected; civil fines up to $300 per violation
- **Coverage conditions**: all housing in Cambridge.
- **Exemptions**: owner-occupied two-family dwellings (`NOTE: there is an exemption for 2-family dwellings, when the owner lives there`).
- **Effective date**: Commission est. 1984; "relationship status" and "family structure" added via home-rule act (St. 2018/H.4926) — exact effective date not in corpus.
- **Penalty / remedy**: Cambridge Human Rights Commission investigation → conciliation → public hearing; remedies include criminal complaint in District Court, civil fines up to $300 per violation, Superior Court injunctive relief, damages and expenses; either party may remove a Fair Housing Ordinance case to Superior Court or to the AG.
- **Interaction with other levels**: parallels MA-STATE-SCR-1/2 (c.151B §4(10), (6), (7)) with local enforcement; adds relationship status / family structure.
- **Citation**: Cambridge Municipal Code ch. 14.04 (Fair Housing; 14.04.030 definitions; 14.04.040 unlawful practices); ch. 2.76 (Human Rights)
- **Source doc id**: D029 · **Source URL**: https://www.cambridgema.gov/departments/humanrightscommission
- **Quoted span** (D029 line 68): `Source of Income, includes Section 8 and public benefits`
- **Supporting span** (D029 line 101): `NOTE: there is an exemption for 2-family dwellings, when the owner lives there`
- **Supporting span** (D029 line 88): `levying civil fines of up to $300 for each violation`
- **Confidence**: 0.9
- **Address-lookup facts needed**: unit count (all 50 Cambridge sample rows ≥4 units → exemption cannot apply); owner-occupancy (not in data; irrelevant for ≥3 units).

#### CAM-SCR-2 — Negative finding: no Cambridge fair-chance / criminal-history or credit-screening ordinance
- **Rule ID**: CAM-SCR-2
- **Jurisdiction**: Cambridge, MA · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force (finding of absence)
- **Title**: No local limits on criminal-history or credit screening in Cambridge
- **Requirement**: Cambridge has no ordinance limiting landlord use of criminal records, credit scores or income ratios (contrast Berkeley/SF fair-chance ordinances and Boston's funding-conditioned policy). State 803 CMR 5.00 procedures and c.239 §16 sealing apply; the Fair Housing Ordinance permits "any reasonable standard" applied uniformly.
- **Key value**: none · **Coverage / Exemptions**: N/A · **Effective date**: N/A · **Penalty / remedy**: N/A
- **Interaction with other levels**: MA-STATE-SCR-4/5/6.
- **Citation**: absence; CMC ch. 14.04 (reasonable-standard language)
- **Source doc id**: D029 · **Source URL**: https://www.cambridgema.gov/departments/humanrightscommission
- **Quoted span** (D029 line 98): `Under the law, landlords, sellers and rental agents may use any reasonable standard to determine which applicants are selected, as long as that standard is applied equally and uniformly to all applicants.`
- **Confidence**: 0.9
- **Address-lookup facts needed**: none.

### 3.6 algorithmic_rent_setting

#### CAM-ALG-1 — Negative finding: no Cambridge ordinance on algorithmic rent setting in force
- **Rule ID**: CAM-ALG-1
- **Jurisdiction**: Cambridge, MA · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: in_force (finding of absence)
- **Title**: Cambridge has not ordained an algorithmic rent-pricing ban (as of 2026-10-01)
- **Requirement**: No Cambridge Municipal Code provision restricts algorithmic rent-setting. The only action is a City Council policy order (unanimous, meeting of Mon. 2026-06-22, reported 2026-06-25) directing the City Manager to return policy options or ordinance language "later this term". No ordinance has been filed to the Ordinance Committee or ordained per searches through 2026-10-01.
- **Key value**: none · **Coverage / Exemptions**: N/A · **Effective date**: N/A · **Penalty / remedy**: N/A
- **Interaction with other levels**: MA-STATE-ALG-P1/P2 would cover Cambridge if enacted. **WARNING**: the hackathon will release a FICTIONAL Cambridge algorithmic-pricing ordinance at hour 16 — do not pre-populate; this record reflects real-world status only.
- **Citation**: absence; Cambridge City Council policy order (June 2026, Sobrinho-Wheeler)
- **Source doc id**: D030 (link-only) · **Source URL**: https://www.cambridgeday.com/?p=158097 (resolves to https://www.cambridgeday.com/2026/06/25/council-airbnb-rental-algorithms/)
- **Quoted span**: NOT IN CORPUS — Cambridge Day (2026-06-25): the council "unanimously passed a policy order initiating steps to ban residential property management companies from contracting companies that use algorithmic and AI-driven models to recommend what they should charge for rent."
- **Confidence**: 0.9
- **Address-lookup facts needed**: none.

#### CAM-ALG-P1 — PENDING (pre-ordinance): Cambridge City Council policy order to develop an algorithmic rent-pricing ban (June 2026)
- **Rule ID**: CAM-ALG-P1
- **Jurisdiction**: Cambridge, MA · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: pending
- **Title**: Policy order (lead sponsor Councillor Jivan Sobrinho-Wheeler) directing the City Manager to prepare options/ordinance language prohibiting property managers from contracting with algorithmic rent-recommendation vendors
- **Requirement (as contemplated)**: Would prohibit residential property management companies in Cambridge from contracting with firms using algorithmic/AI models to recommend rents (framed as third-party-facilitated price fixing). No draft text, penalty, coverage thresholds or exemptions exist yet.
- **Key value**: none yet
- **Coverage conditions (if enacted)**: presumably all Cambridge residential rentals — unknown.
- **Exemptions**: unknown.
- **Effective date**: none.
- **Penalty / remedy**: unknown.
- **Interaction with other levels**: would sit beneath any enacted S.2983/H.5222; Cambridge Day notes the order follows Berkeley and Providence and cites pending H.1564/S.2983.
- **Citation**: Cambridge City Council policy order, June 22, 2026 meeting (order number not reported)
- **Source doc id**: D030 (link-only) · **Source URL**: https://www.cambridgeday.com/?p=158097
- **Quoted span**: NOT IN CORPUS — "Sobrinho-Wheeler confirmed that this type of software is actively being used by property managers in Cambridge."
- **Confidence**: 0.75 (existence of order certain; content speculative; no ordinance filed)
- **Notes**: This is a council directive, not a bill; a strict pipeline may omit it from rules.json and keep only CAM-ALG-1. Included so change-tracking can watch for the real ordinance; do not confuse with the fictional hour-16 release.
- **Address-lookup facts needed**: none.

---

## 4. Address-lookup facts needed (MA sample: 60 Boston rows, 50 Cambridge rows)

| Fact | Needed by | Availability in `data/sample_addresses.csv` |
|---|---|---|
| Legal city (Boston vs Cambridge) | all BOS-*/CAM-* rules | Boston rows use postal_city Boston, Dorchester, Roxbury, Mattapan, Jamaica Plain, Hyde Park, East Boston, South Boston (all within City of Boston); Cambridge rows "Cambridge". Resolve via Census Geocoder; no MA row is outside the two cities. |
| State = MA | MA-STATE-* and T4/T5 | present (`state` column). |
| Unit count | c.151B §4(6) vs §4(7)/(11) small-owner exemptions; Cambridge 2-family exemption | **Boston `A/` use-code rows have no unit count** (use_description gives bands: "APT 7-30 UNITS", "SUBSD HOUSING S- 8", "LUXURY APARTMENT", "ELDERLY HOME"); Cambridge rows have exact units (5–468). Treat "APT 7-30 UNITS" as ≥7 → exemptions inapplicable; otherwise "unknown". |
| Owner-occupancy | c.151B §4(7), §4(11) exemptions; Cambridge 14.04 exemption | never in data → "unknown" only when units ≤2 (no MA sample rows). |
| Subsidized / Section 8 status | program good-cause rules; 803 CMR 5.05 track; c.151B §4(10) relevance | Boston use_code A/125 "SUBSD HOUSING S- 8" (≈20 rows) implies subsidy; not available for Cambridge. |
| DND funding / IDP units | BOS-SCR-2 | not in data → "unknown". |
| Facility type (hospital / SNF / health facility; licensed LTC) | HSNA & ch. 8.71 exemptions; H.5222 exclusion | Boston A/118 "ELDERLY HOME" (1 row, Jamaica Plain, 2004) → "unknown". |
| Year built | none of the MA rules use building age (IP 25-21 <10-yr exemption and H.3744 new-construction exemption are failed) | present for most rows; irrelevant for in-force MA rules. |
| Tenancy type / lease vs at-will; vacation ≤100 days | notice periods; §15B(9) exemption | not in data; sample is multifamily assessor data → assume non-vacation; notice period "unknown". |

## 5. Change-test notes

- **T4 (MA-ALG-P1 = MA-STATE-ALG-P1 / S.2983; MA-ALG-P2 = MA-STATE-ALG-P2 / H.5222)**: report `pending` for every Boston and Cambridge address on 2026-10-01. If enacted: affected = all 110 MA addresses (statewide; no size/age thresholds). Optional conflict flag: none (no local algorithmic ordinance exists in Boston or Cambridge). H.5222's facility exclusion could make the single A/118 "ELDERLY HOME" row "unknown".
- **T5 (MA-RENT-P1 = MA-STATE-RENT-P1 / IP 25-21)**: status `failed`; affected set empty; no rent cap at MA, Boston or Cambridge (c.40P in force). Also mark BOS-RENT-P1 (H.3744) as failed/not in force.

## 6. Sources consulted online (beyond corpus)
- malegislature.gov S.2983.Html and H5222 bill text (operative provisions); bill pages for H.1564, S.994, S.1016, H.2328.
- WBUR 2026-06-23 (D059); massrealestatelawblog Cella v. AG (D055); Shelterforce / WGBH / Bisnow on ballot question.
- MassLandlords application-fee article (D054); mass.gov broker-fee FAQ; Board of Registration guidance; boston.gov broker-fee page.
- Cornell LII 803 CMR 5.00 TOC, 5.04, 5.14; MassLandlords CORI adverse-action form.
- malegislature.gov c.239 §16; Boston Bar Association and MassLegalHelp on eviction sealing.
- Boston Legistar agenda 2025-01-15 (Docket #0251); boston.gov Docket #0695 notice; amlegal Boston Code Ch. X §10-11.
- Cambridge Day 2026-06-25 (D030); cambridgema.gov 2020 ch. 8.71 release; Cambridge Fair Housing brochure; H.4926 (Cambridge fair-housing home-rule).
- EOHLC regulations index (no fee-in-lieu regulation adopted).


---

# PART 3 — SAN DIEGO, BERKELEY

# Rule extraction — San Diego, CA and Berkeley, CA (city level)

Query date: **2026-10-01**. Corpus retrieved 2026-10-01. Not legal advice.

Corpus docs read in full: D073, D076 (San Diego); D001, D003, D004, D005, D006, D007, D008, D009 (Berkeley).
Link-only docs fetched: D002 (Morgan Lewis, Aug 2026), D074 (gocodebook SDMC §98.1103 — page also carries the whole Ch. 9 Art. 8, incl. Div. 8), D075 (gocodebook SDMC Div. 8 source of income), D077 (Legal Aid Society of San Diego TPO fact sheet).
Supplementary official sources: Berkeley Ord. 7,950-N.S. (Measure BB, codified BMC ch. 13.76, Rent Board PDF); Berkeley City Attorney report 2025-11-18 (Item 04, history of ch. 13.63 incl. Ords. 7,956 / 7,974 / 7,992); Rent Board pages (security-deposit interest calculator, OMI, Ellis, just cause, 2026 AGA news); Berkeley Fair Chance FAQ for owners (PDF).

Quoted spans marked **[CORPUS]** are copied character-for-character from the corpus text file named (single-line spans chosen so they string-match despite PDF line wrapping; curly apostrophes `’` preserved). Spans marked **NOT IN CORPUS** come from online sources.

**Data-gap facts (from README §4.1 and data/sample_addresses.csv):** San Diego rows (50) have `units` (6–88 in sample) but **no `year_built`**. Berkeley rows (40) have **no `year_built` and no `units`** (Alameda use codes 7700/7200 are labelled "5+ units" by the dataset). No owner names anywhere.

---

## PART A — SAN DIEGO, CA

### Category 1 — rent_increase_limits

#### SD-RENT-1 — No city rent-increase cap; state AB 1482 governs
- **Rule ID**: SD-RENT-1
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: rent_increase_limits
- **Status** (2026-10-01): in_force (as a "no local rule" finding; the governing rule is state law)
- **Title**: No San Diego municipal rent control / rent-increase limit — California Tenant Protection Act (Civ. Code §1947.12) applies
- **Requirement**: The City of San Diego has not enacted a rent stabilization or rent-increase cap ordinance; the only city text touching rent increases is a mandatory tenant notice that points to the state cap (Civ. Code §1947.12: 5% + CPI, max 10%/yr).
- **Key value**: none at city level (state: lesser of 5% + regional CPI or 10% per 12 months; San Diego-area cap published by CAA was 8.8% for 2025-08-01→2026-07-31; a secondary source title cites 8.2% for 2026-27 — unverified)
- **Coverage conditions**: N/A (no city rule). State cap covers units with a CO issued >15 years before the increase, excluding separately alienable SFH/condos held by non-corporate owners with notice, etc.
- **Exemptions**: N/A at city level
- **Effective date**: N/A (SDMC Div. 7 notice provision effective 2023-06-24)
- **Penalty / remedy**: N/A at city level
- **Interaction with state law**: State AB 1482 (Civ. Code §1947.12) is the operative cap; Costa-Hawkins (Civ. Code §1954.50 et seq.) would also bar city control of post-1995 units and SFH/condos. Result for every San Diego address = state rule applies; city = "no rule at this level".
- **Citation**: SDMC §98.0705(a) (notice text referencing Civ. Code §1947.12); absence of any SDMC rent-control division in Ch. 9 Art. 8 (Divs. 7, 8, 9, 11, 12 reviewed on gocodebook mirror)
- **Source doc id**: D073 · **Source URL**: https://docs.sandiego.gov/municode/municodechapter09/ch09art08division07.pdf
- **Quoted span** [CORPUS D073]: `California law limits the amount your rent can be increased. See`
- **Confidence**: 0.95 · **Notes**: The city's own mandated notice confirms reliance on state law. Secondary sources (steadily.com, choosermg.com, calandlordlaws.com) all state San Diego has no local rent control. Reasoning for "no rule": corpus manifest lists only Div. 7 (tenant protections), Div. 8 (source of income), Div. 11 (algorithmic) for San Diego; gocodebook mirror of Ch. 9 Art. 8 shows no rent stabilization division.
- **Address-lookup facts needed**: none for the city finding (applies regardless). For the state cap, CO date/year built is needed (15-year exemption) — **San Diego rows have no year_built → state-cap applicability = unknown**.

#### SD-RENT-2 — Mandatory written notice of tenant protections (references state rent cap)
- **Rule ID**: SD-RENT-2
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Notice to Tenant of Residential Tenant Protections (SDMC §98.0705) + Tenant Protection Guide
- **Requirement**: Landlords of covered residential rental property must give tenants a written notice (≥12-pt font, Civ. Code §1632-compliant) stating that California law limits rent increases (Civ. Code §1947.12), that local law requires a statement of cause in any termination notice, and that seniors (62+)/disabled may have additional protections; the SDHC Tenant Protection Guide must be attached.
- **Key value**: 12-point font; existing tenancies (pre-2023-06-24) had to receive it within 90 days of 2023-06-24; tenancies commencing/renewed on/after 2023-06-24 must have it in the lease or as a signed notice at lease signing.
- **Coverage conditions**: All residential rental property subject to Div. 7 (see SD-JCE-1 coverage).
- **Exemptions**: Same as §98.0703 (see SD-JCE-1).
- **Effective date**: 2023-06-24 (O-21647 N.S., adopted 5-25-2023)
- **Penalty / remedy**: §98.0710 — failure to comply with any provision of the Division voids any notice of termination; §98.0709 civil remedies.
- **Interaction with state law**: Supplements Civ. Code §1946.2(f)/§1947.12 state notice requirements.
- **Citation**: SDMC §98.0705(a)–(d); §98.0710
- **Source doc id**: D073 · **Source URL**: https://docs.sandiego.gov/municode/municodechapter09/ch09art08division07.pdf
- **Quoted span** [CORPUS D073]: `shall include educational` … primary operative span: `A landlord of residential rental property subject to this Division shall provide`
- **Confidence**: 0.95
- **Address-lookup facts needed**: coverage under Div. 7 (see SD-JCE-1) → CO date unknown → **unknown** if the property could be <15 years old; otherwise applies.

### Category 2 — just_cause_eviction

#### SD-JCE-1 — Just cause required to terminate any covered tenancy (from day one)
- **Rule ID**: SD-JCE-1
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Residential Tenant Protections Ordinance — just cause required for termination of tenancy (SDMC Ch. 9 Art. 8 Div. 7)
- **Requirement**: A landlord may not terminate a covered tenancy without at-fault or no-fault just cause as enumerated in §98.0704. Unlike state law, protection attaches once a "tenancy" exists (lawful right to occupy >30 days), not after 12 months.
- **Key value**: Just cause from day 1 of tenancy (tenancy = occupancy >30 days; excludes fixed-term leases ≤3 months incl. renewals)
- **Coverage conditions**: Any "residential rental property" (dwelling or unit intended for human habitation, incl. mobilehome park units) in the City of San Diego, except exemptions below. No unit-count threshold.
- **Exemptions** (§98.0703, exhaustive): (a) transient/tourist hotel occupancy (Civ. Code §1940(b)); (b) short-term residential occupancy under SDMC Ch. 5 Art. 10 Div. 1; (c) deed/regulatory-restricted affordable housing (very low/low/moderate income, H&S §50093); (d) housing under a subsidy agreement for affordable housing — **but Section 8 voucher tenancies are NOT exempt**; (e) mobilehomes under the Mobilehome Residency Law; (f) nonprofit hospital, religious facility, extended care facility, licensed RCFE, adult residential facility, nonprofit transitional housing (≤24 months); (g) dormitories of higher-ed or K-12 institutions; (h) tenant shares bathroom or kitchen with landlord whose principal residence is the property; (i) landlord-occupied single-family residence renting ≤2 bedrooms, 2 ADUs or 2 JADUs, or a mobilehome; (j) two-unit single structure where landlord occupies one unit as principal residence from start of tenancy and continues; (k) **housing issued a certificate of occupancy within the previous 15 years** (unless mobilehome); (l) separately alienable unit (SFH/condo) where landlord is not a REIT, corporation, LLC with a corporate member, or mobilehome park management AND tenant received the prescribed written exemption notice (in lease for tenancies commenced/renewed on/after 2024-01-01).
- **Effective date**: 2023-06-24 (O-21647 N.S., adopted 5-25-2023; Council vote 5-16-2023); amended 2024-03-28 (O-21769 N.S., adopted 2-27-2024, SB 567 conformity)
- **Penalty / remedy**: §98.0709 — civil action; injunctive/equitable relief; money and punitive damages; affirmative defense in UD; wrongful eviction ≥3× actual economic damages; attorney's fees (court discretion); City enforcement under SDMC Ch. 1 Art. 2 (civil & criminal). §98.0710 — noncompliance voids termination notice.
- **Interaction with state law**: Local law is stricter than Civ. Code §1946.2 (AB 1482/SB 567): day-one coverage vs 12 months; narrower no-fault grounds; higher relocation. State law continues to apply as floor; §98.0701 says rights are "in addition to" state/federal rights. Civ. Code §1946.2(g) permits more-protective local just-cause ordinances.
- **Citation**: SDMC §98.0704; §98.0702 ("Tenancy"); §98.0703
- **Source doc id**: D073 · **Source URL**: https://docs.sandiego.gov/municode/municodechapter09/ch09art08division07.pdf
- **Quoted span** [CORPUS D073]: `A landlord shall not terminate a tenancy without just cause.`
- Supporting spans [CORPUS D073]: `Tenancy means the lawful right or entitlement of a tenant to continuously use or` ; `housing that has been issued a certificate of occupancy within the previous`
- **Confidence**: 0.97 · **Notes**: Task prompt's "O-21652?" is incorrect — the ordinance is **O-21647 N.S.** (D073 header). D077 (LASSD, updated 2023-09-21) confirms "The Ordinance goes into effect June 24, 2023." SDHC notice-to-Commission portal requirement (§98.0706(a)(2),(b)(2)) only applies 30 days after SDHC publishes a portal — D077 flagged it "CURRENTLY NOT IN EFFECT" as of 2023; current portal status not verified.
- **Address-lookup facts needed**: certificate-of-occupancy date (15-year exemption (k)); owner type/occupancy (h, i, j, l); affordability restrictions (c, d); unit count (i, j, l). Sample SD rows are 5+ unit multifamily (so (i), (j), (l) cannot apply) **but have no year_built → exemption (k) cannot be tested → result = unknown** (strictly), or "applies unless CO <15 yrs" with a flag.

#### SD-JCE-2 — At-fault just cause grounds, cure notice and Commission notice
- **Rule ID**: SD-JCE-2
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: At-fault just cause: 12 enumerated grounds; prior written notice and opportunity to cure; notice to Housing Commission
- **Requirement**: At-fault just cause is limited to: rent default; material lease breach (after written notice to correct); nuisance; waste; refusal to sign a substantially similar renewal (lease terminated on/after 2023-06-24); criminal activity on property; criminal threat (Pen. Code §422(a)); unlawful sublet/assignment; refusal of lawful entry; unlawful purpose; employee/agent/licensee failing to vacate; failure to deliver possession after tenant's own notice. For curable violations the landlord must first serve a written notice describing the violation with opportunity to cure before a 3-day notice to quit.
- **Key value**: 12 at-fault grounds; cure notice first; notice to SDHC within 3 business days (once portal exists)
- **Coverage conditions**: As SD-JCE-1.
- **Exemptions**: As SD-JCE-1.
- **Effective date**: 2023-06-24; amended 2024-03-28 (O-21769)
- **Penalty / remedy**: §98.0706(e) — failure to strictly comply with §98.0706 voids the termination notice; §98.0709 remedies.
- **Interaction with state law**: Mirrors Civ. Code §1946.2(b)(1) with local additions; cure requirement parallels CCP §1161(3).
- **Citation**: SDMC §98.0704(a); §98.0706(a)
- **Source doc id**: D073 · **Source URL**: https://docs.sandiego.gov/municode/municodechapter09/ch09art08division07.pdf
- **Quoted span** [CORPUS D073]: `Before a landlord issues a notice to terminate a`
- **Confidence**: 0.95
- **Address-lookup facts needed**: same as SD-JCE-1 (CO date unknown → unknown/flag).

#### SD-JCE-3 — No-fault just cause limited to four grounds (good faith)
- **Rule ID**: SD-JCE-3
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: No-fault just cause: owner/relative move-in, withdrawal from market, government/court order, demolition or substantial remodel — all in good faith
- **Requirement**: No-fault termination is allowed only for (1) owner or specified relative move-in, (2) withdrawal of the property from the rental market, (3) compliance with a habitability order requiring ≥30 days vacancy, a vacate order, or a local ordinance requiring vacancy, or (4) demolition or substantial remodel; each must be taken in good faith (no ulterior motive, honest intent).
- **Key value**: 4 no-fault grounds; habitability order <30 days is NOT just cause; tenant at fault for the order → no relocation
- **Coverage conditions / Exemptions**: As SD-JCE-1.
- **Effective date**: 2023-06-24; amended 2024-03-28
- **Penalty / remedy**: §98.0709; §98.0710.
- **Interaction with state law**: Parallels Civ. Code §1946.2(b)(2) as amended by SB 567 but with local specifics (good-faith definition; 30-day threshold).
- **Citation**: SDMC §98.0704(b)
- **Source doc id**: D073 · **Source URL**: https://docs.sandiego.gov/municode/municodechapter09/ch09art08division07.pdf
- **Quoted span** [CORPUS D073]: `No-Fault Just Cause. No-fault just cause is any of the following actions`
- **Confidence**: 0.95
- **Address-lookup facts needed**: as SD-JCE-1.

#### SD-JCE-4 — Owner/relative move-in conditions
- **Rule ID**: SD-JCE-4
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Owner move-in eviction conditions (SDMC §98.0704(b)(1))
- **Requirement**: Owner (natural person with ≥25% recorded interest, or family-trust/LLC variants) may recover possession for self/spouse/domestic partner/child/grandchild/parent/grandparent to occupy as primary residence for ≥12 continuous months. For leases entered on/after 2023-06-24 this ground applies only if the tenant agrees in writing or the lease expressly allows it; not available if the intended occupant already lives on the property or a similar unit is vacant; notice must name the occupant and relationship and advise tenant may request proof; occupant must move in within 90 days and stay 12 months, otherwise the unit must be re-offered to the displaced tenant at the prior rent with moving-cost reimbursement.
- **Key value**: ≥25% owner; 12 continuous months; move-in within 90 days; lease-clause requirement for post-2023-06-24 leases
- **Coverage conditions / Exemptions**: As SD-JCE-1.
- **Effective date**: 2023-06-24; amended 2024-03-28
- **Penalty / remedy**: Re-offer at same rent + moving expenses; §98.0709 treble damages for wrongful eviction.
- **Interaction with state law**: Tracks Civ. Code §1946.2(b)(2)(A) (SB 567) with the local owner definition.
- **Citation**: SDMC §98.0704(b)(1)(A)–(I); §98.0702 ("Owner", "Natural person")
- **Source doc id**: D073 · **Source URL**: https://docs.sandiego.gov/municode/municodechapter09/ch09art08division07.pdf
- **Quoted span** [CORPUS D073]: `The owner seeks to recover possession to occupy the residential rental`
- **Confidence**: 0.95
- **Address-lookup facts needed**: owner type (natural person vs entity) — **not in data → unknown**; CO date as SD-JCE-1.

#### SD-JCE-5 — Substantial remodel / demolition requirements
- **Rule ID**: SD-JCE-5
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Substantial remodel defined; permits before notice; sworn notice contents (SDMC §98.0704(b)(4))
- **Requirement**: "Substantial remodel" means replacement/substantial modification of structural, electrical, plumbing or mechanical systems requiring a permit, or abatement of hazardous materials, that cannot be done safely with the tenant in place and requires ≥30 continuous days' vacancy; cosmetic work does not qualify. Landlord must post the permit application within 3 business days of submittal, obtain permits before serving notice, and the notice (certified under penalty of perjury) must describe the work, duration, attach permits/contract, explain why tenant must vacate, and state the tenant's right to re-rent at the prior rent.
- **Key value**: ≥30 continuous days vacancy; permits secured before notice; perjury-certified notice
- **Coverage conditions / Exemptions**: As SD-JCE-1.
- **Effective date**: 2023-06-24; amended 2024-03-28
- **Penalty / remedy**: §98.0706(e)/§98.0710 void notice; §98.0709.
- **Interaction with state law**: Stricter than Civ. Code §1946.2(b)(2)(D) (SB 567) — adds posting and pre-notice permit requirements.
- **Citation**: SDMC §98.0704(b)(4)(A)–(D)
- **Source doc id**: D073 · **Source URL**: https://docs.sandiego.gov/municode/municodechapter09/ch09art08division07.pdf
- **Quoted span** [CORPUS D073]: `For purposes of section 98.0704(b)(4), substantially remodel`
- **Confidence**: 0.95
- **Address-lookup facts needed**: as SD-JCE-1.

#### SD-JCE-6 — Relocation assistance for no-fault terminations: 2 months' rent (3 for seniors/disabled)
- **Rule ID**: SD-JCE-6
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: No-fault relocation assistance (SDMC §98.0706(c))
- **Requirement**: For any no-fault termination the landlord must, regardless of tenant income or length of tenancy, either pay two months of actual rent (three months if the tenant is a senior, 62+, or disabled per Gov. Code §12955.3) within 15 days of the notice, or waive an equal amount of rent. Relocation is in addition to deposit return and is credited against any other required relocation.
- **Key value**: 2 months' actual rent; 3 months for senior (62+) or disabled; payment within 15 days
- **Coverage conditions**: All covered tenancies terminated for no-fault just cause (§98.0704(b)); single payment allowed to all tenants on lease.
- **Exemptions**: Tenant found at fault for a government order (§98.0704(b)(3)) gets no relocation; Div. 7 exemptions (SD-JCE-1).
- **Effective date**: 2023-06-24
- **Penalty / remedy**: §98.0709(e) — landlord who fails to pay is liable for ≥3× the required relocation plus actual economic damages; unpaid relocation recoverable by landlord as damages if tenant holds over (§98.0706(c)(5)).
- **Interaction with state law**: Exceeds Civ. Code §1946.2(d) (one month's rent); local amount credited against state/federal relocation.
- **Citation**: SDMC §98.0706(c)(1)–(5); §98.0709(e)
- **Source doc id**: D073 · **Source URL**: https://docs.sandiego.gov/municode/municodechapter09/ch09art08division07.pdf
- **Quoted span** [CORPUS D073]: `two months of actual rent under the tenant’s lease in`
- Supporting [CORPUS D073]: `If the tenant is a senior or disabled, the direct payment` ; `The landlord shall, regardless of the tenant’s income or length of`
- **Confidence**: 0.97 · D077 corroborates ("direct payment equal to two (2) months" / "three (3) months").
- **Address-lookup facts needed**: as SD-JCE-1.

#### SD-JCE-7 — No-fault notice contents and right of first refusal within 5 years
- **Rule ID**: SD-JCE-7
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: No-fault termination notice requirements; offer to re-rent to displaced tenant within five years (SDMC §98.0706(b),(d))
- **Requirement**: No-fault notices (30/60 days per Civ. Code §1946.1, ≥12-pt) must describe the basis, state the relocation right and amount/method, and state the tenant's right to a written offer to renew if the unit is re-offered for rent within five years of eviction under grounds (b)(1), (3) or (4) — tenant must request in writing within 30 days and supply an address. Landlord must then offer first in writing, may screen with industry-accepted methods and must state minimum screening criteria; tenant has 30 days to accept. Copy to SDHC within 3 business days (once portal exists).
- **Key value**: 5-year right of first refusal; 30 days to request / 30 days to accept
- **Coverage conditions / Exemptions**: As SD-JCE-1; right of first refusal does not apply to withdrawal from market ((b)(2)).
- **Effective date**: 2023-06-24
- **Penalty / remedy**: §98.0706(e) notice void for non-strict compliance; §98.0709.
- **Interaction with state law**: Exceeds Civ. Code §1946.2 notice contents.
- **Citation**: SDMC §98.0706(b)(1)–(2), (d), (e)
- **Source doc id**: D073 · **Source URL**: https://docs.sandiego.gov/municode/municodechapter09/ch09art08division07.pdf
- **Quoted span** [CORPUS D073]: `If a residential rental property is offered for rent or lease for residential`
- **Confidence**: 0.95
- **Address-lookup facts needed**: as SD-JCE-1.

#### SD-JCE-8 — Buyout agreement regulation
- **Rule ID**: SD-JCE-8
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Buyout offers and agreements (SDMC §98.0707)
- **Requirement**: Before any buyout offer the landlord must give each tenant a written disclosure (right to refuse, right to counsel, no retaliation, 6-month opt-out from offers, relocation eligibility and amount, authorized negotiators, signature/date lines), deliver executed copies within 3 days and retain 5 years. Buyout agreements must be written, copied to tenant at signing, carry three 14-pt bold statements near the signature, be translated if negotiated in another language, and must exceed the §98.0706(c) relocation amount; otherwise void. Rights non-waivable.
- **Key value**: Buyout must be > 2 (or 3) months' rent; 14-pt bold disclosures; 5-year record retention
- **Coverage conditions / Exemptions**: As SD-JCE-1.
- **Effective date**: 2023-06-24
- **Penalty / remedy**: Non-compliant agreement void; §98.0709 remedies.
- **Interaction with state law**: No state equivalent; supplements Civ. Code §1946.2.
- **Citation**: SDMC §98.0707(a)–(e)
- **Source doc id**: D073 · **Source URL**: https://docs.sandiego.gov/municode/municodechapter09/ch09art08division07.pdf
- **Quoted span** [CORPUS D073]: `Buyout agreements must be for an amount that is`
- **Confidence**: 0.95
- **Address-lookup facts needed**: as SD-JCE-1.

#### SD-JCE-9 — Anti-retaliation and remedies
- **Rule ID**: SD-JCE-9
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Retaliation prohibited; cumulative civil remedies; noncompliance voids termination notices (SDMC §§98.0708–98.0710)
- **Requirement**: Landlords may not retaliate against tenants for exercising Div. 7 rights. Tenants may sue for injunctive/equitable relief, money and punitive damages; raise violations as UD defense; recover ≥3× actual economic damages for wrongful eviction and ≥3× unpaid relocation; fees in court's discretion; City may enforce civilly/criminally. Any noncompliance voids the termination notice.
- **Key value**: treble damages (≥3×); notice void
- **Coverage conditions / Exemptions**: As SD-JCE-1.
- **Effective date**: 2023-06-24; §98.0710 added 2024-03-28 (O-21769)
- **Penalty / remedy**: as stated
- **Interaction with state law**: Cumulative with Civ. Code §1946.2(h) and §1942.5.
- **Citation**: SDMC §98.0708; §98.0709(a)–(h); §98.0710
- **Source doc id**: D073 · **Source URL**: https://docs.sandiego.gov/municode/municodechapter09/ch09art08division07.pdf
- **Quoted span** [CORPUS D073]: `civil action for wrongful eviction for damages of not less than three times the`
- Supporting [CORPUS D073]: `A landlord shall not retaliate against a tenant for exercising any right provided by`
- **Confidence**: 0.95
- **Address-lookup facts needed**: as SD-JCE-1.

### Category 3 — security_deposits

#### SD-DEP-1 — No city security-deposit rule; state Civ. Code §1950.5 (AB 12 / AB 2801) governs
- **Rule ID**: SD-DEP-1
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: security_deposits
- **Status**: in_force (no-local-rule finding)
- **Title**: No San Diego ordinance on deposit amount, interest or return — state law applies
- **Requirement**: The San Diego Municipal Code contains no deposit cap, interest requirement or return-timeline rule; the only mention of deposits in Div. 7 is that relocation assistance does not relieve the obligation to return deposits.
- **Key value**: none at city level (state: 1 month's rent since 2024-07-01, 2 months for qualifying small natural-person/family-trust/LLC landlords; 21-day return; photo documentation from 2025-04-01/2025-07-01)
- **Coverage conditions / Exemptions**: N/A
- **Effective date**: N/A
- **Penalty / remedy**: N/A at city level (state: up to 2× deposit bad-faith penalty)
- **Interaction with state law**: Civ. Code §1950.5 is the exclusive rule.
- **Citation**: SDMC §98.0706(c)(3) (incidental reference); no SDMC deposit division exists (Ch. 9 Art. 8 Divs. 7–12 reviewed)
- **Source doc id**: D073 · **Source URL**: https://docs.sandiego.gov/municode/municodechapter09/ch09art08division07.pdf
- **Quoted span** [CORPUS D073]: `landlord’s obligation to, and shall be in addition to, the return of any`
- **Confidence**: 0.9 · **Notes**: Multiple SD property-management sources (goodlifemgmt, gemstone4rent, mclainproperties) describe only state AB 12/AB 2801 for San Diego landlords; none cite a city deposit rule.
- **Address-lookup facts needed**: none (no city rule → applies regardless); the state small-landlord 2-month exception depends on owner type → **unknown** (no owner data).

### Category 4 — application_screening_fees

#### SD-FEE-1 — No city application/screening-fee rule; state Civ. Code §1950.6 (AB 2493) governs
- **Rule ID**: SD-FEE-1
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: application_screening_fees
- **Status**: in_force (no-local-rule finding)
- **Title**: No San Diego ordinance capping or regulating application screening fees — state law applies
- **Requirement**: The city code imposes no fee cap, receipt, itemization or refund rule; the only city screening text is that a landlord re-offering a unit to a displaced tenant may screen using industry-accepted methods and must state minimum criteria.
- **Key value**: none at city level (state cap: ~$65.86 for 2026 per CAA — no official state figure; Berkeley Rent Board publishes $68.96 — see BK-FEE-2 conflict)
- **Coverage conditions / Exemptions**: N/A
- **Effective date**: N/A
- **Penalty / remedy**: N/A at city level
- **Interaction with state law**: Civ. Code §1950.6 (as amended by AB 2493, eff. 2025-01-01: first-qualified-applicant or refund; written screening criteria; reusable reports).
- **Citation**: SDMC §98.0706(d) (incidental); no SDMC screening-fee division
- **Source doc id**: D073 · **Source URL**: https://docs.sandiego.gov/municode/municodechapter09/ch09art08division07.pdf
- **Quoted span** [CORPUS D073]: `The landlord shall have the right to screen the tenant using industry accepted`
- **Confidence**: 0.9
- **Address-lookup facts needed**: none (applies regardless).

### Category 5 — screening_restrictions

#### SD-SCR-1 — Source-of-income discrimination prohibited (SDMC Div. 8)
- **Rule ID**: SD-SCR-1
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: Prohibition of Discrimination Based on a Tenant's Source of Income (SDMC Ch. 9 Art. 8 Div. 8, §§98.0801–98.0806)
- **Requirement**: No person may, based on source of income (defined broadly to include any federal/state/local/nonprofit rental assistance, homeless assistance, security-deposit assistance or housing subsidy, whether paid to tenant or landlord), refuse to rent or renew, terminate, misrepresent availability, impose special terms, restrict services, or advertise a preference; income standards must count the tenant's entire source of income and aggregate household/cosigner income like a married couple's.
- **Key value**: Section 8/voucher and all subsidies count as income; aggregate-income rule
- **Coverage conditions**: All rental units/tenancies in the City of San Diego ("Rental-unit"/"Tenancy" per former §98.0720).
- **Exemptions** (§98.0804, exhaustive): tenancy where the owner or a family member lives in the same building and shares a bathroom or kitchen with the tenant. Also "except as may be necessary to comply with any program requirements".
- **Effective date**: 2018-10-18 (O-20986 N.S., adopted 9-18-2018); private right of action for violations on/after 2019-08-01 (§98.0806(a))
- **Penalty / remedy**: injunction; damages — mandatory 3× one month's rent (charged, or advertised if pre-tenancy); punitive damages; attorney's fees and costs; 1-year limitations period from discovery; City enforcement under Ch. 1.
- **Interaction with state law**: Broader than FEHA (Gov. Code §12955(p), SB 329 eff. 2020-01-01 added vouchers to state "source of income"); local law explicitly extends to subsidies paid to the landlord; cumulative with state remedies.
- **Citation**: SDMC §98.0803(a)–(c); §98.0802; §98.0804; §98.0806
- **Source doc id**: D075 · **Source URL**: https://gocodebook.com/library/us/ca/san-diego-zoning/division-8-prohibition-of-discrimination-based-on-a-tenant-s-source-of-income
- **Quoted span** (NOT IN CORPUS; from D075 mirror): `It is unlawful for any person to do any of the following acts, wholly or in part, based on a person’s source of income (except as may be necessary to comply with any program requirements related to source of income): 1. To refuse to enter into or renew an agreement for tenancy;`
- **Confidence**: 0.85 (code publisher mirror; history note "added 9-18-2018 by O–20986 N.S.; effective 10-18-2018") · **Notes**: Definitions cross-reference "Municipal Code section 98.0720" (old Tenants' Right to Know numbering, since replaced) — stale cross-reference in code.
- **Address-lookup facts needed**: owner occupancy with shared kitchen/bath (exemption) — unlikely for 5+ unit buildings but **owner data absent → applies with caveat**. Year built irrelevant → applies regardless.

#### SD-SCR-2 — Screening of displaced tenant on re-offer must use industry-accepted methods and disclosed criteria
- **Rule ID**: SD-SCR-2
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: Screening limits when re-offering a unit to a no-fault-displaced tenant (SDMC §98.0706(d))
- **Requirement**: When a landlord must first offer a re-rented unit to the displaced tenant (within 5 years), the landlord may screen only using industry-accepted methods and must communicate the minimum screening criteria in the written offer.
- **Key value**: minimum criteria must be disclosed in the offer
- **Coverage conditions / Exemptions**: As SD-JCE-1 / SD-JCE-7.
- **Effective date**: 2023-06-24
- **Penalty / remedy**: §98.0706(e); §98.0709
- **Interaction with state law**: Supplements AB 2493 written-criteria rule (Civ. Code §1950.6).
- **Citation**: SDMC §98.0706(d)
- **Source doc id**: D073 · **Source URL**: https://docs.sandiego.gov/municode/municodechapter09/ch09art08division07.pdf
- **Quoted span** [CORPUS D073]: `methods and shall communicate the minimum screening criteria in the written`
- **Confidence**: 0.9
- **Address-lookup facts needed**: as SD-JCE-1.

#### SD-SCR-3 — No city fair-chance / criminal-history screening ordinance
- **Rule ID**: SD-SCR-3
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force (no-local-rule finding)
- **Title**: No San Diego "fair chance housing" ordinance; state FEHA criminal-history regulations apply
- **Requirement**: The City of San Diego has no ordinance restricting criminal-history inquiries in housing; landlords are bound by state FEHA regulations (2 CCR §12264–12271: individualized assessment, no arrests-without-conviction, etc.) and HUD disparate-impact guidance.
- **Key value**: none at city level
- **Coverage conditions / Exemptions**: N/A
- **Effective date**: N/A
- **Penalty / remedy**: N/A at city level
- **Interaction with state law**: FEHA (Gov. Code §12955) and CRD regulations govern.
- **Citation**: None (absence). Corpus manifest and gocodebook mirror of SDMC Ch. 9 Art. 8 contain no such division. Note: San Diego **County** has a *Fair Chance Ordinance* but it governs **employment** (County OLSE), not housing.
- **Source doc id**: none · **Source URL**: https://www.sandiegocounty.gov/content/sdc/OLSE/fair-chance.html (county employment ordinance — for disambiguation only)
- **Quoted span**: NOT IN CORPUS — (web search result): "San Diego follows state laws for criminal screening." (cairncrosspropertymanagement.com)
- **Confidence**: 0.8 · **Notes**: Some landlord blogs claim a 2023 San Diego "Fair Chance Housing Ordinance"; no official source confirms — appears to conflate with the County employment ordinance or the 2023 TPO. Flag for human review.
- **Address-lookup facts needed**: none.

### Category 6 — algorithmic_rent_setting

#### SD-ALG-1 — Landlord use of algorithmic rent-setting devices prohibited
- **Rule ID**: SD-ALG-1
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: in_force
- **Title**: Prohibition of Anti-Competitive Automated Rent Price-Fixing — landlord use ban (SDMC §98.1103(b))
- **Requirement**: It is unlawful for a landlord to use an "algorithmic device" (software using algorithms on nonpublic competitor data — adopted text: "of two or more landlords" — to advise or recommend rents or occupancy levels for San Diego residential rental property) to set rental rates or occupancy levels. Each month and each residential rental property is a separate violation.
- **Key value**: per-month, per-property violations; civil penalty up to $1,000 per violation
- **Coverage conditions**: Every landlord of residential rental property in the City of San Diego (definitions incorporated from §98.0702); no unit-count, age or owner-type threshold.
- **Exemptions** (definitional carve-outs, §98.1102): (a) software publishing reports from aggregated historical nonpublic competitor data >90 days old or from public information that does not recommend future rents/occupancy; (b) software establishing rents/income limits under affordable-housing program guidelines; (c) [adopted version only] appraisal software that does not recommend rents during runtime.
- **Effective date**: 2025-06-21 (O-21955 N.S., adopted/final passage 2025-05-22; "thirtieth day from and after its final passage")
- **Penalty / remedy**: §98.1104 — tenant civil action for injunctive relief, damages, or civil penalties up to $1,000 per violation; prevailing party fees (adopted text: "prevailing landlord or tenant"); lease fee-waiver clauses unenforceable; City enforcement under Ch. 1 Art. 2 incl. civil and criminal remedies (adopted §98.1104(c)).
- **Interaction with state law**: Cumulative with California AB 325 (Bus. & Prof. Code §16729, eff. 2026-01-01, bans use/distribution of "common pricing algorithms" using competitor data) and SB 763 (Cartwright Act penalties); the city ordinance is narrower (residential rent only) but has per-unit tenant remedies. No preemption identified.
- **Citation**: SDMC §98.1103(b); §98.1102; §98.1104 (Ch. 9 Art. 8 Div. 11)
- **Source doc id**: D076 (Feb-2025 staff report + draft ordinance O-2025-107) and D074 (codified text) · **Source URL**: https://sandiego.gov/sites/default/files/2025-04/automated-rent-price-fixing-prohibition-ordinance-materials.pdf ; https://gocodebook.com/library/us/ca/san-diego-zoning/division-11-prohibition-of-anti-competitive-automated-rent-price-fixing/98.1103-use-and-sale-of-algorithmic-devices-prohibited
- **Quoted span** [CORPUS D076]: `It is unlawful for a landlord to use an algorithmic device to set rental rates`
- Supporting [CORPUS D076]: `This Ordinance will take effect and be in force on the thirtieth day from`
- Codified history (NOT IN CORPUS, D074): `(“Use and Sale of Algorithmic Devices Prohibited” added 5-22-2025 by O-21955 N.S.; effective 6-21-2025.)`
- **Confidence**: 0.93 · **Notes / conflicts**: D076 is the *draft* (O-2025-107, City Attorney draft dated 2024-11-14; staff report 2025-02-27). Differences in the **adopted** text (per D074 mirror): (i) definition narrowed to nonpublic competitor data "of two or more landlords"; (ii) new exclusion (c) for appraisal software; (iii) §98.1104(a) fee-shifting made two-way ("prevailing landlord or tenant"); (iv) new §98.1104(c) City enforcement. D002 (Morgan Lewis) lists "San Diego Mun. Code §§ 98.1101–98.1104 (effective June 2025)" and notes pending tenant suit *Keller v. UDR Inc.* (S.D. Cal.). Ordinance number not in corpus — from D074 history notes.
- **Address-lookup facts needed**: none — applies to every residential rental property in the city regardless of year built/units → **applies** for all San Diego rows (subject to jurisdiction resolution: postal_city "San Diego" may include unincorporated/other cities).

#### SD-ALG-2 — Sale/licensing of algorithmic devices to landlords prohibited
- **Rule ID**: SD-ALG-2
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: in_force
- **Title**: Vendor ban — unlawful to sell, license or provide an algorithmic device to a landlord (SDMC §98.1103(a))
- **Requirement**: Any person is prohibited from selling, licensing or otherwise providing an algorithmic device to a landlord for San Diego residential rental property.
- **Key value**: vendor-side prohibition
- **Coverage conditions**: Any "person" (SDMC §11.0210) supplying landlords of San Diego residential rental property.
- **Exemptions**: Definitional carve-outs in §98.1102 (see SD-ALG-1).
- **Effective date**: 2025-06-21 (O-21955 N.S.)
- **Penalty / remedy**: §98.1104 remedies run against the landlord in tenant suits; City enforcement (Ch. 1 Art. 2) reaches vendors.
- **Interaction with state law**: Parallels AB 325 "distribute" prohibition (B&P §16729).
- **Citation**: SDMC §98.1103(a)
- **Source doc id**: D076 · **Source URL**: https://sandiego.gov/sites/default/files/2025-04/automated-rent-price-fixing-prohibition-ordinance-materials.pdf
- **Quoted span** [CORPUS D076]: `It is unlawful for a person to sell, license, or otherwise provide an`
- **Confidence**: 0.93
- **Address-lookup facts needed**: none (applies regardless).

#### SD-ALG-3 — Tenant remedies for algorithmic rent-setting violations
- **Rule ID**: SD-ALG-3
- **Jurisdiction**: San Diego, CA · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: in_force
- **Title**: Remedies — tenant civil action, up to $1,000 per violation, attorney's fees (SDMC §98.1104)
- **Requirement**: A tenant may sue a landlord for injunctive relief, damages, or civil penalties up to $1,000 per violation; prevailing tenant (incl. one obtaining an injunction) recovers costs and reasonable attorney's fees; lease clauses limiting fee recovery are unenforceable; remedies are cumulative.
- **Key value**: up to $1,000 per violation (per month × per property)
- **Coverage conditions / Exemptions**: as SD-ALG-1.
- **Effective date**: 2025-06-21
- **Penalty / remedy**: as stated; adopted text adds City civil/criminal enforcement (§98.1104(c)).
- **Interaction with state law**: Cumulative with Cartwright Act (SB 763: civil penalties up to $1M; criminal fines up to $6M corporate).
- **Citation**: SDMC §98.1104(a)–(c)
- **Source doc id**: D076 · **Source URL**: https://sandiego.gov/sites/default/files/2025-04/automated-rent-price-fixing-prohibition-ordinance-materials.pdf
- **Quoted span** [CORPUS D076]: `A tenant may seek injunctive relief, damages, or civil penalties of up to`
- **Confidence**: 0.93 · **Notes**: Draft says "a prevailing tenant shall recover"; codified text says "a prevailing landlord or tenant shall recover" — conflict flagged (draft vs adopted).
- **Address-lookup facts needed**: none.

---

## PART B — BERKELEY, CA

### Category 1 — rent_increase_limits

#### BK-RENT-1 — Rent ceilings; Annual General Adjustment = 65% of CPI, 0%–5% band
- **Rule ID**: BK-RENT-1
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Rent Stabilization — rent ceilings and Annual General Adjustment formula (BMC §13.76.110A; Measure BB cap)
- **Requirement**: For fully covered units the landlord may not charge more than the unit's rent ceiling; each January 1 the ceiling adjusts by 65% of the 12-month CPI-U increase (SF-Oakland-San Jose, year ending June 30), rounded to a tenth, never below 0% nor above 5% (Measure BB lowered the cap from 7% to 5%). A 30-day written notice is required before any increase takes effect; AGA is forfeited for non-registration, habitability non-compliance, or failure to pay deposit interest.
- **Key value**: 65% of CPI-U; floor 0%, cap 5%
- **Coverage conditions** (fully covered units, BMC §13.76.050A as interpreted by Rent Board): most units in multifamily properties whose **first certificate of occupancy was issued on or before June 30, 1980** (Rent Board: "built before June 1980"); single-family homes with a tenancy that began before 1996-01-01; rooming houses (SFH with ≥5 rooms rented separately); subsidized units of these types (Section 8/HCV, Shelter Plus Care, VASH, LIHTC, CalCHA, HOME, Housing Trust Fund, MHSA; Rent Supplement/LMSA/project-based Section 8 only if no HUD-insured/held mortgage) since Measure BB.
- **Exemptions** (from rent ceiling): Partially covered units — new construction (first CO after 1980-06-30), SFH tenancies on/after 1996-01-01, most condominiums, Section 202/811 units, HUD-mortgage project-based units (BMC §13.76.050B). Fully exempt (BMC §13.76.050C, exhaustive): short-term transient rentals (<14 consecutive days); nonprofit co-ops; health facilities; owner-occupied shared kitchen/bath units where landlord (≥50% owner) lived on property at inception of tenancy; UC-recognized fraternities/sororities; SFH + single permitted ADU with owner-occupant, tenancies after 2018-11-07; 501(c)(3) shelters/transitional housing (but still subject to just cause); "sabbatical" SFH (owner's only unit, ≤24 months); golden duplex (owner-occupied 1979-12-31 and now). Also Costa-Hawkins vacancy decontrol: new tenancy sets a new initial rent; AGA does not apply in the year after an initial rent is set.
- **Effective date**: Ordinance 1980 (Measure D, 1980-06); 65% formula from Nov 2004 ballot measure; 5% cap and other Measure BB changes effective **2024-12-20** (Ord. 7,950-N.S., voter-approved 2024-11-05, adopted by Council 2024-12-10, effective 10 days later)
- **Penalty / remedy**: BMC §13.76.150A — tenant may petition Board, withhold excess rent, seek injunction, sue for actual damages plus up to $750 for bad faith; §13.76.190 criminal penalties for willful §13.76.130 violations.
- **Interaction with state law**: Stricter than AB 1482 (Civ. Code §1947.12) → state cap **superseded** for fully covered units (Civ. Code §1947.12(k) preserves stricter local caps). Costa-Hawkins (Civ. Code §1954.50–.535) forces the partial exemption for post-1980 CO units, SFH and condos; for those units AB 1482 (if >15-yr CO) is the operative cap.
- **Citation**: BMC §13.76.110A–F; §13.76.050A–C; §13.76.100
- **Source doc id**: D008, D006, D009 · **Source URL**: https://rentboard.berkeleyca.gov/sites/default/files/documents/AGA%20Public%20Notice.pdf ; https://rentboard.berkeleyca.gov/laws-regulations/measure-bb-changes-berkeleys-rent-ordinance ; https://rentboard.berkeleyca.gov/sites/default/files/documents/Rent%20Ordinance%20Coverage%20by%20Unit%20Type.pdf
- **Quoted span** [CORPUS D006]: `Annual General Adjustments are capped at a maximum of 5%.` (also: `The maximum AGA is 5%. This means that, if the formula in the Rent` — note the corpus has a non-breaking space U+00A0 between "Rent" and "Ordinance" in that sentence)
- Supporting [CORPUS D008]: `65% of CPI formula was approved by Berkeley voters in the November 2004 general` ; [CORPUS D009]: `Most units in multifamily properties built before 1980** Fully Covered Yes Yes Yes Yes`
- Ordinance text (NOT IN CORPUS; Ord. 7,950-N.S. §13.76.110A): `In no event, however, shall the allowable annual adjustment be less than zero (0%) or greater than five percent (5%).`
- **Confidence**: 0.95
- **Address-lookup facts needed**: first-CO date relative to 1980-06-30 (and unit type/SFH/condo status, owner-occupancy). **Berkeley rows have no year_built and no units → rent-ceiling coverage = unknown** (use code 7700/7200 "5+ units" rules out SFH/duplex/ADU exemptions but not pre/post-1980).

#### BK-RENT-2 — 2026 AGA = 1.0% (effective no earlier than 2026-01-01)
- **Rule ID**: BK-RENT-2
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: 2026 Annual General Adjustment Order (Rent Board Regulation 1148) — 1.0%
- **Requirement**: Eligible landlords of fully covered units may raise 2025 permanent rent ceilings by 1.0% no earlier than 2026-01-01, after a 30-day written notice (90 days if cumulative increase >10%). The 2026 AGA may not be applied to tenancies that began on or after 2025-01-01 whose rent was set under Costa-Hawkins.
- **Key value**: 1.0% (= 65% × 1.5% CPI, Jul 2024–Jun 2025)
- **Coverage conditions**: Fully covered units (BK-RENT-1) with tenancy start before 2025-01-01; landlord fully registered by July 1, in compliance with habitability/orders, and current on deposit interest.
- **Exemptions**: Partially covered and fully exempt units; tenancies started in 2025; landlords with "banked" AGAs may exceed 5% in a year up to the ceiling.
- **Effective date**: 2026-01-01 (Board order adopted 2025-10-16; notice dated 2025-10-17)
- **Penalty / remedy**: Excess rent remedies §13.76.150A.
- **Interaction with state law**: Costa-Hawkins initial-rent rule excludes 2025 tenancies; AB 1482 superseded for these units.
- **Citation**: BMC §13.76.110A; Rent Board Reg. 1148 (2026 AGA Order)
- **Source doc id**: D008 · **Source URL**: https://rentboard.berkeleyca.gov/sites/default/files/documents/AGA%20Public%20Notice.pdf
- **Quoted span** [CORPUS D008]: `eligible landlords to increase the 2025 permanent rent ceilings by 1.0% no earlier than`
- Supporting [CORPUS D008]: `The 2026 AGA may not adjust tenants’ rents when their tenancy began on or after`
- **Confidence**: 0.97 · **Notes**: Rent Board news (2025-11-03) corroborates: "the Berkeley Rent Board has adopted the 2026 AGA of 1.0%." The 2027 AGA will be published ~2026-10-31 (not yet available on query date).
- **Address-lookup facts needed**: as BK-RENT-1 → **unknown** (no year built).

#### BK-RENT-3 — New-construction partial exemption (CO after 1980-06-30); Measure BB 15-year contingent rule; SB 330 replacement units covered
- **Rule ID**: BK-RENT-3
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force (15-year clause is contingent/dormant while Costa-Hawkins stands)
- **Title**: Newly Constructed Rental Units — partially covered (no rent ceiling; registration, just cause and deposit interest still apply) (BMC §13.76.050B.1)
- **Requirement**: A unit created after 1980-06-30 (date of first certificate of occupancy) is exempt only from §§13.76.100–.120 (base rent ceiling, AGA, individual adjustments). If Civ. Code §1954.52 is repealed/amended so that "certificate of occupancy" is no longer the state standard, the creation date becomes the City's final inspection approval and a unit is "newly constructed" for only **15 years** after that date. Units replacing demolished housing in an SB 330 "housing development project" are not exempt as new construction.
- **Key value**: CO after 1980-06-30 → partial coverage; contingent 15-year sunset (replaces Measure Q 2018's 20-year rolling period)
- **Coverage conditions**: Units with first CO after 1980-06-30 (Rent Board Reg. 510: CO issued on/after June 30, 1980). Converted/remodeled spaces without a new CO do not qualify.
- **Exemptions**: SB 330 replacement units (covered fully); the 15-year rule applies only upon Costa-Hawkins change.
- **Effective date**: 2024-12-20 (Measure BB, Ord. 7,950-N.S.); underlying 1980-06-30 cutoff dates to 1980 ordinance; Measure Q (2018-11) had set 20 years
- **Penalty / remedy**: §13.76.150
- **Interaction with state law**: Required by Costa-Hawkins (Civ. Code §1954.52(a)(1) — CO after 1995-02-01 exempt statewide; Berkeley's 1980 local cutoff preserved for pre-1995). AB 1482 applies to partially covered units older than 15 years.
- **Citation**: BMC §13.76.050B.1; Rent Board Reg. 510
- **Source doc id**: D009, D006 · **Source URL**: https://rentboard.berkeleyca.gov/sites/default/files/documents/Rent%20Ordinance%20Coverage%20by%20Unit%20Type.pdf
- **Quoted span** [CORPUS D009]: `New construction: units that were built and received a Certificate of`
- Supporting [CORPUS D006]: `New Construction Units (units with a certificate of occupancy issued after 1980)`
- Ordinance text (NOT IN CORPUS; Ord. 7,950-N.S.): `A rental unit shall only be deemed newly constructed for fifteen years after the date of final inspection approval by the City.`
- **Confidence**: 0.9 · **Notes**: Answers the prompt's "20 years after CO? verify": the 20-year figure was Measure Q (2018); **Measure BB (2024) replaced it with 15 years after final inspection, contingent on Costa-Hawkins change** — not currently operative. As of 2026-10-01 post-1980 units remain partially covered indefinitely.
- **Address-lookup facts needed**: first-CO date → **unknown** for all Berkeley rows.

#### BK-RENT-4 — Government-owned/subsidized units now registered and fully or partially covered (Measure BB)
- **Rule ID**: BK-RENT-4
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Coverage of government-subsidized units (BMC §13.76.050B.3 as amended by Measure BB)
- **Requirement**: Landlords of government-owned or subsidized units (Section 8/HCV, Shelter Plus Care, etc.) must register them with the Rent Board as fully or partially covered and pay the annual registration fee; fully covered subsidized units have a rent ceiling limited by the AGA. Units are exempt from rent control only to the extent federal/state law or regulation specifically exempts them (Section 202, 811, HUD-mortgage project-based programs → partially covered).
- **Key value**: registration + AGA ceiling for fully covered subsidized units; amnesty period for newly registered units extended (Rent Board news)
- **Coverage conditions**: Unit type governs (pre-1980 multifamily → fully covered; new construction/SFH/condo → partial).
- **Exemptions**: Section 202, Section 811; Rent Supplement, Section 8 LMSA, project-based Section 8 in HUD-insured/held-mortgage projects → partially covered regardless of type.
- **Effective date**: 2024-12-20
- **Penalty / remedy**: §13.76.150; Board may adopt fines for registration non-compliance (Measure BB).
- **Interaction with state law**: Federal preemption governs which subsidy programs are excluded from local rent control.
- **Citation**: BMC §13.76.050B.3; §13.76.080
- **Source doc id**: D006 · **Source URL**: https://rentboard.berkeleyca.gov/laws-regulations/measure-bb-changes-berkeleys-rent-ordinance
- **Quoted span** [CORPUS D006]: `Government-owned or -subsidized rental units become either fully or partially covered by the Rent Ordinance.`
- **Confidence**: 0.9
- **Address-lookup facts needed**: subsidy status and unit type → **unknown**.

#### BK-RENT-5 — Utility charges must be in base rent unless separately metered in tenant's name (fully covered units)
- **Rule ID**: BK-RENT-5
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Utility charges rule for tenancies starting on/after 2024-02-06 (Measure BB)
- **Requirement**: In a fully covered unit, a landlord may charge for utilities only if the cost is part of base rent or the utility is separately metered and the lease requires the account in the tenant's name; landlords already charging separately may petition to add average utility cost to the ceiling.
- **Key value**: tenancies on/after 2024-02-06
- **Coverage conditions**: Fully covered units.
- **Exemptions**: Partially covered/exempt units; separately metered utilities in tenant's name.
- **Effective date**: 2024-12-20 (applies to tenancies starting on/after 2024-02-06)
- **Penalty / remedy**: §13.76.150 (excess rent)
- **Interaction with state law**: None identified.
- **Citation**: BMC §13.76.040/.100 (Measure BB utility provisions); Rent Board Measure BB guidance
- **Source doc id**: D006 · **Source URL**: https://rentboard.berkeleyca.gov/laws-regulations/measure-bb-changes-berkeleys-rent-ordinance
- **Quoted span** [CORPUS D006]: `For tenancies starting on or after February 6, 2024, a landlord may charge a tenant in a fully covered unit for utilities only if either`
- **Confidence**: 0.85
- **Address-lookup facts needed**: full coverage (CO date) → **unknown**.

#### BK-RENT-6 — Capital-improvement rent-increase petitions only for completed work
- **Rule ID**: BK-RENT-6
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Individual rent adjustment petitions limited to completed capital improvements (Measure BB; BMC §13.76.120)
- **Requirement**: Landlords may petition for a rent-ceiling increase only for completed capital improvements, not planned ones.
- **Key value**: completed improvements only
- **Coverage conditions**: Fully covered units.
- **Exemptions**: N/A
- **Effective date**: 2024-12-20
- **Penalty / remedy**: §13.76.150
- **Interaction with state law**: None.
- **Citation**: BMC §13.76.120
- **Source doc id**: D006 · **Source URL**: https://rentboard.berkeleyca.gov/laws-regulations/measure-bb-changes-berkeleys-rent-ordinance
- **Quoted span** [CORPUS D006]: `Landlords can only file a petition for rent increases for completed capital improvements`
- **Confidence**: 0.85
- **Address-lookup facts needed**: full coverage → **unknown**.

### Category 2 — just_cause_eviction

#### BK-JCE-1 — Just cause required for eviction from fully and partially covered units
- **Rule ID**: BK-JCE-1
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Rent Stabilization and Eviction for Just Cause Ordinance — just cause required (BMC §13.76.130A)
- **Requirement**: No landlord may recover possession of a covered rental unit without one of ten enumerated grounds: (1) nonpayment ≥ one month FMR; (2) substantial violation of material lease term causing actual injury (after notice to cease); (3) substantial damage; (4) destruction of peace; (5) refusal of lawful access; (6) substantial and necessary repairs (permits; temporary unit offer; right of first refusal); (7) demolition permit issued; (8) owner move-in (≥50% owner or spouse/child/parent, 36 months); (9) owner reoccupying own former principal residence per lease; (10) expiration of temporary replacement-housing agreement. Sale, lease expiration, Section 8 status change and foreclosure are not just causes.
- **Key value**: 10 grounds; applies from day one of tenancy; no 12-month wait
- **Coverage conditions**: All fully covered AND partially covered units (new construction post-1980, SFH, condos, Section 8/subsidized, Berkeley Housing Authority units). No unit-count threshold.
- **Exemptions** (fully exempt units, BMC §13.76.050C, exhaustive): transient rentals <14 days; nonprofit co-ops; health facilities; owner-occupied shared kitchen/bath units where landlord (≥50% owner) lived on the property at tenancy inception (Measure BB narrowed from any owner-occupancy); fraternities/sororities; SFH + one permitted ADU with owner-occupant, tenancies after 2018-11-07; sabbatical SFH; golden duplex (owner-occupied 1979-12-31 and currently). 501(c)(3) shelters/transitional housing remain subject to just cause.
- **Effective date**: Original 1980; current text 2024-12-20 (Ord. 7,950-N.S., Measure BB)
- **Penalty / remedy**: BMC §13.76.130B — failure to specify just cause is a defense; §13.76.150B — tenant regains possession + actual damages; willful → $750 or 3× actual damages (greater); §13.76.190 — criminal: up to $500 fine/90 days (first), $1,000/6 months (subsequent); Board/City Attorney injunctions (§13.76.150C).
- **Interaction with state law**: More protective than Civ. Code §1946.2 (day-one coverage; narrower grounds; higher relocation); permitted by §1946.2(g). Ellis Act (Gov. Code §7060) withdrawals governed by BMC ch. 13.77 (BK-JCE-8).
- **Citation**: BMC §13.76.130A.1–10; §13.76.050
- **Source doc id**: D006, D009 · **Source URL**: https://rentboard.berkeleyca.gov/laws-regulations/measure-bb-changes-berkeleys-rent-ordinance
- **Quoted span** [CORPUS D006]: `tenants in units that are fully or partially covered by the Rent Ordinance cannot be evicted unless there is`
- Supporting [CORPUS D009]: `Partially Covered Yes No Yes Yes` ; [CORPUS D006]: `Where the tenant shares a kitchen or bath facilities with the landlord, the unit will be exempt from the Rent Ordinance only if the landlord lived in a unit on the same property at the start of the tenancy.`
- Ordinance text (NOT IN CORPUS; Ord. 7,950-N.S.): `No landlord shall be entitled to recover possession of a rental unit covered by the terms of this chapter unless said landlord shows the existence of one of the following grounds:`
- **Confidence**: 0.95
- **Address-lookup facts needed**: fully-exempt status only (owner-occupied shared facilities, co-op, dorm/fraternity, health facility, golden duplex, ADU). Berkeley rows = "5+ unit" use codes → duplex/ADU/SFH exemptions cannot apply; co-op/fraternity/dorm/health-facility status **unknown but unlikely** → **applies (with caveat)** regardless of year built.

#### BK-JCE-2 — Nonpayment eviction only if debt ≥ one month of HUD Fair Market Rent
- **Rule ID**: BK-JCE-2
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Minimum rent-debt threshold for nonpayment evictions (BMC §13.76.130A.1, Measure BB)
- **Requirement**: Nonpayment is not just cause unless the rent demanded is at least one month of HUD Fair Market Rent for a unit of equivalent size in the Oakland-Fremont HUD Metro FMR area for the fiscal year of the demand (3-day notice still required).
- **Key value**: ≥ 1 month FMR (Rent Board "current FY" table: studio $2,142; 1BR $2,385; 2BR $2,912; 3BR $3,724; 4BR $4,413 — FY label not shown on page)
- **Coverage conditions / Exemptions**: As BK-JCE-1.
- **Effective date**: 2024-12-20
- **Penalty / remedy**: As BK-JCE-1.
- **Interaction with state law**: Stricter than Civ. Code §1946.2(b)(1)(A)/CCP §1161(2).
- **Citation**: BMC §13.76.130A.1
- **Source doc id**: D006 · **Source URL**: https://rentboard.berkeleyca.gov/laws-regulations/measure-bb-changes-berkeleys-rent-ordinance
- **Quoted span** [CORPUS D006]: `For a landlord to evict a tenant for nonpayment of rent, the tenant must owe an amount of rental debt equal to or greater than one month of the Fair Market Rent (FMR) value for a unit of equivalent size`
- **Confidence**: 0.93 · **Notes**: FMR dollar table from Rent Board "Just Cause & Other Local Requirements" page — fiscal year not labelled; verify FY2026 vs FY2027.
- **Address-lookup facts needed**: as BK-JCE-1 → applies.

#### BK-JCE-3 — No eviction for refusing to sign a substantially similar new lease
- **Rule ID**: BK-JCE-3
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Elimination of "failure to sign new lease" just cause (Measure BB)
- **Requirement**: A landlord cannot evict a tenant for failing to sign a substantially similar lease upon expiration of a fixed-term lease.
- **Key value**: ground eliminated
- **Coverage conditions / Exemptions**: As BK-JCE-1.
- **Effective date**: 2024-12-20
- **Penalty / remedy**: As BK-JCE-1.
- **Interaction with state law**: Civ. Code §1946.2(b)(1)(E) allows this ground statewide; Berkeley removes it locally (more protective).
- **Citation**: BMC §13.76.130A (ground removed by Ord. 7,950-N.S.)
- **Source doc id**: D006 · **Source URL**: https://rentboard.berkeleyca.gov/laws-regulations/measure-bb-changes-berkeleys-rent-ordinance
- **Quoted span** [CORPUS D006]: `A landlord cannot evict a tenant for failing to sign a substantially similar lease upon expiration of a fixed-term lease.`
- **Confidence**: 0.93
- **Address-lookup facts needed**: as BK-JCE-1 → applies.

#### BK-JCE-4 — Material lease violation: mutual terms, substantial actual damage, unreasonable conduct, detailed notice to cease
- **Rule ID**: BK-JCE-4
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Heightened standard for lease-breach evictions (BMC §13.76.130A.2, Measure BB)
- **Requirement**: Only mutually agreed lease terms are "material"; landlord must show the breach caused substantial actual damage and the tenant's behavior was unreasonable; the notice to cease must identify the lease term, date and resulting injury in detail; unauthorized-subtenant evictions barred where consent was unreasonably withheld, tenant still occupies and occupancy limits are met.
- **Key value**: substantial actual damage + unreasonable behavior
- **Coverage conditions / Exemptions**: As BK-JCE-1.
- **Effective date**: 2024-12-20
- **Penalty / remedy**: As BK-JCE-1.
- **Interaction with state law**: Stricter than Civ. Code §1946.2(b)(1)(B).
- **Citation**: BMC §13.76.130A.2
- **Source doc id**: D006 · **Source URL**: https://rentboard.berkeleyca.gov/laws-regulations/measure-bb-changes-berkeleys-rent-ordinance
- **Quoted span** [CORPUS D006]: `The alleged violation must cause substantial, actual damage to the landlord.`
- **Confidence**: 0.93
- **Address-lookup facts needed**: as BK-JCE-1 → applies.

#### BK-JCE-5 — Eviction notice must reference Rent Board; copies filed with Rent Board within 3 business days
- **Rule ID**: BK-JCE-5
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Termination-notice contents and Rent Board filing (BMC §13.76.130B, C, D; Regs. 1310–1312)
- **Requirement**: Every notice terminating tenancy must state the just cause, include a statement that advice is available from the Rent Board with its current counseling phone number and website, allege compliance with registration/rent ceiling and habitability (for covered units), and include the Notice of Tenant Protection Ordinance; landlord must file copies of any termination notice, notice to quit and UD summons/complaint with the Rent Board within three business days of service.
- **Key value**: 3 business days filing
- **Coverage conditions / Exemptions**: As BK-JCE-1.
- **Effective date**: 2024-12-20 (3-day filing; previously 10 days)
- **Penalty / remedy**: Omission is a defense to the eviction (§13.76.130B).
- **Interaction with state law**: Supplements Civ. Code §1946.2(f) notice requirements.
- **Citation**: BMC §13.76.130B–D
- **Source doc id**: D006 · **Source URL**: https://rentboard.berkeleyca.gov/laws-regulations/measure-bb-changes-berkeleys-rent-ordinance
- **Quoted span** [CORPUS D006]: `The landlord must file with the Rent Board a copy of any notice to terminate a tenancy, notice to quit, and summons and complaint no later than three business days after the tenant was served with the document.`
- Supporting [CORPUS D006]: `Any notice terminating a tenancy must contain a statement that advice about the notice is available from the Rent Board, the current phone number for the Rent Board’s Housing counseling services, and the current address of the Rent Board’s website.`
- **Confidence**: 0.95
- **Address-lookup facts needed**: as BK-JCE-1 → applies.

#### BK-JCE-6 — Notice of Tenant Rights at start of tenancy (tenancies on/after 2024-12-20) and common-area posting
- **Rule ID**: BK-JCE-6
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Notice of Tenant Rights requirement (Measure BB)
- **Requirement**: For tenancies started on/after 2024-12-20, within 15 days of tenancy start the landlord must give written notice of the existence/scope of the Rent Ordinance, right to petition against rent increases (if applicable), whether the unit is exempt from rent control and any partial exemptions; post it in any interior common area; and sign the registration-form affidavit confirming delivery. Rent Board publishes forms for fully and partially covered units.
- **Key value**: within 15 days; tenancies on/after 2024-12-20
- **Coverage conditions**: Fully and partially covered units.
- **Exemptions**: Fully exempt units.
- **Effective date**: 2024-12-20
- **Penalty / remedy**: Omission of Tenant Protection notice is a defense to eviction (Rent Board just-cause page); Board fines possible for registration non-compliance.
- **Interaction with state law**: Supplements Civ. Code §1946.2(f) and §1947.12(k) notice language.
- **Citation**: BMC §13.76.080 (registration/affidavit) & Measure BB notice provisions
- **Source doc id**: D006 · **Source URL**: https://rentboard.berkeleyca.gov/laws-regulations/measure-bb-changes-berkeleys-rent-ordinance
- **Quoted span** [CORPUS D006]: `For tenancies started on or after December 20, 2024, landlords must, within fifteen days of the start of the tenancy, give the tenant written notice containing the following information:`
- **Confidence**: 0.93 · **Notes**: The 2024-12-20 date is the effective date of Measure BB (10 days after Council adoption on 2024-12-10).
- **Address-lookup facts needed**: as BK-JCE-1 → applies.

#### BK-JCE-7 — Owner move-in eviction: conditions, protected tenants, relocation $19,413 + $6,471 (2026)
- **Rule ID**: BK-JCE-7
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Owner move-in (OMI) eviction rules and 2026 relocation assistance (BMC §13.76.130A.8; Rent Board 2026 adjustment)
- **Requirement**: An owner of record holding ≥50% interest may recover a unit in good faith for self, spouse, child or parent to occupy as principal residence for ≥36 months; not if a comparable owned unit in Berkeley is/was vacant (90-day presumption); must offer non-comparable vacant units; must disclose relocation rights, minor-child protections, relative's name/relationship, and ≥10% ownership interests; file notice with Board within 10 days; only one unit per property may ever be used for OMI; tenant gets right of first refusal on next vacancy. Protected tenants (cannot be evicted): households with a custodial/family relationship to a minor child residing 12+ months when notice expires during the BUSD school year; tenants 60+ or disabled residing 5+ years; any tenant residing 5+ years where landlord has ≥10% interest in 5+ Berkeley rental units (with small-owner and all-units-protected exceptions). Relocation: standard payment to households with ≥1 year occupancy; additional payment for low-income, disabled, elderly (60+), minor-child households or tenancies pre-1999-01-01; standard amount deposited in escrow with the City within 10 days of notice; CPI-indexed each January 1.
- **Key value**: **$19,413 standard + $6,471 additional, effective 2026-01-01** (1.5% CPI increase; base $15,000/$5,000 in ordinance text)
- **Coverage conditions**: All fully and partially covered units.
- **Exemptions**: Fully exempt units (BK-JCE-1); protected-tenant rule (A.8.l) does not apply where landlord owns ≤3 Berkeley units with ≤9% interest elsewhere, or all landlord's units are occupied by protected tenants and the incoming relative/landlord is 60+/disabled (with 5-year ownership for landlord).
- **Effective date**: Relocation base amounts and protections 2017 (Measure AA, Nov 2016); mandatory annual indexing 2024-12-20 (Measure BB); 2026 amounts effective 2026-01-01 (Board approved 2025-10-16)
- **Penalty / remedy**: Non-payment is a defense to UD; if tenant vacated and payment not made → 3× payment + attorney's fees (§13.76.130A.8.p.vi); bad faith presumed if no move-in within 3 months or <36 months occupancy; §13.76.150B; §13.76.190 criminal.
- **Interaction with state law**: Exceeds Civ. Code §1946.2(d) (one month's rent); permitted by §1946.2(g).
- **Citation**: BMC §13.76.130A.8(a)–(s)
- **Source doc id**: D004 · **Source URL**: https://rentboard.berkeleyca.gov/elected-rent-board/news/2026-adjustments-relocation-assistance-payments
- **Quoted span** [CORPUS D004]: `Annual increases for owner move-in and Ellis Act eviction relocation assistance payments go into effect January 1, 2026.`
- Supporting [CORPUS D004]: `The standard relocation assistance payment will increase to` / `$19,413` ; `The additional relocation assistance payment for qualifying households will increase to` / `$6,471` ; [CORPUS D006]: `The Rent Board must make inflationary adjustments to owner move-in eviction relocation assistance amounts each year.`
- Ordinance text (NOT IN CORPUS; Ord. 7,950-N.S.): `the landlord is required to provide standard relocation assistance to tenant households where at least one occupant has resided in the unit for one year or more in the amount of $15,000.`
- **Confidence**: 0.95 · **Notes**: Rent Board OMI page (online) corroborates $19,413 / $6,471 and the 50%-owner, 5-year/60+/disabled rules.
- **Address-lookup facts needed**: owner's ownership share and portfolio (not in data) → eligibility of the landlord **unknown**; rule itself applies to all covered units → applies.

#### BK-JCE-8 — Ellis Act withdrawal: BMC ch. 13.77 notice periods and same relocation amounts
- **Rule ID**: BK-JCE-8
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Ellis Implementation Ordinance — withdrawal from rental market (BMC ch. 13.77)
- **Requirement**: To withdraw units under the Ellis Act the owner must withdraw all accommodations on the property, give at least 120 days' notice (12 months for senior/disabled tenants with ≥1 year occupancy), pay relocation assistance equal to the OMI amounts (standard $19,413; additional $6,471 for low-income/elderly/disabled/minor-child/pre-1999 households, claimed in writing within 30 days and deposited within 10 days), and observe re-rental constraints (offer to former tenants within 10 years; no vacancy increase for 5 years; no condo conversion for 10 years).
- **Key value**: 120 days / 12 months notice; $19,413 + $6,471 (2026)
- **Coverage conditions**: All units subject to the Rent Ordinance's just-cause provisions.
- **Exemptions**: Fully exempt units.
- **Effective date**: 2026-01-01 for amounts; ch. 13.77 long-standing (1986 Ellis implementation, amended)
- **Penalty / remedy**: Per BMC 13.77 and Gov. Code §7060.2 (damages for re-rental within 2/5 years; tenant right to re-occupy).
- **Interaction with state law**: Implements Gov. Code §7060 et seq., which permits local notice/relocation conditions.
- **Citation**: BMC §13.77.040; §13.77.050A.8
- **Source doc id**: D004 · **Source URL**: https://rentboard.berkeleyca.gov/elected-rent-board/news/2026-adjustments-relocation-assistance-payments ; https://rentboard.berkeleyca.gov/rights-responsibilities/evictions/ellis-act-eviction
- **Quoted span** [CORPUS D004]: `The Ellis Implementation Ordinance requires the same relocation assistance payments for tenants evicted so the owner can remove a property from the rental housing market.`
- **Confidence**: 0.9
- **Address-lookup facts needed**: none beyond coverage → applies.

### Category 3 — security_deposits

#### BK-DEP-1 — Security deposit interest owed annually (fully and partially covered units)
- **Rule ID**: BK-DEP-1
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: security_deposits
- **Status**: in_force
- **Title**: Security deposit interest (BMC §13.76.070; Rent Board Reg. 701–704)
- **Requirement**: Any deposit securing a rental agreement (including advance rent / last month's rent) is held in a fiduciary capacity and accrues simple interest at the Berkeley bank rate (average 6-month CD rate); interest accrued through October 31 must be paid each December (cash or rent rebate; Rent Board: no later than January 31); on move-out a prorated balance is paid with the deposit. The Board publishes the rate by November 15 each year.
- **Key value**: **2025 annual rate 0.9%** (paid Dec 2025 / by 2026-01-31); 2026 move-out rates: Jan–Mar 0.8%, Apr–Jul 0.7%, Aug–Oct 0.6%; **2026 annual (December 2026) rate not yet published as of 2026-10-01** (due by 2026-11-15)
- **Coverage conditions**: All fully covered and partially covered units (incl. new construction, SFH, condos, Section 8).
- **Exemptions**: Fully exempt units (BMC §13.76.050C).
- **Effective date**: 1980 ordinance; current text 2024-12-20; rates annual
- **Penalty / remedy**: Reg. 704 — if annual interest not paid by January 31, tenant may deduct 10% of the deposit amount from rent during the following year; landlord loses AGA eligibility (Rent Board news).
- **Interaction with state law**: Civ. Code §1950.5 has no interest requirement — local rule is additive; deposit amount cap is state-only (BK-DEP-2).
- **Citation**: BMC §13.76.070; Rent Board Regs. 701–704
- **Source doc id**: D007 · **Source URL**: https://rentboard.berkeleyca.gov/rights-responsibilities/security-deposits
- **Quoted span** [CORPUS D007]: `For tenancies in units fully or partially covered by Berkeley's Rent Ordinance, landlords must pay tenants interest on their security deposit at the end of each year and a prorated amount if the tenant moves out before the end of the year.`
- Rate figures (NOT IN CORPUS; Rent Board calculator page): `The interest rate for a December 2025 annual return of security deposit interest: 0.9%.` ; `The interest rate for all October 2026 move-outs is 0.6%.`
- **Confidence**: 0.93 · **Notes**: Rate percentages are not in the corpus; D007 only states the obligation.
- **Address-lookup facts needed**: only fully-exempt status → **applies** regardless of year built/units (5+ unit use code excludes duplex/ADU exemptions).

#### BK-DEP-2 — Deposit amount cap and return rules: no city rule; state Civ. Code §1950.5 governs
- **Rule ID**: BK-DEP-2
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: security_deposits
- **Status**: in_force (no-local-rule finding)
- **Title**: Deposit maximum, deductions, 21-day return and photo documentation — state law only (described on Rent Board page)
- **Requirement**: Berkeley imposes no cap on deposit amount or local return timeline; state AB 12 caps deposits at one month's rent (two months for natural-person/family-trust/natural-person-LLC owners of ≤2 properties/≤4 units) from 2024-07-01; last month's rent counts toward the cap; 21-day itemized return; photos required at move-in (tenancies from 2025-07-01) and before repairs (from 2025-04-01); repair proof from 2025-01-01.
- **Key value**: none at city level (state: 1 month / 2 months small landlord; 21 days)
- **Coverage conditions / Exemptions**: N/A at city level (state small-landlord exception never applies to active-duty service members)
- **Effective date**: N/A (state: 2024-07-01; 2025-01-01; 2025-04-01; 2025-07-01)
- **Penalty / remedy**: N/A at city level (state: bad-faith penalty up to 2× deposit)
- **Interaction with state law**: Civ. Code §1950.5 exclusive on amount/return; Berkeley adds only interest (BK-DEP-1). Fair Chance (BK-SCR-1) also bars higher deposits based on criminal history.
- **Citation**: Cal. Civ. Code §1950.5 (as summarized by Berkeley Rent Board); no BMC provision
- **Source doc id**: D007 · **Source URL**: https://rentboard.berkeleyca.gov/rights-responsibilities/security-deposits
- **Quoted span** [CORPUS D007]: `Starting July 1, 2024, many landlords may only charge one month's rent for unfurnished and` (corpus has a non-breaking space U+00A0 before "furnished units")
- **Confidence**: 0.9 · **Notes**: D007 explicitly says "The Rent Board cannot determine whether a landlord can charge one or two months' rent for a new tenancy."
- **Address-lookup facts needed**: owner type for 2-month exception → **unknown** (no owner data).

### Category 4 — application_screening_fees

#### BK-FEE-1 — Mandatory tenant screening fee rights disclosure and state-cap statement
- **Rule ID**: BK-FEE-1
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: application_screening_fees
- **Status**: in_force
- **Title**: Notification of state-law limitation on tenant screening fees (BMC §13.78.010)
- **Requirement**: An owner/agent who charges an applicant a fee to obtain a consumer credit report or process an application must, in the application or a separate disclosure before receiving the fee, provide a clear and conspicuous "Tenant Screening Fee Rights Statement" (prescribed text or substantially similar) and a statement of the maximum fee cap under Civ. Code §1950.6(b).
- **Key value**: disclosure before fee is collected
- **Coverage conditions**: All residential rental applications in Berkeley (any unit type, incl. exempt units — ch. 13.78 is not tied to Rent Ordinance coverage).
- **Exemptions**: None stated.
- **Effective date**: 2011 (Ord. 7,171-N.S., April 2011); amended 2014 and 2020 (Ord. 7,697-N.S.)
- **Penalty / remedy**: BMC §13.78.020 — civil penalty of $250 per violation payable to the harmed applicant/tenant plus attorney's fees (per third-party summary; not verified against official code — city code site blocked).
- **Interaction with state law**: Implements/supplements Civ. Code §1950.6 (credit report copy within 7 days, receipt, itemization, refund of unused portion, reusable report acceptance per AB 2559, first-qualified-applicant/refund per AB 2493).
- **Citation**: BMC §13.78.010
- **Source doc id**: D005 · **Source URL**: https://rentboard.berkeleyca.gov/laws-regulations/city-berkeley-ordinances-affecting-rental-properties/tenant-screening-and
- **Quoted span** [CORPUS D005]: `the owner must provide, either in the rental application or in a separate disclosure before receiving the fee, a clear and conspicuous tenant screening fee rights statement and a statement of the maximum fee cap permitted under`
- **Confidence**: 0.9 · **Notes**: D005 notes the City has not yet supplied the URL for the rights statement ("This page will be updated once the URL is provided by the City.").
- **Address-lookup facts needed**: none → **applies** to all Berkeley addresses.

#### BK-FEE-2 — Maximum screening fee published by Rent Board: $68.96 for 2026
- **Rule ID**: BK-FEE-2
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: application_screening_fees
- **Status**: in_force
- **Title**: Calculation and publication of maximum allowable tenant screening fee (BMC §13.78.015) — 2026 figure
- **Requirement**: Screening fees may not exceed the CPI-adjusted state maximum under Civ. Code §1950.6(b); the Rent Board computes and publishes the figure annually — **$68.96 for 2026**. Fees may cover only actual out-of-pocket costs and time; unused portion refunded; no fee if no unit is available.
- **Key value**: $68.96 (2026)
- **Coverage conditions**: All Berkeley rental applications.
- **Exemptions**: None.
- **Effective date**: 2026-01-01 (annual)
- **Penalty / remedy**: BMC §13.78.020 ($250 civil penalty, unverified); Civ. Code §1950.6 remedies.
- **Interaction with state law**: The cap itself is state law (Civ. Code §1950.6(b), base $30 indexed to CPI since 1998); Berkeley publishes its own computation.
- **Citation**: BMC §13.78.015; Cal. Civ. Code §1950.6(b)
- **Source doc id**: D005 · **Source URL**: https://rentboard.berkeleyca.gov/laws-regulations/city-berkeley-ordinances-affecting-rental-properties/tenant-screening-and
- **Quoted span** [CORPUS D005]: `The maximum tenant screening fee for 2026 is` / `$68.96`
- **Confidence**: 0.85 · **CONFLICT**: California Apartment Association publishes **$65.86** as the 2026 statewide cap (NOT IN CORPUS); README §9 notes "California's screening-fee cap has no single official 2026 dollar figure." Berkeley's $68.96 likely uses Bay Area CPI vs CAA's statewide/US CPI. Flag for human review; Berkeley figure governs Berkeley disclosures per §13.78.015.
- **Address-lookup facts needed**: none → applies.

#### BK-FEE-3 — Non-refundable fees to existing tenants prohibited (renewals, roommate changes)
- **Rule ID**: BK-FEE-3
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: application_screening_fees
- **Status**: in_force
- **Title**: Prohibition of non-refundable application fees associated with existing tenancies (BMC §13.78.016)
- **Requirement**: An owner/agent may not charge an existing tenant a non-refundable fee to renew a tenancy in whole or part, including fees tied to a roommate's departure or a request to add/replace a roommate; a §1950.6 screening fee may still be charged to a new/additional roommate.
- **Key value**: $0 non-refundable renewal/roommate fees
- **Coverage conditions**: All residential rental agreements in Berkeley.
- **Exemptions**: Lawful §1950.6 screening fee for a new roommate.
- **Effective date**: 2020 (Ord. 7,697-N.S.; Council approval 2020-04-28; BPOA lists "Adopted July 2020" for the July urgency amendment to §13.78.017)
- **Penalty / remedy**: BMC §13.78.020 ($250 per violation, unverified).
- **Interaction with state law**: No state equivalent; additive.
- **Citation**: BMC §13.78.016
- **Source doc id**: D005 · **Source URL**: https://rentboard.berkeleyca.gov/laws-regulations/city-berkeley-ordinances-affecting-rental-properties/tenant-screening-and
- **Quoted span** [CORPUS D005]: `An owner of residential rental property (or the owner’s agent) cannot charge a non-refundable fee to any existing tenant for the purpose of renewing a tenancy, in whole or in part, including any fee associated with the departure of a roommate or to request to add or replace a roommate in a pre-existing household.`
- **Confidence**: 0.9
- **Address-lookup facts needed**: none → applies.

#### BK-FEE-4 — Chapter 13.78 applies to all agreements; contrary lease terms unenforceable; lease-termination fees barred
- **Rule ID**: BK-FEE-4
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: application_screening_fees
- **Status**: in_force
- **Title**: Applicability to existing rental agreements / non-waiver (BMC §13.78.018) and prohibition of lease termination fees (§13.78.017)
- **Requirement**: Chapter 13.78 applies to all residential rental agreements regardless of contrary lease language; violating provisions are unenforceable. §13.78.017 (online, not in corpus) bars fees for ending a tenancy before lease expiration (tenant remains liable per contract for rent).
- **Key value**: non-waivable
- **Coverage conditions**: All Berkeley residential rental agreements.
- **Exemptions**: None.
- **Effective date**: 2020 (Ord. 7,697-N.S.; §13.78.017 urgency amendment July 2020)
- **Penalty / remedy**: BMC §13.78.020.
- **Interaction with state law**: Additive to Civ. Code §1950.6 and §1951.2.
- **Citation**: BMC §13.78.017; §13.78.018
- **Source doc id**: D005 · **Source URL**: https://rentboard.berkeleyca.gov/laws-regulations/city-berkeley-ordinances-affecting-rental-properties/tenant-screening-and
- **Quoted span** [CORPUS D005]: `Chapter 13.78 applies to all residential rental agreements regardless of any contractual language in any rental agreement or lease to the contrary.`
- **Confidence**: 0.85
- **Address-lookup facts needed**: none → applies.

### Category 5 — screening_restrictions

#### BK-SCR-1 — Fair Chance Access to Housing: criminal-history inquiry and use banned
- **Rule ID**: BK-SCR-1
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: Ronald V. Dellums Fair Chance Access to Housing and Public Health and Safety Ordinance (BMC ch. 13.106; Ord. 7,692-N.S.)
- **Requirement**: Housing providers may not inquire about, require disclosure/authorization for, or base any adverse action on criminal history; may not advertise or state that persons with criminal records are excluded; may not demand higher deposits or rent based on criminal history; may not refuse to add an immediate family member based on their criminal history; may not disqualify from Section 8 etc. except where federal/state law requires. Third-party listing services are equally bound.
- **Key value**: total ban on criminal background checks (limited exceptions)
- **Coverage conditions**: All rental housing in Berkeley (any owner, manager, lessor, agent or listing platform), including exempt-from-rent-control units unless listed below.
- **Exemptions** (D003 + BMC §13.106.030(k)/§13.106.040(B)–(C)): (1) lifetime sex-offender registry check permitted only after conditional offer, with individualized assessment and opportunity to respond; (2) public housing/Section 8/HUD-assisted units only to the extent federal law mandates exclusion (must disclose and obtain consent or allow withdrawal); (3) owner-occupied properties of 1–3 units where an owner of record lives on-site as primary residence (SFH, SFH+ADU, duplex, triplex); (4) units rented under an agreement allowing the owner to move back (BMC §13.76.130A.9 — sabbatical); (5) units where an existing tenant seeks to sublet or add/replace roommates.
- **Effective date**: **2020-03-10** per City FAQ ("The Ordinance became effective on March 10, 2020") — **conflict**: D003 says Council "passed" it 2020-04-14 (likely second reading); enforcement grace period extended to 2021-01-01
- **Penalty / remedy**: Administrative fines $1,000–$10,000 per violation; civil damages (actual or 3× one month's rent); punitive damages; attorney's fees and costs; injunctive relief; complaints heard by Rent Stabilization Board (Admin. Reg. 1.18); affordable housing providers must file annual compliance certificate (§13.106.050); records kept 3 years, confidential (§13.106.070).
- **Interaction with state law**: Stricter than FEHA criminal-history regulations (2 CCR §12264 et seq.), which permit individualized assessments; local ban is more protective. Federal rules (e.g., 24 CFR §960.204 lifetime sex-offender/meth-production exclusions) preserved via exception.
- **Citation**: BMC §13.106.040A; §13.106.030; §13.106.050–.070
- **Source doc id**: D003 · **Source URL**: https://rentboard.berkeleyca.gov/Fair_Chance
- **Quoted span** [CORPUS D003]: `The Fair Chance Access to Housing Ordinance prohibits rental housing providers in Berkeley from asking about and using criminal history and/or criminal background checks in their rental housing advertising, applications, tenant selection process, or decision-making.`
- Supporting [CORPUS D003]: `Any landlord found to be in violation of the Ordinance shall be subject to administrative fines of at least $1,000 and up to $10,000 per violation, civil damages including actual damages or three times the amount of one month's rent, punitive damages, attorneys' fees and costs, and injunctive relief.` ; `Owner-occupied properties (between 1-3 units) in which an owner of record resides in one of the units as their primary residence`
- **Confidence**: 0.93 · **Notes**: Ordinance number 7,692-N.S. from City FAQ/third parties (not in corpus). Two passage dates in official materials (March 10 vs April 14, 2020) — flag.
- **Address-lookup facts needed**: owner-occupancy + unit count ≤3 (exemption 3). Berkeley rows have no unit count, but use codes 7700/7200 = "5+ units" → exemption cannot apply → **applies**.

#### BK-SCR-2 — Fair Chance procedural duties: posted notice to applicants; written notice and opportunity to respond before adverse action
- **Rule ID**: BK-SCR-2
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: Fair Chance notice posting and adverse-action due process (BMC ch. 13.106)
- **Requirement**: Housing providers must display the City's "Notice to Rental Applicants and Tenants" prominently on application materials, websites and frequently visited locations; where an exception permits consideration of criminal history and the provider takes adverse action, it must give written notice and an opportunity to respond (individualized assessment, mitigating evidence).
- **Key value**: posting + written notice/response opportunity
- **Coverage conditions / Exemptions**: As BK-SCR-1.
- **Effective date**: 2020-03-10 (grace period to 2021-01-01)
- **Penalty / remedy**: As BK-SCR-1.
- **Interaction with state law**: Parallels FEHA adverse-action notice requirements; local is stricter.
- **Citation**: BMC §13.106.040D–E; §13.106.060 (notice)
- **Source doc id**: D003 · **Source URL**: https://rentboard.berkeleyca.gov/Fair_Chance
- **Quoted span** [CORPUS D003]: `Housing providers must include the following Notice to Rental Applicants and Tenants prominently on their application materials, websites, and at any locations under their control that are frequently visited by Applicants:`
- Supporting [CORPUS D003]: `the landlord is required to provide the applicant/tenant with written notice and an opportunity to respond.`
- **Confidence**: 0.9
- **Address-lookup facts needed**: none → applies.

#### BK-SCR-3 — Reusable screening report must be accepted; no fee if no unit available (state law noted on city page)
- **Rule ID**: BK-SCR-3
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force (state rule restated by city; no additional city obligation)
- **Title**: Screening-process limits restated by Rent Board (Civ. Code §1950.6 / AB 2493 / AB 2559)
- **Requirement**: Landlord must accept a tenant-provided reusable screening report, may not charge a screening fee when no unit is available, and must refund fees to non-selected applicants unless using a first-qualified-applicant policy.
- **Key value**: state-law restatement
- **Coverage conditions / Exemptions**: statewide
- **Effective date**: 2025-01-01 (AB 2493); 2023-01-01 (AB 2559)
- **Penalty / remedy**: Civ. Code §1950.6
- **Interaction with state law**: This is state law; Berkeley adds disclosure (BK-FEE-1).
- **Citation**: Cal. Civ. Code §1950.6 (as restated at BMC §13.78 guidance)
- **Source doc id**: D005 · **Source URL**: https://rentboard.berkeleyca.gov/laws-regulations/city-berkeley-ordinances-affecting-rental-properties/tenant-screening-and
- **Quoted span** [CORPUS D005]: `If the tenant provides a reusable screening report, the landlord must use it.`
- **Confidence**: 0.85 · **Notes**: Recorded so the city category is complete; level is effectively state.
- **Address-lookup facts needed**: none.

### Category 6 — algorithmic_rent_setting

#### BK-ALG-1 — Landlord use of coordinated pricing algorithms prohibited
- **Rule ID**: BK-ALG-1
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: in_force (both candidate effective dates — 2026-01-01 and 2026-03-01 — precede 2026-10-01)
- **Title**: Prohibition on the Sale or Use of Coordinated Pricing Algorithms to Set Rents or Manage Occupancy Levels — landlord use ban (BMC §13.63.030B; Ord. 7,992-N.S.)
- **Requirement**: A landlord may not use a "coordinated pricing algorithm" (analytical/computational process using nonpublic Competitor Data <90 days old from properties not owned/managed by the landlord to calculate and recommend rents, fees, occupancy rates or other terms for future leases, in coordination between a Berkeley landlord and competitors, incl. via third-party vendor) when setting rents or occupancy levels for Berkeley residential dwelling units. Each month and each dwelling unit is a separate violation.
- **Key value**: per-month, per-unit violations; civil penalties up to $1,000 per violation
- **Coverage conditions**: All landlords of residential dwelling units in Berkeley — no coverage threshold (not tied to Rent Ordinance coverage).
- **Exemptions** (definitional, §13.63.020A): (a) aggregated/anonymous reports that do not recommend prices/terms; (b) products setting rent/income limits under affordable-housing guidelines; (c) information used for (i) market research for project financing, (ii) appraisals, (iii) research/testing/training for software development (incl. ML training as long as Competitor Data is not an input at recommendation time). Data ≥90 days old or public data is not "Competitor Data".
- **Effective date**: **CONFLICT — two published dates.** (1) **2026-03-01**: Ord. 7,974-N.S. (adopted 2025-07-08) suspended the chapter's effective date "until March 1, 2026", and the 2025-11-18 first-reading redline of 7,992 included §13.63.070 "The provisions of this Chapter shall not take effect until March 1, 2026." (2) **January 2026**: D002 (Morgan Lewis, Aug 2026) states "Berkeley Mun. Code ch. 13.63 (effective January 2026)"; the final text in D001 (passed to print 2025-11-18, second reading adopted 2025-12-02) lists only §§13.63.010–.060 and **contains no §13.63.070 / no March 1 language**, so under Charter Art. XIV §93 the amended chapter would take effect 30 days after 2025-12-02 ≈ **2026-01-01**. History: original Ord. 7,956-N.S. adopted 2025-03-25 (effective 2025-04-24); RealPage v. City of Berkeley, 3:25-cv-03004-JSC (N.D. Cal.) filed Apr 2025, voluntarily dismissed with prejudice 2026-01-14 (per D002).
- **Penalty / remedy**: §13.63.040 — City Attorney civil action for damages, injunction, restitution/disgorgement, civil penalties up to $1,000 per violation, fees; aggrieved tenant civil action (use-ban only) for injunction, damages, civil penalties up to $1,000 per violation, mandatory fees to prevailing tenant; lease fee-waiver clauses unenforceable.
- **Interaction with state law**: Cumulative with California AB 325 (Bus. & Prof. Code §16729, eff. 2026-01-01) and SB 763 (Cartwright Act penalties); Berkeley's definition is narrower (nonpublic data <90 days; coordination requirement) but adds per-unit tenant remedies. §13.63.010F: chapter does not regulate the amount of rent (so no overlap with AB 1482/Costa-Hawkins).
- **Citation**: BMC §13.63.030B; §13.63.020; §13.63.040; Ord. 7,992-N.S. (amending Ords. 7,956-N.S. and 7,974-N.S.)
- **Source doc id**: D001 (+ D002 for conflict) · **Source URL**: https://berkeleyca.gov/sites/default/files/documents/2025-12-02%20Item%2001%20Ordinance%207992.pdf ; https://morganlewis.com/pubs/2026/08/algorithmic-rent-pricing-litigation-expands-under-new-state-and-local-laws
- **Quoted span** [CORPUS D001]: `It shall be unlawful for a landlord to use a coordinated pricing algorithm described`
- Supporting [CORPUS D001]: `At a regular meeting of the Council of the City of Berkeley held on November 18,` ; `separate residential dwelling unit for which the landlord used the coordinated pricing`
- D002 (NOT IN CORPUS): `Berkeley Mun. Code ch. 13.63 (effective January 2026)`
- Nov-18 redline (NOT IN CORPUS): `13.63.070 Effective Date. The provisions of this Chapter shall not take effect until March 1, 2026.`
- **Confidence**: 0.9 on the rule; 0.6 on exact effective date · **Notes / open questions**: Whether §13.63.070 (March 1, 2026) survives in the codified chapter could not be verified (berkeley.municipal.codes and codepublishing blocked by Cloudflare; search snippet of the codified TOC lists only .010–.040). Either way the ban is in force on 2026-10-01; the conflict matters only for queries dated 2026-01-01 → 2026-02-28. Flag conflict_flag=true.
- **Address-lookup facts needed**: none → **applies** to every Berkeley address regardless of year built/unit count.

#### BK-ALG-2 — Sale/licensing of coordinated pricing algorithms to Berkeley landlords prohibited
- **Rule ID**: BK-ALG-2
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: in_force
- **Title**: Vendor ban (BMC §13.63.030A)
- **Requirement**: It is unlawful to sell, license or otherwise provide to City of Berkeley landlords any coordinated pricing algorithm that sets or recommends rents or occupancy levels for Berkeley residential dwelling units.
- **Key value**: vendor-side prohibition
- **Coverage conditions**: Any vendor supplying Berkeley landlords.
- **Exemptions**: §13.63.020A carve-outs (see BK-ALG-1).
- **Effective date**: as BK-ALG-1 (2026-01-01 vs 2026-03-01 conflict)
- **Penalty / remedy**: City Attorney action only (§13.63.040A) — tenants may sue only for the use ban (B).
- **Interaction with state law**: Parallels AB 325 "distribute" prohibition.
- **Citation**: BMC §13.63.030A
- **Source doc id**: D001 · **Source URL**: https://berkeleyca.gov/sites/default/files/documents/2025-12-02%20Item%2001%20Ordinance%207992.pdf
- **Quoted span** [CORPUS D001]: `It shall be unlawful to sell, license, or otherwise provide to City of Berkeley`
- **Confidence**: 0.9
- **Address-lookup facts needed**: none → applies.

#### BK-ALG-3 — Remedies: City Attorney and tenant civil actions, up to $1,000 per violation
- **Rule ID**: BK-ALG-3
- **Jurisdiction**: Berkeley, CA · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: in_force
- **Title**: Remedies for coordinated pricing algorithm violations (BMC §13.63.040)
- **Requirement**: City Attorney may sue for damages, injunctive relief, restitution/return of illegal profits and civil penalties up to $1,000 per violation (fees if prevailing); an aggrieved tenant may sue a landlord under §13.63.030B for injunctive relief, money damages and civil penalties up to $1,000 per violation with mandatory fee award if prevailing; lease clauses limiting tenant fee recovery are unenforceable. City assumes no liability (§13.63.050).
- **Key value**: up to $1,000 per violation (per unit × per month)
- **Coverage conditions / Exemptions**: as BK-ALG-1.
- **Effective date**: as BK-ALG-1
- **Penalty / remedy**: as stated
- **Interaction with state law**: Cumulative with Cartwright Act remedies (SB 763).
- **Citation**: BMC §13.63.040A–B
- **Source doc id**: D001 · **Source URL**: https://berkeleyca.gov/sites/default/files/documents/2025-12-02%20Item%2001%20Ordinance%207992.pdf
- **Quoted span** [CORPUS D001]: `An aggrieved tenant may file a civil action for violations of section 13.63.030,`
- Supporting [CORPUS D001]: `The City Attorney may file a civil action for violations of section 13.63.030,`
- **Confidence**: 0.93
- **Address-lookup facts needed**: none.

---

## PART C — Cross-cutting notes, conflicts and data-gap summary

### Conflicts to flag (conflict_flag = true)
1. **BK-ALG-1/2/3 effective date**: 2026-03-01 (Ord. 7,974-N.S. suspension; Nov-18 redline §13.63.070) vs January 2026 (D002; D001 final text omits §13.63.070 → 30-day Charter rule ≈ 2026-01-01). In force either way on 2026-10-01.
2. **BK-SCR-1 passage date**: 2020-03-10 (City FAQ "effective") vs 2020-04-14 (D003 "passed").
3. **BK-FEE-2 vs state figure**: Berkeley Rent Board $68.96 (2026) vs CAA $65.86 (2026); README §9 acknowledges no official state figure.
4. **SD-ALG-1/3 draft vs adopted text**: D076 draft (O-2025-107) differs from codified O-21955 (definition "of two or more landlords"; appraisal exclusion; two-way fee shifting; City enforcement subsection).
5. **SD ordinance number**: prompt said "O-21652?" — correct is **O-21647 N.S.** (TPO) and **O-21955 N.S.** (algorithmic ban); amendment **O-21769 N.S.**
6. **Measure BB new-construction sunset**: prompt's "20 years after CO" is the superseded Measure Q (2018) figure; Measure BB sets **15 years after final inspection**, contingent on Costa-Hawkins repeal/amendment — not operative today.

### State-law interactions summary
- AB 1482 (Civ. Code §§1946.2, 1947.12): San Diego — operative rent cap; just cause superseded by stricter local ordinance for covered units (state remains floor). Berkeley — rent cap **superseded** for fully covered units; operative for partially covered units with CO >15 years; just cause superseded by local for all covered units.
- Costa-Hawkins (Civ. Code §1954.50 et seq.): drives Berkeley partial exemptions (post-1980-06-30 CO, SFH, condos) and vacancy decontrol; bars any San Diego rent control on post-1995 units.
- Civ. Code §1950.5 (AB 12/AB 2801): sole deposit-amount/return rule in both cities; Berkeley adds interest.
- Civ. Code §1950.6 (AB 2493/AB 2559): sole fee cap in both cities; Berkeley adds disclosure, publication, renewal-fee ban.
- FEHA (Gov. Code §12955; 2 CCR §12264 et seq.): criminal-history baseline (San Diego relies on it; Berkeley bans outright); source of income baseline (San Diego ordinance broader).
- AB 325 / SB 763 (B&P §16729; Cartwright Act), eff. 2026-01-01: statewide algorithmic pricing rule cumulative with both city bans (test T1: not_yet_effective 2025-12-31 → applies 2026-01-02 for all CA addresses).

### Address-lookup results forced by data gaps
| Rule group | San Diego rows (units known, no year built) | Berkeley rows (no year built, no units) |
|---|---|---|
| SD-RENT-1/SD-DEP-1/SD-FEE-1/SD-SCR-3 (no city rule) | state rule applies; 15-yr CO exemption for AB 1482 **unknown** | — |
| SD-JCE-1…9, SD-RENT-2, SD-SCR-2 | **unknown** strictly (CO <15 yrs exemption untestable); SFH/duplex/separately-alienable exemptions excluded by 5+ units | — |
| SD-SCR-1 (source of income) | **applies** (shared-kitchen exemption implausible for 5+ units; owner data absent → caveat) | — |
| SD-ALG-1/2/3 | **applies** regardless | — |
| BK-RENT-1…6 (rent ceiling/AGA) | — | **unknown** (pre/post 1980-06-30 CO untestable; subsidy status unknown) |
| BK-JCE-1…8, BK-DEP-1 | — | **applies** (fully-exempt categories implausible for 5+ unit use codes; co-op/dorm/fraternity status unknown → caveat) |
| BK-FEE-1…4, BK-SCR-1/2, BK-ALG-1/2/3 | — | **applies** regardless |
| BK-DEP-2 (state deposit cap small-landlord exception) | — | owner type **unknown** |

Jurisdiction caveat for both: `postal_city` must be resolved to the incorporated city (Census Geocoder) before any city rule is attached.

### Items noted but outside the six categories (for completeness)
- SDMC Ch. 9 Art. 8 Div. 9 (Notice of Tenant's Right to Operate a Daycare Home, eff. 2024-01-01) and Div. 12 (Residential Tenant Utility Fees, O-21987 N.S., eff. 2025-08-17) — seen on D074 mirror.
- Berkeley BMC §13.76.135 Tenant Right to Organize (Measure BB) — parcels with ≥10 units or professionally managed 1–9 units.
- Berkeley Rent Board registration fees FY2026-27 and Measure BB amnesty extension (news headlines in D003–D007 footers).


---

# PART 4 — NEW JERSEY, JERSEY CITY, HOBOKEN, NEWARK

# Rental-Housing Legal Rule Extraction — New Jersey (state), Jersey City, Hoboken, Newark

Snapshot date for status determinations: **2026-10-01**.
Corpus dir: `...\participant-final-no-hour16 3\corpus\text\`. Corpus docs read in full: D036, D065, D066, D067 (all 2,484 lines), D068, D069. Link-only docs fetched: D060 (Day Pitney), D061 (N.J.S.A. 10:5-12), D062 (N.J.S.A. 2A:18-61.1), D063 (N.J.S.A. 46:8-21.2), D064 (N.J.S.A. 46:8-26), D035 (Hudson County View), D037 (Morgan Lewis), D032/D033/D034 (Hoboken ecode360 ch.155 / ch.155 Art. II / ch.158), D070/D071/D072 (Newark ecode360 ch.19:2 / ch.2:10 / ch.2:31). Additional primary sources pulled: Jersey City Ord. 25-057 (creating §218-12), Ord. 25-098 (adding §218-12(3)), Ord. 20-036 and Ord. 26-028 (full §260-1/§260-3 text), Ord. 25-125 (defeated), Hoboken ch.155 Arts. I, III, VII, Newark §2:10-11.

Quoted spans marked **(CORPUS)** are character-for-character from the corpus text file named in "Source doc id" and are confined to a single line of that file so they string-match. Spans marked **NOT IN CORPUS** come from online sources.

Rule-ID category codes: RENT = rent_increase_limits · JCE = just_cause_eviction · DEP = security_deposits · FEE = application_screening_fees · SCR = screening_restrictions · ALGO = algorithmic_rent_setting.

---

## 0. Cross-cutting findings (read first)

1. **NJ has no statewide rent cap.** D067: "The State of New Jersey has no laws that establish, govern or control rents." Rent control is municipal; state law overlays (a) an "unconscionability" ceiling enforced in eviction court, (b) the Newly Constructed Multiple Dwellings exemption (N.J.S.A. 2A:42-84.1 et seq., 30 years / mortgage amortization) that pre-empts every local ordinance, and (c) HUD/NJHMFA-regulated rents are outside local control.
2. **Jersey City, Hoboken and Newark all have rent control, with three different coverage models:**
   - Jersey City ch. 260: lesser of **4% or CPI**; **dwellings with four or fewer housing spaces are exempt regardless of owner-occupancy** (Ord. 25-125, which would have aggregated common-ownership portfolios, was **defeated** Nov 25 2025).
   - Hoboken ch. 155: lesser of **5% or CPI**; **no unit-count or owner-occupancy exemption at all** (applies to 1-4 unit buildings); 25% vacancy-decontrol bump once per 3 years.
   - Newark ch. 19:2: lesser of **CPI (15→3 months) or 4%**; **no vacancy decontrol**; applies to "all multiple dwellings" defined as **one or more** units; the code **does not list owner-occupied 1-4 unit dwellings as exempt** (although it still defines "owner occupied" and DCA's survey and several guides still report that exemption — conflict flagged); 25% absolute one-year ceiling including surcharges.
3. **Just cause, deposits, application fees and screening are state-level only** in all three cities, with one exception: **Newark Code ch. 2:31 Art. 1 ("Ban the Box" – Housing, 2015)** is a live local criminal-history screening ordinance that is partly more permissive (8-/5-year lookbacks) and partly stricter (10-business-day registered-mail adverse notice) than the state Fair Chance in Housing Act.
4. **Algorithmic rent-setting:** Jersey City §218-12 (adopted 2025-05-21, in force, $100–$2,000 per day, public + private enforcement, plus mandatory sworn disclosure with every lease/increase since Ord. 25-098) and Hoboken §158-2 (adopted 2025-07-09, in force, fine ≤ $2,000 / 90 days community service, private-citizen complaints to Municipal Court) are **in_force**. **Newark has no local ordinance** (confirmed by search of code and news). The state **FAIR Act, P.L.2026, c.43** (approved 2026-07-20) is **not_yet_effective until 2027-07-01**; its §6(b) bars municipalities from "enacting an ordinance that conflicts with this act" — a **potential-conflict flag** for Jersey City and Hoboken from 2027-07-01 (analysis in NJ-STATE-ALGO-1).
5. **Key date math (from statute text):** FCHA approved 2021-06-18 → effective first day of 7th month → **2022-01-01**. Fee cap approved 2026-01-20 → first day of 4th month → **2026-05-01**; first CPI adjustment **2027-01-01**. FAIR Act approved 2026-07-20 → first day of 12th month → **2027-07-01**.

---

# PART A — NEW JERSEY (STATE)

## A1. rent_increase_limits

### NJ-STATE-RENT-1
- **Rule ID**: NJ-STATE-RENT-1
- **Jurisdiction**: NJ · **Level**: state · **Category**: rent_increase_limits
- **Status**: in_force (as a "no numeric cap" finding)
- **Title**: No statewide rent control / rent cap — rent regulation is municipal
- **Requirement**: New Jersey imposes no statewide limit on the amount or frequency of rent increases; municipalities may (and ~100 do) adopt rent control or rent leveling ordinances enforced by local boards. Where no local ordinance applies, the only state-law limits are procedural (lease must be terminated and re-offered; no mid-lease increase) and the "unconscionability" standard (see NJ-STATE-RENT-2).
- **Key value**: No statewide cap (null). "No rule at state level" for a numeric limit.
- **Coverage conditions**: All residential tenancies statewide.
- **Exemptions**: N/A (absence of rule).
- **Effective date**: N/A (long-standing; case law Inganamort v. Fort Lee 1973, Helmsley v. Fort Lee 1978 upholds municipal rent control).
- **Penalty / remedy**: None at state level.
- **Interaction with other levels**: Delegates the field to municipalities; Jersey City ch. 260, Hoboken ch. 155, Newark ch. 19:2 are the operative caps in the three target cities. State law overlays NJ-STATE-RENT-2 (unconscionability), NJ-STATE-RENT-3 (new-construction exemption), NJ-STATE-RENT-4 (HUD/NJHMFA exemption).
- **Citation**: NJ DCA "Truth in Renting" statement (N.J.S.A. 46:8-43 et seq. mandate), Rent Control/Rent Increases section; N.J.S.A. 2A:18-61.1(f).
- **Source doc id**: D067 · **Source URL**: https://www.nj.gov/dca/codes/publications/pdf_lti/t_i_r.pdf
- **Quoted span (CORPUS)**: `The State of New Jersey has no laws that establish, govern or control rents.`
- **Confidence**: 0.98
- **Notes / open questions / conflicts**: Second supporting span (D067): `may pass an ordinance establishing rent control or rent leveling. Locally created boards enforce` . A statewide rent-cap bill has not been enacted as of 2026-10-01.
- **Address-lookup facts needed**: Municipality only (to route to local ordinance). **Data gaps**: none at state level.

### NJ-STATE-RENT-2
- **Rule ID**: NJ-STATE-RENT-2
- **Jurisdiction**: NJ · **Level**: state · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Rent increases must not be "unconscionable" and require lease termination + one month's notice to quit (Anti-Eviction Act §61.1(f))
- **Requirement**: A landlord cannot raise rent mid-lease; to increase rent the landlord must terminate the existing lease and offer a new one at the higher rent by written notice, and may evict for non-payment of the increase only if the increase is not unconscionable and complies with any municipal rent ordinance. A Notice to Quit must be served at least one month before filing suit for non-payment of an increase.
- **Key value**: Standard = "not unconscionable" (fact-sensitive; shock-the-conscience test); notice = 1 month (Notice to Quit) before suit; no mid-lease increases.
- **Coverage conditions**: All tenancies covered by the Anti-Eviction Act (see NJ-STATE-JCE-1 coverage).
- **Exemptions**: Owner-occupied premises with not more than two rental units and transient hotel/motel/guest-house units (not covered by the Anti-Eviction Act; those landlords use N.J.S.A. 2A:18-53 and may simply not renew). HUD/NJHMFA-regulated projects follow federal/agency increase rules.
- **Effective date**: 1974-06-25 (P.L.1974, c.49; the Anti-Eviction Act)
- **Penalty / remedy**: Tenant may withhold the increase and defend the eviction; court decides unconscionability; if unconscionable or non-compliant with rent control the eviction fails. Where a rent control board exists the tenant may file a complaint there.
- **Interaction with other levels**: Local rent control caps define compliance; "must comply with any municipal ordinances governing rent increases."
- **Citation**: N.J.S.A. 2A:18-61.1(f); N.J.S.A. 2A:18-61.2; Fromet Properties v. Buel, 294 N.J. Super. 601 (App. Div. 1996); Hale v. Farrakhan, 390 N.J. Super. 335 (App. Div. 2007)
- **Source doc id**: D067 · **Source URL**: https://www.nj.gov/dca/codes/publications/pdf_lti/t_i_r.pdf
- **Quoted span (CORPUS)**: `unconscionable; it must not be so unreasonable as to shock the conscience of a fair and honest`
- **Confidence**: 0.95
- **Notes**: Supporting spans (D067): `rent mid-lease term. The old lease must be terminated, and the new lease must have the increased` ; `to Quit must be served on the tenant at least one month prior to filing the suit for eviction` ; statutory text (D062, NOT IN CORPUS): "f. The person has failed to pay rent after a valid notice to quit and notice of increase of said rent, provided the increase in rent is not unconscionable and complies with any and all other laws or municipal ordinances governing rent increases."
- **Address-lookup facts needed**: unit count + owner-occupancy (to decide whether Anti-Eviction Act applies). **Data gaps**: JC/Newark rows have no unit count and Hoboken rows mostly lack units → Anti-Eviction Act applicability = **unknown** for those rows; recommended default = treat as covered (most rentals are) and flag.

### NJ-STATE-RENT-3
- **Rule ID**: NJ-STATE-RENT-3
- **Jurisdiction**: NJ · **Level**: state · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Newly Constructed Multiple Dwellings Law — 30-year exemption from any local rent control
- **Requirement**: Newly constructed multiple dwellings are exempt from any municipal rent control or rent leveling ordinance for the period of amortization of the initial mortgage or 30 years following completion of construction, whichever is less (30 years if no mortgage). Owner must file a claim of exemption with the construction official before the certificate of occupancy and notify tenants in the lease.
- **Key value**: 30 years (or initial-mortgage amortization period, whichever is less), measured from completion of construction (issuance of CO).
- **Coverage conditions**: "Multiple dwellings" (3+ units under the Hotel and Multiple Dwelling Law) constructed after the law's effective date (June 25, 1987), with timely exemption filing.
- **Exemptions**: Not available where owner failed to file the pre-CO statement or lease notice; expires at end of period, after which the last rent becomes base rent under local ordinance.
- **Effective date**: 1987-06-25 (P.L.1987, c.153, N.J.S.A. 2A:42-84.1 to -84.6)
- **Penalty / remedy**: Loss of exemption / local ordinance applies.
- **Interaction with other levels**: Overrides Jersey City ch. 260 (§260-6; and since Ord. 25-099 (2025-09-24) §260-21 limits the exemption to the §260-3(A),(B) increase caps only — secondary source), Hoboken §155-2(H) (expressly incorporates it), Newark §19:2-18.1 (incorporates it; Newark's 2023 attempt to cap new construction at 5% was rolled back) and Newark §2:10-11 (excludes units exempt under 2A:42-84.1-84.6).
- **Citation**: N.J.S.A. 2A:42-84.1 et seq. (cited in D067 as "N.J.S.A. 2A:42 -84.5")
- **Source doc id**: D067 · **Source URL**: https://www.nj.gov/dca/codes/publications/pdf_lti/t_i_r.pdf
- **Quoted span (CORPUS)**: `constructed multiple dwellings shall be exempt from any local rent control ordinances for a period`
- **Confidence**: 0.95
- **Notes**: D067 continues: "30 years following completion of construction of the building." Hoboken §155-2(H) (NOT IN CORPUS) quotes the June 25, 1987 cut-off and the "whichever is less" rule verbatim.
- **Address-lookup facts needed**: **year built / CO date** and unit count (≥3). **Data gaps**: NJ year-built often missing → new-construction exemption status = **unknown**; a building with CO ≤ 1996-10-01 is certainly past the 30-year window (as of 2026-10-01); buildings with CO after 1996-10-01 may still be exempt.

### NJ-STATE-RENT-4
- **Rule ID**: NJ-STATE-RENT-4
- **Jurisdiction**: NJ · **Level**: state · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: HUD-owned/subsidized and NJHMFA-financed projects are not subject to municipal rent control
- **Requirement**: Housing developments owned or subsidized by HUD (and certain HUD-insured developments) and projects whose rents are fixed by NJHMFA are not subject to municipal rent control; increases follow HUD/NJHMFA rules. Also, after a condominium/co-op conversion rents may not be raised to recover conversion costs (N.J.S.A. 2A:18-61.31).
- **Key value**: Exempt from local rent control (rent set by HUD/NJHMFA).
- **Coverage conditions**: HUD-owned, HUD-subsidized, HUD-insured with economic problems; NJHMFA-financed projects.
- **Exemptions**: N/A.
- **Effective date**: long-standing (not dated in source)
- **Penalty / remedy**: N/A.
- **Interaction with other levels**: Mirrors local exemptions (Newark §19:2-2 "Exemptions" (a),(e),(f); Hoboken §155-2(F) and §155-2.1; Jersey City §260-1 A.4 "Low rent public housing developments").
- **Citation**: D067 "Public Financed and Subsidized Housing"; N.J.S.A. 2A:18-61.31
- **Source doc id**: D067 · **Source URL**: https://www.nj.gov/dca/codes/publications/pdf_lti/t_i_r.pdf
- **Quoted span (CORPUS)**: `determined by HUD to have certain economic problems, are not subject to municipal rent control.`
- **Confidence**: 0.9
- **Address-lookup facts needed**: subsidy / financing status (HUD, NJHMFA, Section 8 project-based). **Data gaps**: not in address data → **unknown**; default = not subsidized.

## A2. just_cause_eviction

### NJ-STATE-JCE-1
- **Rule ID**: NJ-STATE-JCE-1
- **Jurisdiction**: NJ · **Level**: state · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Anti-Eviction Act — good cause required to evict or refuse to renew (N.J.S.A. 2A:18-61.1)
- **Requirement**: A residential landlord may not evict, or fail to renew a written or oral lease, without one of the statutory good-cause grounds (a)–(r); a tenant cannot be evicted merely because the lease term ended, and only a court judgment and warrant executed by a court officer can remove a tenant (no self-help).
- **Key value**: 18 enumerated grounds (a–r): nonpayment; disorderly conduct after notice to cease; damage; breach of rules after notice; breach of lease covenants after notice; non-payment of lawful rent increase; health/safety board-up, code compliance, illegal occupancy, government retirement; permanent retirement from residential use; refusal of reasonable lease changes; habitual late payment after notice; condo/co-op conversion; post-conversion / ≤3-unit owner personal occupancy; employment-based tenancy ended; drug conviction on premises; assault/terroristic threats conviction; civil liability for theft/assault/drugs; theft conviction; human-trafficking civil finding.
- **Coverage conditions**: All residential tenancies (single-family homes, apartments, mobile homes, rooming/boarding houses) **except** the exemptions below.
- **Exemptions**: (1) owner-occupied premises with not more than two rental units; (2) hotel/motel/guest house rented to a transient guest or seasonal tenant (hotel residents with no other residence are covered); (3) unit held in trust for, or (4) permanently occupied by, a developmentally disabled member of the owner's immediate family. Public housing follows the Act plus HUD regs. Exempt owner-occupied 2–3 family landlords instead proceed under N.J.S.A. 2A:18-53 (see NJ-STATE-JCE-3).
- **Effective date**: 1974-06-25 (P.L.1974, c.49; last amended P.L.2013, c.51)
- **Penalty / remedy**: Eviction dismissed; illegal lockouts/self-help are disorderly conduct and support damages, costs, attorney fees and treble damages under N.J.S.A. 2A:39-1 et seq.; landlord who evicts for personal occupancy and does not occupy ≥6 months, or re-rents a "retired" building within 5 years, owes 3x damages plus fees and up to $10,000 civil penalty (N.J.S.A. 2A:18-61.6).
- **Interaction with other levels**: Jersey City, Hoboken and Newark have **no local just-cause ordinances**; Hoboken §155-1 defines "just cause for eviction" by reference to state law; Newark §19:2-14 adds a local anti-retaliation rule. Hudson County tenants (Jersey City, Hoboken) also get the Tenant Protection Act of 1992 for conversions. FCHA §12(d)(2) creates an extra eviction ground (45 days' notice) after a successful landlord appeal.
- **Citation**: N.J.S.A. 2A:18-61.1 to -61.12; N.J.S.A. 2A:18-53; N.J.S.A. 2A:18-61.6; N.J.S.A. 2A:39-1 et seq.
- **Source doc id**: D067 (also D062) · **Source URL**: https://www.nj.gov/dca/codes/publications/pdf_lti/t_i_r.pdf ; https://law.justia.com/codes/new-jersey/title-2a/section-2a-18-61-1/
- **Quoted span (CORPUS)**: `lease, whether it is a written or an oral lease without good cause. The landlord must be able to`
- **Confidence**: 0.97
- **Notes**: Exemption span (D067): `This law may not apply to two - or three-unit owner-occupied premises with two (2) or` (continues "fewer rental units"). Statute (D062, NOT IN CORPUS): "other than (1) owner-occupied premises with not more than two rental units or a hotel, motel or other guest house or part thereof rented to a transient guest or seasonal tenant". The prompt's "≤3 units?" question resolves as: the test is **not more than two *rental* units in an owner-occupied building** (i.e., an owner-occupied 3-family qualifies because it has 2 rental units; an owner-occupied 4-family does not).
- **Address-lookup facts needed**: total units, owner-occupancy, property type (hotel/motel). **Data gaps**: no unit counts for JC/Newark rows and 39/40 Hoboken rows → exemption status **unknown**; because the exemption is narrow, recommended default = "applies (good cause required)" with an "unknown owner-occupied ≤2-rental-unit exemption" flag.

### NJ-STATE-JCE-2
- **Rule ID**: NJ-STATE-JCE-2
- **Jurisdiction**: NJ · **Level**: state · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Notice-to-Cease / Notice-to-Quit periods by ground (N.J.S.A. 2A:18-61.2)
- **Requirement**: Every good-cause eviction other than non-payment requires a written Notice to Quit describing the cause in detail, served before filing; several grounds also require a prior Notice to Cease. Non-payment needs no notice (14 days in federally subsidized housing).
- **Key value**: None for nonpayment (14 days federally subsidized); 3 days — disorderly conduct, destruction, employment-based tenancy, drug/assault/theft convictions; 1 month — rule/covenant breach, non-payment of increase, refusal of reasonable changes, habitual late payment; 2 months — post-conversion/≤3-unit personal occupancy; 3 months — health/safety, illegal occupancy (plus relocation = 6x monthly rent for illegal occupancy); 18 months — permanent retirement; 3 years — condo/co-op conversion (with up to five 1-year stays); 90 days — foreclosure purchaser personal occupancy. Warrant of removal not before 3 business days after judgment; tenant then has 3 business days.
- **Coverage conditions**: Same as NJ-STATE-JCE-1.
- **Exemptions**: Same as NJ-STATE-JCE-1.
- **Effective date**: 1974-06-25
- **Penalty / remedy**: Defective notice = dismissal of the eviction complaint.
- **Interaction with other levels**: Local rent ordinances add separate 30-day increase notices (Hoboken §155-4, Newark §19:2-3.2) that run alongside the state Notice to Quit.
- **Citation**: N.J.S.A. 2A:18-61.2; N.J.S.A. 2A:18-57; N.J.S.A. 2A:42-10.16
- **Source doc id**: D067 · **Source URL**: https://www.nj.gov/dca/codes/publications/pdf_lti/t_i_r.pdf
- **Quoted span (CORPUS)**: `in a written notice to the tenant. A “Notice to Quit” is required for all good cause evictions,`
- **Confidence**: 0.95
- **Address-lookup facts needed**: same as JCE-1; also whether federally subsidized (14-day nonpayment notice).

### NJ-STATE-JCE-3
- **Rule ID**: NJ-STATE-JCE-3
- **Jurisdiction**: NJ · **Level**: state · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Owner-occupied two- and three-family dwellings — limited grounds under N.J.S.A. 2A:18-53 (no good-cause protection against non-renewal)
- **Requirement**: Tenants in landlord-occupied two- and three-family dwellings can be removed only by court order, but the landlord need only prove holdover after lease expiration (with written demand for possession), non-payment, disorderly conduct, willful damage, constant rule violations, or breach of a lease clause reserving re-entry. Non-renewal is permitted with a 3-month notice to quit (at-will or year-to-year tenancies) or 1-month notice (month-to-month).
- **Key value**: Notice: 3 months (year-to-year / at-will), 1 month (month-to-month); 3-day written Notice to Quit for disorderly/destructive/rule-violation causes; none for non-payment.
- **Coverage conditions**: Owner-occupied building with not more than two rental units (DCA phrases this as owner-occupied two- or three-family dwellings).
- **Exemptions**: N/A (this is the carve-out regime). Foreclosure 90-day notice still applies to these units.
- **Effective date**: pre-1974 (summary dispossess statute); operates as the residual regime since 1974-06-25
- **Penalty / remedy**: Self-help still prohibited; Truth-in-Renting distribution not required for these buildings.
- **Interaction with other levels**: No local overlay in JC/Hoboken/Newark.
- **Citation**: N.J.S.A. 2A:18-53; N.J.S.A. 2A:18-61.2(a)
- **Source doc id**: D067 · **Source URL**: https://www.nj.gov/dca/codes/publications/pdf_lti/t_i_r.pdf
- **Quoted span (CORPUS)**: `Tenants of landlord-occupied two- and three-family dwellings can be removed only when`
- **Confidence**: 0.93
- **Address-lookup facts needed**: owner-occupancy + unit count (≤3 total / ≤2 rental). **Data gaps**: unknown for JC/Newark/Hoboken rows → cannot determine which regime applies → **unknown**.

### NJ-STATE-JCE-4
- **Rule ID**: NJ-STATE-JCE-4
- **Jurisdiction**: NJ · **Level**: state · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Anti-reprisal protection and landlord-registration precondition to eviction
- **Requirement**: A landlord may not evict, refuse to renew, or substantially alter a lease in reprisal for a tenant enforcing lease/legal rights, making good-faith code complaints, or organizing; and a landlord who has not filed the required landlord registration (municipal clerk for 1–2 unit non-owner-occupied; BHI for 3+ units) cannot obtain a judgment of possession (court holds case up to 90 days then dismisses).
- **Key value**: Reprisal = civil damages; registration = 90-day continuance then dismissal; registration penalty up to $500 per offense.
- **Coverage conditions**: Reprisal law — all dwelling rentals incl. mobile homes except owner-occupied two- or three-family dwellings; registration — all rentals except owner-occupied two-family.
- **Exemptions**: Owner-occupied 2–3 family (reprisal); owner-occupied two-family (registration).
- **Effective date**: 1970 (reprisal, N.J.S.A. 2A:42-10.10); 1974 (registration, N.J.S.A. 46:8-27 et seq.)
- **Penalty / remedy**: Damages (reprisal); up to $500 per offense + eviction dismissal (registration).
- **Interaction with other levels**: Newark §19:2-14 (local retaliation ban) and Newark §19:2-26 (no leasing without rent-control registration + certificate of habitability) stack on top; Jersey City requires annual landlord registration through the Office of Landlord/Tenant Relations (D036).
- **Citation**: N.J.S.A. 2A:42-10.10 to -10.14; N.J.S.A. 46:8-27 to -37
- **Source doc id**: D067 · **Source URL**: https://www.nj.gov/dca/codes/publications/pdf_lti/t_i_r.pdf
- **Quoted span (CORPUS)**: `A landlord cannot take reprisal action against a tenant by eviction, substantial alteration of`
- **Confidence**: 0.9
- **Notes**: Registration span (D067): `registration law prohibits a landlord from evicting a tenant in the building if the landlord has not`.

## A3. security_deposits

### NJ-STATE-DEP-1
- **Rule ID**: NJ-STATE-DEP-1
- **Jurisdiction**: NJ · **Level**: state · **Category**: security_deposits
- **Status**: in_force
- **Title**: Security deposit cap — 1.5 months' rent; annual additional deposit capped at 10%
- **Requirement**: A landlord may not require more than one and one-half times one month's rent as security; prepaid rent (including "last month's rent") and pet deposits count toward the cap, so at inception the landlord may collect at most first month's rent plus 1.5 months' security (2.5 months total). Any additional security collected annually may not exceed 10% of the current deposit.
- **Key value**: 1.5 × monthly rent; annual top-up ≤ 10% of current deposit.
- **Coverage conditions**: All residential rental premises (incl. mobile homes) subject to the Rent Security Deposit Act (see DEP-2 for the owner-occupied carve-out).
- **Exemptions**: Owner-occupied premises with not more than two rental units unless the tenant invokes the Act by 30 days' written notice.
- **Effective date**: 1971-06-21 (L.1971, c.223 §4; 10% rule added P.L.2003, c.188)
- **Penalty / remedy**: Excess is unlawful; prepaid rent in excess is treated as security (Brownstone Arms v. Asher; Reilly v. Weiss); courts may order return; see DEP-3 remedies.
- **Interaction with other levels**: No local deposit rules in JC/Hoboken/Newark (Newark §19:2-2 counts deposits as "rent" for registration purposes only; FAIR Act lists "security deposits" as competitively sensitive information).
- **Citation**: N.J.S.A. 46:8-21.2
- **Source doc id**: D067 (also D063) · **Source URL**: https://www.nj.gov/dca/codes/publications/pdf_lti/t_i_r.pdf ; https://law.justia.com/codes/new-jersey/title-46/section-46-8-21-2/
- **Quoted span (CORPUS)**: `The maximum-security deposit to be collected by the landlord cannot be more than`
- **Confidence**: 0.98
- **Notes**: 10% span (D067): `yearly security deposit increase may not exceed 10% of the current security deposit. A landlord`. Statute (D063, NOT IN CORPUS): "An owner or lessee may not require more than a sum equal to 1 1/2 times 1 month's rental ... Whenever an owner or lessee collects from a tenant an additional amount of security deposit, the amount collected annually as additional security shall not be greater than 10 percent of the current security deposit."
- **Address-lookup facts needed**: owner-occupancy + rental-unit count (for the carve-out only). **Data gaps**: unit counts missing → carve-out **unknown**; default = cap applies.

### NJ-STATE-DEP-2
- **Rule ID**: NJ-STATE-DEP-2
- **Jurisdiction**: NJ · **Level**: state · **Category**: security_deposits
- **Status**: in_force
- **Title**: Rent Security Deposit Act applicability — owner-occupied ≤2-rental-unit exemption with tenant opt-in
- **Requirement**: The Act applies to all dwelling rentals except owner-occupied premises with not more than two rental units; a tenant in such a building may bring the Act into force 30 days after sending a written request to the landlord. Collecting a deposit is optional, but if collected the Act's rules apply.
- **Key value**: Exemption threshold = owner-occupied, ≤2 rental units; opt-in = 30 days after written notice.
- **Coverage conditions**: Residential premises used for dwelling purposes.
- **Exemptions**: Owner-occupied ≤2 rental units (until opt-in); investment-provision (46:8-19) also excludes seasonal rentals ≤125 consecutive days.
- **Effective date**: 1968-01-01 (L.1967, c.265; amended 1979)
- **Penalty / remedy**: N/A (scope rule).
- **Interaction with other levels**: None local.
- **Citation**: N.J.S.A. 46:8-26
- **Source doc id**: D067 (also D064) · **Source URL**: https://www.nj.gov/dca/codes/publications/pdf_lti/t_i_r.pdf ; https://law.justia.com/codes/new-jersey/title-46/section-46-8-26/
- **Quoted span (CORPUS)**: `homes. The exception is an owner-occupied two-, or three-family dwelling. A tenant in an owner-`
- **Confidence**: 0.97
- **Notes**: Statute (D064, NOT IN CORPUS): "The provisions of this act shall apply to all rental premises or units used for dwelling purposes except owner-occupied premises with not more than two rental units where the tenant has failed to provide 30 days written notice to the landlord invoking the provisions of this act."
- **Address-lookup facts needed**: owner-occupancy + rental-unit count. **Data gaps**: → **unknown** for JC/Newark/most Hoboken rows.

### NJ-STATE-DEP-3
- **Rule ID**: NJ-STATE-DEP-3
- **Jurisdiction**: NJ · **Level**: state · **Category**: security_deposits
- **Status**: in_force
- **Title**: Deposit return within 30 days with itemized deductions; double-damages remedy
- **Requirement**: Within 30 days after the tenancy terminates the landlord must return the deposit plus interest less itemized deductions (damage beyond wear and tear, money due under the lease) by personal delivery or registered/certified mail, with the itemized list sent by registered/certified mail; within 5 business days if the tenant is displaced by fire, flood, condemnation or evacuation; within 15 business days for Safe Housing Act (domestic violence) terminations. No deductions while tenant remains in possession.
- **Key value**: 30 days (standard); 5 business days (displacement); 15 business days (domestic-violence termination); remedy = double the amount wrongfully withheld + costs + attorney fees.
- **Coverage conditions**: All tenancies under the Act.
- **Exemptions**: Owner-occupied ≤2 rental units (absent opt-in). If tenant breaks lease without cause, the 30 days run from re-rental or lease expiry.
- **Effective date**: 1968-01-01 (N.J.S.A. 46:8-21.1; displacement and penalty provisions added later)
- **Penalty / remedy**: Double damages, court costs, reasonable attorney's fees (46:8-21.1); civil penalty $500–$2,000 per offense for willful withholding from tenants receiving state/federal assistance (46:8-21.5); unlawful use of deposit money = disorderly persons offense, fine ≥ $200 and/or ≤30 days (46:8-25). Small Claims up to $5,000; Special Civil Part up to $15,000.
- **Interaction with other levels**: None local.
- **Citation**: N.J.S.A. 46:8-21.1; 46:8-21.4; 46:8-21.5; 46:8-25; 46:8-9.6
- **Source doc id**: D067 · **Source URL**: https://www.nj.gov/dca/codes/publications/pdf_lti/t_i_r.pdf
- **Quoted span (CORPUS)**: `Within 30 days after the termination of a tenancy, a landlord must return the security`
- **Confidence**: 0.97
- **Notes**: Remedy span (D067): `the amount deducted, the tenant may sue for double the amount of the security deposit that the`; penalty span: `penalty of not less than $500 or not more than $2,000 for each offense. The penalty shall be`.

### NJ-STATE-DEP-4
- **Rule ID**: NJ-STATE-DEP-4
- **Jurisdiction**: NJ · **Level**: state · **Category**: security_deposits
- **Status**: in_force
- **Title**: Deposit must be held in trust in an NJ interest-bearing account; written notice within 30 days; annual interest to tenant
- **Requirement**: Deposits remain the tenant's property, must not be commingled, and must be placed in an insured NJ bank/S&L interest-bearing account (landlords with 10+ units may use an NJ money-market fund or variable-rate account). Within 30 days of receipt, at each annual interest payment, and within 30 days of any transfer/move, the landlord must give written notice of the institution, amount, account type and interest rate. Interest is paid annually (anniversary/renewal or Jan 31 with notice). On sale, the new owner must obtain and is liable for the deposit.
- **Key value**: Notice within 30 days; interest annually; tenant remedy — after 30-day cure notice, apply deposit + 7%/yr interest to rent, after which no new deposit may be demanded.
- **Coverage conditions**: All tenancies under the Act; investment requirement not applicable to seasonal rentals (≤125 consecutive days).
- **Exemptions**: Owner-occupied ≤2 rental units (absent opt-in); seasonal rentals (investment provision).
- **Effective date**: 1968-01-01 (N.J.S.A. 46:8-19; amended 2003)
- **Penalty / remedy**: Tenant may convert deposit to rent with 7% interest (46:8-19.1(c)); disorderly persons offense for misuse (46:8-25).
- **Interaction with other levels**: None local.
- **Citation**: N.J.S.A. 46:8-19; 46:8-19.1; 46:8-20; 46:8-21; 46:8-25
- **Source doc id**: D067 · **Source URL**: https://www.nj.gov/dca/codes/publications/pdf_lti/t_i_r.pdf
- **Quoted span (CORPUS)**: `payment, the landlord must notify the tenant in writing of the name and address of the banking`
- **Confidence**: 0.95
- **Notes**: Interest span (D067): `The interest or earnings paid on the security deposit belongs to the tenant and shall be paid`; 7% span: `landlord written notice that the security money plus interest at the rate of 7% per annum be applied`.

## A4. application_screening_fees

### NJ-STATE-FEE-1
- **Rule ID**: NJ-STATE-FEE-1
- **Jurisdiction**: NJ · **Level**: state · **Category**: application_screening_fees
- **Status**: in_force (effective 2026-05-01; in force as of 2026-10-01)
- **Title**: Residential rental application fee capped at $50 (P.L.2025, c.405, N.J.S.A. 46:8-18.1)
- **Requirement**: A landlord or agent may not require an application "or other similar fee" to apply to lease or sublease a residential rental property that exceeds $50. The AG's guidance treats the cap as covering all application-related charges, including screening/administrative fees, so costs cannot be split into multiple fee names.
- **Key value**: $50 (for fees charged 2026-05-01 through 2026-12-31; CPI-indexed thereafter — see FEE-2).
- **Coverage conditions**: All residential rental property for dwelling purposes, statewide.
- **Exemptions**: (1) a dwelling unit located in a one-family or two-family dwelling offered for rent; (2) a licensee of the NJ Real Estate Commission, unless the licensee is the landlord.
- **Effective date**: 2026-05-01 (approved 2026-01-20; "first day of the fourth month next following the date of enactment")
- **Penalty / remedy**: Up to $500 (first offense), $750 (second), $1,000 (each subsequent), via Penalty Enforcement Law summary proceedings in Special Civil Part on complaint of the Director of Consumer Affairs or the Attorney General; the wrongfully charged amount is taken from the penalty and remitted to the applicant. Division of Consumer Affairs must publish a violation-reporting mechanism (46:8-18.2).
- **Interaction with other levels**: No local application-fee ordinances in JC/Hoboken/Newark. Interacts with FCHA pre-fee disclosure (NJ-STATE-FEE-3). D067's statement that the landlord "is allowed to charge the tenant for the cost of the report" and "may also request reasonable rental application fees" predates c.405; after 2026-05-01 any such charge must fit within the $50 cap (open question whether a separately billed credit-report cost is an "other similar fee" — AG guidance says yes).
- **Citation**: N.J.S.A. 46:8-18.1(a)–(c); N.J.S.A. 46:8-18.2 (P.L.2025, c.405, A4899)
- **Source doc id**: D066 · **Source URL**: https://pub.njleg.gov/bills/2024/PL25/405_.HTM
- **Quoted span (CORPUS)**: `agent thereof, shall not require an application or other similar fee to apply`
- **Confidence**: 0.98
- **Notes**: Penalty span (D066): `first offense, up to $750 for a second offense, and up to $1,000 for each`; exemption span: `located in a one-family or two-family dwelling that is offered for rent; or`; effective-date span: `fourth month next following the date of enactment, except that the Director of`; approval span: `Approved January 20, 2026.` Pre-cap baseline (D067): `to charge the tenant for the cost of the report. The landlord may also request reasonable rental`.
- **Address-lookup facts needed**: whether the property is a 1- or 2-family dwelling (unit count); whether the fee is charged by a non-landlord RE licensee. **Data gaps**: unit counts missing for JC/Newark and most Hoboken rows → 1–2-family exemption **unknown**; default = cap applies (and flag).

### NJ-STATE-FEE-2
- **Rule ID**: NJ-STATE-FEE-2
- **Jurisdiction**: NJ · **Level**: state · **Category**: application_screening_fees
- **Status**: not_yet_effective (first adjustment takes effect 2027-01-01)
- **Title**: Annual CPI indexation of the $50 application-fee cap
- **Requirement**: Beginning January 1 of the year following enactment (i.e., 2027) and each year thereafter, the Director of Consumer Affairs adjusts the cap in proportion to the change in CPI-U (NY–Northern NJ–Long Island, all items, 1982-84=100) over the 12 months ending October 31 of the prior year; Treasurer determines the amount by December 1; adjustment applies to fees charged on/after January 1; only upward adjustments (if CPI change > 0); published annually on the Division's website.
- **Key value**: $50 base × cumulative CPI; first adjusted figure applies from 2027-01-01 (amount TBD by 2026-12-01).
- **Coverage conditions**: Same as FEE-1.
- **Exemptions**: Same as FEE-1.
- **Effective date**: 2027-01-01 (first adjusted cap); statute itself effective 2026-05-01
- **Penalty / remedy**: Same as FEE-1.
- **Interaction with other levels**: None.
- **Citation**: N.J.S.A. 46:8-18.1(d)
- **Source doc id**: D066 · **Source URL**: https://pub.njleg.gov/bills/2024/PL25/405_.HTM
- **Quoted span (CORPUS)**: `January 1 of the year next following enactment of P.L.2025, c.405 (C.46:8-18.1`
- **Confidence**: 0.95
- **Notes**: Supporting span: `direct proportion to the percent change in the Consumer Price Index over a`. Change-tracking note: the numeric cap will change on 2027-01-01; the system should re-read the DCA published figure each December.

### NJ-STATE-FEE-3
- **Rule ID**: NJ-STATE-FEE-3
- **Jurisdiction**: NJ · **Level**: state · **Category**: application_screening_fees
- **Status**: in_force
- **Title**: Written disclosure required before accepting any application fee (Fair Chance in Housing Act §4(b))
- **Requirement**: Before accepting any application fee, a housing provider must disclose in writing whether its eligibility criteria include review of criminal history and that the applicant may provide evidence of inaccuracies, rehabilitation or mitigating factors (DCR model disclosure form available). If a violation is substantiated the Director may order the application fee returned.
- **Key value**: Pre-fee written disclosure (two required elements).
- **Coverage conditions**: Any "rental dwelling unit" under the FCHA.
- **Exemptions**: Dwelling units in owner-occupied premises of not more than four dwelling units (FCHA definition).
- **Effective date**: 2022-01-01
- **Penalty / remedy**: FCHA penalties (≤$1,000 / ≤$5,000 / ≤$10,000) and refund of application fee (46:8-63(d)(3)).
- **Interaction with other levels**: Stacks with the $50 cap; Newark ch. 2:31 adds its own pre-inquiry written notice.
- **Citation**: N.J.S.A. 46:8-55(b); 46:8-63(d)(3)
- **Source doc id**: D065 · **Source URL**: https://pub.njleg.gov/bills/2020/PL21/110_.HTM
- **Quoted span (CORPUS)**: `accepting any application fee, a housing provider shall disclose in writing to`
- **Confidence**: 0.97
- **Address-lookup facts needed**: owner-occupancy + unit count (≤4). **Data gaps**: unknown → default applies.

## A5. screening_restrictions

### NJ-STATE-SCR-1
- **Rule ID**: NJ-STATE-SCR-1
- **Jurisdiction**: NJ · **Level**: state · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: Fair Chance in Housing Act — no criminal-history inquiry before a conditional offer
- **Requirement**: A housing provider may not require an application containing criminal-record questions, nor make any oral or written criminal-record inquiry, before extending a conditional offer; the only pre-offer checks allowed are (i) conviction for methamphetamine manufacture on federally assisted housing premises and (ii) lifetime sex-offender registration. Standards must be applied in a nondiscriminatory manner.
- **Key value**: Timing = after conditional offer only; 2 pre-offer exceptions.
- **Coverage conditions**: Every "rental dwelling unit" offered for rent for residential purposes.
- **Exemptions**: Dwelling unit in an owner-occupied premises of not more than four dwelling units.
- **Effective date**: 2022-01-01 (P.L.2021, c.110 approved 2021-06-18; "first day of the seventh month next following")
- **Penalty / remedy**: Exclusive administrative enforcement by the Division on Civil Rights (no direct court action); 14-day mediation window; penalties ≤$1,000 (no prior violation in 5 years), ≤$5,000 (one prior in 5 years), ≤$10,000 (two or more priors in 7 years); cease-and-desist, compliance reporting ≤2 years, order to issue conditional offer/provide unit, refund of application fee, up to $1,000 of penalty paid to applicant; retaliation = separate violation; landlord immunity from civil liability for renting to persons with records.
- **Interaction with other levels**: Newark Code ch. 2:31 Art. 1 permits inquiry after "formal application" (earlier than conditional offer) — the state rule controls where stricter; LAD rights preserved (46:8-63(e)).
- **Citation**: N.J.S.A. 46:8-52 to -64 (esp. 46:8-54 "rental dwelling unit", 46:8-55(a), 46:8-63)
- **Source doc id**: D065 · **Source URL**: https://pub.njleg.gov/bills/2020/PL21/110_.HTM
- **Quoted span (CORPUS)**: `regarding an applicant’s criminal record prior to making a conditional offer.`
- **Confidence**: 0.98
- **Notes**: Exemption span (D065): `owner-occupied premises of not more than four dwelling units.`; effective-date span: `seventh month next following the date of enactment,`; `Approved June 18, 2021.`; exclusive-forum span: `shall not be initiated by any person in court.`. Note the curly apostrophe in "applicant’s" in the corpus.
- **Address-lookup facts needed**: owner-occupancy + total dwelling units (≤4). **Data gaps**: unit counts missing (JC, Newark, 39/40 Hoboken) → exemption **unknown**; default = FCHA applies.

### NJ-STATE-SCR-2
- **Rule ID**: NJ-STATE-SCR-2
- **Jurisdiction**: NJ · **Level**: state · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: FCHA — records that may never be considered, and post-offer lookback limits
- **Requirement**: Before or after a conditional offer a provider may never evaluate an applicant on arrests/charges without conviction, expunged, pardoned, vacated/nullified, juvenile, or sealed records. After the conditional offer the provider may consider only: convictions for murder, aggravated sexual assault, kidnapping, arson, human trafficking, sexual assault (2C:14-2), child endangerment (2C:24-4b(3)) or any offense requiring lifetime sex-offender registration (no time limit); first-degree indictable offenses within 6 years; second/third-degree within 4 years; fourth-degree within 1 year (measured from conviction, or end of prison sentence, to the conditional offer).
- **Key value**: Lookbacks 6 / 4 / 1 years by degree; lifetime for enumerated violent/sexual offenses; six never-considered categories.
- **Coverage conditions / Exemptions / Effective date / Penalty**: Same as SCR-1.
- **Interaction with other levels**: Newark ch. 2:31 allows 8-year (indictable) and 5-year (disorderly persons) lookbacks and consideration of pending charges — more permissive; FCHA's shorter windows and bar on non-conviction records govern in Newark.
- **Citation**: N.J.S.A. 46:8-56(a)–(b)
- **Source doc id**: D065 · **Source URL**: https://pub.njleg.gov/bills/2020/PL21/110_.HTM
- **Quoted span (CORPUS)**: `sentence concluded, within the six years immediately preceding the issuance of`
- **Confidence**: 0.98
- **Notes**: Never-consider span (D065): `or after the issuance of a conditional offer, evaluate an applicant based on`.

### NJ-STATE-SCR-3
- **Rule ID**: NJ-STATE-SCR-3
- **Jurisdiction**: NJ · **Level**: state · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: FCHA — withdrawal of conditional offer: individualized assessment, written reasons, appeal, records within 10 days
- **Requirement**: A conditional offer may be withdrawn for criminal history only if the provider finds by a preponderance of the evidence that withdrawal is necessary to fulfil a substantial, legitimate, nondiscriminatory interest after an individualized assessment (nature/severity, age at offense, time elapsed, rehabilitation evidence, safety impact if repeated, nexus to rented property). The provider must give written notice stating the specific reasons and offering an appeal; the applicant may within 30 days request all information relied upon, which must be provided free within 10 days.
- **Key value**: 6 assessment factors; 30-day request window; 10-day production deadline; preponderance standard.
- **Coverage conditions / Exemptions / Effective date / Penalty**: Same as SCR-1.
- **Interaction with other levels**: Newark ch. 2:31 §2:31-5 requires adverse notice + copy of results within 10 business days by registered mail — a stricter local delivery rule that can coexist.
- **Citation**: N.J.S.A. 46:8-56(c)–(d); 46:8-57 (DCR model notices)
- **Source doc id**: D065 · **Source URL**: https://pub.njleg.gov/bills/2020/PL21/110_.HTM
- **Quoted span (CORPUS)**: `notification that includes, with specificity, the reason or reasons for the`
- **Confidence**: 0.97
- **Notes**: Standard span (D065): `provider determines, by preponderance of the evidence, that the withdrawal is`.

### NJ-STATE-SCR-4
- **Rule ID**: NJ-STATE-SCR-4
- **Jurisdiction**: NJ · **Level**: state · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: FCHA — advertising ban, no drug/alcohol testing, confidentiality of criminal records
- **Requirement**: A housing provider may not publish advertisements stating it will not consider applicants with arrests/convictions (except the meth/sex-offender exceptions), may not use any application or inquiry expressing a criminal-record limitation except as the Act permits, may not require a drug or alcohol test or consent to obtain drug-treatment information, and may not disseminate or use an applicant's criminal record other than as the Act allows.
- **Key value**: Absolute bans (advertising; drug/alcohol test; misuse of records).
- **Coverage conditions / Exemptions / Effective date / Penalty**: Same as SCR-1.
- **Interaction with other levels**: Newark §2:31-7 (advertising) and §2:31-6 (confidentiality) are parallel local provisions.
- **Citation**: N.J.S.A. 46:8-58; 46:8-60
- **Source doc id**: D065 · **Source URL**: https://pub.njleg.gov/bills/2020/PL21/110_.HTM
- **Quoted span (CORPUS)**: `to submit to a drug or alcohol test, or request the applicant’s consent to`
- **Confidence**: 0.97
- **Notes**: Advertising span (D065): `explicitly provides that the housing provider will not consider any applicant`.

### NJ-STATE-SCR-5
- **Rule ID**: NJ-STATE-SCR-5
- **Jurisdiction**: NJ · **Level**: state · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: Law Against Discrimination — source of lawful income (incl. Section 8 vouchers) and other protected classes in rentals
- **Requirement**: It is unlawful to refuse to rent, to discriminate in terms/conditions, or to advertise/inquire with any limitation because of race, creed, color, national origin, ancestry, marital/civil-union/domestic-partnership status, pregnancy or breastfeeding, sex, gender identity or expression, affectional or sexual orientation, familial status, disability, liability for military service, nationality, or source of lawful income used for rental or mortgage payments — e.g., a landlord cannot deny a lawful Section 8 HUD voucher holder solely because of that income source. Service/guide dogs must be allowed without extra charge; reasonable modifications at tenant's expense must be permitted.
- **Key value**: Protected class list incl. "source of lawful income used for rental or mortgage payments" (Section 8 included).
- **Coverage conditions**: Sale or rental of all real property, residential or business.
- **Exemptions**: Rental of a single apartment/flat in a two-family dwelling whose other unit is owner-occupied; rental of room(s) by the owner/occupant of an owner-occupied one-family dwelling; religious-organization preference for co-religionists; familial-status rule does not apply to housing for older persons (10:5-5mm); single-sex residences for sex.
- **Effective date**: 1945 (LAD); source-of-lawful-income added by P.L.2002, c.82 (2002 — exact day not verified from corpus)
- **Penalty / remedy**: DCR complaint within 180 days or Superior Court within 2 years; damages, order to rent, civil penalties up to $10,000 for a first violation (10:5-14.1a), up to $25,000 second within 5 years, up to $50,000 for two+ within 7 years (statute; corpus states the $10,000 first-offense figure).
- **Interaction with other levels**: Newark ch. 2:31 copies the LAD's two housing exemptions verbatim; FCHA preserves LAD rights.
- **Citation**: N.J.S.A. 10:5-12(g), (h); 10:5-5(n); 10:5-14.1a; 10:5-29.2
- **Source doc id**: D068 (also D067, D061) · **Source URL**: https://www.nj.gov/oag/dcr/downloads/kyrhousing02.pdf ; https://law.justia.com/codes/new-jersey/title-10/section-10-5-12/
- **Quoted span (CORPUS)**: `on the source of lawful income or source of lawful rent`
- **Confidence**: 0.97
- **Notes**: Section 8 span (D068): `lawful recipient of a Section 8 HUD voucher the right to`; exemption span (D068): `The rental of a single apartment or flat in a two-family`; penalty span (D067): `and penalties, up to $10,000 for a first offense (N.J.S.A. 10:5-14.1a(a)).`; statute (D061, NOT IN CORPUS): "(1) To refuse to sell, rent, lease, assign, or sublease or otherwise to deny to or withhold from any person or group of persons any real property or part or portion thereof because of race, creed, color, national origin, ancestry, marital status, civil union status, domestic partnership status, pregnancy or breastfeeding, sex, gender identity or expression, affectional or sexual orientation, familial status, disability, liability for service in the Armed Forces of the United States, nationality, or source of lawful income used for rental or mortgage payments;"
- **Address-lookup facts needed**: owner-occupied two-family / one-family room rental status. **Data gaps**: unknown → default applies.

### NJ-STATE-SCR-6
- **Rule ID**: NJ-STATE-SCR-6
- **Jurisdiction**: NJ · **Level**: state · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: Credit/background checks permitted; FCRA adverse-action notice; Truth-in-Renting statement delivery
- **Requirement**: Landlords may obtain credit reports and public-record background checks and verify application information; if an application is denied because of a credit report the landlord must give the name, address and phone of the reporting agency (15 U.S.C. §1681m). Landlords of buildings with more than two units (more than three if owner-occupied) must give each new tenant the current DCA Truth-in-Renting statement at or before lease signing.
- **Key value**: FCRA adverse-action notice; Truth-in-Renting statement to every tenant (penalty ≤$100 per offense).
- **Coverage conditions**: Credit checks — all; Truth-in-Renting — buildings >2 units (or >3 if owner-occupied) with terms ≥1 month.
- **Exemptions**: Truth-in-Renting: buildings of two or fewer units, owner-occupied premises of three or fewer units, hotels/motels/guest houses for transient or seasonal tenants.
- **Effective date**: FCRA 1970 (federal); Truth in Renting Act 1976 (N.J.S.A. 46:8-43 et seq.)
- **Penalty / remedy**: Truth-in-Renting: ≤$100 per offense (46:8-47); FCRA remedies federal.
- **Interaction with other levels**: Hoboken §155-4(A) requires the rent-control disclosure statement to acknowledge the Truth-in-Renting Act.
- **Citation**: 15 U.S.C. §1681m; N.J.S.A. 46:8-43 to -51 (esp. 46:8-44, 46:8-47)
- **Source doc id**: D067 · **Source URL**: https://www.nj.gov/dca/codes/publications/pdf_lti/t_i_r.pdf
- **Quoted span (CORPUS)**: `provide the tenant with the name, address, and telephone number of the credit reporting or`
- **Confidence**: 0.93
- **Notes**: Truth-in-Renting exemption span (D067): `and owner-occupied premises of three (3) or fewer units (N.J.S.A. 46:8-44 to -46));`; penalty span: `shall be liable for a penalty of not more than $100.00 per offense (N.J.S.A. 46:8-47). Such penalty`.

## A6. algorithmic_rent_setting

### NJ-STATE-ALGO-1
- **Rule ID**: NJ-STATE-ALGO-1
- **Jurisdiction**: NJ · **Level**: state · **Category**: algorithmic_rent_setting
- **Status**: **not_yet_effective** (enacted 2026-07-20; takes effect 2027-07-01)
- **Title**: Forbidding the Algorithmic Inflation of Rent (FAIR) Act — P.L.2026, c.43 (A3497 ACS), N.J.S.A. 56:9-20 to -26
- **Requirement**: Makes it a violation of the New Jersey Antitrust Act for (a) a rental property owner or its agent/representative/subcontractor to pay or exchange any consideration for the services of a "coordinator"; (b) a coordinator to facilitate a tacit or express agreement among rental property owners that restricts competition, including by performing a "coordinating function"; (c) two or more persons to engage in or facilitate "parallel pricing coordination"; (d) any agent of a coordinator to engage in parallel pricing coordination; or (e) any person to perform a coordinating function. "Coordinating function" = (1) collecting competitively sensitive (nonpublic) information of two or more rental property owners to analyze/process it (incl. training an algorithm) where the algorithm is used to set or recommend rents, material lease terms or occupancy levels; (2) setting rents/terms/occupancy via an algorithm that processes another owner's competitively sensitive information; or (3) setting or recommending rents/terms/occupancy to two or more owners via the same or substantially similar algorithm that facilitates parallel pricing coordination. "Coordinator" includes an owner performing a coordinating function for its own benefit; "nonpublic information" = not available to the public at no cost (and public data combined with nonpublic is deemed nonpublic). "Tacit agreement" may be shown by a pattern of conduct.
- **Key value**: Ban on use/provision of algorithmic coordination using nonpublic competitor data; treated as NJ Antitrust Act violation.
- **Coverage conditions**: Every "residential dwelling unit" intended as a primary residence in NJ (house, apartment, accessory unit); every "rental property owner" (direct or indirect; controlling-interest holders aggregated) — **no unit-count, year-built or owner-occupancy thresholds**.
- **Exemptions** (not a "coordinating function" / not an "algorithmic device"): (i) spreadsheets without AI that require human analysis; (ii) databases that only query unprocessed data; (iii) collecting competitively sensitive information solely for research, statistical analysis or testing not used to set/recommend prices or terms; (iv) developing a rent estimate made available to the public at no cost; (v) a real-estate brokerage listing database available on equal terms that does not set/recommend prices or collect competitively sensitive information for that purpose; (vi) government entities setting or limiting rents through "affordability controls" (incl. Section 8, HMFA programs, rent control or rent leveling ordinances); conduct required by affordability controls is not parallel pricing coordination. Residential dwelling unit excludes inpatient medical, licensed long-term care, detention/correctional facilities.
- **Effective date**: **2027-07-01** ("first day of the twelfth month next following the date of enactment"; approved July 20, 2026)
- **Penalty / remedy**: Full NJ Antitrust Act remedies (N.J.S.A. 56:9-6 to -17 expressly preserved): Attorney General civil actions, injunctions, civil penalties (up to $100,000 per violation for corporations under 56:9-10 — statutory figure, not in corpus), criminal penalties under 56:9-11, private treble-damage actions with attorney fees under 56:9-12, parens patriae actions. AG must maintain an online complaint portal (may be the existing Antitrust complaint page) and may adopt rules.
- **Interaction with other levels — PREEMPTION ANALYSIS (conflict flag)**: §6(b): "A municipality shall be prohibited from enacting an ordinance that conflicts with this act. This subsection shall not be construed to prohibit the enactment of ordinances explicitly authorized or required by any other law." §6(a): the Act is "in addition to" the Antitrust Act and does not legalize conduct already unlawful. Assessment: (1) This is **conflict preemption, not field preemption** — ordinances that prohibit the same conduct (Jersey City §218-12, Hoboken §158-2) are complementary and a landlord can comply with both by not using coordinating software, so impossibility-type conflict is unlikely. (2) **Potential conflict points**: Jersey City's definition of "coordinate" reaches collection of prices/occupancy data "from two or more real estate lessors **or from public databases**", whereas the FAIR Act excludes information available to the public at no cost and expressly permits free public rent estimates — a landlord using a public-data-only tool could be lawful under the state Act but unlawful under §218-12 (argument that JC "conflicts"). Hoboken's "nonpublic competitor information" adds a "less than 365 days old" element — narrower than the state definition, so Hoboken may be less restrictive on old data (no conflict in that direction). Both cities use municipal fines (JC $100–$2,000/day; Hoboken ≤$2,000) rather than antitrust remedies — cumulative penalties are generally permitted absent express preemption. (3) The clause speaks of "enacting" — ambiguous whether pre-existing ordinances (both adopted 2025) are reached; NJ courts apply the Overlook Terrace factors (field occupation/pervasiveness/conflict) regardless of timing. (4) **Timing**: nothing is preempted before 2027-07-01; until then Jersey City and Hoboken bans operate alone. **Conflict flag = POTENTIAL (medium-low probability of invalidation; moderate probability of litigation over JC's public-database clause) from 2027-07-01.** Newark: no local ordinance, so FAIR Act will be the only rule from 2027-07-01.
- **Citation**: P.L.2026, c.43, §§1–9 (C.56:9-20 to 56:9-26); N.J.S.A. 56:9-1 et seq.
- **Source doc id**: D069 (also D060) · **Source URL**: https://pub.njleg.state.nj.us/Bills/2026/AL26/43_.HTM ; https://daypitney.com/new-jersey-enacts-fair-act-to-prohibit-algorithmic-rent-setting-practices
- **Quoted span (CORPUS)**: `shall be unlawful and a violation of the “New Jersey Antitrust Act,” P.L.1970,`
- **Confidence**: 0.97 (text), 0.6 (preemption outcome)
- **Notes**: Additional verbatim spans (D069): title `“Forbidding the Algorithmic Inflation of Rent (FAIR) Act.”`; owner prohibition `representative, or subcontractor thereof, to receive, subscribe to, contract`; catch-all `any person to perform a coordinating function.`; preemption `an ordinance that conflicts with this act.`; remedies `in any manner that limits the application of sections 6 through 17 of P.L.1970,`; nonpublic `available to the public at no cost. In instances where the information is`; effective `the twelfth month next following the date of enactment.`; enactment `approved July 20, 2026`. Day Pitney (D060) confirms signing 2026-07-20 by Gov. Sherrill and effective 2027-07-01. Change test T3: status flips to in_force on 2027-07-01.
- **Address-lookup facts needed**: none beyond "is it a residential dwelling unit in NJ" (no thresholds). **Data gaps**: missing unit counts / year built do **not** affect applicability → "applies (from 2027-07-01)".

### NJ-STATE-ALGO-2
- **Rule ID**: NJ-STATE-ALGO-2
- **Jurisdiction**: NJ · **Level**: state · **Category**: algorithmic_rent_setting
- **Status**: in_force (background law; no algorithm-specific statute in force before 2027-07-01)
- **Title**: Pre-FAIR Act baseline — general NJ Antitrust Act and pending AG litigation
- **Requirement**: Until 2027-07-01 there is no algorithm-specific statewide prohibition; price-fixing via shared software is actionable only under the general NJ Antitrust Act (N.J.S.A. 56:9-3, contracts/combinations in restraint of trade) and federal Sherman Act. The NJ Attorney General's lawsuit against RealPage and ten large landlords (filed under Gov. Murphy) proceeds under those laws.
- **Key value**: "No algorithm-specific rule at state level before 2027-07-01."
- **Coverage conditions / Exemptions**: General antitrust.
- **Effective date**: 1970 (NJ Antitrust Act)
- **Penalty / remedy**: Antitrust remedies (AG actions, treble damages).
- **Interaction with other levels**: Jersey City and Hoboken ordinances fill the gap locally in 2025–2027.
- **Citation**: N.J.S.A. 56:9-1 et seq.; FAIR Act findings §2(f)
- **Source doc id**: D069 · **Source URL**: https://pub.njleg.state.nj.us/Bills/2026/AL26/43_.HTM
- **Quoted span (CORPUS)**: `alleged violation of existing State and federal antitrust law.`
- **Confidence**: 0.9

---

# PART B — JERSEY CITY, NJ

## B1. rent_increase_limits

### JC-RENT-1
- **Rule ID**: JC-RENT-1
- **Jurisdiction**: Jersey City, NJ · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Rent Control Ordinance ch. 260 — annual increase capped at lesser of 4% or CPI change (§260-3(A),(B))
- **Requirement**: At lease expiration (or termination of a periodic tenancy) a landlord of a covered dwelling may not request or receive a percentage increase greater than 4% or the CPI difference between three months before expiration and three months before lease commencement, whichever is less; periodic/short-term tenants may receive only one increase per 12 months (CPI measured 15→3 months before); no more than one cost-of-living increase per housing space per 12 months regardless of tenant turnover. Additional increases only via Rent Leveling Board applications (capital improvements, hardship, tax surcharge) or the vacancy capital-improvement formula (§260-3(C): $1.35 per $100 of improvement up to $5,000; $1.55 per $100 above).
- **Key value**: min(4%, CPI); once per 12 months. (2026 CPI chart values 2.9%–3.4% early 2026; 4% ceiling binding since mid-2026 per secondary reporting.)
- **Coverage conditions**: "Dwellings" = buildings containing housing spaces rented to one or more tenants, i.e., **five or more housing spaces** (because ≤4 are exempt), of any age not within the state 30-year new-construction window.
- **Exemptions** (§260-1 "Dwelling" A–B): (1) dwellings with four or less housing spaces (the 2020–2021 COVID suspension of this exemption for non-owner-occupied 1–4s has lapsed; **no owner-occupancy requirement**); (2) licensed hotels/motels and commercial/industrial space; (3) newly constructed dwellings with 25 or more units in a Council-approved redevelopment area (N.J.S.A. 40:55C-5(o), -17); (4) low-rent public housing developments; (5) buildings converted from non-permanent dwelling use on/after Oct 1, 1983; (B) any new dwelling or housing space rented for the first time — initial rental only; plus state NCMD 30-year exemption (§260-6; §260-21 since Ord. 25-099 narrows it to the §260-3(A),(B) caps); HUD/NJHMFA-regulated projects (state law).
- **Effective date**: Ordinance long-standing (base rent date 1983-01-11; §260-1 amended through Ord. 21-013 of 2021-03-10 and Ord. 26-028 of 2026-05-20 adding RUBS charges to "rent"); 4% cap text confirmed in Ord. 20-036 (2020-05-06).
- **Penalty / remedy**: Increases above the cap are void; tenant may file an Illegal Rent Petition with the Office of Landlord/Tenant Relations (D036) for refund; violations punishable under ch. 1 §1-25 / N.J.S.A. 40:49-5 (fine up to $2,000, 90 days) — the Oct 2025 Minimum Penalty Ordinance for housing violations sets a $100 mandatory minimum (secondary source); Ord. 26-028 declares RUBS utility charges to be "rent" subject to the cap.
- **Interaction with other levels**: Operates under state delegation (NJ-STATE-RENT-1); subordinate to the state NCMD exemption (NJ-STATE-RENT-3) and HUD/NJHMFA exemption; state unconscionability standard applies to exempt 1–4 unit buildings. **Ord. 25-125** (would have removed the ≤4 exemption for common-ownership portfolios of 5+ units) was **DEFEATED on 2025-11-25** (3-3-2 on amendments) — so the exemption remains unit-count-only.
- **Citation**: Jersey City Code §260-1 (definition "Dwelling", exemptions A.1–A.5, B); §260-3(A)–(C); §260-6; §260-21 (Ord. 25-099); Ord. 20-036; Ord. 26-028
- **Source doc id**: D036 · **Source URL**: https://www.jerseycitynj.gov/landlordtenant ; ordinance text: https://cityofjerseycity.civicweb.net/document/25620/ (Ord. 20-036), https://cityofjerseycity.civicweb.net/document/451525/ (Ord. 26-028), https://cityofjerseycity.civicweb.net/document/440329/ (Ord. 25-125, defeated)
- **Quoted span (CORPUS)**: `All 1-4 Unit Properties are exempt from rent control`
- **Confidence**: 0.93 (cap and exemptions from ordinance text); 0.7 (penalty detail)
- **Notes**: Supporting corpus span (D036): `Rent Control Ordinance, Chapter 260`. Ordinance text (NOT IN CORPUS, Ord. 20-036 §260-3(A)): "no landlord of any Dwelling as defined in Sec. 260-1 may request or receive a percentage increase in rent which is greater than 4% or the percentage difference between the consumer price index three months prior to the expiration or termination of the lease and three months prior to the commencement of the lease term, whichever is less." Exemption text (Ord. 26-028 §260-1 A.1): "Dwellings with four or less housing spaces; provided, however, that this exemption shall be suspended for non-owner occupied dwellings with four or less housing spaces until the end of the state of emergency or six months from adoption of these amendments whichever comes first. This paragraph shall be effective March 15, 2021." Open question: exact current text of the §260-20 penalty section not retrieved; Municode codification lags (through Supp. 52, 2026-04-03).
- **Address-lookup facts needed**: **number of housing spaces (≥5 vs ≤4)**, year built / CO date (post-1996-10 → possible NCMD exemption), redevelopment-area status + ≥25 units, public-housing / HUD status, hotel/motel conversion history. **Data gaps**: Jersey City address rows have **NO unit counts** → coverage = **unknown** (cannot distinguish exempt 1–4 from covered 5+); NJ year built often missing → NCMD exemption **unknown**. Result: for JC rows, rent_increase_limits must be reported as "conditional: 4%/CPI cap applies only if ≥5 housing spaces and not within 30-year new-construction exemption".

### JC-RENT-2
- **Rule ID**: JC-RENT-2
- **Jurisdiction**: Jersey City, NJ · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Rent control registration, rent-status inquiry and tenant petitions (procedural)
- **Requirement**: Landlords must file annual registration statements with the Office of Landlord/Tenant Relations via the Tyler portal (separate forms for non-owner-occupied 1–4 unit and 5+ unit buildings, the latter including a rent roll), must apply through the portal for capital-improvement, vacancy capital-improvement and hardship increases with notice to tenants, and must show $500,000 liability insurance ($300,000 for owner-occupied ≤4 units) with each registration. Tenants may file Illegal Rent Petitions and Failure-to-Maintain-Service petitions (rent reduction) and may request a property's rent-control status via SeeClickFix.
- **Key value**: Annual registration; 5+ unit rent roll; Illegal Rent Petition remedy.
- **Coverage conditions**: All rental properties (registration); covered dwellings (petitions).
- **Exemptions**: Owner-occupied 1–4 unit buildings need not register locally (state registration rules apply).
- **Effective date**: Insurance requirement 2023-02-28 (N.J.S.A. 40A:10A-1 eff. 2022-08-05); registration long-standing.
- **Penalty / remedy**: Registration non-compliance bars increases (per rent-control practice) and triggers ch. 1 penalties.
- **Interaction with other levels**: Overlaps state landlord registration (N.J.S.A. 46:8-27).
- **Citation**: Jersey City Code §260-2; §260-5; §260-10; N.J.S.A. 40A:10A-1
- **Source doc id**: D036 · **Source URL**: https://www.jerseycitynj.gov/landlordtenant
- **Quoted span (CORPUS)**: `A tenant claiming the rent they are being charged is illegal may file an Illegal Rent Petition:`
- **Confidence**: 0.9

## B2. just_cause_eviction

### JC-JCE-1
- **Rule ID**: JC-JCE-1
- **Jurisdiction**: Jersey City, NJ · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force (as "no local rule")
- **Title**: No Jersey City just-cause ordinance — state Anti-Eviction Act governs
- **Requirement**: Jersey City has not enacted a local just-cause or eviction-notice ordinance; evictions in Jersey City are governed exclusively by N.J.S.A. 2A:18-61.1 et seq. (good cause, notice periods, no self-help), with Hudson County tenants additionally covered by the Tenant Protection Act of 1992 for condominium/cooperative conversions. Jersey City's Office of Landlord/Tenant Relations provides referrals only.
- **Key value**: No rule at this level → apply NJ-STATE-JCE-1 to -4.
- **Coverage conditions**: N/A.
- **Exemptions**: N/A.
- **Effective date**: N/A.
- **Penalty / remedy**: State remedies.
- **Interaction with other levels**: Rent-control status affects ground (f) (increase must comply with ch. 260); Hudson County TPA 1992 (N.J.S.A. 2A:18-61.40 et seq.) applies.
- **Citation**: N.J.S.A. 2A:18-61.1; N.J.S.A. 2A:18-61.40 to -61.59; N.J.A.C. 5:24-3.2(b)
- **Source doc id**: D067 (state), D036 (city page shows no eviction rules) · **Source URL**: https://www.jerseycitynj.gov/landlordtenant
- **Quoted span (CORPUS)**: `the present time, the only qualified county is Hudson County (N.J.A.C. 5:24-3.2(b)). Tenants in`
- **Confidence**: 0.9 (absence confirmed by review of D036 and web search; Jersey City Code chapters reviewed indirectly)
- **Address-lookup facts needed**: same as NJ-STATE-JCE-1 (unit count, owner-occupancy) → **unknown** for JC rows.

## B3. security_deposits

### JC-DEP-1
- **Rule ID**: JC-DEP-1
- **Jurisdiction**: Jersey City, NJ · **Level**: city · **Category**: security_deposits
- **Status**: in_force (as "no local rule")
- **Title**: No Jersey City deposit ordinance — Rent Security Deposit Act governs
- **Requirement**: No municipal deposit cap, return deadline or interest rule; N.J.S.A. 46:8-19 to -26 apply in full (1.5 months; 10% annual top-up; 30-day return; double damages).
- **Key value**: No rule at this level → apply NJ-STATE-DEP-1 to -4.
- **Coverage / Exemptions / Effective date / Penalty**: State.
- **Interaction with other levels**: None. (Jersey City's ch. 260 "rent" definition does not treat deposits as rent.)
- **Citation**: N.J.S.A. 46:8-21.2; 46:8-26
- **Source doc id**: D036 (confirms absence), D067 · **Source URL**: https://www.jerseycitynj.gov/landlordtenant
- **Quoted span (CORPUS)**: `New Jersey DCA - Truth In Renting Guide` (D036 resource link — the city defers to the state guide)
- **Confidence**: 0.9
- **Address-lookup facts needed**: as NJ-STATE-DEP-2 (owner-occupied ≤2 rental units) → **unknown** for JC rows.

## B4. application_screening_fees

### JC-FEE-1
- **Rule ID**: JC-FEE-1
- **Jurisdiction**: Jersey City, NJ · **Level**: city · **Category**: application_screening_fees
- **Status**: in_force (as "no local rule")
- **Title**: No Jersey City application-fee ordinance — state $50 cap governs
- **Requirement**: Jersey City imposes no tenant-facing application or screening fee limit; the statewide $50 cap (N.J.S.A. 46:8-18.1, eff. 2026-05-01) and FCHA pre-fee disclosure apply. (Jersey City landlord registration fees are paid by landlords to the city and are not tenant application fees.)
- **Key value**: No rule at this level → apply NJ-STATE-FEE-1 to -3.
- **Coverage / Exemptions / Effective date / Penalty**: State.
- **Interaction with other levels**: None.
- **Citation**: N.J.S.A. 46:8-18.1
- **Source doc id**: D066 (state), D036 (absence) · **Source URL**: https://pub.njleg.gov/bills/2024/PL25/405_.HTM
- **Quoted span (CORPUS)**: `Non-Owner Occupied 1-4 unit Registration` (D036 — only landlord registration fees exist locally)
- **Confidence**: 0.88 (absence based on web search; no Jersey City code chapter on application fees located)
- **Address-lookup facts needed**: 1–2 family status → **unknown** for JC rows.

## B5. screening_restrictions

### JC-SCR-1
- **Rule ID**: JC-SCR-1
- **Jurisdiction**: Jersey City, NJ · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force (as "no local rule")
- **Title**: No Jersey City fair-chance / tenant-screening ordinance — FCHA and LAD govern
- **Requirement**: Jersey City has no housing "ban the box" or source-of-income ordinance (its earlier employment ban-the-box ordinance was preempted by the state Opportunity to Compete Act); the Fair Chance in Housing Act and LAD apply.
- **Key value**: No rule at this level → apply NJ-STATE-SCR-1 to -6.
- **Coverage / Exemptions / Effective date / Penalty**: State.
- **Interaction with other levels**: None.
- **Citation**: N.J.S.A. 46:8-52 et seq.; N.J.S.A. 10:5-12(g)
- **Source doc id**: D065 (state) · **Source URL**: https://pub.njleg.gov/bills/2020/PL21/110_.HTM
- **Quoted span (CORPUS)**: `“Housing provider” means a landlord, an owner, lessor,` (FCHA applies to all NJ housing providers incl. Jersey City)
- **Confidence**: 0.85 (absence confirmed only by web search)
- **Address-lookup facts needed**: owner-occupied ≤4 units (FCHA exemption) → **unknown** for JC rows.

## B6. algorithmic_rent_setting

### JC-ALGO-1
- **Rule ID**: JC-ALGO-1
- **Jurisdiction**: Jersey City, NJ · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: **in_force**
- **Title**: §218-12 "Preventing Algorithmic Rent-Fixing in the Rental Housing Market" (Ord. 25-057) — ban on use of rent-coordination service providers
- **Requirement**: It is unlawful for any real estate lessor (or its agent/subcontractor) to subscribe to, contract with, or exchange anything of value for the services of a "Service Provider" — any person that performs a "coordination function" (collecting nonpublic competitor information from lessors, or collecting historical/contemporaneous prices, price changes, supply levels, occupancy rates or lease termination/renewal dates from two or more lessors **or from public databases**, analyzing it computationally, and recommending rents, lease terms or occupancy levels to a lessor). No service provider may facilitate an agreement not to compete among lessors on pricing, fees or other rental terms. "Nonpublic Competitor Information" = prices, supply levels, security deposits, ideal occupancy levels, lease termination/renewal dates or other material lease terms less than 365 days old and not widely and readily available to the public at no cost.
- **Key value**: Ban on subscribing to/paying for coordination services; penalties $100–$2,000 per day.
- **Coverage conditions**: Every "residential dwelling unit" (house, apartment, accessory unit or other unit used as a primary residence) in Jersey City — **no unit-count, year-built, owner-occupancy or rent-control-status threshold**.
- **Exemptions**: Owners of multiple properties for actions relating exclusively to properties controlled by the same owner (single-portfolio pricing); licensed real estate agents operating in accordance with state regulations; inpatient medical, licensed long-term care, detention/correctional facilities excluded from "residential dwelling unit".
- **Effective date**: Adopted on second reading **2025-05-21** (9-0); approved by Mayor 2025-05-22; effective 20 days after publication ≈ **2025-06-11** (Morgan Lewis: "effective June 2025"). Amended by Ord. 25-076 (adopted 2025-07-16; text not retrieved — reported to address enforcement/penalties) and Ord. 25-098 (adopted 2025-09-24, approved 2025-09-25; adds §218-12(3), see JC-ALGO-2).
- **Penalty / remedy**: First violation punishable under Code ch. 1 §1-25 (general penalty, up to $2,000 / 90 days); subsequent violations fine of not less than $100 and up to $2,000; **each day in violation is a separate violation**. Public enforcement: Attorney General or any municipal/county attorney may sue as parens patriae; Office of Landlord/Tenant Relations receives and compiles complaints and, with the Office of Code Compliance, investigates or refers to the municipal prosecutor/AG. **Private right of action** for any injured person in any court of competent jurisdiction without regard to amount in controversy; mandatory award of costs and reasonable attorney fees to prevailing plaintiffs and to successful public enforcers.
- **Interaction with other levels**: First NJ municipal ban; Hoboken followed (HOB-ALGO-1). State FAIR Act (NJ-STATE-ALGO-1) not effective until 2027-07-01; thereafter §6(b) conflict-preemption risk centers on §218-12's inclusion of data collected "from public databases" (state Act exempts free public data and public rent estimates) and on per-day municipal fines layered on antitrust remedies — **conflict flag: POTENTIAL from 2027-07-01**. Also interacts with NJ Consumer Fraud Act via the sworn disclosure (JC-ALGO-2).
- **Citation**: Jersey City Code §218-12(1)–(4) (Ord. 25-057, as amended by Ord. 25-076 and Ord. 25-098); Code §1-25
- **Source doc id**: D035, D037 (link-only); ordinance text from cityofjerseycity.civicweb.net · **Source URL**: https://hudsoncountyview.com/jersey-city-council-approves-realpage-ban-and-increasing-benefits-for-laborers/ ; https://www.morganlewis.com/pubs/2026/08/algorithmic-rent-pricing-litigation-expands-under-new-state-and-local-laws ; https://cityofjerseycity.civicweb.net/document/429156/
- **Quoted span**: NOT IN CORPUS — Ord. 25-057 §218-12(2)(a): "It is unlawful for any real estate lessor, agent, or subcontractor thereof, to subscribe to, contract with, or otherwise exchange anything of value in return for the services of a Service Provider." Penalty: "Subsequent violations shall be punished by a fine of not less than $100 and up to $2000, as provided in Chapter 1, General Provisions, Art. I, § 1-25. Each day during which an owner is in violation of § 218-12 shall constitute a separate violation hereunder." D035 (Hudson County View, fetched): council vote "9-0" on May 21, 2025; "$2,000 daily fine". D037 (Morgan Lewis, fetched): "Jersey City Code § 218-12 (effective June 2025) · Prohibits a landlord's use of algorithmic rent coordination services; includes public and private enforcement; fines up to $2,000 per day."
- **Confidence**: 0.95 (prohibition, penalties, dates); 0.7 (exact effective date; content of Ord. 25-076)
- **Notes / open questions**: Ord. 25-076 text not retrieved — Municode lists it as "adopted 7/16/25, amending §218-12" (not yet codified). The ordinance header mislabels ch. 218 as "Fees and Charges" in one line; the chapter is "Multiple Dwellings" — but the ban is not limited to multiple dwellings (applies to any residential dwelling unit). Change test T2: in_force as of 2026-10-01; Newark has no counterpart.
- **Address-lookup facts needed**: municipality = Jersey City; nothing else. **Data gaps**: missing unit counts and year built do **not** affect applicability → "applies".

### JC-ALGO-2
- **Rule ID**: JC-ALGO-2
- **Jurisdiction**: Jersey City, NJ · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: in_force
- **Title**: §218-12(3) Mandatory Algorithmic Rent-Setting Disclosure with every lease and rent-increase notice (Ord. 25-098)
- **Requirement**: Any landlord must include, with any lease or written notice of rent increase for a residential dwelling unit, a sworn disclosure statement executed under penalty of perjury certifying that (1) no entity subscribed to or paid for a Service Provider in connection with the proposed rent, (2) the methodology did not use shared non-public competitor data, and (3) acknowledging that misrepresentation is actionable under the NJ Consumer Fraud Act (N.J.S.A. 56:8-2).
- **Key value**: Sworn disclosure form titled "MANDATORY ALGORITHMIC RENT-SETTING DISCLOSURE Pursuant to Jersey City Code § 218-12" required with every lease/increase.
- **Coverage conditions**: Every residential dwelling unit in Jersey City (same as JC-ALGO-1), rent-controlled or not.
- **Exemptions**: None stated (same unit-type exclusions as §218-12(1)).
- **Effective date**: Adopted 2025-09-24; Mayor approved 2025-09-25; effective ≈ 2025-10-15 (20 days after publication).
- **Penalty / remedy**: §218-12 penalties (first via §1-25; subsequent $100–$2,000, per day); false statements expose landlord to Consumer Fraud Act treble damages and attorney fees (N.J.S.A. 56:8-19) and perjury.
- **Interaction with other levels**: Parallels Hoboken §158-1(A)(2) (statement whether a rent algorithm was used, for increases >10%); FAIR Act has no disclosure requirement — a disclosure mandate is unlikely to "conflict" with the state Act.
- **Citation**: Jersey City Code §218-12(3) (Ord. 25-098); N.J.S.A. 56:8-2, 56:8-19
- **Source doc id**: online (Jersey City CivicWeb) · **Source URL**: https://cityofjerseycity.civicweb.net/document/436629/
- **Quoted span**: NOT IN CORPUS — "Any landlord must include, with any lease or written notice of rent increase for a residential dwelling unit, a sworn disclosure statement, executed under penalty of perjury, in substantially the following form:" — Consumer Fraud Act tie-in uses language in corpus D067: `information in connection with the sale or advertisement of real estate is illegal in New Jersey`
- **Confidence**: 0.93
- **Address-lookup facts needed**: municipality only → "applies".

---

# PART C — HOBOKEN, NJ

## C1. rent_increase_limits

### HOB-RENT-1
- **Rule ID**: HOB-RENT-1
- **Jurisdiction**: Hoboken, NJ · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Rent Control ch. 155 — annual increase capped at lesser of 5% or CPI (§155-5); 30-day written notice (§155-4)
- **Requirement**: At lease expiration or termination of a periodic tenancy no landlord may request or receive a percentage increase greater than 5% or the CPI difference (3 months before expiration vs. 3 months before commencement), whichever is less; periodic/short-term tenants get at most one increase per 12 months (CPI 15→3 months); only one cost-of-living increase per housing space per 12 months regardless of tenant turnover. Increases at any time other than lease expiration are void; any increase above the ordinance is void and refundable (2-year statute of limitations and 2-year repose from service of the disclosure statement). Landlord must give 30 days' written notice explaining the reason, report increases to the Rent Leveling and Stabilization Board, and serve a Board-approved disclosure statement on each tenant. Additional increases only by Board approval: tax surcharge (§155-6), water/sewer surcharge (§155-6.1), capital improvement surcharge (≤33⅓% base-rent increase in any 12 months, §155-10), hardship (§155-14). Base rent = rent on Oct 1, 1985. Since Ord. B-818 (2025-10-22) landlords must document actual prior rent paid to register or increase (§155-1.1).
- **Key value**: min(5%, CPI); once per 12 months; 30-day notice.
- **Coverage conditions**: **All dwelling units** ("any building or structure or trailer ... rented or offered for rent to one or more tenants") — **no unit-count threshold and no owner-occupancy exemption**; i.e., 1–4 unit buildings and condominium units rented out are covered unless an exemption below applies.
- **Exemptions** (§155-2): (A) motels and hotels; (B) newly constructed dwellings rented for the first time — initial rent only, if registered before first rental; (C) industrial property; (D) non-residential/commercial property (apartments in mixed-use buildings remain covered); (E) student housing owned/controlled by a school or college; (F) housing owned and operated by other government agencies; (G) buildings completely vacant on/before and since Jan 1, 1984 (initial rental only, if registered, and not vacated through unlawful means); (H) multiple dwellings constructed after June 25, 1987 — exempt for the initial-mortgage amortization period or 30 years, whichever is less (30 years if no mortgage), provided N.J.S.A. 2A:42-84.1 notices were filed; last exempt rent becomes base rent. Also §155-2.1: units under a government rent-regulation contract are preempted while the contract runs. Condo/co-op initial rental decontrol for bona fide owner-occupants (§§155-35 to 155-37).
- **Effective date**: Ordinance adopted 1984-01-16 (Ord. C329); §155-5 cap text amended 2023-02-01 (Ord. B-532); §155-4 last amended 2025-10-22 (Ord. B-818); §155-2(H) added 2023-02-01.
- **Penalty / remedy**: §155-21: punishable under N.J.S.A. 40:49-5 incl. fine not exceeding $2,000; each dwelling unit and each demand/payment of unlawful rent is a separate violation; repeat offender within 1 year gets an additional fine; enforcement by Rent Regulation Officer in Hoboken Municipal Court (§155-22); excess rent refunded/credited (max 2 years, §155-4(C)); legal rent calculations by Rent Regulation Officer, appealable to the Board within 20 days (§155-23).
- **Interaction with other levels**: Subordinate to the state NCMD exemption (expressly incorporated) and government rent contracts; state unconscionability standard applies to exempt units; §158-1 disclosure applies to any increase >10% (only possible for exempt/decontrolled units or Board-approved surcharges).
- **Citation**: Hoboken Code §155-1 ("Dwelling", "Base rent", "Consumer price index"); §155-2(A)–(H); §155-2.1; §155-3; §155-4; §155-5; §155-10; §155-21; §155-22
- **Source doc id**: D032, D033 (link-only, fetched) · **Source URL**: https://ecode360.com/15252438 ; https://ecode360.com/15252470 ; https://ecode360.com/15252439 (Art. I)
- **Quoted span**: NOT IN CORPUS — §155-5: "At the expiration of a lease or at the termination of a lease of a periodic tenant, no landlord may request or receive a percentage increase in rent which is greater than 5% or the percentage difference between the consumer price index three months prior to the expiration or termination of the lease and three months prior to the commencement of the lease term, whichever is less." §155-2: "This chapter shall apply to all dwelling units as defined in § 155-1 above, except that the following shall be exempt:" §155-21: "A violation of any provisions of this Chapter 155 shall be punishable in accordance with N.J.S.A. 40:49-5, including but not limited to a fine not exceeding $2,000. Each dwelling unit shall constitute a separate and distinct violation."
- **Confidence**: 0.96
- **Notes**: Corpus cross-reference: FAIR Act findings (D069) cite Hoboken studio rents rising 61% 2021–2024: `increasing by 61 percent in the same timeframe.`
- **Address-lookup facts needed**: year built / CO date (post-1987-06-25 → up to 30-year exemption; CO ≤ 1996-10-01 is certainly expired), hotel/motel/student/government status, vacancy-since-1984 registration, condo owner-occupant status. **Unit count is NOT needed** (no threshold). **Data gaps**: 39/40 Hoboken rows lack units → **no effect** on coverage ("applies"); NJ year built often missing → NCMD exemption **unknown** (flag); default = covered.

### HOB-RENT-2
- **Rule ID**: HOB-RENT-2
- **Jurisdiction**: Hoboken, NJ · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Vacancy decontrol — new tenant's initial rent limited to 25% above last rent; once per 3 years (§§155-31 to 155-34)
- **Requirement**: When a registered unit is vacated voluntarily (without harassment, duress or unreasonable pressure) or by legal eviction (not a holdover dispossess), the unit is decontrolled for the new tenant's initial rent, but that rent may not exceed 25% over the last rent paid (excluding capital-improvement surcharges); subsequent increases are subject to the chapter and the new rent becomes base rent. Landlord must file a decontrol certificate ($50 fee) naming the vacating and new tenants and rents. No unit may be decontrolled more than once in any three-year period. Board may rescind improper decontrols and prosecute under §155-21.
- **Key value**: Vacancy bump ≤ 25%; max once per 3 years; $50 certificate.
- **Coverage conditions**: Units registered under §155-30.
- **Exemptions**: Unregistered units get no decontrol; holdover evictions do not qualify.
- **Effective date**: Art. VII long-standing; §155-33 amended 2023-04-03 (Ord. B-549).
- **Penalty / remedy**: Rescission of decontrol, rent reverts, prosecution under §155-21.
- **Interaction with other levels**: Contrast Newark (no vacancy decontrol, §19:2-3.2) and Jersey City (vacancy increases only via capital-improvement formula §260-3(C)).
- **Citation**: Hoboken Code §155-31; §155-32; §155-33; §155-34
- **Source doc id**: D032 (link-only; Art. VII fetched) · **Source URL**: https://ecode360.com/15252572
- **Quoted span**: NOT IN CORPUS — "said rental shall be limited to an increase of 25% over the last rental paid by the tenant who voluntarily vacated the rental unit, exclusive of any capital improvement surcharge that is a component of said last rental." / "No dwelling unit shall be decontrolled pursuant to this article more than once in any three-year period."
- **Confidence**: 0.95

### HOB-RENT-3
- **Rule ID**: HOB-RENT-3
- **Jurisdiction**: Hoboken, NJ · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Mandatory disclosures for renewal rent increases over 10% (§158-1, Ord. B-750)
- **Requirement**: Any residential landlord seeking to raise rent by more than 10% year-over-year on renewal with a current tenant must disclose, on the first page of the renewal lease or on a Division of Housing form before the increase takes effect: (1) an itemization of costs associated with the increase; (2) whether a rent algorithm was used to determine the increase; (3) the tenant's right to take legal action if the increase is unconscionable or unlawful; (4) Division of Housing / Tenant Advocate contact information.
- **Key value**: Trigger >10% renewal increase; 4 required disclosures; fine ≤ $1,000 per incident.
- **Coverage conditions**: All residential landlords in Hoboken (rent-controlled and exempt units alike — in practice relevant to exempt/decontrolled units because controlled units are capped at 5%).
- **Exemptions**: None stated.
- **Effective date**: Adopted 2025-04-02 (effective ≈ 2025-04-22, 20 days after publication).
- **Penalty / remedy**: Fine not exceeding $1,000 per incident upon guilty plea/finding.
- **Interaction with other levels**: Complements state unconscionability standard; element (2) links to algorithmic category (HOB-ALGO-1) and parallels Jersey City §218-12(3).
- **Citation**: Hoboken Code §158-1(A)–(B)
- **Source doc id**: D034 (link-only, fetched) · **Source URL**: https://ecode360.com/46833413
- **Quoted span**: NOT IN CORPUS — "All residential landlords seeking to increase rent by more than 10% upon a renewal of a lease with a current tenant year over year shall be required to make the following disclosures to existing tenants ... (2) A statement as to whether a rent algorithm was used to determine the rent increase;"
- **Confidence**: 0.96
- **Address-lookup facts needed**: none (applies to all); gaps irrelevant.

## C2. just_cause_eviction

### HOB-JCE-1
- **Rule ID**: HOB-JCE-1
- **Jurisdiction**: Hoboken, NJ · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force (as "no local rule")
- **Title**: No Hoboken just-cause ordinance — state Anti-Eviction Act governs; ch. 155 incorporates state "just cause" by reference
- **Requirement**: Hoboken has no independent eviction-grounds or notice ordinance; §155-1 defines "just cause for eviction" as recovery of possession "for one of the reasons outlined in New Jersey State law (N.J.S.A. 2A:18-53 as amended)", and vacancy decontrol is denied where a tenant was removed for holdover. Hudson County Tenant Protection Act of 1992 applies to conversions.
- **Key value**: No rule at this level → apply NJ-STATE-JCE-1 to -4.
- **Coverage / Exemptions / Effective date / Penalty**: State.
- **Interaction with other levels**: Rent-control legal-rent determinations affect ground (f).
- **Citation**: Hoboken Code §155-1 ("Just cause for eviction"); §155-32; N.J.S.A. 2A:18-61.1
- **Source doc id**: D032 (link-only), D067 · **Source URL**: https://ecode360.com/15252439
- **Quoted span**: NOT IN CORPUS — §155-1: "JUST CAUSE FOR EVICTION The landlord recovered possession of a housing space or dwelling for one of the reasons outlined in New Jersey State law (N.J.S.A. 2A:18-53 as amended)." Corpus (D067): `the present time, the only qualified county is Hudson County (N.J.A.C. 5:24-3.2(b)). Tenants in`
- **Confidence**: 0.9
- **Address-lookup facts needed**: unit count + owner-occupancy (state exemption) → **unknown** for 39/40 Hoboken rows.

## C3. security_deposits

### HOB-DEP-1
- **Rule ID**: HOB-DEP-1
- **Jurisdiction**: Hoboken, NJ · **Level**: city · **Category**: security_deposits
- **Status**: in_force (as "no local rule")
- **Title**: No Hoboken deposit ordinance — state Rent Security Deposit Act governs
- **Requirement**: No local deposit rule; §155-1 expressly excludes security deposits from "rent" for rent-control purposes. N.J.S.A. 46:8-19 to -26 apply.
- **Key value**: No rule at this level → apply NJ-STATE-DEP-1 to -4.
- **Coverage / Exemptions / Effective date / Penalty**: State.
- **Interaction with other levels**: None.
- **Citation**: Hoboken Code §155-1 ("Rent"); N.J.S.A. 46:8-21.2
- **Source doc id**: D032 (link-only) · **Source URL**: https://ecode360.com/15252439
- **Quoted span**: NOT IN CORPUS — §155-1: "Security deposits and charges for accessories, such as boats, mobile homes and automobiles not used in connection with the housing space, shall not be construed as 'rent.'"
- **Confidence**: 0.9
- **Address-lookup facts needed**: owner-occupied ≤2 rental units (state exemption) → **unknown** for most Hoboken rows.

## C4. application_screening_fees

### HOB-FEE-1
- **Rule ID**: HOB-FEE-1
- **Jurisdiction**: Hoboken, NJ · **Level**: city · **Category**: application_screening_fees
- **Status**: in_force (as "no local rule")
- **Title**: No Hoboken application-fee ordinance — state $50 cap governs
- **Requirement**: No tenant-facing fee cap; Hoboken's §155-20 fees ($50 registration + $10/$15 per unit; $50 decontrol certificate) are paid by landlords to the city. Statewide $50 application-fee cap (eff. 2026-05-01) and FCHA pre-fee disclosure apply. A tenant-paid broker-fee ban has been proposed politically but not adopted.
- **Key value**: No rule at this level → apply NJ-STATE-FEE-1 to -3.
- **Coverage / Exemptions / Effective date / Penalty**: State.
- **Citation**: N.J.S.A. 46:8-18.1; Hoboken Code §155-20
- **Source doc id**: D066 (state); D032 (absence) · **Source URL**: https://ecode360.com/15252534
- **Quoted span**: NOT IN CORPUS — Hoboken §155-20 "(10) Vacancy decontrol filing: $50." (landlord fee, not tenant). Corpus (D066): `agent thereof, shall not require an application or other similar fee to apply`
- **Confidence**: 0.88
- **Address-lookup facts needed**: 1–2 family status → **unknown** for most Hoboken rows.

## C5. screening_restrictions

### HOB-SCR-1
- **Rule ID**: HOB-SCR-1
- **Jurisdiction**: Hoboken, NJ · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force (as "no local rule")
- **Title**: No Hoboken fair-chance / source-of-income ordinance — FCHA and LAD govern
- **Requirement**: No local tenant-screening ordinance located in the Hoboken Code or news; FCHA (criminal history) and LAD (source of income, protected classes) apply.
- **Key value**: No rule at this level → apply NJ-STATE-SCR-1 to -6.
- **Coverage / Exemptions / Effective date / Penalty**: State.
- **Citation**: N.J.S.A. 46:8-52 et seq.; N.J.S.A. 10:5-12(g)
- **Source doc id**: D065, D068 (state) · **Source URL**: https://pub.njleg.gov/bills/2020/PL21/110_.HTM
- **Quoted span (CORPUS)**: `“Housing provider” means a landlord, an owner, lessor,` (D065)
- **Confidence**: 0.85 (absence by search only)
- **Address-lookup facts needed**: owner-occupied ≤4 units → **unknown** for most Hoboken rows.

## C6. algorithmic_rent_setting

### HOB-ALGO-1
- **Rule ID**: HOB-ALGO-1
- **Jurisdiction**: Hoboken, NJ · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: **in_force**
- **Title**: §158-2 Algorithmic rent fixing in rental housing market prohibited (ch. 158 Art. II, Ord. B-781)
- **Requirement**: Landlords who rent any residential dwelling unit in Hoboken are prohibited from "price fixing using algorithmic pricing" — the use of software, algorithms or data-sharing platforms to collect and analyze nonpublic competitor information from other real estate lessors in order to coordinate, recommend or implement rental prices, lease terms or occupancy levels among competing lessors. "Nonpublic competitor information" = prices, supply levels, security deposits, ideal occupancy levels, lease termination/renewal dates or other material terms that is less than 365 days old and not widely and readily available to the public at no cost.
- **Key value**: Ban; penalties per N.J.S.A. 40:49-5 or fine ≤ $2,000 or community service ≤ 90 days.
- **Coverage conditions**: Every residential dwelling unit used as a primary residence in Hoboken — **no unit-count, year-built, owner-occupancy or rent-control threshold**.
- **Exemptions**: Medical/long-term care and detention facilities excluded from "residential dwelling unit"; by definition, use of only public/free or >365-day-old data, or single-owner internal data, is outside the ban (no express single-portfolio or broker exemption as in Jersey City).
- **Effective date**: Adopted **2025-07-09** (Ord. B-781); effective 20 days after publication ≈ **2025-07-29** (Morgan Lewis: "July 2025").
- **Penalty / remedy**: Upon conviction in Hoboken Municipal Court, one or more of: penalties prescribed under N.J.S.A. 40:49-5; fine not exceeding $2,000; community service not exceeding 90 days. Complaints may be brought by the Division of Housing **or any private citizen alleging to be aggrieved** (quasi-private enforcement via municipal court; no civil private right of action/damages stated).
- **Interaction with other levels**: Second NJ municipal ban after Jersey City; definitions track Jersey City's "nonpublic competitor information" and the state FAIR Act's "competitively sensitive information" (FAIR Act lacks the 365-day element). State FAIR Act effective 2027-07-01 — §6(b) **conflict flag: POTENTIAL but LOW** (Hoboken's ban is narrower than or coextensive with the state ban; municipal fines are cumulative). §158-1(A)(2) requires disclosure of algorithm use for >10% increases.
- **Citation**: Hoboken Code §158-2(A)–(C) (Art. II, adopted 7-9-2025 by Ord. No. B-781); N.J.S.A. 40:49-5
- **Source doc id**: D034 (link-only, fetched); D037 · **Source URL**: https://ecode360.com/46833413 ; https://www.morganlewis.com/pubs/2026/08/algorithmic-rent-pricing-litigation-expands-under-new-state-and-local-laws
- **Quoted span**: NOT IN CORPUS — §158-2(A): "Landlords who rent any residential dwelling unit (defined as any primary residence excluding medical/long-term care or detention facilities) in the City of Hoboken are prohibited from price fixing using algorithmic pricing." §158-2(B)(1): "Alleged violations of this chapter may be brought by the Division of Housing, or any private citizen alleging to be aggrieved, to the Hoboken Municipal Court for adjudication." §158-2(C)(2): "By a fine not exceeding $2,000; or". D037 (fetched): "Hoboken City Code, ch. 158-2 · Effective date: July 2025 · Prohibits landlords from using software, algorithms or data-sharing platforms to coordinate or recommend rents, lease terms, or occupancy."
- **Confidence**: 0.96 (text); 0.75 (exact effective date)
- **Notes**: Change test T2: in_force as of 2026-10-01. Corpus has no Hoboken ordinance text; D069 references Hoboken rents in findings only.
- **Address-lookup facts needed**: municipality only → "applies"; data gaps irrelevant.

---

# PART D — NEWARK, NJ

## D1. rent_increase_limits

### NWK-RENT-1
- **Rule ID**: NWK-RENT-1
- **Jurisdiction**: Newark, NJ · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Rent Control Regulations Title XIX ch. 19:2 — annual increase capped at CPI-U change (15→3 months), never more than 4% (§19:2-3.1); one increase per 12 months regardless of vacancy (§19:2-3.2)
- **Requirement**: At lease expiration or termination of a periodic tenancy no landlord may request or receive an increase greater than the CPI-U (NY–Northern NJ–Long Island) percentage change from 15 months to 3 months before the proposed increase month, and in no case more than 4%. Rents may not be increased more than that in any consecutive 12-month period irrespective of tenant turnover, ownership change **or vacancy** (no vacancy decontrol). The landlord must give the tenant and the Rent Regulation Officer written notice at least 30 days in advance stating the proposed increase, percentage, prior rent and allowable amounts. No increase (annual, surcharge or hardship) is allowed unless the dwelling is in "substantial compliance" with codes and registered under §19:2-9.8 with a certificate of habitability (§19:2-3.4, §19:2-26). Additional increases only via Board: tax surcharge (§19:2-5), major new improvements (§19:2-7, 60-day notice), hardship (§19:2-8, 5% fair return), utilities surcharge (§19:2-17), 10% for substantially rehabilitated vacant units (§19:2-18.4, once per 12 months). §19:2-22: total increases from §§19:2-3, -7, -8 may never exceed 25% of prior monthly rent in any one year. §19:2-4: excess rent rebated (credit ≤14 months or refund in 1 month), retroactive 2 years from petition.
- **Key value**: min(CPI-U 15→3 mo., 4%); once per 12 months; absolute 25% annual ceiling incl. surcharges; 30-day notice; base rent Sept 4, 1985.
- **Coverage conditions**: §19:2-2.1 (added 2023-08-02): "All multiple dwellings, as defined in subsection 19:2-2, are subject to Rent Control"; "multiple dwelling" = any building containing **one or more** apartments rented to one or more tenants; "rental unit" expressly includes one-, two-, three- and four-family homes and short-term rentals. **Owner-occupied 1–4 unit dwellings are defined (§19:2-2 "Owner occupied") but are NOT among the listed exemptions** — the only operative references are a waiver of inspection fees for owner-occupied units (§19:2-23(f)).
- **Exemptions** (§19:2-2 "Exemptions" a–f): (a) all public housing; (b) motel/hotel space rented day-to-day to transients; (c) commercial-use space; (d) newly constructed multiple dwellings (§19:2-18.1: exempt for initial-mortgage amortization or 30 years from CO, whichever is less; 30 years if no mortgage; requires Board certification application before occupancy with CO/TCO; exemption runs with the property) and vacant dwellings (§19:2-18.2: vacant ≥18 months and substantially rehabilitated at >50% of fair market value within 12 months → 5-year exemption; petition within 2 years of first permit); (e) units rehabilitated under federal/state Rental Rehabilitation Programs receiving Section 8/vouchers (rents ≤ HUD FMR) during subsidy tenure; (f) units under a government rent-regulation contract that supersedes city authority (preempted during the contract). Substantially rehabilitated dwellings may set an unrestricted initial rent (§19:2-18.3). Exempt owners must give prospective tenants a written exemption statement and lease clause (§19:2-24) and file claims 30 days before CO (§19:2-24.1).
- **Effective date**: Ordinance originally 1973/1985 (controls at Sept 4, 1985 rent levels, continued from Oct 19, 1988); current text Ord. 6 PSF-A(S) 2017-09-05; §19:2-2.1 added 2023-08-02 (Ord. 6PSF-I); CPI/4% text amended 2024-09-18 (Ord. 6PSF-I); definitions/exemptions/penalties/registration amended 2026-05-20 (Ord. 6PSF-B); §§19:2-27, -32 amended 2026-06-17 (Ord. 6PSF-C).
- **Penalty / remedy**: §19:2-19: fine $100–$2,000 and/or imprisonment ≤90 days per N.J.S.A. 40:49-5, each housing space a separate violation; Municipal Court may add a penalty ≤$2,000 per violation; repeat registration offenders within 1 year get an additional fine; Board may impose ≤$500 administrative penalty after hearing (§19:2-10.2(b)); excess rent rebate retroactive 2 years (§19:2-4); no leasing without registration + certificate of habitability (§19:2-26); certificate revocation (§19:2-32); appeals to Law Division within 45 days (§19:2-15).
- **Interaction with other levels**: Incorporates state NCMD exemption; §2:10-11 ("Unconscionable Rent Increase", NWK-RENT-2) addresses units outside rent control; the 2023 attempt to cap new-construction increases at 5% was removed after legal challenge (CoStar/RE-NJ reporting). **CONFLICT FLAG**: NJ DCA's rent-control survey and several 2026 landlord guides still list "owner-occupied housing with four units or fewer" as exempt in Newark, but the codified ordinance (fetched 2026-10-01) contains no such exemption and §19:2-2.1 applies rent control to all multiple dwellings of one or more units — treat owner-occupied 1–4 unit buildings as **covered per code, flagged as disputed**.
- **Citation**: Newark Code §19:2-2 (definitions "Multiple dwelling", "Owner occupied", "Exemptions", "Rental unit"); §19:2-2.1; §19:2-3.1; §19:2-3.2; §19:2-3.4; §19:2-4; §19:2-9.8; §19:2-18.1 to -18.4; §19:2-19; §19:2-22; §19:2-24; §19:2-26
- **Source doc id**: D070 (link-only, fetched) · **Source URL**: https://ecode360.com/36623772
- **Quoted span**: NOT IN CORPUS — §19:2-3.1: "At the expiration of a lease or at the termination of the lease of a periodic tenant, no landlord may request or receive an increase greater than the percentage increase in the Consumer Price Index (CPI) from the CPI 15 months prior to the month of the proposed rent increase to the CPI three months prior to the month of the proposed rent increase. In no case shall the allowable rent increase exceed 4%." §19:2-2.1: "All multiple dwellings, as defined in subsection 19:2-2, are subject to Rent Control pursuant to this Title XIX Rent Control," §19:2-3.2: "The rents for any housing space shall not be increased more than the percentages stated above in any consecutive twelve-month period irrespective of the number of different tenants occupying the housing space during the twelve-month period, any change of ownership of the landlord or vacancy of the housing space."
- **Confidence**: 0.95 (cap, notice, penalties); 0.7 (owner-occupied coverage — disputed between code and DCA survey)
- **Notes**: Corpus cross-reference: D067 `constructed multiple dwellings shall be exempt from any local rent control ordinances for a period` (state exemption Newark incorporates). Newark's "rent" definition includes security deposits, parking, pets and furniture charges for registration purposes.
- **Address-lookup facts needed**: year built / CO date (post-1996-10-01 → possible 30-year exemption; also 5-year vacant-rehab exemption), public-housing / Section 8 rehab / HUD status, commercial use, hotel status, owner-occupancy (for disputed exemption), registration/certificate-of-habitability status. **Unit count NOT determinative** (1+ units covered). **Data gaps**: Newark rows have **no unit counts** → **no effect** on coverage ("applies") under the code reading; owner-occupancy unknown → disputed exemption **unknown**; year built missing → NCMD exemption **unknown**.

### NWK-RENT-2
- **Rule ID**: NWK-RENT-2
- **Jurisdiction**: Newark, NJ · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force (definitions in force; operative penalty mechanics not fully retrieved)
- **Title**: §2:10-11 "Unconscionable Rent Increase" — local definition for non-rent-controlled units (Ord. 6PSF-C 2023-06-07, amended 6PSF-H 2023-08-02)
- **Requirement**: Newark defines "unconscionable rent" for residential properties including market/unsubsidized units as a rent increase that is exceedingly harsh or unreasonable, exceeds the increase in the landlord's expenses, and is not comparable to rents at similar properties; for properties under a redevelopment or financial agreement, rent exceeding the approved pro forma is per se unconscionable. Defines "displacement by fact" (court-adjudicated unconscionable increase) and "displacement by force" (constructive eviction via history of unconscionable increases or failure to maintain habitability). Originally paired with a 5% cap for non-rent-controlled units (adopted June 2023, 6-3 vote) that was subsequently rolled back for newer multifamily housing after landlord objections.
- **Key value**: Qualitative unconscionability standard (no numeric cap in current text); redevelopment pro-forma rent = per se ceiling.
- **Coverage conditions**: Residential properties not under ch. 19:2 rent control, incl. market-rate and unsubsidized units; redevelopment/financial-agreement properties.
- **Exemptions**: Units statutorily exempt from rent control under N.J.S.A. 2A:42-84.1 to -84.6 (new construction, 30-year window); HUD-controlled units.
- **Effective date**: 2023-06-07 (amended 2023-08-02)
- **Penalty / remedy**: Not retrieved (section text fetched contains definitions only; penalty/enforcement subsections not located in ch. 2:10 — open question).
- **Interaction with other levels**: Mirrors the state unconscionability standard of N.J.S.A. 2A:18-61.1(f); the exclusion of 2A:42-84.1 units concedes state preemption for new construction.
- **Citation**: Newark Code §2:10-11; §2:10-11.1
- **Source doc id**: D071 (link-only, fetched) · **Source URL**: https://ecode360.com/36637822 ; https://ecode360.com/42427482
- **Quoted span**: NOT IN CORPUS — "UNCONSCIONABLE RENT Shall mean any rental increase for residential properties including but not limited to market and unsubsidized units, whose rental increases are exceedingly harsh or unreasonable that exceed the increase in the landlord’s expenses; and is not comparable to rents charged at similar properties. ... This shall not apply to residential units that are statutorily exempt from Rent Control, pursuant to N.J.S.A. 2A:42-84.1-84.6 and/or units that are controlled and governed by the United States Department of Housing and Urban Development (HUD)."
- **Confidence**: 0.7
- **Notes / open questions**: Whether any numeric cap survives in §2:10-11 for non-exempt, non-rent-controlled units is unresolved; press (RE-NJ, Jersey Digs, CoStar) describe the 5% cap for "new multifamily" being dropped. Needs full §2:10-11.2+ text.
- **Address-lookup facts needed**: rent-control status, redevelopment/financial agreement, HUD status, year built.

## D2. just_cause_eviction

### NWK-JCE-1
- **Rule ID**: NWK-JCE-1
- **Jurisdiction**: Newark, NJ · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force (as "no local good-cause rule"; local anti-retaliation provision in force)
- **Title**: No Newark just-cause ordinance — state Anti-Eviction Act governs; §19:2-14 adds local anti-retaliation rule
- **Requirement**: Newark has no local eviction-grounds or notice ordinance; N.J.S.A. 2A:18-61.1 et seq. governs. Locally, §19:2-14 prohibits any action to recover possession as a reprisal for a tenant's efforts to secure or enforce rights under the rent control chapter, §19:2-18.4(g) treats forcible eviction to vacate/rehabilitate a unit as unlawful entry and detainer (treble damages under N.J.S.A. 2A:39-8), and §19:2-11 administers Senior Citizens and Disabled Protected Tenancy applications for conversions.
- **Key value**: No rule at this level for grounds/notice → apply NJ-STATE-JCE-1 to -4; local reprisal ban.
- **Coverage conditions**: §19:2-14 — all dwellings under ch. 19:2.
- **Exemptions**: State exemptions (owner-occupied ≤2 rental units, transient hotels) for the Act.
- **Effective date**: §19:2-14 text 2017-09-05 (amended 2024-09-18)
- **Penalty / remedy**: §19:2-19 penalties for retaliation; state remedies otherwise.
- **Interaction with other levels**: Cumulative with state reprisal law (N.J.S.A. 2A:42-10.10).
- **Citation**: Newark Code §19:2-14; §19:2-18.4(g); §19:2-11; N.J.S.A. 2A:18-61.1
- **Source doc id**: D070 (link-only, fetched); D067 · **Source URL**: https://ecode360.com/36623772
- **Quoted span**: NOT IN CORPUS — §19:2-14: "No landlord shall bring any action to recover possession of a dwelling unit as a reprisal for the tenant's efforts to secure or enforce any right under this chapter." Corpus (D067): `lease, whether it is a written or an oral lease without good cause. The landlord must be able to`
- **Confidence**: 0.9
- **Address-lookup facts needed**: unit count + owner-occupancy (state exemption) → **unknown** for Newark rows (no unit counts).

## D3. security_deposits

### NWK-DEP-1
- **Rule ID**: NWK-DEP-1
- **Jurisdiction**: Newark, NJ · **Level**: city · **Category**: security_deposits
- **Status**: in_force (as "no local rule")
- **Title**: No Newark deposit ordinance — state Rent Security Deposit Act governs
- **Requirement**: No local cap, return or interest rule. Note §19:2-2 defines "rent" for rent-control purposes to include "security deposits and damage and cleaning deposits", so deposits demanded must be registered and cannot be used to evade the increase cap, but amounts/return are governed solely by N.J.S.A. 46:8-19 to -26.
- **Key value**: No rule at this level → apply NJ-STATE-DEP-1 to -4.
- **Coverage / Exemptions / Effective date / Penalty**: State.
- **Interaction with other levels**: Deposit demands are "rent" for Newark registration/increase purposes (flag).
- **Citation**: Newark Code §19:2-2 ("Rent"); N.J.S.A. 46:8-21.2
- **Source doc id**: D070 (link-only, fetched) · **Source URL**: https://ecode360.com/36623772
- **Quoted span**: NOT IN CORPUS — §19:2-2: "RENT Shall mean the consideration and shall include any bonus, benefits or gratuity demanded or received for or, in connection with, the use or occupancy of housing space ... including, but not limited to monies demanded or paid for parking, pets, the use of furniture, subletting, security deposits and damage and cleaning deposits."
- **Confidence**: 0.88
- **Address-lookup facts needed**: owner-occupied ≤2 rental units (state exemption) → **unknown** for Newark rows.

## D4. application_screening_fees

### NWK-FEE-1
- **Rule ID**: NWK-FEE-1
- **Jurisdiction**: Newark, NJ · **Level**: city · **Category**: application_screening_fees
- **Status**: in_force (as "no local rule")
- **Title**: No Newark application-fee ordinance — state $50 cap governs
- **Requirement**: No tenant-facing fee limit; Newark §19:2-23 fees (annual registration $50 + $10/unit; inspections $50/unit; etc.) are landlord-to-city charges. Statewide $50 cap (eff. 2026-05-01) and FCHA pre-fee disclosure apply; Newark ch. 2:31 requires its own pre-inquiry written notice (NWK-SCR-1).
- **Key value**: No rule at this level → apply NJ-STATE-FEE-1 to -3.
- **Coverage / Exemptions / Effective date / Penalty**: State.
- **Citation**: N.J.S.A. 46:8-18.1; Newark Code §19:2-23
- **Source doc id**: D066 (state); D070 (absence) · **Source URL**: https://ecode360.com/36623772
- **Quoted span**: NOT IN CORPUS — §19:2-23(c): "Annual Registration; $50 plus $10 per dwelling unit." Corpus (D066): `agent thereof, shall not require an application or other similar fee to apply`
- **Confidence**: 0.88
- **Address-lookup facts needed**: 1–2 family status → **unknown** for Newark rows.

## D5. screening_restrictions

### NWK-SCR-1
- **Rule ID**: NWK-SCR-1
- **Jurisdiction**: Newark, NJ · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force (never repealed; partially superseded in practice by stricter state FCHA)
- **Title**: Newark "Ban the Box" — Housing (Code ch. 2:31 Art. 1, Ord. 6 PSF-B, 2015-04-15): criminal-history inquiry only after formal application; lookbacks; notice; penalties
- **Requirement**: In any rental, lease or sublease, a landlord or real estate broker may inquire into or consider criminal history only after the applicant has submitted a formal application; before any inquiry it must give standard written notice (consent required; ≥3 business days to submit rehabilitation evidence; right to a copy of results; attach the city Information Form). Permitted scope: indictable convictions for 8 years after release/sentencing; disorderly-persons/ordinance convictions for 5 years; pending charges; murder, attempted murder, arson, registrable sex offenses and terrorism offenses regardless of age. Never: arrests/accusations not pending and not resulting in conviction; erased/expunged/pardoned/nullified records; juvenile adjudications or sealed records. Must consider rehabilitation evidence, time elapsed, nature of crime. Adverse decision: within 10 business days, written notice with reasons and consideration of factors plus copy of results, sent together by registered mail. Confidentiality; no advertisements referencing criminal history (except lawful statutory restrictions).
- **Key value**: Timing = after formal application; lookbacks 8 yrs (indictable) / 5 yrs (disorderly); 10-business-day registered-mail adverse notice; fines $500 first / $1,000 subsequent.
- **Coverage conditions**: All "real property" rentals in Newark.
- **Exemptions**: Rental of a single apartment/flat in a two-family dwelling whose other unit is owner-occupied; rental of room(s) by the owner/occupant of an owner-occupied one-family dwelling; where federal/state law requires or permits consideration (limited to those offenses/periods); properties in government programs designed to house people with criminal histories; exemptions to be interpreted narrowly.
- **Effective date**: 2015-04-15 (Ord. 6 PSF-B)
- **Penalty / remedy**: First violation fine up to $500; each subsequent violation up to $1,000; enforced by an office designated by the Business Administrator.
- **Interaction with other levels — CONFLICT/OVERLAP ANALYSIS**: The state FCHA (eff. 2022-01-01) is stricter on timing (conditional offer vs. formal application), lookbacks (6/4/1 years vs. 8/5) and pending charges (FCHA bars consideration of charges without conviction; Newark allows pending charges). The FCHA contains no express preemption clause and §12(e) preserves independent rights, so Newark's ordinance remains on the books; in practice a Newark landlord must satisfy **both** — i.e., FCHA timing/lookbacks, plus Newark's written pre-inquiry notice, 3-business-day evidence window, 10-business-day registered-mail adverse notice, and Newark fines. Where Newark is more permissive, state law controls. Newark's owner-occupied two-family / one-family-room exemptions are narrower than FCHA's owner-occupied ≤4 unit exemption, so an owner-occupied 3- or 4-unit building in Newark is exempt from the FCHA but still subject to ch. 2:31 — **flag**.
- **Citation**: Newark Code §§2:31-1 to 2:31-9 (Art. 1, Housing)
- **Source doc id**: D072 (link-only, fetched) · **Source URL**: https://ecode360.com/36642000
- **Quoted span**: NOT IN CORPUS — §2:31-2(a): "Inquiry into and consideration of any applicant's criminal history shall take place only after the applicant has submitted a formal application." §2:31-3(a)(1): "Indictable offense convictions in New Jersey ... for eight years following the release from post-conviction custody or from the date of sentencing if the person was not incarcerated;" §2:31-9(b): "A first violation shall be subject to a fine of up to $500. Each subsequent violation shall be subject to a fine of up to $1,000."
- **Confidence**: 0.92 (text); 0.75 (practical enforcement given FCHA)
- **Notes**: Cornell CJEI lists Newark's ban-the-box as an active local law. Newark Art. 2 (Licensing) is out of scope.
- **Address-lookup facts needed**: owner-occupied two-family or one-family room rental (local exemption); owner-occupied ≤4 (state exemption). **Data gaps**: Newark rows have no unit counts → both exemptions **unknown**; default = both laws apply.

### NWK-SCR-2
- **Rule ID**: NWK-SCR-2
- **Jurisdiction**: Newark, NJ · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force (as "no local rule" for source of income)
- **Title**: No Newark source-of-income ordinance — LAD governs; state FCHA overlays ch. 2:31
- **Requirement**: Newark has no local source-of-income or protected-class rental ordinance beyond ch. 2:31 (criminal history); the LAD (N.J.S.A. 10:5-12(g)) and FCHA apply in full.
- **Key value**: No rule at this level → apply NJ-STATE-SCR-1 to -6 alongside NWK-SCR-1.
- **Coverage / Exemptions / Effective date / Penalty**: State.
- **Citation**: N.J.S.A. 10:5-12(g); N.J.S.A. 46:8-52 et seq.
- **Source doc id**: D068, D065 · **Source URL**: https://www.nj.gov/oag/dcr/downloads/kyrhousing02.pdf
- **Quoted span (CORPUS)**: `lawful recipient of a Section 8 HUD voucher the right to` (D068)
- **Confidence**: 0.85

## D6. algorithmic_rent_setting

### NWK-ALGO-1
- **Rule ID**: NWK-ALGO-1
- **Jurisdiction**: Newark, NJ · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: in_force (as "**no rule at this level**")
- **Title**: No Newark algorithmic rent-setting ordinance — state FAIR Act (not yet effective) will be the only rule from 2027-07-01
- **Requirement**: Newark has not enacted any ordinance restricting algorithmic or software-based rent setting or data sharing (confirmed: Newark ecode360 Title XIX ch. 19:2 and ch. 2:10 contain no such provision; news searches find only the Jersey City and Hoboken ordinances and the state FAIR Act, whose signing ceremony happened to be held in Newark). Until 2027-07-01 only general antitrust law applies; from 2027-07-01 the state FAIR Act applies to all Newark residential dwelling units.
- **Key value**: No rule at this level (null). State rule pending (NJ-STATE-ALGO-1).
- **Coverage conditions**: N/A.
- **Exemptions**: N/A.
- **Effective date**: N/A (state FAIR Act 2027-07-01).
- **Penalty / remedy**: None locally; Newark §19:2-3.1's 4% cap and §19:2-16 "no excessive rents" indirectly constrain algorithmic recommendations for covered units.
- **Interaction with other levels**: Change test T2 — Newark differs from Jersey City and Hoboken (both in_force local bans); change test T3 — Newark flips from "no rule" to state-rule-applies on 2027-07-01.
- **Citation**: (none) — absence; cf. P.L.2026, c.43 §9
- **Source doc id**: D070, D071 (link-only, fetched — no provision); D069 · **Source URL**: https://ecode360.com/36623772 ; https://pub.njleg.state.nj.us/Bills/2026/AL26/43_.HTM
- **Quoted span (CORPUS)**: `the twelfth month next following the date of enactment.` (D069 — the only algorithm rule that will reach Newark)
- **Confidence**: 0.9 (absence by code review of two Newark chapters + multiple web searches; a very recent unpublished ordinance cannot be fully excluded)
- **Address-lookup facts needed**: municipality only → "no local rule; state rule not_yet_effective".

---

# PART E — Address-lookup data-gap matrix (what each gap forces)

| Fact | Rules that need it | JC rows (no units) | Newark rows (no units) | Hoboken rows (39/40 no units) | NJ year-built missing |
|---|---|---|---|---|---|
| Unit / housing-space count | JC-RENT-1 (≤4 exempt); NJ-STATE-JCE-1/3, DEP-1/2, FEE-1, SCR-1/FEE-3 (owner-occ. ≤2/≤4), NJ-STATE-SCR-6 (Truth-in-Renting >2/3) | **unknown** for JC rent cap; state owner-occupied exemptions **unknown** → default "applies" with flag | Newark cap applies to 1+ units → **applies**; state exemptions **unknown** | Hoboken cap has no unit threshold → **applies**; state exemptions **unknown** | n/a |
| Owner-occupancy | All state owner-occupied exemptions; NWK-RENT-1 disputed exemption; NWK-SCR-1 two-family exemption | unknown → applies+flag | unknown → applies+flag (disputed) | unknown → applies+flag | n/a |
| Year built / CO date | NJ-STATE-RENT-3 (30-yr NCMD); JC-RENT-1 §260-6/§260-21; HOB-RENT-1 §155-2(H) (post-1987-06-25); NWK-RENT-1 §19:2-18.1 | n/a | n/a | n/a | **unknown** → cannot rule out exemption for buildings with CO after 1996-10-01; buildings known to be pre-1996 → exemption expired → covered |
| Subsidy / HUD / NJHMFA / public housing | NJ-STATE-RENT-4; JC §260-1 A.4; HOB §155-2(F), §155-2.1; NWK §19:2-2 (a),(e),(f) | unknown → default not subsidized | same | same | n/a |
| Hotel/motel/transient/student/government | Anti-Eviction Act & all three rent ordinances | unknown → default residential | same | same | n/a |
| Redevelopment area + ≥25 new units | JC §260-1 A.3 | unknown | n/a | n/a | n/a |
| Vacant since 1984 / vacant ≥18 months + rehab | HOB §155-2(G); NWK §19:2-18.2 | n/a | unknown | unknown | n/a |
| Municipality | All city rules; algorithmic rules need nothing else | known | known | known | n/a |

**Algorithmic rules (JC-ALGO-1/2, HOB-ALGO-1, NJ-STATE-ALGO-1) have no unit, age or occupancy thresholds — none of the data gaps affect them.**

# PART F — Status summary for change tests (as of 2026-10-01)

| Rule | Status | Key date |
|---|---|---|
| NJ-STATE-ALGO-1 (FAIR Act) | **not_yet_effective** | effective 2027-07-01 (T3) |
| JC-ALGO-1 / JC-ALGO-2 | **in_force** | adopted 2025-05-21 / 2025-09-24 (T2) |
| HOB-ALGO-1 | **in_force** | adopted 2025-07-09 (T2) |
| NWK-ALGO-1 | **no rule at this level** | — (T2) |
| NJ-STATE-FEE-1 ($50 cap) | **in_force** | effective 2026-05-01 |
| NJ-STATE-FEE-2 (CPI indexation) | **not_yet_effective** | first adjustment 2027-01-01 |
| NJ-STATE-SCR-1..4 (FCHA) | in_force | 2022-01-01 |
| JC-RENT-1 Ord. 25-125 (portfolio aggregation) | **failed** (defeated 2025-11-25) | exemption for ≤4 housing spaces unchanged |
| Newark 5% cap on non-rent-controlled/new units (2023) | **failed / repealed** (rolled back) | §2:10-11 definitions remain |


---

# PART 5 — LOS ANGELES, SAN FRANCISCO, SANTA ANA

# Rental-Housing Rule Extraction — Los Angeles, San Francisco, Santa Ana (CA cities)

Status date for all "Status" fields: **2026-10-01**. Corpus retrieval date: 2026-10-01.
Corpus dir: `...\participant-final-no-hour16 3\corpus\text\`. Quoted spans are copied character-for-character from the corpus `.txt` files (curly apostrophes/quotes and en-dashes preserved). Online-only facts are marked **NOT IN CORPUS**.

Docs read in full: D039, D040, D041, D042, D043 (LA); D078, D079, D080, D081, D082, D083 (SF); D084, D085 (Santa Ana).
Link-only docs fetched: D044 (AAGLA deposit interest) OK; D086 (OCBJ) OK; D087 (PublicCEO) OK; **D038 (amlegal LAMC)** – the URL resolves to LAMC Ch. IV Art. 5.6.1 §§45.65–45.69 (Source-of-Income protections), NOT the RSO chapter; fetched via proxy (direct fetch blocked by Cloudflare).
Additional primary sources fetched: LA City Clerk CF 24-1031, CF 22-0280, CF 22-0265; LAHD Bulletin #44 (deposit interest, rev. 01/13/2026); LAHD Renter Protections page; AAGLA 12/15/2025 alert; sf.gov code pages for Admin. Code §§37.2, 37.3, 37.9, 37.9C, 37.10A, 37.10C; SF Police Code §3304; sf.gov FCO housing page; Santa Ana Ord. NS-3073 (Measure CC, full text, 40 pp); Santa Ana RSD FAQ; Santa Ana news/newsletter re algorithmic ordinance.

Category enum used: `rent_increase_limits`, `just_cause_eviction`, `security_deposits`, `application_screening_fees`, `screening_restrictions`, `algorithmic_rent_setting`.

---

# PART 1 — LOS ANGELES, CA (city)

## Category 1: rent_increase_limits

### LA-RENT-1
- **Rule ID**: LA-RENT-1
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: RSO annual allowable rent increase — 3% through 2027-06-30; new formula (90% of CPI, 1% floor, 4% ceiling) from July 1, 2026 cycle
- **Requirement**: For units covered by the Rent Stabilization Ordinance (RSO), rent may be raised only once every 12 months by the annual allowable percentage published by LAHD. The published allowable increase is 3% for 7/1/2025–6/30/2026 and (per LAHD) remains 3% for 7/1/2026–6/30/2027 "unless amended by the City Council"; the amended formula sets the increase at 90% of average CPI, bounded between 1% and 4%.
- **Key value**: 3% (current period through 2027-06-30). Formula going forward: 90% × average CPI, floor 1%, ceiling 4% (old rule: 100% CPI, floor 3%, ceiling 8%).
- **Coverage conditions**: RSO rental units (see LA-RENT-2): generally buildings with certificate of occupancy / first built on or before 1978-10-01 with 2+ units on the parcel, plus replacement units under LAMC §151.28, mobile homes/RVs in parks, hotel rooms occupied >30 days, ADUs/JADUs. Increase allowed once per 12 months; 30-day written notice required for increases <10% (state law).
- **Exemptions**: Non-RSO units (post-10/1/1978 CO; single SFD on a lot); condos/townhomes with tenancies commencing after 1995-12-31 (rent not regulated — Costa-Hawkins); luxury-exemption units (rent on/before 5/31/1978 above thresholds); units where tenant voluntarily vacated or was evicted for cause (vacancy decontrol — rent may reset to market); LAHD-approved increases (capital improvement, primary renovation, seismic retrofit, rehabilitation, just-and-reasonable) sit on top of the annual %.
- **Effective date**: Annual % period 2025-07-01→2026-06-30 (3%); 2026-07-01→2027-06-30 (3% per LAHD). Formula-amendment ordinance: Council final vote 2025-12-12 (12–2); Mayor signed 2025-12-23. **CONFLICT on effective date**: LAHD pages state **2026-02-02**; AAGLA (landlord association) states **2026-01-24** ("The ordinance is effective January 24, 2026 and the new RSO formula calculation will be implemented July 1, 2026"). New formula first applies to the 2026-07-01 cycle. Prior: rent increases prohibited 2020-03-30 through 2024-01-31 (COVID freeze, expired).
- **Penalty / remedy**: Excess increases are unlawful; tenant may file LAHD complaint; RSO violations are misdemeanors (LAMC §151.10) and tenant may sue for damages/attorney fees (§151.10.A) — penalty text from online research, not in corpus.
- **Interaction with state law**: Supersedes/pre-dates CA Civ. Code §1947.12 (TPA) — §1947.12(d)(?) exempts units already subject to a stricter local rent-control ordinance; RSO units are governed by LAMC. Costa-Hawkins (§1954.50 et seq.) forces vacancy decontrol and exempts post-1995 SFH/condo tenancies and new construction.
- **Citation**: LAMC §151.06 (annual adjustment), §151.07 (LAHD-approved increases), §151.02 (definitions); amending ordinance reported as Ord. No. 188,558 (third-party cite, unverified).
- **Source doc id**: D042 (primary); D041; online: housing.lacity.gov/renter-protections-2; members.aagla.org/news/news-alert-la-city-passes-severely-reduced-rso-formula-ordinance; nbclosangeles.com (12/23/2025)
- **Source URL**: https://housing.lacity.gov/rso-rent-increase-calculator ; https://housing.lacity.gov/residents/rso-overview
- **Quoted span** (D042): "Annual rent increases for rental units subject to the City of Los Angeles Rent Stabilization Ordinance (RSO), effective" … "July 1, 2025, through June 30, 2026" … "3%". Also (D041): "Rent may be increased once every 12 months by the allowable rent increase" (line continues with a non-breaking space before "percentage"). Online (NOT IN CORPUS, LAHD Renter Protections): "The RSO annual rent increase remains at 3% from July 1, 2025, to June 30, 2027."
- **Confidence**: 0.85 on current 3% and formula; 0.6 on exact effective date (two published dates) and ordinance number.
- **Notes / open questions / conflicts**: (1) Effective-date conflict 2026-02-02 (LAHD) vs 2026-01-24 (AAGLA) — both recorded; LAHD is the official administering agency. (2) Formula math: 90% × CPI with 1–4% band *should* govern the 7/1/2026 cycle, yet LAHD publishes 3% for 7/1/2026–6/30/2027; a third-party calculator projected ~2.8%. Treat LAHD's 3% as controlling unless/until LAHD updates. (3) AAGLA reports an unexplained change to how "average CPI" is computed. (4) Pending council amendments (extra 1% for ≤10-unit owners; IRS "dependent" definition) referred to committee — not adopted as of research.
- **Address-lookup facts needed**: CO date / year first built (if built exactly in 1978, result = unknown — need CO month/day vs 1978-10-01); number of dwelling units on parcel (≥2 → RSO possible; single SFD → JCO not RSO); unit type (condo/townhome → tenancy start date vs 1995-12-31); ZIMAS RSO flag; tenancy start date and last increase date (12-month rule); whether landlord registered unit and paid fees (required before increase).

### LA-RENT-2
- **Rule ID**: LA-RENT-2
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: RSO applicability / coverage definition (CO on or before 1978-10-01; 2+ units; covered unit types)
- **Requirement**: The RSO applies to rental properties first built (certificate of occupancy) on or before October 1, 1978, plus LAMC §151.28 replacement units, if the property is an apartment, condominium/townhome (rent regulated only for tenancies that commenced on/before 12/31/1995), duplex, two or more SFDs on one parcel, hotel/motel/rooming-house rooms occupied >30 consecutive days by the same tenant, residential units attached to commercial buildings, ADU/JADU, or mobile homes/RVs in mobile home parks.
- **Key value**: Cutoff 1978-10-01 (CO date); ≥2 units on parcel.
- **Coverage conditions**: As above; annual registration with LAHD required; new owners have 45 days to register.
- **Exemptions**: Single-family dwelling alone on a lot (covered by JCO instead); post-10/1/1978 construction (JCO); luxury exemption (LAMC §151.02 rent thresholds as of 5/31/1978); government-owned/HACLA units; condos/townhomes with post-1995 tenancies (rent only; eviction rules still apply); temporary exemptions filed with LAHD.
- **Effective date**: RSO adopted 1979 (Ord. 152,120, eff. 1979-05-01); coverage cutoff fixed at 1978-10-01.
- **Penalty / remedy**: Operating unregistered RSO units: no rent increase may be collected and registration fees/penalties accrue; misdemeanor under LAMC §151.10 (online).
- **Interaction with state law**: Costa-Hawkins §1954.52 prohibits local rent control over units with CO after 1995-02-01 and SFH/condos (for post-1995 tenancies); LA's 1978 cutoff is narrower than Costa-Hawkins allows and is locally fixed.
- **Citation**: LAMC §151.02 (definition of "Rental Units" and exemptions), §151.05 (registration), §151.28 (replacement units)
- **Source doc id**: D041
- **Source URL**: https://housing.lacity.gov/residents/rso-overview
- **Quoted span** (D041): "Generally, the RSO applies to rental properties that were first built on or before October 1, 1978, as well as replacement units under" … "Condominium (Rent amount is not regulated for tenancies that commenced after December 31, 1995)"
- **Confidence**: 0.9
- **Notes**: "First built" on LAHD page equates to certificate of occupancy date in LAMC §151.02. Address-level: ZIMAS flags RSO status; text "RSO" to 1-855-880-7368.
- **Address-lookup facts needed**: CO issuance date (exact; year 1978 alone → unknown); unit count; parcel composition (single SFD vs multiple); condo/townhome tenancy start date; mobile-home park status; hotel occupancy length.

### LA-RENT-3
- **Rule ID**: LA-RENT-3
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Permitted surcharges on RSO rent: RSO registration fee pass-through ($1.61/mo), SCEP fee pass-through ($2.83/mo), smoke/CO detector surcharge ($3.00)
- **Requirement**: In addition to the annual percentage, a registered landlord may pass through to the tenant 50% of the annual RSO registration fee ($38.75/unit → $1.61/month for 12 months) and 1/12 of 50% of the annual Systematic Code Enforcement Program fee ($67.94/unit → $2.83/month), each only after registration and proper written (30-day) notice; a $3.00 surcharge may be added for installation of hard-wired smoke or combination smoke/CO detectors.
- **Key value**: $1.61/mo RSO; $2.83/mo SCEP; $3.00 detector surcharge. These are excluded from the base used to compute the % increase.
- **Coverage conditions**: RSO units; landlord has registered and paid fees; written notice given.
- **Exemptions**: Unregistered units may not collect surcharges.
- **Effective date**: RSO fee $38.75 effective 2020-01-01; SCEP pass-through authority added by Ord. No. 187,108 (eff. 2021-08-06), fee level effective 2022-01-01.
- **Penalty / remedy**: Overcharge = unlawful rent; LAHD complaint; refund.
- **Interaction with state law**: Local administrative pass-throughs; no state counterpart.
- **Citation**: LAMC §151.05.F (registration fee pass-through), §161.352 (SCEP fee pass-through), §151.06 (surcharges)
- **Source doc id**: D042, D041
- **Source URL**: https://housing.lacity.gov/rso-rent-increase-calculator
- **Quoted span** (D042): "Effective January 1, 2020, the RSO fee is a total of $38.75 per unit" ; (D041): "Effective January 1, 2022, a landlord may collect 1/12 of 50% of the annual Systematic Code Enforcement Fee" and "from the tenant of the rental unit per month. (Added by Ord. No. 187,108, Eff. 8/6/21.)" (a non-breaking space separates the two fragments in the corpus)
- **Confidence**: 0.9
- **Notes**: JCO (non-RSO) units pay a separate $31.05/unit annual registration bill (LAHD Renter Protections page, NOT IN CORPUS); pass-through rules for that fee not confirmed.
- **Address-lookup facts needed**: RSO status; registration status of the unit.

### LA-RENT-4
- **Rule ID**: LA-RENT-4
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Elimination of utility add-on (1% gas / 1% electric) and of 10% increase for additional dependents; 10% increase for additional non-dependent tenant retained
- **Requirement**: Beginning February 2, 2026, a landlord may no longer add any additional percentage increase for landlord-paid utilities, and may no longer impose a 10% increase when a dependent is added to the tenancy. A 10% increase remains permitted for an additional adult tenant (non-dependent) who moves in, imposed within 60 days of learning of the additional tenant.
- **Key value**: 0% utility add-on (was +1% gas, +1% electric); 0% for added dependents (was +10%); +10% for additional non-dependent tenant.
- **Coverage conditions**: RSO units. Wildfire-displaced tenants: no increase for additional tenants and/or pets added due to wildfire displacement (LAHD page).
- **Exemptions**: Increases already noticed and served before the effective date (per AAGLA interim rules).
- **Effective date**: 2026-02-02 per LAHD (AAGLA states 2026-01-24 for the ordinance; see conflict in LA-RENT-1). Written notice of increases for unauthorized tenants who moved in March 2020–December 2023 had to be served by 2024-03-01.
- **Penalty / remedy**: Unlawful rent increase; LAHD complaint; §151.10 remedies.
- **Interaction with state law**: Local.
- **Citation**: LAMC §151.06.D (utilities, as amended 2025/2026), §151.06.G (additional tenant)
- **Source doc id**: D041, D042
- **Source URL**: https://housing.lacity.gov/residents/rso-overview
- **Quoted span** (D041): "Effective February 2, 2026, an additonal 10% increase for an additional dependent added to the tenancy is no longer permitted." ; (D042): "Beginning February 2, 2026, a landlord can no longer include any additional percentage increase for utilities."
- **Confidence**: 0.85
- **Notes**: Typo "additonal" is in the corpus text verbatim. LAHD Renter Protections page marked the utility removal "Pending final Council approval" at one point; the RSO Overview and Calculator pages (Sept 2026) state it as effective.
- **Address-lookup facts needed**: RSO status; master-metered utilities (historical add-on); household composition changes and dates.

### LA-RENT-5 (explicit "no city rule" for non-RSO units)
- **Rule ID**: LA-RENT-5
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force (as a statement of the city's position)
- **Title**: No city rent cap for non-RSO (JCO) units — state AB 1482 (Civ. Code §1947.12) applies where eligible
- **Requirement**: The JCO does not regulate rent increases; for non-RSO buildings older than 15 years, the state Tenant Protection Act cap (5% + CPI, max 10%) may apply. LAHD publishes the state figure: 8.9% for 8/1/2024–7/31/2025 (8.8% prior year).
- **Key value**: No city cap; state cap 5% + regional CPI, ≤10%.
- **Coverage conditions**: Units not under RSO; state cap applies to units ≥15 years old (rolling) not otherwise exempt.
- **Exemptions (from state cap, per LAHD page)**: units constructed within last 15 years; deed-restricted affordable; certain dormitories; owner-occupied duplex second unit; SFH/condos not owned by REIT/corporation/LLC-with-corporate-member AND with written notice under §1946.2(e)(8)(B)(i)/§1947.12(d)(5)(B)(i); units already under RSO.
- **Effective date**: JCO 2023-01-27 (Ord. 187,737); AB 1482 2020-01-01.
- **Penalty / remedy**: State law remedies (§1947.12(k) as amended by SB 567: tenant action for actual/treble damages, AG/City Attorney enforcement).
- **Interaction with state law**: Pure state layer; city adds nothing on rent amounts for these units.
- **Citation**: LAMC Ch. XV Art. 5 (JCO, §165.00 et seq.) — expressly does not regulate rent; Civ. Code §1947.12
- **Source doc id**: D040
- **Source URL**: https://housing.lacity.gov/residents/just-cause-for-eviction-ordinance-jco
- **Quoted span** (D040): "The JCO does not regulate rent increases, however, state law" … "Effective August 1, 2024 to July 31, 2025, the maximum allowable increase is" … "8.9%"
- **Confidence**: 0.9
- **Notes**: LAHD page (last modified Sept 10, 2026) still lists the 2024-25 state figure; the 8/1/2025–7/31/2026 and 8/1/2026–7/31/2027 state figures are not in corpus.
- **Address-lookup facts needed**: CO date vs 15-year rolling window; ownership entity type; written exemption notice given; RSO status.

## Category 2: just_cause_eviction

### LA-JC-1
- **Rule ID**: LA-JC-1
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: RSO just-cause eviction grounds (LAMC §151.09.A) and eviction-notice filing with LAHD
- **Requirement**: A landlord may terminate an RSO tenancy only for the enumerated at-fault grounds (non-payment, uncured lease violation, nuisance/damage, illegal use, refusal to renew similar agreement, denying reasonable access, unapproved subtenant at lease end) or no-fault grounds (owner/immediate-family occupancy, resident manager, demolition/permanent removal (Ellis), government order, HUD sale, residential hotel conversion, conversion to affordable housing). All notices to terminate must be filed with LAHD within 3 business days of service; no-fault evictions require a Landlord Declaration of Intent to Evict filed before notice, and relocation assistance.
- **Key value**: 7 at-fault + 7 no-fault grounds; 3-business-day filing; 30/60-day notice (120-day or up to 1-year for some no-fault).
- **Coverage conditions**: RSO rental units (see LA-RENT-2).
- **Exemptions**: Vacancies by voluntary move-out, buyout agreement; RSO-exempt units are governed by JCO instead.
- **Effective date**: RSO 1979; notice-filing rule LAMC §151.09.C.9; Right-to-Counsel notice posting required from 2025-08-20; Renters' Protections Notice for tenancies begun/renewed on/after 2023-01-27.
- **Penalty / remedy**: Failure to file Declaration makes the eviction an RSO violation; tenant may raise as affirmative defense in UD; misdemeanor and civil action with damages/attorney fees under LAMC §151.10 (online).
- **Interaction with state law**: Civ. Code §1946.2(g)(1)(B) defers to local just-cause ordinances adopted before 9/1/2019 that are "more protective"; RSO just cause controls for RSO units; Ellis Act (Gov. Code §7060) governs withdrawals, implemented via LAMC §§151.22–151.28.
- **Citation**: LAMC §151.09.A (grounds), §151.09.C.9 & §165.05.B.5 (notice filing), §151.30 (owner/family occupancy restrictions), §§151.22–151.28 (Ellis)
- **Source doc id**: D041, D043
- **Source URL**: https://housing.lacity.gov/residents/rso-overview
- **Quoted span** (D041): "All notices to terminate a tenancy for all rental units subject to" … "three (3) business days of service on the tenant" ; (D043): "All tenant not- at-fault evictions require payment of relocation assistance and the filing of a"
- **Confidence**: 0.9
- **Address-lookup facts needed**: RSO status; owner type (natural person for owner-occupancy); relative relationship; number of units owned in city (mom-and-pop); whether unit is Protected Unit (RPO).

### LA-JC-2
- **Rule ID**: LA-JC-2
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Just Cause for Eviction Ordinance (JCO) — coverage of non-RSO units (incl. post-1978 buildings and single-family homes) after 6 months or first lease expiry
- **Requirement**: For most residential property in the City not under the RSO, the landlord may not terminate a tenancy without a listed just cause once the tenant has lived in the unit 6 months or the original lease expired (whichever first), and must pay relocation assistance for no-fault terminations. Same at-fault/no-fault ground list as RSO (plus resident manager required by law/covenant, residential hotel conversion, conversion to affordable housing).
- **Key value**: Protection vests at 6 months or end of first lease; applies to buildings newer than 1978-10-01 and to a single SFD on a lot.
- **Coverage conditions**: All non-RSO residential rental property in LA city unless exempt.
- **Exemptions**: transient hotels; licensed care facilities; fraternity/sorority houses; owner's roommate; cooperatives (certain); some non-profit homeless facilities / short-term substance-abuse treatment; some HACLA/government-owned properties; owner-occupied/no-rent properties may file annual exemption.
- **Effective date**: 2023-01-27 (Ord. 187,737; amended Ord. 187,764; 188,486). Right-to-Counsel notice posting from 2025-08-20.
- **Penalty / remedy**: Eviction without just cause/relocation is a JCO violation; affirmative defense in UD; civil action (LAMC §165.07, online).
- **Interaction with state law**: Civ. Code §1946.2(g)(1)(B)/(C) permits post-2019 local ordinances that are "more protective" and so finds; JCO's 6-month trigger is stricter than AB 1482's 12 months. For SFH/condos exempt from AB 1482 (natural-person owners with notice), the JCO still applies (D040).
- **Citation**: LAMC Ch. XV Art. 5, §165.00 et seq. (esp. §165.03 grounds, §165.05 notice filing, §165.06 relocation)
- **Source doc id**: D040
- **Source URL**: https://housing.lacity.gov/residents/just-cause-for-eviction-ordinance-jco
- **Quoted span** (D040): "The JCO covers most residential properties in the City of Los Angeles that are not regulated by the City’s Rent Stabilization Ordinance (RSO)." ; "In order to apply to a tenancy, it requires that the tenant either has lived in the same unit for at least six months or that their original lease expired, whichever comes first."
- **Confidence**: 0.9
- **Address-lookup facts needed**: RSO vs JCO status; tenancy start date and lease term; property type (SFD/condo); owner entity and portfolio size (relocation tier); exemption category.

### LA-JC-3
- **Rule ID**: LA-JC-3
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Relocation assistance amounts for no-fault evictions under RSO & JCO (Chart A, 7/1/2026–6/30/2027) and payment timing
- **Requirement**: For no-fault evictions, the landlord must pay per-unit relocation assistance within 15 days of service of the termination notice (or fund an escrow): Eligible tenants $11,000 (<3 years tenancy) / $14,400 (≥3 years or low income ≤80% AMI); Qualified tenants (62+, disabled/handicapped, or with minor dependent child) $23,150 / $27,400. Pro-rata split among multiple tenants; highest applicable amount governs. Amounts increase every July 1 (indexed to 100% of CPI under the Dec 2025 ordinance per AAGLA).
- **Key value**: $11,000 / $14,400 (Eligible); $23,150 / $27,400 (Qualified); 15-day payment deadline.
- **Coverage conditions**: RSO and JCO units; no-fault grounds (LAMC §151.09.A.8,10,11,12,13,14; §165.03.H–M); demolition/conversion under LAMC §47.06/47.07 regardless of RSO/JCO.
- **Exemptions**: Replacing a resident manager with another (unless manager-tenant); evictions due to hazardous conditions from natural disaster not caused by landlord negligence; landlord may offset accumulated unpaid rent (except for government order to vacate / unpermitted dwelling). Reduced tiers for Mom & Pop and SFD-natural-person (LA-JC-4). Lower-income tenants displaced by demolition for new construction use Chart B (LA-JC-6).
- **Effective date**: Chart effective 2026-07-01 through 2027-06-30 (Bulletin #33A, 07/01/2026).
- **Penalty / remedy**: Tenant may raise non-payment as affirmative defense in UD; LAHD complaint; private right of action. Landlord fees: Relocation Service Fee $623 (Eligible)/$1,002 (Qualified), Admin Fee $86/unit, Dispute Resolution Fee $300, Owner-occupancy declaration $75.
- **Interaction with state law**: Exceeds AB 1482's one-month relocation (§1946.2(d)); state Housing Crisis Act (Gov. Code §66300.6) may require more for lower-income displaced by demolition — landlord pays the higher.
- **Citation**: LAMC §151.09.G (RSO relocation), §165.06 (JCO relocation), RAC Regulations §960.00 (escrow), §967.00
- **Source doc id**: D043
- **Source URL**: https://housing.lacity.gov/wp-content/uploads/2026/08/Relocation-Assistance-Bulletins-A-and-B-Combined.pdf
- **Quoted span** (D043): "Effective July 1, 2026 through June 30, 2027" … "Household $11,000 $14,400 $10,550" … "Household $23,150 $27,400 $21,250" … "Payment shall be made available within fifteen (15) days of service of the written notice of" … "written notice of termination is 62 years of age or older; handicapped, as defined in Section"
- **Confidence**: 0.95
- **Notes**: Bulletin B's "Application Fees" chart is still labeled 7/1/2025–6/30/2026 with identical dollar figures to Bulletin A's 2026–27 chart — appears to be a stale label in the PDF.
- **Address-lookup facts needed**: Tenancy length (3-year threshold); tenant age/disability/minor children; household income vs 2026 HUD limits (80% AMI: $93,300 1-person … $175,900 8-person); number of tenants in unit (pro-rata).

### LA-JC-4
- **Rule ID**: LA-JC-4
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Reduced relocation tiers — Mom & Pop owner/family-occupancy evictions ($10,550 / $21,250) and single-family dwelling owned by natural person under JCO (one month's rent)
- **Requirement**: For owner/eligible-relative occupancy evictions only, a "Mom and Pop" landlord pays reduced relocation ($10,550 Eligible / $21,250 Qualified) if: the building has ≤4 rental units; the landlord has not used the provision in the prior 3 years; the landlord owns ≤4 residential units plus one SFD on a separate lot in the City; and the relative does not own residential property in the City (LAMC §151.30). For a single-family dwelling subject to the JCO whose owner is a natural person (incl. trust/entity controlled by that person) owning ≤4 dwelling units plus one SFD on a separate lot, relocation is one month's rent in effect at notice (payment or credit) (LAMC §165.06.A.(6)).
- **Key value**: $10,550 / $21,250 (Mom & Pop); one month's rent (SFD natural person, JCO only).
- **Coverage conditions**: As stated; condominiums do NOT qualify for the SFD tier (LAHD).
- **Exemptions**: Does not apply to non-owner-occupancy no-fault grounds.
- **Effective date**: 2026-07-01 figures; SFD rule under JCO (2023-01-27 ordinance as amended).
- **Penalty / remedy**: As LA-JC-3.
- **Interaction with state law**: Local; exceeds §1946.2(d).
- **Citation**: LAMC §151.30; §165.06.A.(6)
- **Source doc id**: D043
- **Source URL**: https://housing.lacity.gov/wp-content/uploads/2026/08/Relocation-Assistance-Bulletins-A-and-B-Combined.pdf
- **Quoted span** (D043): "The building containing the rental unit contains four or fewer rental units;" … "who owns no more than four dwelling units and a single-family home on a separate lot in the City"
- **Confidence**: 0.9
- **Address-lookup facts needed**: Owner is natural person vs entity; owner's total units in LA; building unit count (≤4); prior use of provision within 3 years; relative's property ownership; SFD vs condo classification.

### LA-JC-5
- **Rule ID**: LA-JC-5
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Non-payment eviction threshold — rent owed must exceed HUD Fair Market Rent for the unit's bedroom size
- **Requirement**: For all RSO and JCO units, a landlord may not evict for non-payment unless the amount owed exceeds the HUD Fair Market Rent (FMR) for a unit of that bedroom size.
- **Key value**: Threshold = 1× FMR by bedroom count (updated annually by HUD/LAHD).
- **Coverage conditions**: All RSO & JCO rental units.
- **Exemptions**: None stated.
- **Effective date**: 2023-03-27
- **Penalty / remedy**: Affirmative defense to UD; JCO/RSO violation.
- **Interaction with state law**: More protective than CCP §1161(2); state does not pre-empt local eviction thresholds.
- **Citation**: LAMC §165.03.A (JCO) / §151.09.A.1 (RSO) as amended (Ord. 187,764)
- **Source doc id**: D040
- **Source URL**: https://housing.lacity.gov/residents/just-cause-for-eviction-ordinance-jco
- **Quoted span** (D040): "Applies to all RSO & JCO rental units. Effective March 27, 2023, landlords may not evict a tenant who falls behind in rent unless the tenant owes an amount higher than the Fair Market Rent (FMR)."
- **Confidence**: 0.9
- **Address-lookup facts needed**: Bedroom count; current FMR table year.

### LA-JC-6
- **Rule ID**: LA-JC-6
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Resident Protections Ordinance (RPO) — enhanced relocation for lower-income tenants displaced by demolition of Protected Units for new construction (Chart B)
- **Requirement**: When a Protected Unit (incl. all RSO units, deed-restricted units, units rented to lower-income households within 5 years, Ellis-withdrawn units within 10 years) is demolished for new construction, lower-income households (≤80% AMI) must receive the higher of city RSO/JCO amounts or HCA/RPO amounts: standardized Option 1 payments of $115,480 (extremely low), $96,750 (very low), $87,450 (low income) for 7/1/2026–6/30/2027; above-low-income households get Chart A. Owners may instead use Option 2 (comparable replacement unit + Chart A) or Option 3 (individualized relocation plan).
- **Key value**: $115,480 / $96,750 / $87,450; penalties from $250,000 per displaced unit.
- **Coverage conditions**: Protected Units demolished for new construction within 5 years of Notice of Intent to Withdraw / Declaration of Intent to Evict.
- **Exemptions**: Non-Protected Units; above-low-income tenants (Chart A applies).
- **Effective date**: RPO adopted 2025-02-11 (Ordinances 188,481 & 188,482); amounts effective 2026-07-01.
- **Penalty / remedy**: Financial penalties starting at $250,000 per displaced unit; withholding of LAHD permit clearances.
- **Interaction with state law**: Implements and expands Housing Crisis Act (SB 330/SB 8/AB 1218; Gov. Code §66300.6(b)(4)(A)).
- **Citation**: LAMC (Planning) RPO provisions; LAMC §§151.22–151.28 (Ellis); Gov. Code §66300 et seq.
- **Source doc id**: D043
- **Source URL**: https://housing.lacity.gov/wp-content/uploads/2026/08/Relocation-Assistance-Bulletins-A-and-B-Combined.pdf
- **Quoted span** (D043): "financial penalties starting at $250,000 per displaced unit and withholding of LAHD permit clearances." … "New Development $115,480 $96,750 $87,450"
- **Confidence**: 0.85
- **Address-lookup facts needed**: Protected Unit status (RSO; affordability covenant within 5 yrs; lower-income occupancy within 5 yrs; Ellis withdrawal within 10 yrs); household income tier; demolition/new-construction permit.

## Category 3: security_deposits

### LA-DEP-1
- **Rule ID**: LA-DEP-1
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: security_deposits
- **Status**: in_force
- **Title**: Interest on security deposits for RSO units (LAMC §151.06.02) — 2026 rate 3.03%
- **Requirement**: Landlords of RSO units must pay tenants interest on security deposits held for at least one year, annually (monthly or yearly, by direct payment or rent credit, landlord's written election) at the Rent Adjustment Commission rate or the actual interest earned (with bank statement); unpaid accrued interest is due with the deposit refund at move-out per Civ. Code §1950.5(f).
- **Key value**: 3.03% for calendar 2026 (2025: 4.32%; 2024: 0.52%; 2023: 0.04%; 2022: 0.03%). Rate set annually by RAC, posted on registration billings.
- **Coverage conditions**: RSO units (CO before 1978-10-01; dwelling units, suites, condos, duplexes, guest rooms, hotel rooms occupied >30 days); deposit held ≥1 year.
- **Exemptions**: Mobile home parks (no RSO deposit-interest requirement); non-RSO (JCO) units — no city requirement; calendar-year 2002 waived (Ord. 175,020).
- **Effective date**: Interest accrual began 1990-11-01 (Ord. 166,368); amended Ord. 174,017 (eff. 2001-06-07) and Ord. 175,020 (eff. 2004-01-01).
- **Penalty / remedy**: Civil remedy only — tenant may sue (incl. small claims) under §151.06.02(G); LAHD does not investigate non-payment complaints. Non-compliance is commonly raised as an eviction defense (AAGLA).
- **Interaction with state law**: Layered on Civ. Code §1950.5 (state sets deposit cap — one month's rent since 2024-07-01 under AB 12 — and refund timing; state does not require interest).
- **Citation**: LAMC §151.06.02
- **Source doc id**: D041 (corpus mention); D044 (link-only, AAGLA, fetched); LAHD Bulletin #44 (01/13/2026) NOT IN CORPUS
- **Source URL**: https://members.aagla.org/news/city-of-la-security-deposit-interest-requirement ; https://housing.lacity.gov/wp-content/uploads/2023/01/44-Interest-Payments-on-Security-Deposits-English.pdf
- **Quoted span** (D041, corpus): "Interest Payments on Security Deposits" (listed under "What the RSO Covers"). Online (NOT IN CORPUS, LAHD Bulletin #44): "The interest rate set by the Rent Adjustment Commission for 2026 is 3.03%." Online (D044 AAGLA): "The landlord shall choose between these two methods of payment and notify the tenant in writing of his or her choice."
- **Confidence**: 0.85 (rate from LAHD bulletin; corpus has only the heading)
- **Address-lookup facts needed**: RSO status; deposit hold ≥12 months; deposit amount; years held (rate table per year).

### LA-DEP-2 (no city rule)
- **Rule ID**: LA-DEP-2
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: security_deposits
- **Status**: in_force (statement of absence)
- **Title**: No city limit on security deposit amount or refund timing — state law governs
- **Requirement**: The City of Los Angeles imposes no cap on deposit amount and no refund deadline beyond state Civ. Code §1950.5 (max 1 month's rent for most landlords from 2024-07-01; 2 months for small landlords ≤2 properties/≤4 units; 21-day itemized refund).
- **Key value**: none (state: 1× monthly rent).
- **Coverage/Exemptions**: N/A.
- **Effective date**: N/A.
- **Penalty / remedy**: State (§1950.5(l): up to 2× deposit for bad-faith retention).
- **Interaction with state law**: State-only.
- **Citation**: none (Civ. Code §1950.5)
- **Source doc id**: none in corpus; research finding.
- **Quoted span**: N/A — NOT IN CORPUS (no city rule exists).
- **Confidence**: 0.8
- **Address-lookup facts needed**: none city-specific.

## Category 4: application_screening_fees

### LA-FEE-1 (no city rule)
- **Rule ID**: LA-FEE-1
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: application_screening_fees
- **Status**: in_force (statement of absence)
- **Title**: No City of Los Angeles rule on rental application / screening fees — state Civ. Code §1950.6 governs
- **Requirement**: No LAMC provision caps or regulates application screening fees. State law caps the fee at the landlord's actual out-of-pocket cost up to an inflation-adjusted maximum (~$62–65 in 2025–26), requires itemized receipt, bars charging when no vacancy exists, and (AB 2493, eff. 2025-01-01) requires either a first-come-first-served process or refund to non-selected applicants.
- **Key value**: none (state cap).
- **Effective date**: N/A.
- **Penalty / remedy**: State.
- **Interaction with state law**: State-only. A 2022 council motion (CF 22-0265, "Rental Access Ordinance" re automated tenant screening/credit reports) expired 2024-03-09 without ordinance.
- **Citation**: none (Civ. Code §1950.6)
- **Source doc id**: none; LA City Clerk CF 22-0265 (online)
- **Quoted span**: N/A — NOT IN CORPUS.
- **Confidence**: 0.8
- **Address-lookup facts needed**: none.

## Category 5: screening_restrictions

### LA-SCR-1
- **Rule ID**: LA-SCR-1
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: Source-of-income discrimination prohibited (LAMC Ch. IV Art. 5.6.1, §§45.65–45.69) — includes Section 8 / rental assistance
- **Requirement**: Any person offering, renting or listing a housing accommodation may not, based on a person's source of income (any lawful income, rental assistance, subsidy incl. Section 8 vouchers, LAHSA rapid re-housing, security-deposit assistance), refuse to rent/renew/continue a lease or HAP contract, serve a termination notice, apply different terms/conditions (incl. rent, deposits), or advertise a preference/limitation.
- **Key value**: Punitive damages ≥3× actual damages or 3× one month's rent (whichever greater) + attorney fees; affirmative defense to UD.
- **Coverage conditions**: All dwelling units, efficiency units, guest rooms, suites, duplexes, condos, single-family homes and mobile homes rented or offered for rent in the City.
- **Exemptions**: None stated in Art. 5.6.1.
- **Effective date**: 2020-01-01 (§45.69).
- **Penalty / remedy**: Civil action for injunctive relief and damages; punitive damages floor as above; attorney fees and costs; UD affirmative defense (§45.68).
- **Interaction with state law**: Layered on FEHA (Gov. Code §12955(p), SB 329 eff. 2020-01-01) and SB 267 (2024, alternative evidence of ability to pay for voucher holders); city remedy is more specific (treble floor).
- **Citation**: LAMC §§45.65–45.69 (esp. §45.67 prohibited activities, §45.68 remedies, §45.69 effective date)
- **Source doc id**: D038 (link-only; fetched via proxy)
- **Source URL**: https://codelibrary.amlegal.com/codes/los_angeles/latest/lamc/0-0-0-322208
- **Quoted span** (online, NOT IN CORPUS text — link-only doc): "It shall be unlawful for any person offering for rent, renting, or listing any housing accommodation" … "The provisions of this ordinance shall take effect on January 1, 2020."
- **Confidence**: 0.85
- **Notes**: D038's URL points to this source-of-income article, not to the RSO chapter (which lives at amlegal node 0-0-0-195151, bot-blocked). The LA RSO text itself therefore could not be quoted from D038.
- **Address-lookup facts needed**: None property-specific (city-wide); applicant's voucher/subsidy status.

### LA-SCR-2
- **Rule ID**: LA-SCR-2
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: screening_restrictions
- **Status**: pending
- **Title**: Fair Chance Housing (criminal-history screening) ordinance — motion adopted, no ordinance enacted
- **Requirement**: None in force. Council adopted a motion (CF 22-0280) on 2024-04-09 (11–0) directing the City Attorney/LAHD to draft a fair-chance housing ordinance barring criminal-history inquiries; no ordinance has been adopted as of 2026-10-01; file expiration date 2026-04-09 with no activity after 2024-04-12.
- **Key value**: N/A.
- **Coverage/Exemptions**: N/A.
- **Effective date**: N/A (motion final 2024-04-12).
- **Penalty / remedy**: N/A.
- **Interaction with state law**: State FEHA regs (2 CCR §12266 et seq., eff. 2020) require individualized assessment of criminal history and bar blanket bans; LA County's Fair Chance Ordinance for Housing (eff. 2025-01-01) applies only to **unincorporated** county areas — NOT within LA city limits.
- **Citation**: LA City Council File 22-0280 ("Fair Chance Housing Ordinance / Applicant Criminal History / Discriminatory Tenant Screening Practices")
- **Source doc id**: none in corpus; cityclerk.lacity.org CF 22-0280 (online)
- **Quoted span**: N/A — NOT IN CORPUS. Online (City Clerk): "Council adopted item, subject to reconsideration, pursuant to Council Rule 51." (04/09/2024).
- **Confidence**: 0.8 (status "pending"; may be functionally dead/expired — flag)
- **Address-lookup facts needed**: Whether address is inside LA city vs unincorporated LA County (county ordinance).

## Category 6: algorithmic_rent_setting

### LA-ALG-1
- **Rule ID**: LA-ALG-1
- **Jurisdiction**: Los Angeles, CA · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: pending
- **Title**: Algorithm-based rent-setting software ban — Council motion (CF 24-1031) adopted 2025-02-04 instructing LAHD to report on feasibility; no ordinance enacted
- **Requirement**: No operative prohibition. Motion 24-1031 (Hutt/Rodriguez, 2024-09-03) instructs LAHD to report on the number of owners/managers using algorithm-based software to set rents and the feasibility of a ban. Housing & Homelessness Committee approved 2025-01-22; Council adopted 15–0 on 2025-02-04; action final 2025-02-05. No report-back ordinance or draft located as of 2026-10-01; file expires 2027-02-04.
- **Key value**: N/A (no ban).
- **Coverage/Exemptions**: N/A.
- **Effective date**: N/A.
- **Penalty / remedy**: N/A.
- **Interaction with state law**: State AB 325 (eff. 2026-01-01) amends the Cartwright Act to reach "common pricing algorithms" used in anticompetitive agreements; SB 52 (statewide rental-algorithm ban) introduced 2025 — status not confirmed. Any LA ordinance would layer on these.
- **Citation**: LA City Council File 24-1031 ("Algorithm-based Software / Rental Price Establishment / Software Ban")
- **Source doc id**: D039
- **Source URL**: https://cityclerk.lacity.org/onlinedocs/2024/24-1031_misc_9-03-24.pdf
- **Quoted span** (D039): "I THEREFORE MOVE that the City Council instruct the Los Angeles Housing Department to" … "software to establish rents and the feasibility of instituting a ban on the use of this software to set"
- **Confidence**: 0.85
- **Notes**: Neighbouring cities (Santa Monica 2025, West Hollywood 2026) have adopted bans; LA city has not. Status should be re-checked against CF 24-1031 for any LAHD report (none visible in Clerk record as of research).
- **Address-lookup facts needed**: None (no rule). Check whether address is in Santa Monica/West Hollywood/other city with a ban.

---

# PART 2 — SAN FRANCISCO, CA (city and county)

## Category 1: rent_increase_limits

### SF-RENT-1
- **Rule ID**: SF-RENT-1
- **Jurisdiction**: San Francisco, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Annual allowable rent increase for rent-controlled units — 1.6% for 3/1/2026–2/28/2027 (60% of CPI, 7% cap)
- **Requirement**: For units under the Rent Ordinance's rent-control provisions, a landlord may raise base rent once every 12 months by no more than the Rent Board's published annual allowable increase, which is 60% of the Bay Area CPI-U increase, never exceeding 7%; a landlord must hold a "rent increase license" (Housing Inventory reporting, §37.15) before imposing annual or banked increases.
- **Key value**: 1.6% (2026-03-01 → 2027-02-28); prior 1.4% (2025-26), 1.7% (2024-25). Formula: 60% × CPI; cap 7%.
- **Coverage conditions**: Residential units with certificate of occupancy on or before 1979-06-13 that are not otherwise exempt (see SF-RENT-2); 12 months since tenancy start or last increase; 30-day written notice (90 days if cumulative increase >10%; +5 days if mailed).
- **Exemptions**: Units with CO after 1979-06-13 (Ord. 276-79) — eviction protections only; SFH/condos for tenancies beginning on/after 1996-01-01 (Costa-Hawkins, §37.3(d)) subject to exceptions (condos not yet sold, §1946.1/§827 terminations, unabated violations ≥6 months, §37.2(r)(4)(D) units); substantially rehabilitated units; units regulated by another government agency; full exemptions in §37.2(r).
- **Effective date**: Ordinance since 1979 (Ord. 295-79 eff. 1979-06-22); 60%-of-CPI formula since Prop H (2000-12-21); rate period 2026-03-01.
- **Penalty / remedy**: Non-conforming increase is "null and void" (§37.3(b)); tenant petition to Rent Board for rent overpayment; §37.10A misdemeanor for bad-faith increases to force out.
- **Interaction with state law**: Supersedes Civ. Code §1947.12 for covered units (§1947.12(d)(?) exempts stricter local ordinances); Costa-Hawkins (§1954.52) dictates vacancy decontrol and new-construction/SFH exemptions; §37.3(g)(1)(E) notes the 1979 date cannot be moved under state law (through at least 2024-11-05).
- **Citation**: S.F. Admin. Code §37.3(a)(1) (annual increase), §37.3(a)(2) (banking), §37.3(b) (notice/void), §37.3(d) (Costa-Hawkins), §37.3(g) (new construction), §37.15 (Housing Inventory / license)
- **Source doc id**: D080, D083
- **Source URL**: https://www.sf.gov/news--annual-rent-increase-3126-22827-announced ; https://www.sf.gov/reports--current-rates-including-rent-increase-relocation-sec-deposit
- **Quoted span** (D080): "For rent-controlled units, the annual allowable increase amount effective March 1, 2026 through February 28, 2027 is 1.6%." ; (D083): "1.6% for March 1, 2026 – February 28, 2027"
- **Confidence**: 0.95
- **Notes**: Formula text (60%/7%) confirmed from sf.gov §37.3 page (NOT IN CORPUS): "In no event, however, shall the allowable annual increase be greater than 7%."
- **Address-lookup facts needed**: CO date (1979 build year alone → unknown; need before/after June 13, 1979); unit type (SFH/condo → tenancy start date vs 1996-01-01); Housing Inventory reporting status; tenancy anniversary date; banked increases.

### SF-RENT-2
- **Rule ID**: SF-RENT-2
- **Jurisdiction**: San Francisco, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Rent Ordinance coverage — "Rental Units" definition and exemptions (§37.2(r)); rent control vs eviction-only coverage
- **Requirement**: "Rental Units" are all residential dwelling units in the City with appurtenant land/buildings/housing services; rent-control (§37.3) applies to units with CO on or before 1979-06-13; units with CO after that date, most SFH/condos (post-1995 tenancies), substantially rehabilitated units, and units regulated by another agency have eviction protections (§37.9) but not rent control.
- **Key value**: CO cutoff 1979-06-13.
- **Coverage conditions**: As above.
- **Exemptions (full exemption from the Ordinance, §37.2(r))**: hotels/motels/inns/rooming houses until same tenant stays 32+ continuous days (anti-evasion); nonprofit cooperatives owned/occupied/controlled by resident majority and resident-controlled nonprofit public-benefit corporations with bylaws requiring resident approval of increases; hospitals, convents, monasteries, extended-care facilities, licensed residential care / adult day health facilities for the elderly; dormitories of colleges/high schools/elementary schools; units whose rents are controlled/regulated by another government agency (with carve-backs: unsubsidized HUD-insured units, seismically retrofitted URM buildings, tenant-based voucher holders for certain sections, certain LIHTC/bond units occupied before recording, certain ADUs/density-bonus/HOME-SF units); commercial space with incidental residential use; former residential units now commercial.
- **Effective date**: Ord. 295-79 (1979); numerous amendments through Ord. 3-26 (eff. 2026-02-09).
- **Penalty / remedy**: As SF-RENT-1 / SF-JC-1.
- **Interaction with state law**: Costa-Hawkins overlay for SFH/condos and new construction.
- **Citation**: S.F. Admin. Code §37.2(r) ("Rental Units"), §37.2(h) ("Landlord"), §37.2(t) ("Tenant"), §37.3(d),(g)
- **Source doc id**: D079 (corpus statement of 1979 cutoff); sf.gov §37.2 page (NOT IN CORPUS)
- **Source URL**: https://sf.gov/information/overview-just-cause-evictions ; https://www.sf.gov/information--sec-372-definitions
- **Quoted span** (D079): "This includes tenancies in newly constructed rental units that first obtained a Certificate of Occupancy after June 13, 1979, tenancies that are eligible for a rent increase under the"
- **Confidence**: 0.9
- **Address-lookup facts needed**: CO date; unit type; hotel occupancy length; government regulation/subsidy status; nonprofit co-op status.

### SF-RENT-3
- **Rule ID**: SF-RENT-3
- **Jurisdiction**: San Francisco, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Permitted passthroughs beyond annual increase — capital improvements (10%/yr cap after seismic work), utilities, water bond/excess-water, property-tax bond passthroughs, Rent Board fee ($29.50 tenant share)
- **Requirement**: Increases above the annual allowable amount require Rent Board certification/petition (capital improvements §37.7/§37.8B; operating & maintenance capped at 7%) or fall under formula passthroughs (50% of certain bond-related property tax increases; 50% of water-rate increases tied to Nov 2002 bonds; utility passthrough per §37.2(q)); the landlord may also pass through the tenant's half of the annual Rent Board fee ($29.50 for tax year 2024-25) as a banked amount; passthroughs do not become part of base rent and must be separately itemized in the notice.
- **Key value**: Capital improvement increases ≤10% of base rent per 12 months (post-seismic); O&M ≤7%; Rent Board fee $29.50/$29.50 tenant/landlord; capital-improvement imputed interest 4.1%–4.8% (3/1/26–2/28/27); uncompensated labor $40.40/hr from 6/29/26.
- **Coverage conditions**: Rent-controlled units.
- **Exemptions**: Tenant financial-hardship applications can defer/waive passthroughs.
- **Effective date**: Property-tax passthrough schedule operative 2024-07-01 (Ord. 92-24).
- **Penalty / remedy**: Non-conforming increase null and void (§37.3(b)); tenant petition.
- **Interaction with state law**: Local.
- **Citation**: S.F. Admin. Code §37.3(a)(3)–(a)(6), §37.3(b), §37.7, §37.8B, §37A (Rent Board fee)
- **Source doc id**: D083
- **Source URL**: https://www.sf.gov/reports--current-rates-including-rent-increase-relocation-sec-deposit
- **Quoted span** (D083): "Rent Board Fees that can be banked" … "Capital Improvement Imputed Interest Rates" … "Use the rate in effect at the time the petition is filed: March 1, 2026 through February 28, 2027"
- **Confidence**: 0.85
- **Address-lookup facts needed**: Rent-control status; certified capital improvement petitions on file; bond-passthrough eligibility.

## Category 2: just_cause_eviction

### SF-JC-1
- **Rule ID**: SF-JC-1
- **Jurisdiction**: San Francisco, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Just cause required to recover possession — 17 enumerated grounds (§37.9(a)); applies to nearly all residential units incl. post-1979 buildings, SFH and condos
- **Requirement**: A landlord shall not endeavor to recover possession of a rental unit unless one of the 17 just causes in §37.9(a) is the dominant motive, stated in writing on/before the notice to vacate (Rent Board multilingual form attached); copies of all notices other than 3-day pay-or-quit must be filed with the Rent Board within 10 days of service. Expiration of lease or change of ownership is not just cause. Just cause also required to sever housing services (garage, storage, laundry, etc.).
- **Key value**: 17 just causes: (1) nonpayment/habitual late/bounced checks; (2) uncured substantial breach; (3) nuisance/substantial damage (severe, continuing or recurring) with DV-victim defense; (4) illegal use (excluding mere unwarranted-unit occupancy or a cured single STR violation); (5) refusal to renew like-terms lease; (6) refusal of lawful access; (7) unapproved subtenant at term end; (8) owner/relative move-in (OMI) for ≥36 continuous months; (9) condo-conversion sale; (10) demolition/permanent removal; (11) temporary capital improvements; (12) substantial rehabilitation (50+ yr building, cost ≥75% of new construction); (13) Ellis Act withdrawal; (14) lead remediation; (15) development agreement; (16) Good Samaritan expiry; (17) Planning Code §317 demolition.
- **Coverage conditions**: All "rental units" per §37.2(r) including units exempt from rent control (post-1979 CO, Costa-Hawkins SFH/condos, other-agency-regulated); protection generally from start of tenancy (no 6/12-month waiting period except for §37.9(j) school-year defense, 12 months, and §37.9C relocation eligibility, 12 months).
- **Exemptions**: §37.2(r) fully exempt units (hotels <32 days, nonprofit co-ops, hospitals/care facilities, dormitories, government-regulated units, etc.); many affordable housing units.
- **Effective date**: 1979-06-22 (Ord. 295-79); expanded to post-1979 units by Prop G (1998)/Ord. 250-98 etc.; most recent amendment Ord. 3-26 (eff. 2026-02-09).
- **Penalty / remedy**: §37.9(e): eviction without just cause/substantial factual basis is a **misdemeanor**; §37.10A(j): mandatory $1,000 fine and/or up to 6 months county jail per violation; §37.9(f): tenant or Rent Board civil action for injunctive relief and damages of **not less than three times actual damages** (emotional-distress damages trebled only on knowing violation/reckless disregard), prevailing-party attorney fees; 5-year limitations period for OMI claims; tenant waivers void.
- **Interaction with state law**: Civ. Code §1946.2(g)(1)(B) preserves local just-cause ordinances adopted before 2019-09-01 — SF's controls; Ellis Act (Gov. Code §7060) governs ground (13) with §37.9A procedures.
- **Citation**: S.F. Admin. Code §37.9(a) (grounds), §37.9(c) (notice), §37.9(e) (misdemeanor), §37.9(f) (civil remedies), §37.9(i) (protected tenants), §37.10A (enforcement)
- **Source doc id**: D079
- **Source URL**: https://sf.gov/information/overview-just-cause-evictions
- **Quoted span** (D079): "Note that the mere expiration of a rental agreement or a change in ownership does not constitute" … "The 17 just cause reasons for eviction under" … "Ordinance Section 37.9(a)" … "If a landlord evicts or tries to evict a tenant unlawfully, the landlord may be subject to substantial civil and/or criminal liability."
- **Confidence**: 0.95
- **Address-lookup facts needed**: §37.2(r) exemption status; CO date (affects relocation/rent control, not just cause); owner's ownership share and other units (OMI); tenant protected status (age 60+/disabled + 10 yrs; catastrophic illness + 5 yrs); children/educators in household (school-year defense).

### SF-JC-2
- **Rule ID**: SF-JC-2
- **Jurisdiction**: San Francisco, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Relocation payments for covered no-fault evictions (§37.9C) — $8,245 per tenant, $24,733 per unit max, +$5,497 for elderly (60+)/disabled/households with minor child (3/1/2026–2/28/2027)
- **Requirement**: For notices based on §37.9(a)(8) OMI, (10) demolition/permanent removal, (11) temporary capital improvements (≥20 days), or (12) substantial rehabilitation, each Eligible Tenant (authorized occupant of 12+ months, any age) receives the base payment (half at service of notice, half on vacating), capped per unit, plus an additional payment for each tenant 60+ or disabled (Gov. Code §12955.3) and for each household with a child under 18 (half within 15 days of tenant's written claim, half on vacating). Landlord must notify all occupants in writing of the right to payment and file the notice with the Rent Board within 10 days. Amounts adjust each March 1 by the CPI "rent of primary residence" index.
- **Key value**: $8,245.00 / $24,733.00 / +$5,497.00 (2026-27); prior year $8,062 / $24,184 / +$5,375.
- **Coverage conditions**: Rental units subject to §37.9; tenant residency ≥12 months.
- **Exemptions**: Temporary displacement under (a)(11) for <20 days is governed by Civ. Code §1947.9, not §37.9C (see SF-JC-4); no second payment for a same-ground notice within 180 days; Ellis Act evictions use §37.9A(e) instead (SF-JC-3).
- **Effective date**: Prop H, effective 2006-12-22, applying to notices on/after 2006-08-10; original $4,500/$13,500/$3,000 indexed annually from 2007-03-01; current period 2026-03-01.
- **Penalty / remedy**: Failure to pay is a §37.9 violation (defense to UD; §37.9(f) treble damages); payment/acceptance does not waive tenant rights.
- **Interaction with state law**: Far exceeds §1946.2(d) one-month relocation; §1946.2(g) preserves local scheme.
- **Citation**: S.F. Admin. Code §37.9C (esp. (a) definitions, (c) notice, (e) amounts/timing)
- **Source doc id**: D083, D082
- **Source URL**: https://www.sf.gov/reports--current-rates-including-rent-increase-relocation-sec-deposit ; https://www.sf.gov/reports--archive-relocation-rates
- **Quoted span** (D083): "Relocation Payments for Evictions based on Owner/Relative Move-in OR Demolition/Permanent Removal of Unit from Housing Use OR Temporary Capital Improvement Work* OR Substantial Rehabilitation" … "PLUS Additional Amount Due for Each Elderly (60 years or older) or Disabled Tenant or Household with Minor Child(ren)" … "3/01/26 – 2/28/27" / "$8,245.00" / "$24,733.00" / "$5,497.00"
- **Confidence**: 0.95
- **Address-lookup facts needed**: Date of service of notice (selects rate year); tenant residency ≥12 months; number of eligible tenants in unit; ages/disability/minor children.

### SF-JC-3
- **Rule ID**: SF-JC-3
- **Jurisdiction**: San Francisco, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Ellis Act withdrawal relocation payments (§37.9A(e)) — $11,110.05 per tenant, $33,330.13 per unit max, +$7,443.90 for elderly (62+)/disabled (3/1/2026–2/28/2027)
- **Requirement**: When all units are withdrawn from the rental market under the Ellis Act, each tenant receives the Ellis relocation payment (half at notice, half on vacating), capped per unit, plus an additional amount for each tenant 62+ or disabled; amounts indexed annually each March 1. Notice periods: 120 days (1 year for tenants 62+/disabled); re-rental constraints and right of first refusal for 10 years; Rent Board notice filing.
- **Key value**: $11,110.05 / $33,330.13 / +$7,443.90 (2026-27); prior year $10,863.45 / $32,590.33 / +$7,278.67.
- **Coverage conditions**: Units subject to §37.9 withdrawn under Gov. Code §7060 et seq.
- **Exemptions**: N/A (Ellis applies to whole building).
- **Effective date**: §37.9A originally 1985; amounts re-set 2022-03-01 ($10,000/$30,000/$6,700) and indexed thereafter; current period 2026-03-01.
- **Penalty / remedy**: §37.9A damages; City may seek exemplary damages for unlawful re-rental; §37.9(f).
- **Interaction with state law**: Implements Gov. Code §7060.1–7060.7 (which authorize local relocation and re-rental controls).
- **Citation**: S.F. Admin. Code §37.9A(e)
- **Source doc id**: D083, D082
- **Source URL**: https://www.sf.gov/reports--current-rates-including-rent-increase-relocation-sec-deposit
- **Quoted span** (D083): "Relocation payments for tenants evicted under the Ellis Act" … "PLUS Additional Amount Due for Each Elderly (62 years or older) or Disabled Tenant" … "$11,110.05" / "$33,330.13" / "$7,443.90"
- **Confidence**: 0.95
- **Address-lookup facts needed**: Notice service date; tenant ages/disability; number of tenants per unit.

### SF-JC-4
- **Rule ID**: SF-JC-4
- **Jurisdiction**: San Francisco, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Temporary displacement <20 days for capital improvements — per-diem relocation ($446/day + actual moving expenses) under Civ. Code §1947.9 as published by Rent Board
- **Requirement**: For §37.9(a)(11) temporary capital-improvement displacements lasting fewer than 20 days, relocation is governed by state Civ. Code §1947.9 (per-diem for comparable lodging plus actual moving expenses), with the Rent Board publishing the annually adjusted per-diem.
- **Key value**: $446.00/day (3/1/26–2/28/27); $436.00/day prior year.
- **Coverage conditions**: Rent Ordinance units with <20-day temporary displacement.
- **Exemptions**: ≥20-day displacements fall under §37.9C.
- **Effective date**: Civ. Code §1947.9 since 2013-01-01; current rate 2026-03-01.
- **Penalty / remedy**: State; §37.9(f) for failure to comply with notice rules.
- **Interaction with state law**: State statute controls amount (local ordinance expressly defers).
- **Citation**: Cal. Civ. Code §1947.9; S.F. Admin. Code §37.9C(a) annotation
- **Source doc id**: D083, D082
- **Source URL**: https://www.sf.gov/reports--current-rates-including-rent-increase-relocation-sec-deposit
- **Quoted span** (D083): "*The amount of relocation payments for temporary capital improvement evictions for less than 20 days is governed by California Civil Code Section 1947.9 and not by Rent Ordinance Section 37.9C. See below for relocation payments for temporary displacement for less than 20 days." … "$446.00/day (plus actual moving expenses)"
- **Confidence**: 0.9
- **Address-lookup facts needed**: Duration of displacement; notice date.

### SF-JC-5
- **Rule ID**: SF-JC-5
- **Jurisdiction**: San Francisco, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Owner move-in (OMI) constraints — 36-month occupancy, protected tenants (60+/disabled 10 yrs; catastrophically ill 5 yrs), 5-year re-rental rent cap (§37.9(a)(8), §37.9(i), §37.9B)
- **Requirement**: OMI requires good-faith intent to occupy as principal residence for at least 36 continuous months; OMI is barred against tenants who are 60+ or disabled with ≥10 years residence, or catastrophically ill with ≥5 years residence (unless landlord owns only one unit in the building, or all other units are occupied by protected tenants and the incoming relative is 60+); tenant must furnish protected-status statement within 30 days of request; for 5 years after OMI the unit must be re-rented (if at all) at the rent the displaced tenant would have paid; Rent Board notice/filing and relocation (§37.9C).
- **Key value**: 36 months; 10-year/5-year protected-tenant thresholds; 5-year rent constraint.
- **Coverage conditions**: §37.9 units.
- **Exemptions**: As stated in §37.9(i).
- **Effective date**: Prop G (1998) and later amendments.
- **Penalty / remedy**: §37.9(f) treble damages (5-year limitations period); §37.9B constraints; misdemeanor.
- **Interaction with state law**: Local (more protective than §1946.2(b)(2)(A)).
- **Citation**: S.F. Admin. Code §37.9(a)(8), §37.9(i), §37.9(j), §37.9B
- **Source doc id**: D079 (ground listed); sf.gov §37.9 page (NOT IN CORPUS for thresholds)
- **Source URL**: https://sf.gov/information/overview-just-cause-evictions ; https://www.sf.gov/information--sec-379-evictions
- **Quoted span** (D079): "or, in limited circumstances, occupancy by a member of the landlord's immediate family;" Online (NOT IN CORPUS): "Is 60 years of age or older and has been residing in the unit for 10 years or more"
- **Confidence**: 0.85
- **Address-lookup facts needed**: Owner's percentage interest (≥25% for OMI, online); number of units owner holds in building; tenant age/disability/illness and move-in date.

## Category 3: security_deposits

### SF-DEP-1
- **Rule ID**: SF-DEP-1
- **Jurisdiction**: San Francisco, CA · **Level**: city · **Category**: security_deposits
- **Status**: in_force
- **Title**: Security deposit interest — 4.2% for 3/1/2026–2/28/2027 (Admin. Code Ch. 49, §49.2), payable annually on all residential deposits held ≥1 year
- **Requirement**: Any landlord subject to Civ. Code §1950.5 who holds a residential security deposit for at least one year must pay the tenant simple interest at the Rent Board-published rate each year (direct payment or rent credit), and a pro-rata payment of unpaid interest within two weeks of the tenant vacating (unless deposit is applied to defaults). Landlord may deduct the tenant's share of the Rent Board fee from interest owed. Rate = annual average of the 90-Day AA Financial Commercial Paper rate for the prior calendar year, rounded to nearest tenth, published each January for the period beginning March 1.
- **Key value**: 4.2% (2026-03-01 → 2027-02-28); 5.0% (2025-26); 5.2% (2024-25).
- **Coverage conditions**: ALL residential rental units in SF regardless of rent-control status, where deposit held ≥1 year.
- **Exemptions**: Tenancies where rent is assisted or subsidized by a government unit.
- **Effective date**: Interest accrual from 1983-09-01; annual-payment requirement from 1984-09-01; commercial-paper benchmark from 2015; current rate 2026-03-01.
- **Penalty / remedy**: Tenant civil action (small claims) for unpaid interest; no administrative penalty stated.
- **Interaction with state law**: Layered on Civ. Code §1950.5 (state caps deposit at 1 month's rent from 2024-07-01; no state interest requirement).
- **Citation**: S.F. Admin. Code Ch. 49, §49.2
- **Source doc id**: D083
- **Source URL**: https://www.sf.gov/reports--current-rates-including-rent-increase-relocation-sec-deposit ; https://www.sf.gov/news--new-interest-rate-security-deposits-effective-3126
- **Quoted span** (D083): "Security Deposit Interest:" / "4.2% for March 1, 2026 – February 28, 2027" … "March 1, 2025 – February 28, 2026" / "5.0%"
- **Confidence**: 0.9 (rate from corpus; coverage details from online summary of Ch. 49)
- **Address-lookup facts needed**: Deposit hold ≥12 months; subsidy status; deposit amount; anniversary dates.

### SF-DEP-2 (no city rule)
- **Rule ID**: SF-DEP-2
- **Jurisdiction**: San Francisco, CA · **Level**: city · **Category**: security_deposits
- **Status**: in_force (statement of absence)
- **Title**: No city cap on security deposit amount or refund deadline — state Civ. Code §1950.5 governs
- **Requirement**: SF regulates only interest on deposits (SF-DEP-1); amount cap (1 month's rent; 2 months for qualifying small landlords) and 21-day refund come from state law.
- **Key value**: none.
- **Citation**: none (Civ. Code §1950.5)
- **Source doc id**: none; **Quoted span**: N/A — NOT IN CORPUS.
- **Confidence**: 0.8
- **Address-lookup facts needed**: none.

## Category 4: application_screening_fees

### SF-FEE-1 (no city rule)
- **Rule ID**: SF-FEE-1
- **Jurisdiction**: San Francisco, CA · **Level**: city · **Category**: application_screening_fees
- **Status**: in_force (statement of absence)
- **Title**: No San Francisco ordinance on rental application screening fees — state Civ. Code §1950.6 governs
- **Requirement**: No SF code provision caps application fees. State cap (actual cost up to inflation-adjusted max; itemized receipt; AB 2493 first-come-first-served or refund) applies.
- **Key value**: none.
- **Interaction with state law**: State-only. (Note: SF Fair Chance Ordinance regulates the *sequence* of background checks for affordable housing — see SF-SCR-1 — not fees.)
- **Citation**: none (Civ. Code §1950.6)
- **Source doc id**: none; **Quoted span**: N/A — NOT IN CORPUS.
- **Confidence**: 0.75 (absence confirmed by search; no SF fee ordinance located)
- **Address-lookup facts needed**: none.

## Category 5: screening_restrictions

### SF-SCR-1
- **Rule ID**: SF-SCR-1
- **Jurisdiction**: San Francisco, CA · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: Fair Chance Ordinance — housing provisions (Police Code Art. 49, §4906): criminal-history limits for affordable housing providers
- **Requirement**: Covered (affordable) housing providers may not ask about criminal history on the rental application; may run a background check only after determining the applicant is otherwise qualified and after giving the applicant a copy of their FCO rights; may consider only "directly-related" convictions and unresolved arrests via individualized assessment; may never consider arrests not resulting in conviction, diversion/deferral participation, expunged/dismissed/invalidated convictions, juvenile records, convictions more than 7 years old, or infractions; before denial must provide the report and identify the basis, with 14 days for the applicant to respond with inaccuracies, rehabilitation or mitigating evidence. From 2026-08-10, may not use out-of-state arrests/convictions for conduct lawful in California (reproductive/gender-affirming care, drag, miscarriage-related conduct).
- **Key value**: 7-year lookback; 14-day response; sequence rule (qualification first).
- **Coverage conditions**: "Affordable Housing" as defined in §4903 (housing with City funding/affordability restrictions — per HRC/sf.gov "affordable housing providers"); does not automatically apply to market-rate landlords.
- **Exemptions**: Market-rate rentals (subject instead to state FEHA regs 2 CCR §12266 et seq.); federally mandated exclusions (e.g., lifetime sex-offender registration where required).
- **Effective date**: Ord. 17-14 (File 131192) approved 2014-02-14, effective 2014-03-16, **operative 2014-08-13**; amended Ord. (File 171170) passed 2018-04-03, operative 2018-10-01 (amending §§4903, 4904, 4906, 4909, 4911); amended Ord. 128-26, effective 2026-08-10 (penalty increases; out-of-state records rule).
- **Penalty / remedy**: HRC complaint within 60 days of violation; administrative penalties and liquidated damages (increased by Ord. 128-26; amounts not located); anti-retaliation.
- **Interaction with state law**: Layered on FEHA criminal-history regulations (2020) and Civ. Code §1785 et seq.; SF is stricter (7-year bar, application-stage ban) for covered affordable housing.
- **Citation**: S.F. Police Code Art. 49, §§4901–4920 (esp. §4903 definitions, §4906 housing procedures, §4907(b)); S.F. Admin. Code Ch. 12T (City contractors)
- **Source doc id**: D078 (HRC landing page); sf.gov FCO housing page (NOT IN CORPUS for details)
- **Source URL**: https://sf-hrc.org/fair-chance-ordinance ; https://www.sf.gov/information--affordable-housing-protections-people-criminal-history
- **Quoted span** (D078): "San Francisco's Fair Chance Ordinance protects residents with arrest or conviction history in affordable housing decisions." Online (NOT IN CORPUS): "The housing provider may not ask about any criminal history information on a rental application form."
- **Confidence**: 0.85 (coverage definition of "Affordable Housing" not quoted verbatim — amlegal blocked)
- **Notes**: D078 captured only the HRC homepage, not the FCO detail page; substantive rules come from sf.gov. Exact §4903 definition of covered housing should be verified against Police Code.
- **Address-lookup facts needed**: Whether the property is affordable/City-funded/BMR housing (covered) vs market-rate (not covered).

### SF-SCR-2
- **Rule ID**: SF-SCR-2
- **Jurisdiction**: San Francisco, CA · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force
- **Title**: Source-of-income discrimination and income-standard rules (Police Code Art. 33, §3304)
- **Requirement**: Landlords may not refuse to rent, impose different terms, or advertise preferences based on source of income (all lawful income and rental assistance incl. federal/state/local/nonprofit subsidies, homeless assistance, security-deposit assistance programs, and "any requirement of any such program"); may not use an income standard that ignores rent portions paid by third parties/subsidies (must count them the same as tenant-paid rent) or that ignores aggregate income of co-residents and cosigners.
- **Key value**: Income test must be applied to tenant's share only when subsidy pays part of rent; co-tenant/cosigner income aggregated.
- **Coverage conditions**: All housing transactions in SF.
- **Exemptions (§3304(c))**: Owner-occupied housing where owner shares bathroom or kitchen with tenant, or the structure contains fewer than three dwelling units.
- **Effective date**: §3304 source-of-income added Ord. 251-98 (1998-07-31); amendments through Ord. 222-02 (2002-11-15).
- **Penalty / remedy**: HRC complaint; civil action under Art. 33 enforcement sections (§§3306–3308; treble/one-month-rent damages reported in older code copies — not verified verbatim).
- **Interaction with state law**: Pre-dates and is broader than FEHA §12955(p) (SB 329, 2020); SB 267 (2024) alternative-evidence rule layers on.
- **Citation**: S.F. Police Code §3304(a) (prohibition), §3304(b) (prohibited economic discrimination), §3304(c) (exceptions)
- **Source doc id**: none in corpus; amlegal §3304 (online, via proxy)
- **Source URL**: https://codelibrary.amlegal.com/codes/san_francisco/latest/sf_police/0-0-0-7119
- **Quoted span**: NOT IN CORPUS. Online: "use a financial or income standard for the rental of housing" (§3304(b)).
- **Confidence**: 0.8
- **Address-lookup facts needed**: Owner-occupancy and shared facilities; number of units in structure (<3 exemption).

## Category 6: algorithmic_rent_setting

### SF-ALG-1
- **Rule ID**: SF-ALG-1
- **Jurisdiction**: San Francisco, CA · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: in_force
- **Title**: Ban on sale and use of algorithmic devices to set rents or occupancy levels (Admin. Code §37.10C) — effective 2024-10-14; enforcement expanded 2025-10-06
- **Requirement**: It is unlawful to sell, license or otherwise provide to San Francisco landlords any algorithmic device that sets, recommends or advises on rents or occupancy levels for residential units in the City (§37.10C(a)), and unlawful for a landlord to use such a device when setting rents or occupancy (§37.10C(b)). "Algorithmic device" = software (revenue-management software) that uses algorithms to process non-public competitor data (actual rents, occupancy, lease dates, whether anonymized or not) to advise whether to leave a unit vacant or what rent to charge. Each month and each unit is a separate violation.
- **Key value**: Civil penalties up to $1,000 per violation (per unit, per month) plus damages, restitution, injunction, mandatory attorney fees.
- **Coverage conditions**: All residential dwelling units in SF (not limited to rent-controlled); applies to vendors and landlords.
- **Exemptions (§37.10C(c))**: (A) reports that publish existing rental data in aggregated form without recommending future rents/occupancy; (B) tools used to establish rent or income limits under governmental affordable-housing guidelines; general property-management software not using non-public competitor data.
- **Effective date**: Ord. No. 224-24 (Board File 240766; sponsors Peskin, Chan) — effective **2024-10-14**; amended by Ord. No. 169-25 (File 240796) effective **2025-10-06** (adds tenants' rights nonprofits as enforcers).
- **Penalty / remedy**: City Attorney civil action (damages, injunction, restitution of illegal profits, civil penalties ≤$1,000/violation, fees/costs); tenant civil action for (b) violations (injunctive relief, damages, penalties ≤$1,000/violation, mandatory fees — lease clauses limiting fee recovery unenforceable); 501(c)(3)/(c)(4) tenants' rights organizations may sue (from 2025-10-06); tenant need only show use of prohibited device, not collusion.
- **Interaction with state law**: Layered on Cartwright Act as amended by AB 325 (eff. 2026-01-01); local ban is stricter (no agreement/collusion element). RealPage v. Berkeley (1st Amendment) litigation settled 2026 after Berkeley paused its ordinance — SF's ban not reported enjoined.
- **Citation**: S.F. Admin. Code §37.10C (a)–(f); Ord. 224-24; Ord. 169-25
- **Source doc id**: D081
- **Source URL**: https://www.sf.gov/news/new-law-prohibits-algorithmic-devices-used-set-rents-san-francisco ; https://www.sf.gov/information--sec-3710c-use-and-sale-algorithmic-devices-prohibited
- **Quoted span** (D081): "adding Section 37.10C to the Rent Ordinance went into effect on October 14, 2024." … "The law prohibits the sale or use of such algorithmic devices and allows a tenant or the City Attorney to bring a civil action if they believe an entity is in violation of the law."
- **Confidence**: 0.95
- **Address-lookup facts needed**: None property-specific (city-wide, all residential units); operator's software vendor/data inputs.

---

# PART 3 — SANTA ANA, CA (city)

Context: Rent Stabilization and Just Cause Eviction ordinances first adopted by Council 2021-10-19, effective **2021-11-19** (D085). Re-enacted/consolidated by the voters as **Ordinance No. NS-3073 (Measure CC)**, codified at SAMC Ch. 8, Art. XIX, §§8-3100–8-3200 (full text fetched; effective 10 days after Council certification of the 2024-11-05 election, i.e., ~December 2024 — exact certification date not verified). Current text is the operative source for section numbers below.

## Category 1: rent_increase_limits

### SA-RENT-1
- **Rule ID**: SA-RENT-1
- **Jurisdiction**: Santa Ana, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Rent cap — lesser of 3% or 80% of CPI change, once per 12 months; current maximum 2.87% (9/1/2026–8/31/2027)
- **Requirement**: Rent increases on covered residential real property or mobilehome spaces may not exceed the lesser of 3% or 80% of the 12-month change in CPI-U (Los Angeles-Long Beach-Anaheim, not seasonally adjusted), and no more than one increase in any 12-month period; if CPI is negative, no increase is permitted. The City announces the allowable percentage by June 30 each year, effective September 1. A violation occurs upon service of a notice/demand for a prohibited increase.
- **Key value**: 2.87% for 2026-09-01 → 2027-08-31. Formula: min(3%, 0.8 × CPI).
- **Coverage conditions**: Rental units with CO on or before 1995-02-01; mobilehome spaces first offered before 1990-01-01; registration must be complete and accurate (§8-3148(d)); required notices given (§8-3149); property maintained habitable (§8-3148(b)).
- **Exemptions (§8-3147)**: CO issued after 1995-02-01 (Costa-Hawkins §1954.52(a)(1)); other Costa-Hawkins exemptions; mobilehome spaces under >1-year leases, newly constructed spaces first offered on/after 1990-01-01, non-primary-residence mobilehomes not leased out (MRL); TPA §1947.12(d) exemptions: deed-restricted/subsidized affordable housing; school/college dormitories; housing with CO within previous 15 years; separately alienable SFH/condos where owner is not a REIT/corporation/LLC-with-corporate-member AND tenant received the prescribed written exemption notice (mandatory in lease for tenancies commenced/renewed after effective date); owner-occupied duplex (owner occupied one unit at tenancy start and continues; neither unit an ADU/JADU). Fair Return Petition (§8-3142) and Capital Improvement Petition (§8-3143) allow increases above cap.
- **Effective date**: 2021-11-19 (original ordinance); first allowable % published by 2021-11-19; NS-3073 (Measure CC) re-enactment ~Dec 2024; current % effective 2026-09-01.
- **Penalty / remedy**: Administrative citation first (SAMC §1-21 et seq.), then misdemeanor/infraction (§1-8); civil action for damages by any aggrieved person incl. City (preponderance; no exhaustion) (§8-3200(b)); injunctive relief (§8-3200(c)); tenant petition to Program Administrator within 30 days of increase notice (§8-3144); increase ineffective if non-compliant (§8-3148); public nuisance, each day a separate offense (§8-3200(e)).
- **Interaction with state law**: Stricter than and displaces Civ. Code §1947.12 for covered units (§1947.12(d)/(h)); Costa-Hawkins and Mobilehome Residency Law (Civ. Code §798 et seq.) prevail on conflict (§8-3104, §8-3147).
- **Citation**: Santa Ana Mun. Code Ch. 8, Art. XIX, Div. 3, §8-3140 (prohibited increases), §8-3141 (reasonable return), §8-3147 (exemptions), §8-3148 (increase ineffective), §8-3149 (notice); Ord. No. NS-3073
- **Source doc id**: D084, D085
- **Source URL**: https://santa-ana.gov/departments/rent-stabilization ; https://santa-ana.gov/santa-ana-city-council-adopts-rent-stabilization-and-just-cause-eviction-ordinances-effective-nov-19
- **Quoted span** (D084): "2.87 percent is the maximum allowable rent increase for the period of September 1, 2026 through August 31, 2027." ; (D085): "Increase in residential rents are limited to the lower of 3% per year, or 80% of the percent change in the Consumer Price Index over the most recent 12-month period. If the CPI is negative, no rent increase is permitted." ; (D085): "The rent cap does not apply to residential buildings constructed after February 1, 1995, or to mobile home spaces offered for rent after January 1, 1990."
- **Confidence**: 0.95
- **Address-lookup facts needed**: CO date (1995 build year alone → unknown; need before/after 1995-02-01); CO within last 15 years (rolling); SFH/condo separately alienable + owner entity type + exemption notice in lease; owner-occupied duplex status; mobilehome lease term/space age; registration status; last increase date.

### SA-RENT-2
- **Rule ID**: SA-RENT-2
- **Jurisdiction**: Santa Ana, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Rental Registry and Rental Registry Fee pass-through — registration required before any increase; fee $100/$104 per unit; up to 50% ($50/yr) passable in 12 monthly installments
- **Requirement**: All landlords with covered rental units must register each unit annually by July 1 (initial, change of ownership within 30/60 days, re-registration after vacancy within 30 days, annual claim of exemption with documentation by July 1 or unit is deemed covered) and pay the annual Rental Registry Fee; after timely payment the landlord may pass through up to 50% of the fee in 12 equal monthly installments, shown separately from rent and excluded from the rent base; no pass-through for deed-restricted/subsidized tenants; overcharges must be reimbursed; delinquent landlords may not pass through fee or penalties.
- **Key value**: Fee $100.00/unit (paid 6/1–7/31/2026) or $104.00 (8/1/2026–6/30/2027); max tenant pass-through $50/yr; late penalties 8.2% (Oct), 18.2% (Nov), 28.2% (Dec–Jun).
- **Coverage conditions**: All rental units subject to Art. XIX.
- **Exemptions**: Exempt units must still file annual claim of exemption; no pass-through to subsidized/deed-restricted tenants (§8-3161(d)(1)).
- **Effective date**: Registry and fee effective 2023-07-01; enforcement from 2023-10-01.
- **Penalty / remedy**: No landlord may advertise, demand/accept rent, evict, petition, or impose increases if registration incomplete/inaccurate (§8-3160(k)); fee and penalties are a debt to the City; §8-3200 remedies.
- **Interaction with state law**: Local administrative requirement; no state counterpart.
- **Citation**: Santa Ana Mun. Code §8-3160 (registry), §8-3161 (fee and pass-through), §8-3148(d)
- **Source doc id**: D084
- **Source URL**: https://santa-ana.gov/departments/rent-stabilization
- **Quoted span** (D084): "If a landlord charges a tenant a pass-through fee greater than $50, the landlord shall reimburse the tenant for the registration fee pass-through overpayment." … "The Rent Stabilization and Just Cause Ordinance allows, but does not require, landlords to charge the pass-through fee."
- **Confidence**: 0.9
- **Address-lookup facts needed**: Registration status in Rental Registry; fee payment date; subsidy status of tenant.

### SA-RENT-3
- **Rule ID**: SA-RENT-3
- **Jurisdiction**: Santa Ana, CA · **Level**: city · **Category**: rent_increase_limits
- **Status**: in_force
- **Title**: Landlord petitions for increases above cap — Fair Return Petition and Capital Improvement pass-through (≤10% of current rent, amortized)
- **Requirement**: A landlord may petition the Program Administrator for a rent increase above the cap to obtain a fair and reasonable return (13 enumerated factors, §8-3142) or for a capital-improvement pass-through for improvements completed and paid for after 2021-11-19 (useful life ≥5 years; petition within 2 years of completion; amortized; pass-through ≤10% of current rent; excluded from rent base; not for new tenants whose initial rent was set after completion; no "use fee" equipment). Hearing within 60 days; appeal to Rental Housing Board within 30 days; judicial review within 30 days. No petition allowed while landlord is out of compliance or unit uninhabitable.
- **Key value**: Capital improvement pass-through ≤10% of rent; petitions available from 2023-07-01.
- **Coverage conditions**: Covered rental units; tenant may respond; tenant petitions also available (excess increase, reduced services, habitability, improper pass-through).
- **Exemptions**: N/A.
- **Effective date**: 2023-07-01 (petition provisions).
- **Penalty / remedy**: Board/Hearing Officer decisions; §8-3200.
- **Interaction with state law**: Fair-return mechanism required by constitutional takings jurisprudence; local.
- **Citation**: Santa Ana Mun. Code §8-3142, §8-3143, §8-3144, §8-3145, §8-3185
- **Source doc id**: D084, D085
- **Source URL**: https://santa-ana.gov/departments/rent-stabilization
- **Quoted span** (D084): "Both landlords and tenants may submit official petitions to request rent adjustments, report violations, or contest unauthorized pass-through costs." ; (D085): "Any owner of residential rental property or a mobile home park may petition for relief from the cap, but will need to provide evidence that a rate increase in excess of the annual allowance is necessary to provide a fair and reasonable return for their property."
- **Confidence**: 0.9
- **Address-lookup facts needed**: Capital improvement completion dates/costs; current rent; existing pass-throughs.

## Category 2: just_cause_eviction

### SA-JC-1
- **Rule ID**: SA-JC-1
- **Jurisdiction**: Santa Ana, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Just cause required after 30 days of occupancy — at-fault and no-fault grounds, cure notice, exemptions (SAMC §8-3120)
- **Requirement**: After a tenant has continuously and lawfully occupied residential real property for 30 days, the owner may not terminate the tenancy without just cause stated in the written notice. At-fault causes: default in rent; breach of material lease term after written notice (not including added dependents under 18 or one-for-one replacement tenants within housing code limits, or unilateral term changes); nuisance; waste; refusal to sign like-terms renewal; criminal activity/threats (reported to police; right to restore tenancy if acquitted/not charged); unlawful subletting (with deemed-approval rules); refusal of lawful entry; unlawful purpose; employee failure to vacate; failure to deliver possession after tenant's own notice. No-fault causes: owner/spouse/domestic partner/children/grandchildren/parents/grandparents intent to occupy ≥24 months (for post-effective-date leases only if tenant agrees in writing or lease allows; affidavit to City); withdrawal from rental market ≥24 months (affidavit); compliance with government/court order or local ordinance; demolition or substantial remodel (permit-required system replacement/hazmat abatement requiring ≥30-day vacancy; right of first refusal to return). Curable violations require a prior notice to cease/correct with specified content (right to reasonable accommodation, Program Administrator contact, specific facts). Owner must post City notice, give tenants written notice of rights (12-pt type; prescribed text) at tenancy start, on change of terms, and within 30 days of effective date for existing tenancies; notices in the negotiation language plus English.
- **Key value**: 30-day trigger (vs. AB 1482's 12 months); 24-month owner-occupancy/withdrawal commitment; notice copy to City within 5 days.
- **Coverage conditions**: All residential real property in Santa Ana (incl. post-1995 construction, SFH/condos unless exempt), mobilehome spaces subject to MRL termination rules excluded from §8-3120(a).
- **Exemptions (§8-3120(e))**: transient/tourist hotel occupancy (Civ. Code §1940(b)); nonprofit hospital, religious facility, extended care, licensed RCFE, adult residential facility; school/college dormitories; tenant shares bath/kitchen with owner-occupant; owner-occupied SFH renting ≤2 units/bedrooms (incl. ADU/JADU); owner-occupied duplex (owner in residence from tenancy start and continuing); housing with CO within previous 15 years; separately alienable property where owner is not REIT/corporation/LLC-with-corporate-member AND tenant given prescribed exemption notice (in lease for post-effective-date tenancies); deed-restricted/subsidized affordable housing.
- **Effective date**: 2021-11-19; re-enacted NS-3073 (~Dec 2024).
- **Penalty / remedy**: Failure to strictly comply renders termination notice void (§8-3120(d)(4)); complete affirmative defense in UD (§8-3200(d)); wrongful-eviction damages + prevailing-party costs and attorney fees; administrative citation → misdemeanor; civil action/injunction by any aggrieved person or City; defenses for DV/abuse victims (§8-3120(g)) and school-age residents during school term (§8-3120(h)); retaliation and 16-item anti-harassment prohibitions (§8-3122); waivers void.
- **Interaction with state law**: More protective than Civ. Code §1946.2 (30-day vs 12-month trigger; broader coverage), permitted by §1946.2(g)(1)(B); mirrors TPA ground structure; MRL (§798.56) controls mobilehome terminations.
- **Citation**: Santa Ana Mun. Code Ch. 8, Art. XIX, Div. 2, §8-3120 (just cause), §8-3121 (notice of termination), §8-3122 (retaliation/anti-harassment), §8-3200 (remedies); Ord. No. NS-3073
- **Source doc id**: D085, D084
- **Source URL**: https://santa-ana.gov/santa-ana-city-council-adopts-rent-stabilization-and-just-cause-eviction-ordinances-effective-nov-19
- **Quoted span** (D085): "After 30 days, an owner shall not terminate a tenancy without just cause, which shall be stated in a written notice." … "The Just Cause Ordinance shall not apply to certain types of residential property, including housing produced in the last 15 years; deed-restricted affordable housing; hotel and transient occupancy; hospital and care facilities; dormitories; and other shared living quarters." ; (D084): "Your landlord must have a valid reason to evict you. This could be for not paying rent, breaking the lease, or if the landlord wants to move into the property themselves."
- **Confidence**: 0.95 (full ordinance text reviewed)
- **Address-lookup facts needed**: CO date vs 15-year rolling window; owner-occupancy and shared facilities; SFH/condo separately alienable + owner entity + exemption notice; duplex owner-occupancy history; deed restrictions/subsidy; tenancy start date (30 days); lease date relative to effective date (owner-occupancy lease clause requirement).

### SA-JC-2
- **Rule ID**: SA-JC-2
- **Jurisdiction**: Santa Ana, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: No-fault relocation assistance — 3 months' rent (direct payment within 15 days) or written waiver of final 3 months' rent, regardless of tenant income
- **Requirement**: For any no-fault just-cause termination, the owner must, regardless of the tenant's income, either pay relocation assistance equal to three months of the rent in effect when the notice was issued (within 15 calendar days of service of the notice) or waive in writing the rent for the final three months before it becomes due; the termination notice must advise the tenant of this right and, if waiver is elected, state the amount waived. Amount is credited against relocation required by any other law; recoverable as damages if tenant holds over.
- **Key value**: 3 × monthly rent; 15-day payment deadline.
- **Coverage conditions**: Tenancies subject to §8-3120 just cause receiving a no-fault notice (owner occupancy, withdrawal, government order, demolition/substantial remodel).
- **Exemptions**: Tenant at fault for condition triggering a government order to vacate is not entitled to relocation (§8-3120(b)(2)(C)(ii)); exempt properties under §8-3120(e).
- **Effective date**: 2021-11-19.
- **Penalty / remedy**: Failure to strictly comply voids the notice (§8-3120(d)(4)); §8-3200 remedies.
- **Interaction with state law**: Triples AB 1482's one-month requirement (§1946.2(d)(3)); credited against other legally required relocation.
- **Citation**: Santa Ana Mun. Code §8-3120(d)
- **Source doc id**: D085, D084
- **Source URL**: https://santa-ana.gov/santa-ana-city-council-adopts-rent-stabilization-and-just-cause-eviction-ordinances-effective-nov-19
- **Quoted span** (D085): "Under a no-fault just cause termination, the owner shall either provide 3 months of relocation assistance or waive payment of rent for the final 3 months of the tenancy." ; (D084): "If your landlord evicts you for certain reasons, they might have to help pay for your moving costs."
- **Confidence**: 0.95
- **Address-lookup facts needed**: Current rent; notice date; ground for termination.

### SA-JC-3
- **Rule ID**: SA-JC-3
- **Jurisdiction**: Santa Ana, CA · **Level**: city · **Category**: just_cause_eviction
- **Status**: in_force
- **Title**: Termination-notice procedure — filing copy and proof of service with City via Rental Registry within 5 days; bilingual notice; no rent acceptance after termination
- **Requirement**: When terminating any tenancy (at-fault or no-fault) the owner must serve a written notice per Civ. Code §§1946–1946.5 stating at least one §8-3120(b) just cause, not accept rent beyond the terminated term, qualify the ground as at-fault/no-fault, submit a true copy of the notice and proof of service (under penalty of perjury) to the City through the Rental Registry portal within 5 days of service, and provide the notice in the negotiation language plus English. All rent-increase and eviction notices must also be provided to the City via the Registry (§8-3149(d)).
- **Key value**: 5-day filing deadline.
- **Coverage conditions**: Covered tenancies.
- **Exemptions**: §8-3120(e) exempt properties.
- **Effective date**: 2021-11-19 (Registry portal from 2023-07-01).
- **Penalty / remedy**: Affirmative defense; notice void; §8-3200.
- **Interaction with state law**: Procedural overlay on CCP §1161/§1162 and Civ. Code §1946 et seq.
- **Citation**: Santa Ana Mun. Code §8-3121; §8-3149(d); §8-3160(i)
- **Source doc id**: D084 (Registry reference); NS-3073 text (online)
- **Source URL**: https://santa-ana.gov/departments/rent-stabilization
- **Quoted span** (D084): "Access the Rental Registry" (corpus); Online (NS-3073 §8-3121(a)(4), NOT IN CORPUS): "The Owner has submitted to the City, within five (5) days after service of the notice of termination on the Tenant, a true and accurate copy of the Owner's written notice of termination"
- **Confidence**: 0.9
- **Address-lookup facts needed**: Registry account/registration status.

## Category 3: security_deposits

### SA-DEP-1 (no city rule)
- **Rule ID**: SA-DEP-1
- **Jurisdiction**: Santa Ana, CA · **Level**: city · **Category**: security_deposits
- **Status**: in_force (statement of absence)
- **Title**: No Santa Ana city rule on security deposits (amount, interest, or refund) — state Civ. Code §1950.5 governs
- **Requirement**: SAMC Art. XIX contains no deposit-interest or deposit-cap provision (full ordinance text reviewed: §§8-3100–8-3200). State law applies (1-month cap from 2024-07-01; 21-day refund; no interest requirement).
- **Key value**: none.
- **Interaction with state law**: State-only. Note §8-3122(b) anti-harassment and §8-3102 "Rent" definition do not address deposits.
- **Citation**: none (Civ. Code §1950.5)
- **Source doc id**: none; NS-3073 full text (online) confirms absence.
- **Quoted span**: N/A — NOT IN CORPUS (no rule).
- **Confidence**: 0.9
- **Address-lookup facts needed**: none.

## Category 4: application_screening_fees

### SA-FEE-1 (no city rule)
- **Rule ID**: SA-FEE-1
- **Jurisdiction**: Santa Ana, CA · **Level**: city · **Category**: application_screening_fees
- **Status**: in_force (statement of absence)
- **Title**: No Santa Ana city rule on rental application/screening fees — state Civ. Code §1950.6 governs
- **Requirement**: No SAMC provision regulates application fees.
- **Key value**: none.
- **Interaction with state law**: State-only.
- **Citation**: none (Civ. Code §1950.6)
- **Source doc id**: none. **Quoted span**: N/A — NOT IN CORPUS.
- **Confidence**: 0.85
- **Address-lookup facts needed**: none.

## Category 5: screening_restrictions

### SA-SCR-1 (no dedicated city rule; incidental provision noted)
- **Rule ID**: SA-SCR-1
- **Jurisdiction**: Santa Ana, CA · **Level**: city · **Category**: screening_restrictions
- **Status**: in_force (statement of absence, with incidental provision)
- **Title**: No Santa Ana tenant-screening ordinance (no fair-chance, source-of-income, or credit-history rule for applicants); anti-harassment clause bars discrimination incl. source of income against existing tenants
- **Requirement**: Santa Ana has no ordinance restricting applicant screening criteria. Within the RSJCEO anti-harassment section, an owner may not "Violate any law which prohibits discrimination based on race, gender, sexual preference, sexual orientation, ethnic background, nationality, religion, age, parenthood, marriage, pregnancy, disability, HIV/AIDS, occupancy by a minor child, or source of income" (§8-3122(b)(6)) and may not request immigration/citizenship status or SSN except as required by law or for tenancy qualification (§8-3122(b)(2)(H)) — these apply to tenancies in place, not pre-tenancy screening.
- **Key value**: none for applicants.
- **Coverage conditions**: §8-3122 applies to owners of residential real property under a rental agreement/tenancy.
- **Exemptions**: N/A.
- **Effective date**: 2021-11-19 (as amended).
- **Penalty / remedy**: §8-3200 civil action; administrative citation.
- **Interaction with state law**: FEHA (incl. source-of-income §12955(p)), 2 CCR §12266 criminal-history regs, Civ. Code §1785, SB 267 govern screening statewide.
- **Citation**: Santa Ana Mun. Code §8-3122(b)(6), (b)(2)(H) (incidental); no screening ordinance
- **Source doc id**: none in corpus for screening; NS-3073 text (online)
- **Quoted span**: N/A — NOT IN CORPUS. Online (NS-3073 §8-3122(b)(6)): "occupancy by a minor child, or source of income."
- **Confidence**: 0.85
- **Address-lookup facts needed**: none.

## Category 6: algorithmic_rent_setting

### SA-ALG-1
- **Rule ID**: SA-ALG-1
- **Jurisdiction**: Santa Ana, CA · **Level**: city · **Category**: algorithmic_rent_setting
- **Status**: in_force (adopted 2026-03-03; effective ~2026-04-02 — see conflicts)
- **Title**: Ban on sale, licensing, provision and use of algorithmic rent-setting devices for residential rentals (Ord. No. NS-3090, inferred)
- **Requirement**: Prohibits the sale, licensing, provision and use of algorithmic devices that set rental rates for residential rental property in Santa Ana using non-public competitor data (real-time rents, lease renewals/activity, occupancy levels). Tenants have a direct private right of action and need only show the prohibited software was used (no collusion proof); remedies include injunctive relief, damages, civil penalties up to $1,000 per violation, and attorney's fees. City to rely mainly on existing code enforcement.
- **Key value**: ≤$1,000 civil penalty per violation; private right of action.
- **Coverage conditions**: Residential rental property within Santa Ana city limits; vendors and landlords.
- **Exemptions**: Software relying solely on publicly available data; aggregate historical data; tools used to comply with affordable-housing program requirements.
- **Effective date**: First reading 2026-02-17 (unanimous; Voice of OC reports 6-0-1 with Mayor absent); second reading/final adoption **2026-03-03**; effective date not stated in any source located — California general-law default is 30 days after adoption → **~2026-04-02 (inferred, unverified)**. Ordinance number **NS-3090 inferred** (Municode shows code codified through NS-3089 adopted 2026-02-03 and later through NS-3097 adopted 2026-07-07); SAMC chapter/article not located.
- **Penalty / remedy**: Civil penalties up to $1,000 per violation; damages; injunction; attorney's fees; code enforcement (administrative citation).
- **Interaction with state law**: Complements AB 325 (Cartwright Act amendment, eff. 2026-01-01) and pending SB 384; local ban is stricter (no agreement element). Apartment Association of OC opposed, citing litigation risk (RealPage v. Berkeley).
- **Citation**: Santa Ana Ord. No. NS-3090 (inferred); Santa Ana Mun. Code chapter/section not confirmed
- **Source doc id**: D086 (link-only, OCBJ 2026-03-09), D087 (link-only, PublicCEO 2026-02-24); city release santa-ana.gov/anticompetitive-rent-setting-software (2026-02-20); Rent Stabilization Newsletter March 2026
- **Source URL**: https://www.ocbj.com/real-estate/santa-ana-bans-landlords-from-using-ai-apartment-rent-pricing-software/ ; https://www.publicceo.com/2026/02/santa-ana-city-council-continues-to-strengthen-tenant-protections-by-banning-anticompetitive-rent-setting-software/ ; https://santa-ana.gov/anticompetitive-rent-setting-software/
- **Quoted span**: **NOT IN CORPUS** (link-only). Online (PublicCEO/City release): "prohibits the sale, licensing, provision and use of certain algorithmic rent-setting software for residential rental properties." Online (City newsletter, March 2026): "Approved on March 3, 2026" … "may seek damages, injunctive relief, up to $1,000 per violation, and attorney's fees." Online (OCBJ): "Landlords caught using the banned software could be fined $1,000."
- **Confidence**: 0.8 on substance; 0.5 on ordinance number and exact effective date.
- **Notes / conflicts**: (1) Ordinance number NS-3090 is inferred from Municode codification sequence — verify against City Clerk. (2) Effective date not published; 30-day default assumed. (3) OCBJ frames the $1,000 as a fine via code enforcement; City/PublicCEO frame it as a civil penalty in tenant suits — both likely true (administrative citation + private action). (4) D084 (Sept 2026 city page) does not mention the algorithmic ordinance.
- **Address-lookup facts needed**: Property inside Santa Ana city limits; operator's pricing software and data inputs.

---

# SUMMARY TABLE

| City | rent_increase_limits | just_cause_eviction | security_deposits | application_screening_fees | screening_restrictions | algorithmic_rent_setting |
|---|---|---|---|---|---|---|
| Los Angeles | LA-RENT-1..5 (5; RENT-5 = no city rule for non-RSO) | LA-JC-1..6 (6) | LA-DEP-1 (interest, 3.03%); LA-DEP-2 (no cap rule) | LA-FEE-1 (no rule) | LA-SCR-1 (source of income, in force); LA-SCR-2 (fair chance, pending) | LA-ALG-1 (pending — motion only) |
| San Francisco | SF-RENT-1..3 (3) | SF-JC-1..5 (5) | SF-DEP-1 (interest 4.2%); SF-DEP-2 (no cap rule) | SF-FEE-1 (no rule) | SF-SCR-1 (Fair Chance housing); SF-SCR-2 (§3304 source of income) | SF-ALG-1 (in force 2024-10-14) |
| Santa Ana | SA-RENT-1..3 (3) | SA-JC-1..3 (3) | SA-DEP-1 (no rule) | SA-FEE-1 (no rule) | SA-SCR-1 (no rule; incidental) | SA-ALG-1 (in force; adopted 2026-03-03) |

# KEY CONFLICTS / OPEN QUESTIONS
1. **LA RSO formula ordinance effective date**: LAHD = 2026-02-02; AAGLA = 2026-01-24. Ordinance number 188,558 reported only by a third-party site. Council file number not located (CF 17-0102 is unrelated).
2. **LA 7/1/2026–6/30/2027 allowable increase**: LAHD publishes 3% although the 90%-CPI/1–4% formula nominally applies from that cycle.
3. **LA algorithmic ban**: only a motion (CF 24-1031, adopted 2025-02-04). No ordinance → status "pending".
4. **LA fair chance housing**: motion CF 22-0280 adopted 2024-04-09; no ordinance; file expiration 2026-04-09 — "pending" (possibly lapsed).
5. **D038** resolves to LAMC §§45.65–45.69 (source of income), not the RSO chapter; the RSO chapter on amlegal is bot-blocked, so LAMC §151 text is not quoted verbatim.
6. **SF Fair Chance covered-housing definition** (§4903 "Affordable Housing") not quoted verbatim (amlegal blocked); sf.gov confirms "affordable housing providers" scope.
7. **Santa Ana NS-3090** number and effective date inferred; SAMC section placement unknown. Original Oct 2021 ordinance numbers not verified (NS-3073 Measure CC is the current operative consolidated text).
8. **Santa Ana NS-3073 effective date** (~10 days after certification of 2024-11-05 election) not pinned to a day.
