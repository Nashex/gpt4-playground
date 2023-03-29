import type { NextApiRequest, NextApiResponse } from 'next'
import { defaultConfig, getOpenAICompletion } from '@/utils/OpenAI';
import { OpenAIRequest } from '@/utils/OpenAI';

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY env var");
}

interface Response {
  content?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { max_tokens, temperature, top_p, frequency_penalty, presence_penalty, messages } = req.body;

  if (!messages) {
    return res.status(400).json({ error: "Missing messages" });
  }

  const config = {
    max_tokens: max_tokens || defaultConfig.max_tokens,
    temperature: temperature || defaultConfig.temperature,
    top_p: top_p || defaultConfig.top_p,
    frequency_penalty: frequency_penalty || defaultConfig.frequency_penalty,
    presence_penalty: presence_penalty || defaultConfig.presence_penalty,
  }

  const payload: OpenAIRequest = {
    model: "gpt-4",
    ...config,
    messages,
  }

  try {
    const result = await getOpenAICompletion(payload);
    return res.status(200).json({ content: result });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }

}
