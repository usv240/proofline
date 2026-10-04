// Thin wrapper around the Anthropic SDK: structured output parsing, refusal fallback, concurrency.
import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import type * as z from "zod/v4";

export const MODEL = process.env.ANTHROPIC_MODEL_PIPELINE ?? "claude-opus-5-5";
/** Laws pasted live on Bring your own: a faster, lower-cost model, since anyone can trigger it. */
export const BYO_MODEL = process.env.ANTHROPIC_MODEL_BYO ?? "claude-sonnet-5-5";

let client: Anthropic | null = null;
function getClient() {
  client ??= new Anthropic({ maxRetries: 5, timeout: 15 * 60 * 1000 });
  return client;
}

export interface CallMeta {
  model: string;
  input_tokens: number;
  output_tokens: number;
  cache_read: number;
  stop_reason: string | null;
}

export async function parseStructured<T extends z.ZodType>(args: {
  schema: T;
  system: string;
  user: string;
  effort?: "low" | "medium" | "high" | "xhigh" | "max";
  maxTokens?: number;
  model?: string;
}): Promise<{ data: z.infer<T> | null; meta: CallMeta }> {
  const res = await getClient().beta.messages.parse({
    model: args.model ?? MODEL,
    max_tokens: args.maxTokens ?? 32000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    // Instructions are identical across documents, so they are cached once and reused.
    system: [{ type: "text", text: args.system, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: args.user }],
    output_config: { format: betaZodOutputFormat(args.schema), effort: args.effort ?? "high" },
  });
  return {
    data: res.stop_reason === "refusal" ? null : (res.parsed_output as z.infer<T> | null),
    meta: {
      model: res.model,
      input_tokens: res.usage.input_tokens,
      output_tokens: res.usage.output_tokens,
      cache_read: res.usage.cache_read_input_tokens ?? 0,
      stop_reason: res.stop_reason,
    },
  };
}

export async function mapLimit<A, B>(items: A[], limit: number, fn: (a: A, i: number) => Promise<B>): Promise<B[]> {
  const out: B[] = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i], i);
    }
  });
  await Promise.all(workers);
  return out;
}
