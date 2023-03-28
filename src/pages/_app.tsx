import OpenAIProvider from '@/context/OpenAIProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <OpenAIProvider>
    <Component {...pageProps} />
  </OpenAIProvider>
}
