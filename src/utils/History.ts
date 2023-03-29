import { OpenAIChatMessage } from './OpenAI';
import { v4 as uuidv4 } from 'uuid';

// Store conversation in local storage
export const storeConversation = (id: string, messages: OpenAIChatMessage[]) => {
  const history = getHistory();
  id = id || uuidv4();
  localStorage.setItem('history', JSON.stringify({
    ...history,
    [id]: messages,
  }));
  return id;
}

// Get conversations from local storage
export const getHistory: () => Record<string, OpenAIChatMessage[]> = () => {
  const history = localStorage.getItem('history');
  return history ? JSON.parse(history) : {};
}

// Get a conversation from local storage
export const getConversation = (id: string) => {
  const history = getHistory();
  return history[id];
}

// Clear conversations from local storage
export const clearHistory = () => {
  localStorage.removeItem('history');
}