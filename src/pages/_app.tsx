import { AuthProvider } from "@/context/AuthProvider";
import OpenAIProvider from "@/context/OpenAIProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined") {
    const isDarkSet = localStorage.theme === "dark";
    const isThemeStored = "theme" in localStorage;
    const isDarkPrefered = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (isDarkSet || (!isThemeStored && isDarkPrefered)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <AuthProvider>
      <OpenAIProvider>
        <Component {...pageProps} />
      </OpenAIProvider>
    </AuthProvider>
  );
}
