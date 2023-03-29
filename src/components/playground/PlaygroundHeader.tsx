import Link from "next/link";
import React from "react";
import { MdChatBubbleOutline } from "react-icons/md";
import AddTokenModal from "./../auth/AddTokenModal";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="h-[60px] flex flex-row items-center justify-between px-4 border-b border-gray-300">
      <span className="font-bold text-lg">Playground</span>

      <div className="flex flex-row gap-x-4">
        <Link href="/" className="flex gap-x-1 items-center p-4 rounded text-gray-700 border border-gray-300 hover:bg-gray-200">
          <MdChatBubbleOutline />
        </Link>
        <AddTokenModal buttonClassName="py-2" />
      </div>
    </div>
  );
}
