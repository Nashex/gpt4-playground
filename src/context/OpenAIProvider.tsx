import { OpenAIChatMessage, OpenAIConfig } from "@/utils/OpenAI";
import React, { PropsWithChildren } from "react";

type Props = {};

const defaultContext = {
  systemMessage: undefined,
  messages: [] as OpenAIChatMessage[],
  config: {} as OpenAIConfig,
  updateSystemMessage: (content: string) => {},
  addMessage: () => {},
  removeMessage: (id: number) => {},
  toggleMessageRole: (id: number) => {},
  updateMessageContent: (id: number, content: string) => {},
  updateConfig: (newConfig: Partial<OpenAIConfig>) => {},
};

const OpenAIContext = React.createContext<{
  systemMessage?: { role: "system" } & OpenAIChatMessage;
  messages: OpenAIChatMessage[];
  config: OpenAIConfig;
  updateSystemMessage: (content: string) => void;
  addMessage: () => void;
  removeMessage: (id: number) => void;
  toggleMessageRole: (id: number) => void;
  updateMessageContent: (id: number, content: string) => void;
  updateConfig: (newConfig: Partial<OpenAIConfig>) => void;
}>(defaultContext);

export default function OpenAIProvider({ children }: PropsWithChildren<Props>) {
  const [ systemMessage, setSystemMessage ] = React.useState<
    { role: "system" } & OpenAIChatMessage
  >();
  const [ messages, setMessages ] = React.useState<OpenAIChatMessage[]>([
    {
      id: 0,
      role: "user",
      content: "",
    },
  ]);
  const [ config, setConfig ] = React.useState<OpenAIConfig>({
    model: "gpt-4",
    max_tokens: 256,
    temperature: 0.9,
    top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  const updateSystemMessage = (content: string) => {
    setSystemMessage({
      role: "system",
      content,
    });
  };

  const addMessage = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length,
        role:
          prev.length > 0
            ? prev[prev.length - 1].role === "user" ? "assistant" : "user"
            : "user",
        content: "",
      },
    ]);
  };

  const removeMessage = (id: number) => {
    setMessages((prev) => {
      return [ ...prev.filter((message) => message.id !== id) ];
    });
  };

  const toggleMessageRole = (id: number) => {
    setMessages((prev) => {
      const index = prev.findIndex((message) => message.id === id);
      if (index === -1) return prev;
      const message = prev[index];
      return [
        ...prev.slice(0, index),
        {
          ...message,
          role: message.role === "user" ? "assistant" : "user",
        },
        ...prev.slice(index + 1),
      ];
    });
  };

  const updateConfig = (newConfig: Partial<OpenAIConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...newConfig,
    }));
  };

  const updateMessageContent = (id: number, content: string) => {
    setMessages((prev) => {
      const index = prev.findIndex((message) => message.id === id);
      if (index === -1) return prev;
      const message = prev[index];
      return [
        ...prev.slice(0, index),
        {
          ...message,
          content,
        },
        ...prev.slice(index + 1),
      ];
    });
  };

  const value = React.useMemo(
    () => ({
      systemMessage,
      messages,
      config,
      updateSystemMessage,
      addMessage,
      removeMessage,
      toggleMessageRole,
      updateMessageContent,
      updateConfig,
    }),
    [ systemMessage, messages, config ]
  );

  return (
    <OpenAIContext.Provider value={value}>{children}</OpenAIContext.Provider>
  );
}

export const useOpenAI = () => React.useContext(OpenAIContext);
