import React from "react";
import { useAuth } from "@/context/AuthProvider";
import { MdContentCopy, MdDelete } from "react-icons/md";
import AddTokenModal from "./../../../auth/AddTokenModal";

type Props = {};

export default function ApiKey({}: Props) {
  const { token, clearToken } = useAuth();

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <div className="py-2">
      <h3 className="mb-2 px-2 text-sm font-medium">YOUR API KEY</h3>
      {token ? (
        <div className="group flex flex-row items-center">
          <div className="relative flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap rounded p-3 text-primary/80 transition-colors">
            {token}
            <div
              className={`absolute bottom-0 right-0 z-10 h-full w-24 bg-gradient-to-r from-transparent to-[rgb(var(--bg-primary))]`}
            />
          </div>
          <div className="ml-2 flex grow flex-row items-center gap-2 w-fit">
            <button
              className="text-xl opacity-60 transition-opacity hover:opacity-100"
              onClick={handleCopyToken}
            >
              <MdContentCopy />
            </button>
            <button
              className="text-xl opacity-60 transition-opacity hover:opacity-100"
              onClick={clearToken}
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ) : (
        <AddTokenModal className="w-full bg-primary p-1 text-left hover:bg-secondary" />
      )}
    </div>
  );
}
