export interface OpenAIChatMessage {
  id?: number;
  role: "system" | "assistant" | "user";
  content: string;
}

export interface OpenAIConfig {
  model: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

export const defaultConfig = {
  model: "gpt-4",
  temperature: 0.5,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: .6,
}

export type OpenAIRequest = {
  messages: OpenAIChatMessage[];
} & OpenAIConfig;

export const getOpenAICompletion = async (payload: OpenAIRequest) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  return data?.choices[0]?.message?.content || "";
}