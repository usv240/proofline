// Every "i" button's text lives here, so it can be reviewed and translated in one place.
// Shape: what it is, why it matters, optional learn-more link. Plain language, no legal advice.

export interface InfoText {
  title: string;
  body: string;
  learn?: string;
}

export const INFO = {
  disclaimer: {
    title: "Not legal advice",
    body: "Proofline explains what housing laws say. It does not know your full situation, so it cannot tell you what to do. For advice, contact legal aid or a tenant rights group.",
    learn: "/learn#help",
  },
  address: {
    title: "Real city, not mailing city",
    body: "We find the legal city, not just the mailing city. \"Dorchester\" is part of Boston, and \"Van Nuys\" is part of Los Angeles. The legal city decides which local laws apply.",
  },
  stack: {
    title: "Layers of law",
    body: "Housing law comes in layers: state and city. A city rule can be stronger than the state rule. We check every layer.",
    learn: "/learn#layers",
  },
  asof: {
    title: "As-of date",
    body: "Laws start, end and change on specific dates. Pick a date to see which rules apply on that day.",
  },
  "cat.rent_increase_limits": {
    title: "Rent increase limits",
    body: "Caps on how much rent can go up each year. Some cities have their own caps, and some states have a statewide cap.",
    learn: "/learn#rent_increase_limits",
  },
  "cat.just_cause_eviction": {
    title: "Just-cause eviction",
    body: "Rules that say a landlord needs a listed reason to end your tenancy. Some also require moving money when you are not at fault.",
    learn: "/learn#just_cause_eviction",
  },
  "cat.security_deposits": {
    title: "Security deposits",
    body: "Limits on how big a deposit can be, and how and when it must be returned.",
    learn: "/learn#security_deposits",
  },
  "cat.application_screening_fees": {
    title: "Application and screening fees",
    body: "Limits on what you can be charged to apply for a home.",
    learn: "/learn#application_screening_fees",
  },
  "cat.screening_restrictions": {
    title: "Screening restrictions",
    body: "Limits on what a landlord can use to turn you down, like a criminal record or a housing voucher.",
    learn: "/learn#screening_restrictions",
  },
  "cat.algorithmic_rent_setting": {
    title: "Algorithmic rent-setting",
    body: "Rules about software that sets or recommends rents using private data from competing landlords. Some cities ban it.",
    learn: "/learn#algorithmic_rent_setting",
  },
  "v.applies": {
    title: "Protects you",
    body: "This rule covers this home on the date shown. Tap \"Show proof\" to read the law's exact words.",
  },
  "v.unknown": {
    title: "Not sure yet",
    body: "This rule might cover this home. It depends on a fact public records do not include. We show which fact and how to check it.",
  },
  "v.superseded": {
    title: "Replaced by a stronger local rule",
    body: "A state rule covers this home, but a city rule on the same topic takes its place.",
  },
  "v.not_yet_effective": {
    title: "Starts later",
    body: "This law is passed, but it is not in force yet. We show the start date.",
  },
  "v.pending": {
    title: "Proposed, not law",
    body: "This is a bill or proposal. It does not apply unless it passes.",
  },
  "v.none": {
    title: "No rule at this level",
    body: "We checked this place and found no rule on this topic. For example, Massachusetts law does not allow cities to set rent control.",
  },
  proof: {
    title: "The proof",
    body: "The exact sentence from the law that supports this answer. A script checks that it appears word for word in the source.",
  },
  source: {
    title: "Where the text came from",
    body: "\"Official pack\" means the organizers' collection of official sources. \"Fetched by Proofline\" means a public page they listed as a link, retrieved once by us.",
  },
  confidence: {
    title: "Confidence",
    body: "How sure the system is that it read this rule correctly. Lower confidence means a person should double check.",
  },
  conflict: {
    title: "Possible conflict",
    body: "Two rules may disagree here, for example a new state law and an older city law. A person should review it. Proofline does not pick a winner.",
  },
  settle: {
    title: "One fact settles it",
    body: "The one fact that would turn \"Not sure yet\" into a clear answer, and how you can find it.",
  },
  units: {
    title: "Number of homes",
    body: "From the county assessor record when available. Otherwise from the official property description (for example \"6U\" means 6 units) or the official use band (\"5+ units\").",
  },
  "pf.form": {
    title: "Pre-Flight",
    body: "Describe a change before it happens. We check it against every rule for this home and show which ones allow or block it.",
  },
  "pf.allowed": {
    title: "Allowed",
    body: "Every rule we found for this home allows this change. We only check the six topics in this project.",
  },
  "pf.blocked": {
    title: "Not allowed",
    body: "At least one rule forbids this change. The quote shows which one.",
  },
  "pf.person": {
    title: "Needs a person",
    body: "We need a fact we do not have to decide. It could be allowed or not.",
  },
  "pf.facts": {
    title: "Building facts",
    body: "Optional. If you know these facts, add them. They are used for this check only and are never saved.",
  },
  watch: {
    title: "Law Watch",
    body: "New laws and proposals, and which homes they would affect. Each change waits for a person to approve it.",
  },
  "watch.radius": {
    title: "Affected homes",
    body: "The homes whose answer changes because of this law, on the dates shown.",
  },
  "watch.approve": {
    title: "Approve or reject",
    body: "A person must approve a law change before it is used in answers. Every decision is recorded in the audit log.",
  },
  byo: {
    title: "Bring your own",
    body: "Paste a new law, or upload your own list of addresses. Proofline reads it with the same steps it uses for everything else.",
  },
  audit: {
    title: "Audit log",
    body: "A record of every step, where each line is linked to the one before it, so any later edit is detected. Press Verify to check it.",
  },
  "metric.neg": {
    title: "Invented rules",
    body: "How often the system claimed a rule that does not exist. Tested on cases where the right answer is \"no rule\".",
  },
  "metric.cite": {
    title: "Quotes found in the source",
    body: "Share of rules backed by a quote found word for word in the source document.",
  },
  "metric.addresses": {
    title: "Addresses resolved",
    body: "Addresses placed in their legal city, by the US Census Geocoder or, if it could not match, by the mailing city.",
  },
  ai: {
    title: "AI off",
    body: "Every address answer is computed from tested rules, not written by a chatbot. The AI is only used to read new laws.",
  },
  note: {
    title: "A note you can send",
    body: "Plain text that quotes the rule and asks how a charge was calculated, or asks for a missing fact. It is a question, not a demand, and not legal advice. You decide whether and how to use it.",
  },
  apikeys: {
    title: "API keys",
    body: "A key lets another tool call Proofline with one header. Keys are signed tokens the server can check without storing anything. Read endpoints work without a key at a lower rate; reading new laws needs one because it spends model credits.",
  },
  receipt: {
    title: "Proof receipt",
    body: "A small file with a fingerprint (hash) of this answer: which rule set, which facts, which date, which results. Post it back later and Proofline recomputes the answer and tells you if anything changed or if the file was altered.",
  },
  missing: {
    title: "Missing public data",
    body: "Public records for some cities leave out the year built or the number of units. When a rule depends on them, we say so instead of guessing.",
  },
} satisfies Record<string, InfoText>;

export type InfoKey = keyof typeof INFO;
