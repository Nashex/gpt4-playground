import { useOpenAI } from "@/context/OpenAIProvider";
import { OpenAIChatMessage } from "@/utils/OpenAI";
import React, { useEffect } from "react";
import AddMessage from "./AddMessage";
import PlaygroundMessage from "./PlaygroundMessage";

type Props = {};

export default function PlaygroundMessages({}: Props) {
  const { messages } = useOpenAI();
  const messageContainer = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainer.current) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="grow max-h-screen flex flex-col justify-between">
      <div
        className="flex flex-col items-stretch m-4 p-4 overflow-y-auto"
        ref={messageContainer}
      >
        {messages.map((message) => (
          <PlaygroundMessage key={message.id} message={message} />
        ))}
        <AddMessage />
      </div>

      <div className="mx-4">
        <button className="bg-blue-500 text-white m-4 p-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
}
