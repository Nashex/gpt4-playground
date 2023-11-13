import ChatMessages from "@/components/chat/ChatMessages";
import ChatSidebar from "@/components/chat/sidebar/ChatSidebar";
import Head from "next/head";
import React, { useEffect } from "react";
import { useOpenAI } from "@/context/OpenAIProvider";
import ChatHeader from "@/components/chat/ChatHeader";
import { useAuth } from "@/context/AuthProvider";

export default function Chat() {
  const { clearConversation } = useOpenAI();

  useEffect(() => {
    clearConversation();

}, []);

  return (
    <React.Fragment>
      <Head>
        <title>JulepAI</title>
        <meta name="description" content="JulepAI Playground." />
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
