import { useOpenAI } from "@/context/OpenAIProvider";
import { OpenAIChatMessage } from "@/utils/OpenAI";
import React from "react";
import { MdOutlineCancel } from "react-icons/md";

type Props = {
  message: OpenAIChatMessage;
};

export default function PlaygroundMessage({
  message: { id, role, content },
}: Props) {
  const [ focus, setFocus ] = React.useState(false);
  const [ hover, setHover ] = React.useState(false);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const {
    updateMessageContent,
    removeMessage,
    toggleMessageRole,
  } = useOpenAI();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === content || id === undefined) return;

    updateMessageContent(id, e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "40px";
      textAreaRef.current.style.height = `${textAreaRef.current
        .scrollHeight}px`;
    }
  };

  React.useEffect(
    () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "40px";
        textAreaRef.current.style.height = `${textAreaRef.current
          .scrollHeight}px`;
      }
    },
    [ content ]
  );

  const handleRemove = () => {
    if (id === undefined) return;

    removeMessage(id);
  };

  const handleToggleRole = () => {
    if (id === undefined) return;

    toggleMessageRole(id);
  };

  const highlight = focus || hover;

  return (
    <div
      className={`flex cursor-pointer flex-row border-b border-gray-300 p-4 items-center transition-all ${highlight &&
        "bg-gray-100"}`}
      onFocus={() => setFocus(true)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onBlur={() => setFocus(false)}
    >
      <div className="basis-3/12">
        <button
          className={`text-sm font-semibold p-2 rounded text-gray-700 transition-all select-none ${highlight &&
            "bg-gray-300"}`}
          onClick={handleToggleRole}
        >
          {role.toUpperCase()}
        </button>
      </div>
      <div className="basis-8/12 items-center">
        <textarea
          className="w-full bg-transparent resize-none text-gray-700 p-4 focus:outline-none rounded text-md focus:ring-1 focus:ring-blue-600 focus:bg-white focus:border-transparent"
          value={content}
          onChange={handleContentChange}
          placeholder={`Enter ${role} message here`}
          ref={textAreaRef}
        />
      </div>

      <div className="basis-1/12 flex justify-center">
        <button
          className={`focus:outline-none ${highlight
            ? "text-gray-300"
            : "text-transparent"} hover:text-gray-700 transition-all`}
          onClick={handleRemove}
        >
          <MdOutlineCancel size={24} />
        </button>
      </div>
    </div>
  );
}
