import { OpenAIChatMessage, OpenAIConfig, OpenAISystemMessage } from "./OpenAI";
import { v4 as uuidv4 } from "uuid";

const HISTORY_KEY = "pg-history";

// Types
export type Conversation = {
  name: string,
  lastMessage: number, // Unix timestamp

  systemMessage: OpenAISystemMessage,
  messages: OpenAIChatMessage[],
  config: OpenAIConfig,
}

export type History = Record<string, Conversation>;

// Store conversation in local storage
export const storeConversation = (
  id: string,
  conversation: Conversation
) => {
  const history = getHistory();
  id = id || uuidv4();
  localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify({
      ...history,
      [id]: conversation,
    })
  );
  return id;
};

// Get conversations from local storage
export const getHistory: () => History = () => {
  const history = localStorage.getItem(HISTORY_KEY);
  return history ? JSON.parse(history) : {};
};

// Get a conversation from local storage
export const getConversation = (id: string) => {
  const history = getHistory();
  return history[id];
};

// Clear conversations from local storage
export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};
