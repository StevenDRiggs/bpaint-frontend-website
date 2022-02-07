import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
    </>
  )
}

export default MyApp
