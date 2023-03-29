import Link from "next/link";
import React from "react";
import { MdAdd, MdLogout, MdDeleteOutline, MdColorLens } from "react-icons/md";

type Props = {};

export default function ChatSidebar({}: Props) {
  const handleThemeChange = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = localStorage.theme === "dark" ? "light" : "dark";
  };

  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setDark(localStorage.theme === "dark");
    }
  }, []);


  return (
    <div className="dark text-primary hidden h-full md:fixed md:flex flex-col bg-stone-900 md:w-[260px] top-0 left-0">
      <div className="flex h-full flex-col p-2 items-stretch">
        <div className="flex-1">
          <h1 className="p-2 text-2xl font-medium">
            <span className="text-stone-300 text-2xl font-medium">
              ShareGPT
            </span>{" "}
            Chat
          </h1>
          <div className="gap-y-2 flex flex-col">
            <Link
              href="/chat"
              className="flex gap-3 items-center p-4 border hover:bg-stone-500/10 rounded border-white/20 transition-colors"
            >
              <MdAdd />
              New chat
            </Link>
          </div>
        </div>

        <div className="flex flex-col border-t border-white/10 py-2">
          <button className="flex gap-3 items-center p-4 hover:bg-stone-500/10 rounded transition-colors">
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
