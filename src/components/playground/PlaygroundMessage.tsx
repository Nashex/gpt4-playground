import { useOpenAI } from "@/context/OpenAIProvider";
import { OpenAIChatMessage } from "@/utils/OpenAI";
import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { usePlayground } from "@/context/PlaygroundProvider";

type Props = {
  message: OpenAIChatMessage;
};

export default function PlaygroundMessage({
  message: { id, role, content },
}: Props) {
  const { showConversations } = usePlayground();
  const [focus, setFocus] = React.useState(false);
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
    const resize = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "40px";
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    };

    resize();

    // Handle the 300ms delay on showing the conversation
    const timeout = setTimeout(() => {
      resize();
    }, 300);
  }, [content, showConversations]);

  const handleRemove = () => {
    if (id === undefined) return;

    removeMessage(id);
  };

  const handleToggleRole = () => {
    if (id === undefined) return;

    toggleMessageRole(id);
  };

  return (
    <div
      className={`group flex cursor-pointer flex-row items-center border-b border-gray-300 p-4 transition-all hover:bg-gray-100 ${
        focus && "bg-gray-100"
      }`}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <div className="basis-3/12">
        <button
          className={`select-none rounded p-2 text-sm font-semibold text-gray-700 transition-all group-hover:bg-gray-100 ${
            focus && "bg-gray-300"
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
          className={`group-hover:text-gray-300 text-transparent transition-all focus:outline-none hover:text-gray-700`}
          onClick={handleRemove}
        >
          <MdOutlineCancel size={24} />
        </button>
      </div>
    </div>
  );
}
