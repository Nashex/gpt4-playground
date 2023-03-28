import type { NextApiRequest, NextApiResponse } from 'next'
import { getOpenAICompletion } from '@/utils/OpenAI';
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
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  // Todo make this a parameter
  const systemMessage = "You are a helpful chatbot."

  const config = {
    max_tokens: 8192 - systemMessage.length - prompt.length,
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }

  const payload: OpenAIRequest = {
    model: "gpt-4",
    ...config,
    messages: [
      {
        role: "system",
        content: systemMessage
      },
      {
        role: "user",
        content: prompt
      }
    ]
  }

  try {
    const result = await getOpenAICompletion(payload);
    return res.status(200).json({ content: result });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }

}
