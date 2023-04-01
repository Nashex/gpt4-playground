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
    addMessage(input, true, "user");
    setInput("");
  };

  return (
    <div className="fixed bottom-0 flex h-40 w-full bg-gradient-to-t from-[rgb(var(--bg-secondary))] to-transparent md:w-[calc(100%-260px)]">
      <form
        className="mx-auto flex h-full w-full max-w-4xl items-center justify-center p-4"
        onSubmit={handleSubmit}
      >
        <div className="relative flex w-full flex-row rounded border border-stone-500/20 bg-tertiary shadow-xl">
          <input
            type="text"
            className="w-full border-none bg-tertiary p-4 text-primary outline-none"
            onChange={handleChange}
            value={input}
          />
          <button
            type="submit"
            className="rounded p-4 text-primary hover:bg-primary/50"
          >
            {loading ? (
              <div className="mx-auto h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
            ) : (
              <MdSend />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
