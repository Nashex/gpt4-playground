import { useOpenAI } from "@/context/OpenAIProvider";
import React, { useEffect } from "react";
import AddMessage from "./AddMessage";
import PlaygroundMessage from "./PlaygroundMessage";

type Props = {};

export default function PlaygroundMessages({}: Props) {
  const { messages, loading, submit } = useOpenAI();
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
    <div className="flex grow flex-col justify-between overflow-hidden md:grow">
      <div
        className="m-4 flex flex-col items-stretch overflow-y-auto px-4"
        ref={messageContainer}
      >
        {messages.map((message) => (
          <PlaygroundMessage key={message.id} message={message} />
        ))}
        <AddMessage />
      </div>

      <div className="mx-4 bg-white">
        <button
          className="m-4 w-[80px] rounded bg-green-500 p-2 text-white hover:bg-green-600"
          onClick={submit}
        >
          {loading ? (
            <div className="mx-auto h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}
