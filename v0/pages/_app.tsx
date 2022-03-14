import type { AppProps } from 'next/app'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import Navbar from '../components/navbar'
import { persistor, store } from '../redux/store'

import '../styles/globals.css'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <Navbar />
        <Component {...pageProps} />

        <footer>
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
