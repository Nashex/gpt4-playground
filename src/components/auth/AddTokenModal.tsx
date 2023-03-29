import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { MdClose, MdToken } from "react-icons/md";

type Props = {
  buttonClassName?: string;
};

export default function AddTokenModal({ buttonClassName }: Props) {
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
        className={`hidden p-4 rounded text-white bg-green-500 hover:bg-green-600 md:block ${buttonClassName}`}
        onClick={() => setOpen(true)}
      >
        Add your API token
      </button>
      <button
        className={`flex gap-x-1 items-center p-4 rounded text-white bg-green-500 hover:bg-green-600 md:hidden ${buttonClassName}`}
        onClick={() => setOpen(true)}
      >
        <MdToken /> Api Key
      </button>
      {open && (
        <div className="absolute z-50 w-full h-full top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center transition-all">
          <div className="relative bg-tertiary p-4 rounded shadow-xl max-w-2xl m-4">
            <div className="absolute top-0 m-2 right-0">
              <button
                className="p-2 rounded text-primary hover:bg-primary/50"
                onClick={() => setOpen(false)}
              >
                <MdClose />
              </button>
            </div>
            <h1 className="text-2xl font-medium text-primary">
              Your API token
            </h1>
            <p className="text-lg mt-4 text-primary/80">
              You can get your API token from the{" "}
              <a
                href="https://beta.openai.com/account/api-keys"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                OpenAI dashboard
              </a>
              . All requests are made on the client side, so your token is never
              sent to the server. If you would like more information look at the{" "}
              <a
                href="https://github.com/Nashex/gpt4-playground"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Github Repository
              </a>
              !
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="sk-NhU98cac878..."
                className="bg-secondary rounded border-none outline-none p-4 w-full text-primary mt-4"
                onChange={handleInput}
                value={input}
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded text-primary hover:bg-primary/50 mr-2"
                  onClick={handleClear}
                >
                  Clear Token
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded text-white hover:bg-green-600 bg-green-500"
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
