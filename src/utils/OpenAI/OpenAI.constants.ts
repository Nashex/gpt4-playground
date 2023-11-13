import { OpenAIModel } from "./OpenAI.types";

export const OpenAIChatModels: Record<string, OpenAIModel> = {
  "julep-ai/samantha-1-turbo": {
    id: "julep-ai/samantha-1-turbo",
    name: "Samantha 1 Turbo",
    maxLimit: 16384,
  },
};
