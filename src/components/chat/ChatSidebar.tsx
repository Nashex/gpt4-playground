import Link from "next/link";
import React from "react";
import {
  MdAdd,
  MdDeleteOutline,
  MdColorLens,
  MdChatBubbleOutline,
  MdToken,
} from "react-icons/md";
import { useOpenAI } from "@/context/OpenAIProvider";
import { useAuth } from "@/context/AuthProvider";
import Github from "../misc/Github";

type Props = {};

export default function ChatSidebar({}: Props) {
  const { token, clearToken } = useAuth();
  const { conversations, clearConversations } = useOpenAI();

  const handleThemeChange = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = localStorage.theme === "dark" ? "light" : "dark";
  };

  const [dark, setDark] = React.useState(false);

  return (
    <div className="dark text-primary h-full max-h-screen md:fixed md:flex flex-col bg-gray-900 md:w-[260px] top-0 left-0">
      <div className="flex h-full flex-col p-2 items-stretch">
        <Link
          href="/"
          className="flex gap-3 items-center p-4 border hover:bg-gray-500/10 rounded border-white/20 transition-colors"
        >
          <MdAdd />
          New chat
        </Link>
        <div className="flex-1 overflow-y-auto mt-2 scrollbar-thin scrollbar-thumb-bg-secondary scrollbar-track-bg-tertiary scrollbar-thumb-rounded">
          <div className="gap-y-2 flex flex-col">
            {Object.keys(conversations).map((key) => (
              <Link
                key={key}
                href={`/chat/${key}`}
                className="relative flex gap-3 items-center p-4 hover:bg-gray-500/10 rounded transition-colors truncate"
              >
                <span>
                  <MdChatBubbleOutline />
                </span>
                {conversations[key][0]?.content}
                <div className="absolute h-full bg-gradient-to-l from-[rgb(var(--bg-primary))] to-transparent z-10  w-24 right-0 bottom-0" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col border-y border-white/10 py-2 gap-y-2">
          <div className="p-4 border-b pb-6 border-white/10">
            <h3 className="text-sm font-medium mb-2">YOUR API KEY</h3>
            <span className="relative flex gap-3 text-primary/80 items-center transition-colors whitespace-nowrap text-ellipsis overflow-hidden">
              {token || "No api key set"}
              <div className="absolute h-full bg-gradient-to-l from-[rgb(var(--bg-primary))] to-transparent z-10  w-24 right-0 bottom-0" />
            </span>
          </div>
          <button
            className="flex gap-3 items-center p-4 hover:bg-gray-500/10 rounded transition-colors"
            onClick={clearToken}
          >
            <MdToken />
            Clear Api Key
          </button>
          <button
            className="flex gap-3 items-center p-4 hover:bg-gray-500/10 rounded transition-colors"
            onClick={clearConversations}
          >
            <MdDeleteOutline />
            Clear Conversations
          </button>
          <button
            className="flex gap-3 items-center p-4 hover:bg-gray-500/10 rounded transition-colors"
            onClick={handleThemeChange}
          >
            <MdColorLens />
            {dark ? "Light" : "Dark"} mode
          </button>
        </div>

        <Github />
        <span className="text-center text-primary/80">Made with ❤️ by Nashex</span>
      </div>
    </div>
  );
}
