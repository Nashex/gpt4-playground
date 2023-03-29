import { useOpenAI } from "@/context/OpenAIProvider";
import { OpenAIChatMessage } from "@/utils/OpenAI";
import React from "react";
import { MdEdit, MdOutlineCancel, MdPerson, MdSmartToy } from "react-icons/md";

type Props = {
  message: OpenAIChatMessage;
};

export default function ChatMessage({ message: { id, role, content } }: Props) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      className={`flex cursor-pointer flex-row p-4 items-center transition-all ${
        role === "user" ? "bg-tertiary hover:bg-secondary/50" : "bg-secondary"
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-row items-center w-full max-w-4xl mx-auto">
        <div
          className={`h-10 w-10 flex items-center justify-center text-4xl transition-colors ${
            hover ? "text-stone-300" : "text-primary/20"
          }`}
        >
          {role === "user" ? <MdPerson /> : <MdSmartToy />}
        </div>
        <div className="basis-10/12 items-center">
          <p className="w-full resize-none text-primary p-4 focus:outline-none rounded text-md focus:ring-1 focus:ring-blue-600 focus:bg-white focus:border-transparent">
            {content}
          </p>
        </div>

        <div className="basis-2/12 flex justify-center">
          <button
            className={`focus:outline-none ${
              hover ? "text-stone-300" : "text-transparent"
            } hover:text-stone-500 transition-all`}
          >
            {/* <MdEdit size={24} /> */}
          </button>
        </div>
      </div>
    </div>
  );
}
