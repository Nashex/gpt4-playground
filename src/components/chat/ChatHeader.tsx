import React from "react";
import { MdClose, MdMenu } from "react-icons/md";
import ChatSidebar from "@/components/chat/sidebar/ChatSidebar";
import { Transition } from "@headlessui/react";
import AddTokenModal from "./../auth/AddTokenModal";

type Props = {};

export default function ChatHeader({}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div className="dark top-0 flex h-[50px] justify-between bg-primary px-4 text-2xl text-primary md:hidden">
        <button className="p-2" onClick={() => setIsOpen(true)}>
          <MdMenu />
        </button>

        <AddTokenModal buttonClassName="text-sm p-1 m-2 px-2" />
      </div>
      {/* Animate slide in from left */}
      <Transition
        show={isOpen}
        className="absolute z-30 h-[calc(100%-50px)] w-full"
        enter="transition ease-out duration-300"
        enterFrom="transform -translate-x-full"
        enterTo="transform translate-x-0"
        leave="transition ease-in duration-300"
        leaveFrom="transform translate-x-0"
        leaveTo="transform -translate-x-full"
      >
        <div className="shadow-4xl h-full w-2/3">
          <ChatSidebar />
        </div>
        <button
          className={`absolute right-0 top-0 p-4 text-primary`}
          onClick={() => setIsOpen(false)}
        >
          <MdClose />
        </button>
      </Transition>
    </>
  );
}
