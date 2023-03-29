import Head from "next/head";
import React from "react";
import PlaygroundMessages from "@/components/playground/PlaygroundMessages";
import ConfigSidebar from "@/components/playground/ConfigSidebar";
import Header from "@/components/shell/Header";
import SystemMessage from "@/components/playground/SystemMessage";

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>OpenAI Playground</title>
        <meta name="description" content="A clone of OpenAI playground." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col max-h-screen max-w-screen w-screen">
        <Header />
        <div className="flex flex-row grow max-h-[calc(100vh-60px)] h-[calc(100vh-60px)]">
          <div className="flex flex-col md:flex-row items-stretch grow">
            <SystemMessage />
            <PlaygroundMessages />
          </div>
          <ConfigSidebar />
        </div>
      </main>
    </React.Fragment>
  );
}
