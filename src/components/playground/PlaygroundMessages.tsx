import { useOpenAI } from "@/context/OpenAIProvider";
import React, { useEffect } from "react";
import AddMessage from "./AddMessage";
import PlaygroundMessage from "./PlaygroundMessage";
import { usePlayground } from "@/context/PlaygroundProvider";
import { MdOutlineForum } from "react-icons/md";

type Props = {};

export default function PlaygroundMessages({}: Props) {
  const { toggleShowConversations } = usePlayground();
  const { messages, loading, submit } = useOpenAI();
  const messageContainer = React.useRef<HTMLDivElement>(null);
  const [prevMessageLength, setPrevMessageLength] = React.useState(0);
  const [scrolling, setScrolling] = React.useState(false);

  useEffect(() => {
    if (messages.length != prevMessageLength) {
      setPrevMessageLength(messages.length);
    }

    if (
        messageContainer.current &&
        (!scrolling || messages.length != prevMessageLength)
    ) {
      messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
    }
  }, [messages]);

  // Command Enter to submit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.metaKey) {
        submit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [submit]);

// Scroll handling for auto scroll
  useEffect(() => {
    const handleScroll = () => {
      if (messageContainer.current) {
        if (
            messageContainer.current.scrollTop <
            messageContainer.current.scrollHeight -
            messageContainer.current.offsetHeight
        ) {
          setScrolling(true);
        } else {
          setScrolling(false);
        }
      }
    };

    if (messageContainer.current) {
      messageContainer.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (messageContainer.current) {
        messageContainer.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex grow flex-col justify-between md:grow">
      <div
        className="my-4 flex flex-col items-stretch overflow-y-auto px-4"
        ref={messageContainer}
      >
        {messages.map((message) => (
          <PlaygroundMessage key={message.id} message={message} />
        ))}
        <AddMessage />
      </div>

      <div className="flex gap-3 bg-white p-4">
        <button
          className="w-[80px] rounded bg-green-500 p-2 text-white hover:bg-green-600"
          onClick={submit}
        >
          {loading ? (
            <div className="mx-auto h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
          ) : (
            "Submit"
          )}
        </button>

        <button
          className="h-full rounded p-2 text-xl text-gray-700 transition-colors hover:bg-gray-200"
          onClick={toggleShowConversations}
        >
          <MdOutlineForum />
        </button>
      </div>
    </div>
  );
}
