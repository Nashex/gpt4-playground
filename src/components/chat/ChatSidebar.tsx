import { clearHistory, getHistory } from "@/utils/History";
import Link from "next/link";
import React from "react";
import {
  MdAdd,
  MdLogout,
  MdDeleteOutline,
  MdColorLens,
  MdChatBubbleOutline,
} from "react-icons/md";
import { useOpenAI } from "@/context/OpenAIProvider";

type Props = {};

export default function ChatSidebar({}: Props) {
  const { conversations, clearConversations } = useOpenAI();

  const handleThemeChange = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = localStorage.theme === "dark" ? "light" : "dark";
  };

  const [dark, setDark] = React.useState(false);

  return (
    <div className="dark text-primary hidden h-full max-h-screen md:fixed md:flex flex-col bg-stone-900 md:w-[260px] top-0 left-0">
      <div className="flex h-full flex-col p-2 items-stretch">
        <Link
          href="/chat"
          className="flex gap-3 items-center p-4 border hover:bg-stone-500/10 rounded border-white/20 transition-colors"
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
                className="relative flex gap-3 items-center p-4 hover:bg-stone-500/10 rounded transition-colors truncate"
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

        <div className="flex flex-col border-t border-white/10 py-2">
          <button
            className="flex gap-3 items-center p-4 hover:bg-stone-500/10 rounded transition-colors"
            onClick={clearConversations}
          >
            <MdDeleteOutline />
            Clear Conversations
          </button>
          <button
            className="flex gap-3 items-center p-4 hover:bg-stone-500/10 rounded transition-colors"
            onClick={handleThemeChange}
          >
            <MdColorLens />
            {dark ? "Light" : "Dark"} mode
          </button>
          <button className="flex gap-3 items-center p-4 hover:bg-sky-500/10 rounded transition-colors">
            <MdLogout />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
