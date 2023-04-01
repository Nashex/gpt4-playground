import { useOpenAI } from "@/context/OpenAIProvider";
import Conversation from "./Conversation";

type Props = {};

export default function Conversations({}: Props) {
  const { conversations, conversationId } = useOpenAI();

  return (
    <div className="flex-1 overflow-y-auto py-2 scrollbar-none">
      <div className="flex flex-col gap-y-2">
        {Object.keys(conversations).map((key) => (
          <Conversation
            key={key + conversations[key].name}
            id={key}
            conversation={conversations[key]}
            active={key === conversationId}
          />
        ))}
      </div>
    </div>
  );
}
