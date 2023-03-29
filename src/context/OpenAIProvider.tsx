import { defaultConfig, OpenAIChatMessage, OpenAIConfig } from "@/utils/OpenAI";
import React, { PropsWithChildren, useCallback } from "react";
import { flushSync } from "react-dom";

type Props = {};

const defaultContext = {
  systemMessage: {
    role: "system",
    content: "You are a helpful AI chatbot.",
  } as { role: "system" } & OpenAIChatMessage,
  messages: [] as OpenAIChatMessage[],
  config: defaultConfig as OpenAIConfig,
  updateSystemMessage: (content: string) => {},
  addMessage: () => {},
  removeMessage: (id: number) => {},
  toggleMessageRole: (id: number) => {},
  updateMessageContent: (id: number, content: string) => {},
  updateConfig: (newConfig: Partial<OpenAIConfig>) => {},
  submit: () => {},
  loading: false,
};

const OpenAIContext = React.createContext<{
  systemMessage: { role: "system" } & OpenAIChatMessage;
  messages: OpenAIChatMessage[];
  config: OpenAIConfig;
  updateSystemMessage: (content: string) => void;
  addMessage: (content?: string, submit?: boolean) => void;
  removeMessage: (id: number) => void;
  toggleMessageRole: (id: number) => void;
  updateMessageContent: (id: number, content: string) => void;
  updateConfig: (newConfig: Partial<OpenAIConfig>) => void;
  submit: () => void;
  loading: boolean;
}>(defaultContext);

export default function OpenAIProvider({ children }: PropsWithChildren<Props>) {
  const [loading, setLoading] = React.useState(false);
  const [systemMessage, setSystemMessage] = React.useState<
    { role: "system" } & OpenAIChatMessage
  >(defaultContext.systemMessage);
  const [messages, setMessages] = React.useState<OpenAIChatMessage[]>([]);
  const [config, setConfig] = React.useState<OpenAIConfig>(defaultConfig);

  const updateSystemMessage = (content: string) => {
    setSystemMessage({
      role: "system",
      content,
    });
  };

  const removeMessage = (id: number) => {
    setMessages((prev) => {
      return [...prev.filter((message) => message.id !== id)];
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

  const submit = useCallback(
    async (messages_: OpenAIChatMessage[] = []) => {
      if (loading) return;
      setLoading(true);

      messages_ = messages_.length ? messages_ : messages;

      try {
        const { body, ok } = await fetch("/api/completion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...config,
            messages: [systemMessage, ...messages_].map(
              ({ role, content }) => ({
                role,
                content,
              })
            ),
          }),
        });

        if (!ok) throw new Error("Failed to fetch");
        if (!body) return;

        const reader = body.getReader();
        const decoder = new TextDecoder();
        let done = false;

        const message = {
          id: messages_.length,
          role: "assistant",
          content: "",
        } as OpenAIChatMessage;

        setMessages((prev) => {
          message.id = prev.length;
          return [...prev, message];
        });

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          message.content += chunkValue;

          updateMessageContent(message.id as number, message.content);
        }
      } catch (error) {}
      setLoading(false);
    },
    [config, messages, systemMessage, loading]
  );

  const addMessage = useCallback(
    (content: string = "", submit_: boolean = false) => {
      setMessages((prev) => {
        const messages = [
          ...prev,
          {
            id: prev.length,
            role:
              prev.length > 0
                ? prev[prev.length - 1].role === "user"
                  ? "assistant"
                  : "user"
                : "user",
            content: content || "",
          } as OpenAIChatMessage,
        ];
        submit_ && submit(messages);
        return messages;
      });
    },
    [submit]
  );

  const value = React.useMemo(
    () => ({
      systemMessage,
      messages,
      config,
      loading,
      updateSystemMessage,
      addMessage,
      removeMessage,
      toggleMessageRole,
      updateMessageContent,
      updateConfig,
      submit,
    }),
    [systemMessage, messages, config, loading, addMessage, submit]
  );

  return (
    <OpenAIContext.Provider value={value}>{children}</OpenAIContext.Provider>
  );
}

export const useOpenAI = () => React.useContext(OpenAIContext);
