import Link from "next/link";
import React from "react";
import {
  MdAdd,
  MdDeleteOutline,
  MdColorLens,
  MdChatBubbleOutline,
  MdToken,
  MdBuild,
} from "react-icons/md";
import { useOpenAI } from "@/context/OpenAIProvider";
import { useAuth } from "@/context/AuthProvider";
import Github from "../misc/Github";

type Props = {};

export default function ChatSidebar({}: Props) {
  const { token, clearToken } = useAuth();
  const { conversations, clearConversations } = useOpenAI();
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.theme === "dark") {
      setDark(true);
    } else {
      setDark(false);
    }
  }, []);

  const handleThemeChange = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = localStorage.theme === "dark" ? "light" : "dark";
    setDark(!dark);
  };

  return (
    <div className="dark left-0 top-0 h-full max-h-screen flex-col bg-gray-900 text-primary md:fixed md:flex md:w-[260px]">
      <div className="flex h-full flex-col items-stretch p-2">
        <Link
          href="/"
          className="flex items-center gap-3 rounded border border-white/20 p-4 transition-colors hover:bg-gray-500/10"
        >
          <MdAdd />
          New chat
        </Link>
        <div className="scrollbar-thumb-rounded mt-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-track-bg-tertiary scrollbar-thumb-bg-secondary">
          <div className="flex flex-col gap-y-2">
            {Object.keys(conversations).map((key) => (
              <Link
                key={key}
                href={`/chat/${key}`}
                className="relative flex items-center gap-3 truncate rounded p-4 transition-colors hover:bg-gray-500/10"
              >
                <span>
                  <MdChatBubbleOutline />
                </span>
                {conversations[key].name ||
                  conversations[key].messages[0].content}
                <div className="absolute bottom-0 right-0 z-10 h-full w-24  bg-gradient-to-l from-[rgb(var(--bg-primary))] to-transparent" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-2 border-y border-white/10 py-2">
          <div className="border-b border-white/10 p-4 pb-6">
            <h3 className="mb-2 text-sm font-medium">YOUR API KEY</h3>
            <span className="relative flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap text-primary/80 transition-colors">
              {token || "No api key set"}
              <div className="absolute bottom-0 right-0 z-10 h-full w-24  bg-gradient-to-l from-[rgb(var(--bg-primary))] to-transparent" />
            </span>
          </div>
          <Link
            className="flex items-center gap-3 rounded p-4 transition-colors hover:bg-gray-500/10"
            href="/playground"
          >
            <MdBuild />
            Playground
          </Link>
          <button
            className="flex items-center gap-3 rounded p-4 transition-colors hover:bg-gray-500/10"
            onClick={clearToken}
          >
            <MdToken />
            Clear Api Key
          </button>
          <button
            className="flex items-center gap-3 rounded p-4 transition-colors hover:bg-gray-500/10"
            onClick={clearConversations}
          >
            <MdDeleteOutline />
            Clear Conversations
          </button>
          <button
            className="flex items-center gap-3 rounded p-4 transition-colors hover:bg-gray-500/10"
            onClick={handleThemeChange}
          >
            <MdColorLens />
            {dark ? "Light" : "Dark"} mode
          </button>
        </div>

        <Github />
        <span className="text-center text-primary/80">
          Made with ❤️ by Nashex
        </span>
      </div>
    </div>
  );
}
