import type { NextApiRequest, NextApiResponse } from 'next'
import { defaultConfig, getOpenAICompletion } from '@/utils/OpenAI';
import { OpenAIRequest } from '@/utils/OpenAI';

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY env var");
}

export const config = {
  runtime: "edge",
};

interface Response {
  content?: string;
  error?: string;
}

export default async function handler(
  req: Request,
  res: NextApiResponse<Response>
) {
  const { max_tokens, temperature, top_p, frequency_penalty, presence_penalty, messages } = await req.json();

  if (!messages) {
    return new Response("Missing messages", { status: 400 });
  }

  const config = {
    max_tokens: max_tokens || defaultConfig.max_tokens,
    temperature: temperature || defaultConfig.temperature,
    top_p: top_p || defaultConfig.top_p,
    frequency_penalty: frequency_penalty || defaultConfig.frequency_penalty,
    presence_penalty: presence_penalty || defaultConfig.presence_penalty,
    stream: true,
    n: 1,
  }

  const payload: OpenAIRequest = {
    model: "gpt-4",
    ...config,
    messages,
  }

  const stream = await getOpenAICompletion(payload);
  return new Response(stream);
}
