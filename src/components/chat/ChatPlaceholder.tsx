import React from "react";
import AddTokenModal from "./../auth/AddTokenModal";
import Link from "next/link";

type Props = {};

export default function ChatPlaceholder({}: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="max-w-3xl p-4 text-center text-primary">
        <h1 className="text-4xl font-medium">Samantha-1 Playground</h1>
        <p className="mt-4 text-lg">
          Enter your API token to get started
        </p>
        <div className="m-4 flex items-center justify-center">
          <AddTokenModal />
        </div>

      </div>
    </div>
  );
}
