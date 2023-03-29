import { clearHistory, getHistory, storeConversation } from "@/utils/History";
import { defaultConfig, OpenAIChatMessage, OpenAIConfig } from "@/utils/OpenAI";
import React, { PropsWithChildren, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthProvider";

const CHAT_ROUTE = "/";

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
  conversationId: "",
  conversations: {} as Record<string, OpenAIChatMessage[]>,
  clearConversations: () => {},
  clearConversation: () => {},
  loadConversation: (id: string, messages: OpenAIChatMessage[]) => {},
  toggleMessageRole: (id: number) => {},
  updateMessageContent: (id: number, content: string) => {},
  updateConfig: (newConfig: Partial<OpenAIConfig>) => {},
  submit: () => {},
  loading: false,
  error: "",
};

const OpenAIContext = React.createContext<{
  systemMessage: { role: "system" } & OpenAIChatMessage;
  messages: OpenAIChatMessage[];
  config: OpenAIConfig;
  updateSystemMessage: (content: string) => void;
  addMessage: (content?: string, submit?: boolean) => void;
  removeMessage: (id: number) => void;
  conversationId: string;
  conversations: Record<string, OpenAIChatMessage[]>;
  clearConversation: () => void;
  clearConversations: () => void;
  loadConversation: (id: string, messages: OpenAIChatMessage[]) => void;
  toggleMessageRole: (id: number) => void;
  updateMessageContent: (id: number, content: string) => void;
  updateConfig: (newConfig: Partial<OpenAIConfig>) => void;
  submit: () => void;
  loading: boolean;
  error: string;
}>(defaultContext);

export default function OpenAIProvider({ children }: PropsWithChildren) {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [systemMessage, setSystemMessage] = React.useState<
    { role: "system" } & OpenAIChatMessage
  >(defaultContext.systemMessage);
  const [messages, setMessages] = React.useState<OpenAIChatMessage[]>([]);
  const [config, setConfig] = React.useState<OpenAIConfig>(defaultConfig);
  const [conversations, setConversations] = React.useState<
    Record<string, OpenAIChatMessage[]>
  >({});
  const [conversationId, setConversationId] = React.useState<string>("");

  // Load conversation from local storage
  useEffect(() => {
    setConversations(getHistory() || {});
  }, []);

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

  const handleStoreConversation = useCallback(
    (messages: OpenAIChatMessage[]) => {
      if (messages.length === 0) return;

      let id = storeConversation(conversationId, messages);
      setConversationId(id);
      setConversations((prev) => ({ ...prev, [id]: messages }));

      if (router.pathname === CHAT_ROUTE) router.push(`/chat/${id}`);
    },
    [conversationId, messages]
  );

  useEffect(() => {
    handleStoreConversation(messages);
  }, [messages]);

  const loadConversation = (id: string, messages: OpenAIChatMessage[]) => {
    setConversationId(id);
    setMessages(messages);
  };

  const clearConversations = useCallback(() => {
    clearHistory();
    setMessages([]);
    setConversationId("");
    setConversations({});

    router.push("/");
  }, []);

  const clearConversation = () => {
    setMessages([]);
    setConversationId("");
  };

  const submit = useCallback(
    async (messages_: OpenAIChatMessage[] = []) => {
      if (loading) return;
      setLoading(true);

      messages_ = messages_.length ? messages_ : messages;

      try {
        const decoder = new TextDecoder();
        const { body, ok } = await fetch("/api/completion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

        if (!body) return;
        if (!ok)
          throw new Error(
            "Failed to fetch completion. Please check your API key and try again."
          );

        const reader = body.getReader();

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
      } catch (error: any) {
        setMessages((prev) => {
          return [
            ...prev,
            {
              id: prev.length,
              role: "assistant",
              content: error.message,
            },
          ];
        });
      }

      setLoading(false);
    },
    [config, messages, systemMessage, loading, token]
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
      conversationId,
      loadConversation,
      clearConversation,
      clearConversations,
      conversations,
      toggleMessageRole,
      updateMessageContent,
      updateConfig,
      submit,
      error,
    }),
    [
      systemMessage,
      messages,
      config,
      loading,
      addMessage,
      submit,
      conversationId,
      conversations,
      error,
      clearConversations,
    ]
  );

  return (
    <OpenAIContext.Provider value={value}>{children}</OpenAIContext.Provider>
  );
}

export const useOpenAI = () => React.useContext(OpenAIContext);
