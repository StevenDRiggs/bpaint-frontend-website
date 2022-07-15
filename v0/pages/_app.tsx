import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { PersistGate } from 'redux-persist/integration/react'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'

import LoadingIcon from '../components/loadingIcon'
import Navbar from '../components/navbar'
import { persistor, store } from '../redux/store'

import '../styles/globals.css'


function MyApp({ Component, pageProps }: AppProps) {
  const [ isLoading, setIsLoading ] = useState(false)
  const router = useRouter()


  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.pathname ? setIsLoading(true) : setIsLoading(true)
    }

    const handleComplete = (url: string) => setIsLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
  }, [router])

  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <PersistGate loading={null} persistor={persistor}>

        <Navbar />
        <LoadingIcon isLoading={isLoading} />
        {/* @ts-ignore */}
        <Component {...pageProps} />

        <footer id='pageFooter'>
          <a
            href="https://stevendriggs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            &copy; Steven Riggs 2022
          </a>
        </footer>
      </PersistGate>
    </Provider>
  )
}


export default MyApp
