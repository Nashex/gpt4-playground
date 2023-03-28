import { useOpenAI } from "@/context/OpenAIProvider";
import { OpenAIChatMessage } from "@/utils/OpenAI";
import React from "react";
import PlaygroundMessage from "./PlaygroundMessage";

type Props = {};

export default function PlaygroundMessages({  }: Props) {
  const { messages } = useOpenAI();

  return (
    <div className="flex flex-col m-4 p-4">
      {messages.map((message) => (
        <PlaygroundMessage key={message.id} message={message} />
      ))}
    </div>
  );
}
