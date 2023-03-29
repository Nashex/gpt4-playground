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
  const [focus, setFocus] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const { updateMessageContent, removeMessage, toggleMessageRole } =
    useOpenAI();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === content || id === undefined) return;

    updateMessageContent(id, e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "40px";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  React.useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "40px";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [content]);

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
      className={`flex cursor-pointer flex-row items-center border-b border-gray-300 p-4 transition-all ${
        highlight && "bg-gray-100"
      }`}
      onFocus={() => setFocus(true)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onBlur={() => setFocus(false)}
    >
      <div className="basis-3/12">
        <button
          className={`select-none rounded p-2 text-sm font-semibold text-gray-700 transition-all ${
            highlight && "bg-gray-300"
          }`}
          onClick={handleToggleRole}
        >
          {role.toUpperCase()}
        </button>
      </div>
      <div className="basis-8/12 items-center">
        <textarea
          className="text-md w-full resize-none rounded bg-transparent p-4 text-gray-700 focus:border-transparent focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          value={content}
          onChange={handleContentChange}
          placeholder={`Enter ${role} message here`}
          ref={textAreaRef}
        />
      </div>

      <div className="flex basis-1/12 justify-center">
        <button
          className={`focus:outline-none ${
            highlight ? "text-gray-300" : "text-transparent"
          } transition-all hover:text-gray-700`}
          onClick={handleRemove}
        >
          <MdOutlineCancel size={24} />
        </button>
      </div>
    </div>
  );
}
