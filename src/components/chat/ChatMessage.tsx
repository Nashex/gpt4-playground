import { useOpenAI } from "@/context/OpenAIProvider";
import { OpenAIChatMessage } from "@/utils/OpenAI";
import React from "react";
import { MdPerson, MdSmartToy } from "react-icons/md";
import AssistantMessageContent from "./AssistantMessageContent";
import UserMessageContent from "./UserMessageContent";

type Props = {
  message: OpenAIChatMessage;
};

export default function ChatMessage({ message: { id, role, content } }: Props) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      className={`flex cursor-pointer flex-row items-center p-4 transition-all ${
        role === "user" ? "bg-tertiary hover:bg-secondary/50" : "bg-secondary"
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="mx-auto flex w-full max-w-4xl overflow-x-auto flex-row justify-center items-center">
        <div
          className={`flex h-10 w-10 items-center justify-center text-4xl transition-colors ${
            hover ? "text-stone-300" : "text-primary/20"
          }`}
        >
          {role === "user" ? <MdPerson /> : <MdSmartToy />}
        </div>
        <div className="basis-10/12 items-center">
          <div className="text-md prose max-w-4xl w-full rounded p-4 text-primary dark:prose-invert prose-code:text-primary prose-pre:bg-transparent prose-pre:p-0">
            {role === "user" ? (
              <UserMessageContent content={content} />
            ) : (
              <AssistantMessageContent content={content} />
            )}
          </div>
        </div>

        <div className="flex basis-2/12 justify-center">
          <button
            className={`focus:outline-none ${
              hover ? "text-stone-300" : "text-transparent"
            } transition-all hover:text-stone-500`}
          >
            {/* <MdEdit size={24} /> */}
          </button>
        </div>
      </div>
    </div>
  );
}
