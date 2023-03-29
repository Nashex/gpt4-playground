import React from "react";
import { useOpenAI } from "@/context/OpenAIProvider";
import { MdSend } from "react-icons/md";

type Props = {};

export default function ChatInput({}: Props) {
  const { addMessage, loading } = useOpenAI();

  const [input, setInput] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (loading) return;
    e.preventDefault();
    addMessage(input, true);
    setInput("");
  };

  return (
    <div className="fixed bottom-0 flex w-full md:w-[calc(100%-260px)] h-40 bg-gradient-to-t from-[rgb(var(--bg-secondary))] to-transparent">
      <form
        className="w-full h-full flex items-center justify-center mx-auto max-w-4xl p-4"
        onSubmit={handleSubmit}
      >
        <div className="bg-tertiary flex flex-row w-full shadow-xl overflow-clip rounded border border-stone-500/20">
          <input
            type="text"
            className="bg-tertiary border-none outline-none p-4 w-full text-primary"
            onChange={handleChange}
            value={input}
          />
          <button
            type="submit"
            className="p-4 rounded text-primary hover:bg-primary/50"
          >
            {loading ? (
              <div className="animate-spin border-b-2 w-5 h-5 rounded-full mx-auto border-white" />
            ) : (
              <MdSend />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
