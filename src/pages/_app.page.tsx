import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import '../lib/dayjs'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'

globalStyles()

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default App
