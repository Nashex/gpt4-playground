import React from "react";
import AddTokenModal from "./../auth/AddTokenModal";
import Link from "next/link";
import GithubStar from "./../misc/GithubStar";

type Props = {};

export default function ChatPlaceholder({}: Props) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="text-primary text-center max-w-3xl p-4">
        <h1 className="text-4xl font-medium">GPT-4 Playground</h1>
        <p className="text-lg mt-4">
          A ChatGPT clone built with React, Next.js, TailwindCSS, and OpenAI
          that allows you to play with your GPT-4 api key early!
        </p>
        <div className="flex items-center justify-center m-4">
          <AddTokenModal />
        </div>
        <p className="text-lg mt-4">
          Want more freedom? Check out the{" "}
          <Link
            href="/playground"
            className="text-primary hover:underline font-medium"
          >
            Playground
          </Link>
          !
        </p>

        <div className="p-4">
          <GithubStar />
        </div>
      </div>
    </div>
  );
}
