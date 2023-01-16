import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'
import { appWithTranslation } from 'next-i18next'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useState, FC } from 'react'
import { useRouter } from 'next/router'

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {

  const [queryClient] = useState(() => new QueryClient())

  const router = useRouter()

  return (

    <>
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </ Layout>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ SessionProvider>
    </>
  )
}


export default appWithTranslation(App)