import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { MdClose, MdToken } from "react-icons/md";

type Props = {
  className?: string;
};

export default function AddTokenModal({ className }: Props) {
  const { token, addToken, clearToken } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState(token);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClear = () => {
    clearToken();
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToken(input);
    setOpen(false);
  };

  return (
    <>
      <button
        className={`hidden rounded bg-green-500 p-4 text-white hover:bg-green-600 md:block ${className}`}
        onClick={() => setOpen(true)}
      >
        Add your API token
      </button>
      <button
        className={`flex items-center gap-x-1 rounded bg-green-500 p-4 text-white hover:bg-green-600 md:hidden ${className}`}
        onClick={() => setOpen(true)}
      >
        <MdToken /> Api Key
      </button>
      {open && (
        <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 transition-all">
          <div className="relative m-4 max-w-2xl rounded bg-tertiary p-4 shadow-xl">
            <div className="absolute right-0 top-0 m-2">
              <button
                className="rounded p-2 text-primary hover:bg-primary/50"
                onClick={() => setOpen(false)}
              >
                <MdClose />
              </button>
            </div>
            <h1 className="text-2xl font-medium text-primary">
              Your API token
            </h1>
            <p className="mt-4 text-lg text-primary/80">
              You can get your API token from the{" "}
              <a
                href="https://beta.openai.com/account/api-keys"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                JulepAI dashboard
              </a>
              . All requests are made on the client side, so your token is never
              sent to the server.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="sk-NhU98cac878..."
                className="mt-4 w-full rounded border-none bg-secondary p-4 text-primary outline-none"
                onChange={handleInput}
                value={input}
              />
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="mr-2 rounded px-4 py-2 text-primary hover:bg-primary/50"
                  onClick={handleClear}
                >
                  Clear Token
                </button>
                <button
                  type="submit"
                  className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
