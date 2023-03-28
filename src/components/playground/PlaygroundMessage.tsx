import { OpenAIChatMessage } from "@/utils/OpenAI";
import React from "react";

type Props = {
  message: OpenAIChatMessage;
};

export default function PlaygroundMessage({
  message: { id, role, content },
}: Props) {
  return (
    <div className="flex flex-row">
      <div>{role}</div>
      <div>{content}</div>
    </div>
  );
}
