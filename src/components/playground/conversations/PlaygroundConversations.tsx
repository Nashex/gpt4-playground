import { useOpenAI } from "@/context/OpenAIProvider";
import { usePlayground } from "@/context/PlaygroundProvider";
import { Transition } from "@headlessui/react";
import React from "react";
import { MdClear } from "react-icons/md";
import Conversation from "./Conversation";

type Props = {};

export default function PlaygroundCoversations({}: Props) {
  const { showConversations, toggleShowConversations } = usePlayground();
  const { conversations } = useOpenAI();

  return (
    <Transition
      className="h-0 overflow-y-auto md:h-auto md:w-0"
      show={showConversations}
      enter="transition-all duration-300"
      enterFrom="opacity-0 md:-translate-x-full -translate-y-full md:-translate-y-0 basis-0"
      enterTo="opacity-100 basis-3/12"
      leave="transition-all duration-300"
      leaveFrom="opacity-100 basis-3/12"
      leaveTo="opacity-0 md:-translate-x-full -translate-y-full md:-translate-y-0  basis-0"
    >
      <div className="mx-4 my-4 overflow-y-auto md:mr-0">
        <div className="flex w-full flex-row items-center justify-between text-lg text-gray-700">
          <h2 className="font-bold">Conversations</h2>
          <MdClear
            className="cursor-pointer"
            onClick={toggleShowConversations}
            size={30}
          />
        </div>

        <div className="mt-4 flex flex-col gap-y-4">
          {Object.keys(conversations).map((key) => (
            <Conversation
              key={key}
              id={key}
              conversation={conversations[key]}
            />
          ))}
        </div>
      </div>
    </Transition>
  );
}
