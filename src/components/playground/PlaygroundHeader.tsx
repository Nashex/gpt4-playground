import { useOpenAI } from "@/context/OpenAIProvider";
import Link from "next/link";
import React from "react";
import { MdChatBubbleOutline } from "react-icons/md";
import AddTokenModal from "./../auth/AddTokenModal";
import JulepLogo from "../misc/JulepBlack";

type Props = {};

export default function Header({}: Props) {
  const { conversationId } = useOpenAI();

  return (
    <div className="z-50 flex h-[60px] flex-row items-center justify-between border-b border-gray-300 bg-white px-4">
      <Link href="/">
        <JulepLogo className="h-20 w-40" />
      </Link>

      <div className="flex flex-row gap-x-4">
        <Link
          href={conversationId ? "/chat/" + conversationId : "/"}
          className="flex items-center gap-x-1 rounded border border-gray-300 p-4 text-gray-700 hover:bg-gray-200"
        >
          <MdChatBubbleOutline />
        </Link>
        <AddTokenModal className="py-2" />
      </div>
    </div>
  );
}
