import { OpenAIChatModels } from "./OpenAI.constants";

export interface OpenAIChatMessage {
  id?: number;
  role: "system" | "assistant" | "user";
  content: string;
}

export interface OpenAISystemMessage {
  role: "system";
  content: string;
}

export interface OpenAIConfig {
  model: keyof typeof OpenAIChatModels;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

export interface OpenAIModel {
  id: string;
  name: string;
  maxLimit: number;
}