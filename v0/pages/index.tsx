import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/Home.module.scss'


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>ButterflyPaint</title>
        <meta name="description" content="ButterflyPaint Color Database and Recipe Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to<br />ButterflyPaint!
        </h1>

        <div className={styles.buttonsGroup}>
          <Link href='/signin'>
            <a>
              <button>
                Sign In
              </button>
            </a>
          </Link>

          <Link href='/signup'>
            <a>
              <button>
                Sign Up
              </button>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}


export default Home
