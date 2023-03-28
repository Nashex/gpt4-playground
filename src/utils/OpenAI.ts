interface OpenAIChatMessage {
  role: "system" | "assistant" | "user";
  content: string;
}

export interface OpenAIRequest {
  model: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  messages: OpenAIChatMessage[];
}

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