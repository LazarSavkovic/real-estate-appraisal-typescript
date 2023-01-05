import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'
import { appWithTranslation } from 'next-i18next'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useState } from 'react'
import { useRouter } from 'next/router'

function App({ Component, pageProps }: AppProps) {

  const [queryClient] = useState(() => new QueryClient())

  const router = useRouter()

  return (

    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </ Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ SessionProvider>
  )
}


export default appWithTranslation(App)