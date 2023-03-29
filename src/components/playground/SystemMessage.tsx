import { useOpenAI } from "@/context/OpenAIProvider";
import React from "react";
import TextArea from "../input/TextArea";

type Props = {};

export default function SystemMessage({  }: Props) {
  const { updateSystemMessage } = useOpenAI();

  return (
    <TextArea
      title="System"
      className="basis-4/12"
      placeholder="You are a helpful assistant."
      onChange={(e) => updateSystemMessage(e.target.value)}
    />
  );
}
