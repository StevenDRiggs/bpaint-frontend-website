import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { reloadUser, useNoTokenSignOut } from '../react/hooks'
import { clearUser } from '../redux/features/user/userSlice'
import { clearToken } from '../redux/features/token/tokenSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

import styles from '../styles/Dashboard.module.scss'


const Dashboard: NextPage = () => {
  useNoTokenSignOut()

  const dispatch = useAppDispatch()
  const router = useRouter()

  const token = useAppSelector(state => state.token.value)
  const user = useAppSelector(state => state.user)
  const { creations, favorites, username } = user

  const signOut = () => {
    dispatch(clearUser())
    dispatch(clearToken())
  }


  useEffect(() => {
    if (token && Object.values(user).some(val => val === null)) {
      reloadUser(token, dispatch, router)
    }
  })

  return (
    <main>
      <button type='button' onClick={signOut}>
        Sign Out
      </button>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <Image src={user.image_url || 'https://picsum.photos/50'} width={200} height={300} />
        </div>
        <p className={styles.username}>
          {username}
        </p>
        <ul className={styles.favorites}>
          <header>
            <p>
              Favorites:
            </p>
          </header>
          {favorites?.length > 0
            ? favorites.map(fav => (
              <Link href={`/colors/${fav.slug}`}>
                <a>
                  <li>
                    <Image src={fav.image_url} width={20} height={20} />
                    <span>
                      {fav.name}
                    </span>
                  </li>
                </a>
              </Link>
            ))
            : <p>
              <em>
                No favorites chosen
              </em>
            </p>
          }
        </ul>
        <ul className={styles.creations}>
          <header>
            <p>
              My Creations:
            </p>
          </header>
          {creations?.length > 0
            ? creations.map(color => (
              <Link href={`/colors/${color.slug}`}>
                <a>
                  <li>
                    <Image src={color.image_url} width={20} height={20} />
                    <span>
                      {color.name}
                    </span>
                  </li>
                </a>
              </Link>
            ))
            : <p>
              <em>
                Nothing created yet
              </em>
            </p>
          }
        </ul>
      </div>
      <p>
        {JSON.stringify(user)}
      </p>
    </main>
  )
}


export default Dashboard
