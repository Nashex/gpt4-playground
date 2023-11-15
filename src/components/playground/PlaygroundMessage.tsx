import { useOpenAI } from "@/context/OpenAIProvider";
import { JulepAIChatMessageRole, OpenAIChatMessage } from "@/utils/OpenAI";
import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { usePlayground } from "@/context/PlaygroundProvider";

type Props = {
  message: OpenAIChatMessage;
};

function RoleSelect(props: {
  role: JulepAIChatMessageRole;
  onChange: (role: JulepAIChatMessageRole) => void;
}) {
  return (
    <select
      name="role"
      id="role"
      value={props.role}
      className="text-md w-full resize-none rounded bg-transparent p-1 text-gray-700 focus:border-transparent focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
      onChange={(e) => {
        props.onChange(e.target.value as JulepAIChatMessageRole);
      }}
    >
      <option value="user">User</option>
      <option value="assistant">Assistant</option>
      <option value="system">System</option>
    </select>
  );
}

function UserAssistantNameInput(props: {
  onChange: (name: string) => void;
  name: string;
}) {
  return (
    <input
      type="text"
      className="text-md w-full resize-none rounded bg-transparent p-1 text-gray-700 focus:border-transparent focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
      placeholder="Enter name"
      value={props.name}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    />
  );
}

function SystemNameSelect(props: {
  onChange: (name: string) => void;
  name: string;
}) {
  return (
    <select
      name="name"
      id="name"
      className="text-md w-full resize-none rounded bg-transparent p-1 text-gray-700 focus:border-transparent focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
      value={props.name.toLowerCase()}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    >
      <option value=""></option>
      <option value="information">Information</option>
      <option value="thought">Thought</option>
      <option value="situation">Situation</option>
      <option value="function_call">System</option>
      <option value="functions">System</option>
    </select>
  );
}

export default function PlaygroundMessage({
  message: { id, role, content, name = "" },
}: Props) {
  const { showConversations } = usePlayground();
  const [focus, setFocus] = React.useState(false);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const {
    updateMessageContent,
    removeMessage,
    updateMessageRole,
    updateMessageName,
  } = useOpenAI();

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

  const handleUpdateRole = (role: JulepAIChatMessageRole) => {
    if (id === undefined) return;

    updateMessageRole(id, role);
  };

  const handleUpdateName = (name: string) => {
    if (id === undefined) return;

    updateMessageName(id, name);
  };

  return (
    <div
      className={`group flex cursor-pointer flex-row items-center border-b border-gray-300 p-4 transition-all hover:bg-gray-100 ${
        focus && "bg-gray-100"
      }`}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <div className="basis-2/12">
        <RoleSelect onChange={(role) => handleUpdateRole(role)} role={role} />
      </div>
      <div className="basis-2/12">
        {role === "system" ? (
          <SystemNameSelect
            name={name}
            onChange={(name) => handleUpdateName(name)}
          />
        ) : (
          <UserAssistantNameInput
            name={name}
            onChange={(name) => handleUpdateName(name)}
          />
        )}
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
          className={`text-transparent transition-all group-hover:text-gray-300 hover:text-gray-700 focus:outline-none`}
          onClick={handleRemove}
        >
          <MdOutlineCancel size={24} />
        </button>
      </div>
    </div>
  );
}
