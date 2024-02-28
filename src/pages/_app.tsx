import { AuthProvider } from "@/context/AuthProvider";
import OpenAIProvider from "@/context/OpenAIProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider >
        <AuthProvider>
          <OpenAIProvider>
            <Component {...pageProps} />
          </OpenAIProvider>
        </AuthProvider>
        <Analytics />
      </ThemeProvider>
    </>
  );
}
