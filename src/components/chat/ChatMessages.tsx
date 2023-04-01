import { useOpenAI } from "@/context/OpenAIProvider";
import React, { useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ChatPlaceholder from "./ChatPlaceholder";

type Props = {};

export default function ChatMessages({}: Props) {
  const { messages, submit } = useOpenAI();
  const messageContainer = React.useRef<HTMLDivElement>(null);
  const [scrolling, setScrolling] = React.useState(false);
  const [prevMessageLength, setPrevMessageLength] = React.useState(0);

  // Scroll handling for auto scroll
  useEffect(() => {
    const handleScroll = () => {
      if (messageContainer.current) {
        if (
          messageContainer.current.scrollTop <
          messageContainer.current.scrollHeight -
            messageContainer.current.offsetHeight
        ) {
          setScrolling(true);
        } else {
          setScrolling(false);
        }
      }
    };

    if (messageContainer.current) {
      messageContainer.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (messageContainer.current) {
        messageContainer.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (messages.length != prevMessageLength) {
      setPrevMessageLength(messages.length);
    }

    if (
      messageContainer.current &&
      (!scrolling || messages.length != prevMessageLength)
    ) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
  }, [messages, scrolling]);

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
        className="relative flex flex-1 flex-col overflow-auto border-b bg-tertiary pb-[10rem] scrollbar scrollbar-w-3 scrollbar-thumb-[rgb(var(--bg-primary))] scrollbar-track-[rgb(var(--bg-secondary))] scrollbar-thumb-rounded-full"
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
