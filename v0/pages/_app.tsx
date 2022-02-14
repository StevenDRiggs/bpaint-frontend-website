import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { store } from '../redux/store'

import '../styles/globals.css'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}


export default MyApp
