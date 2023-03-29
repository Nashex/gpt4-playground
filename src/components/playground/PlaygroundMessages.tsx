import { useOpenAI } from "@/context/OpenAIProvider";
import React, { useEffect } from "react";
import AddMessage from "./AddMessage";
import PlaygroundMessage from "./PlaygroundMessage";

type Props = {};

export default function PlaygroundMessages({}: Props) {
  const { messages, loading, submit } = useOpenAI();
  const messageContainer = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainer.current) {
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
    <div className="md:grow flex flex-col grow justify-between overflow-hidden">
      <div
        className="flex flex-col items-stretch m-4 px-4 overflow-y-auto"
        ref={messageContainer}
      >
        {messages.map((message) => (
          <PlaygroundMessage key={message.id} message={message} />
        ))}
        <AddMessage />
      </div>

      <div className="mx-4 bg-white">
        <button
          className="bg-green-500 hover:bg-green-600 text-white m-4 p-2 w-[80px] rounded"
          onClick={submit}
        >
          {loading ? (
            <div className="animate-spin border-b-2 w-5 h-5 rounded-full mx-auto border-white" />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}
