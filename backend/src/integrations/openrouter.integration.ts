import { env } from '../config/env';
import { fetchJson } from '../utils/http';

interface ChatCompletionResponse {
  choices: Array<{ message: { content: string } }>;
}

const SYSTEM_PROMPT =
  'You are a concise crypto market analyst. Give a short, engaging insight in 2-3 sentences. ' +
  'Be specific and actionable but neutral; do not give explicit financial advice.';

// OpenRouter free models are shared and frequently rate-limited (429) per model.
// We try the configured model first, then fall back through other free instruct
// models so a single throttled provider doesn't kill the feature.
const FALLBACK_MODELS = [
  'google/gemma-4-31b-it:free',
  'meta-llama/llama-3.2-3b-instruct:free',
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'google/gemma-4-26b-a4b-it:free',
];

async function callModel(model: string, prompt: string): Promise<string | null> {
  const data = await fetchJson<ChatCompletionResponse>(
    `${env.OPENROUTER_BASE_URL}/chat/completions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
        // Optional attribution headers recommended by OpenRouter.
        'HTTP-Referer': env.FRONTEND_URL,
        'X-Title': 'AI Crypto Advisor',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        max_tokens: 250,
        temperature: 0.7,
      }),
    },
    15000,
  );

  const text = data.choices[0]?.message?.content?.trim();
  return text && text.length > 0 ? text : null;
}

// Generates an AI insight, trying multiple free models. Returns null only when
// every model fails (so the caller serves a templated fallback insight).
export async function generateInsight(prompt: string): Promise<string | null> {
  if (!env.OPENROUTER_API_KEY) return null;

  const models = [...new Set([env.OPENROUTER_MODEL, ...FALLBACK_MODELS])];

  for (const model of models) {
    try {
      const text = await callModel(model, prompt);
      if (text) return text;
    } catch (error) {
      console.error(`OpenRouter model "${model}" failed:`, error instanceof Error ? error.message : error);
    }
  }

  console.error('OpenRouter: all models failed, using fallback insight.');
  return null;
}
