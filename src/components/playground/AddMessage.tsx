import { useOpenAI } from "@/context/OpenAIProvider";
import React from "react";
import { MdAddCircleOutline } from "react-icons/md";

type Props = {};

export default function AddMessage({}: Props) {
  const { addMessage } = useOpenAI();

  return (
    <button
      className="flex cursor-pointer flex-row gap-x-4 p-4 text-gray-700 hover:bg-gray-100"
      onClick={() => addMessage("", false, "user")}
    >
      <MdAddCircleOutline size={24} />
      <span className="font-medium">Add Message</span>
    </button>
  );
}
