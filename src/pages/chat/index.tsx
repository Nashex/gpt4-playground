import ChatMessages from "@/components/chat/ChatMessages";
import ChatSidebar from "@/components/chat/ChatSidebar";
import Head from "next/head";
import React from "react";
export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>OpenAI</title>
        <meta name="description" content="A clone of OpenAI playground." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative max-h-screen max-w-screen h-screen w-screen overflow-hidden">
        <ChatMessages />
        <ChatSidebar />
      </div>
    </React.Fragment>
  );
}
