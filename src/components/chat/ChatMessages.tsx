import { useOpenAI } from "@/context/OpenAIProvider";
import React, { useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ChatPlaceholder from "./ChatPlaceholder";

type Props = {};

export default function ChatMessages({}: Props) {
  const { messages, submit } = useOpenAI();
  const messageContainer = React.useRef<HTMLDivElement>(null);
  const [prevMessageLength, setPrevMessageLength] = React.useState(0);

  useEffect(() => {
    if (messages.length > prevMessageLength) {
      setPrevMessageLength(messages.length);
    }
    if (prevMessageLength != messages.length && messageContainer.current) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
  }, [messages]);

  // Command Enter to submit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.metaKey) {
        submit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [submit]);

  return (
    <div className="flex h-full w-full flex-col items-stretch md:pl-[260px]">
      <div
        className="relative flex flex-1 flex-col overflow-auto border-b bg-tertiary pb-[10rem]"
        ref={messageContainer}
      >
        {messages.length === 0 ? (
          <ChatPlaceholder />
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <hr className="border-b border-stone-400/20" />
          </>
        )}
      </div>
      <ChatInput />
    </div>
  );
}
