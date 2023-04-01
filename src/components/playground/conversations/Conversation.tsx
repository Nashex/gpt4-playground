import { useOpenAI } from "@/context/OpenAIProvider";
import {
  Conversation as ConversationT,
  getConversation,
} from "@/utils/History";

interface Props {
  id: string;
  conversation: ConversationT;
}

export default function Conversation({ id, conversation }: Props) {
  const { loadConversation } = useOpenAI();

  const handleClick = () => {
    // Get the conversation from the history
    const conversation = getConversation(id);
    conversation && loadConversation(id, conversation);
  };

  return (
    <div
      className="flex cursor-pointer flex-col gap-y-2 rounded-md bg-gray-100 p-4 hover:bg-gray-200"
      onClick={handleClick}
    >
      <div className="flex flex-row justify-between text-gray-700">
        <div className="text-sm font-bold">
          {
            // Get the time of day
            new Date(conversation.lastMessage).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          }
        </div>
        <div>{conversation.name || conversation.messages[0]?.content}</div>
      </div>
    </div>
  );
}
