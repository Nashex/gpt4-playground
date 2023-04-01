import Head from "next/head";
import React from "react";
import PlaygroundMessages from "@/components/playground/PlaygroundMessages";
import ConfigSidebar from "@/components/playground/ConfigSidebar";
import PlaygroundHeader from "@/components/playground/PlaygroundHeader";
import SystemMessage from "@/components/playground/SystemMessage";
import PlaygroundConversations from "@/components/playground/conversations/PlaygroundConversations";
import PlaygroundProvider from "@/context/PlaygroundProvider";

export default function Playground() {
  return (
    <React.Fragment>
      <Head>
        <title>OpenAI Playground</title>
        <meta name="description" content="A clone of OpenAI playground." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative max-w-screen flex max-h-screen w-screen flex-col">
        <PlaygroundProvider>
          <PlaygroundHeader />
          <div className="flex h-[calc(100vh-60px)] max-h-[calc(100vh-60px)] grow flex-row">
            <div className="flex grow flex-col items-stretch md:flex-row">
              <PlaygroundConversations />
              <div className="flex grow">
                <SystemMessage />
              </div>
              <div className="flex grow basis-7/12 overflow-hidden">
                <PlaygroundMessages />
              </div>
            </div>
            <ConfigSidebar />
          </div>
        </PlaygroundProvider>
      </main>
    </React.Fragment>
  );
}
