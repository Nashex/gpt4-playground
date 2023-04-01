import type { NextApiRequest, NextApiResponse } from "next";
import { defaultConfig, getOpenAICompletion } from "@/utils/OpenAI";
import { OpenAIRequest } from "@/utils/OpenAI";

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
  const {
    model,
    max_tokens,
    temperature,
    top_p,
    frequency_penalty,
    presence_penalty,
    messages,
  } = await req.json();

  if (!messages) {
    return new Response("Missing messages", { status: 400 });
  }

  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return new Response("Missing token", { status: 401 });
  }

  const config = {
    model: model || defaultConfig.model,
    max_tokens: max_tokens || defaultConfig.max_tokens,
    temperature: temperature || defaultConfig.temperature,
    top_p: top_p || defaultConfig.top_p,
    frequency_penalty: frequency_penalty || defaultConfig.frequency_penalty,
    presence_penalty: presence_penalty || defaultConfig.presence_penalty,
    stream: true,
    n: 1,
  };

  const payload: OpenAIRequest = {
    ...config,
    messages,
  };

  try {
    const stream = await getOpenAICompletion(token, payload);
    return new Response(stream);
  } catch (e: any) {
    return new Response(e.message || "Error fetching response.", { status: 500 });
  }
}
