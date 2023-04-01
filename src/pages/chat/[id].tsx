import ChatMessages from "@/components/chat/ChatMessages";
import ChatSidebar from "@/components/chat/sidebar/ChatSidebar";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { getConversation } from "./../../utils/History";
import { useOpenAI } from "@/context/OpenAIProvider";
import ChatHeader from "./../../components/chat/ChatHeader";

export default function Chat() {
  const { loadConversation, conversationId } = useOpenAI();
  const { id } = useRouter().query;

  React.useEffect(() => {
    if (!id) return;
    if (typeof window !== "undefined") {
      // Get the conversation from local storage
      const conversation = getConversation(id as string);

      // If there is no conversation, redirect to the home page
      if (!conversation) {
        window.location.href = "/";
      } else if (conversationId !== id) {
        // If the conversation is not loaded, load it
        loadConversation(id as string, conversation);
      }
    }
  }, [id]);

  return (
    <React.Fragment>
      <Head>
        <title>OpenAI</title>
        <meta name="description" content="A clone of OpenAI playground." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-screen relative h-screen max-h-screen w-screen overflow-hidden">
        <ChatHeader />
        <ChatMessages />
        <ChatSidebar />
      </div>
    </React.Fragment>
  );
}
