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
  const created_analog_colors = creations ? creations['analog_colors'] : []
  const created_packages = creations ? creations['packages'] : []
  const created_recipes = creations ? creations['recipes'] : []
  const favorite_analog_colors = favorites ? favorites['analog_colors'] : null
  const favorite_packages = favorites ? favorites['packages'] : null
  const favorite_recipes = favorites ? favorites['recipes'] : null

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
        <div>
          <Image src={user.image_url || 'https://picsum.photos/50'} width={200} height={300} />
          <p className={styles.username}>
            {username}
          </p>
        </div>
        <p>
        </p>
        {favorite_analog_colors?.length > 0 || favorite_packages?.length > 0 || favorite_recipes?.length > 0
          ? <div className={styles.profileLists}>
            <header>
              <p>
                My Favorites:
              </p>
            </header>
            {favorite_packages?.length > 0
              ? <p>
                Packages:
              </p>
              : null
            }
            {favorite_packages?.length > 0
              ? favorite_packages.map(package => (
                <Link href={`/package/${package.slug}`}>
                  <a>
                    {package.name}
                  </a>
                </Link>
              ))
              : null
            }
            {favorite_recipes?.length > 0
              ? <p>
                Recipes:
              </p>
              : null
            }
            {favorite_recipes?.length > 0
              ? favorite_recipes.map(recipe => (
                <Link href={`/recipe/${recipe.id}`}>
                  <a>
                    [{recipe.display}]
                  </a>
                </Link>
              ))
              : null
            }
            {favorite_analog_colors?.length > 0
              ? <p>
                Analog Colors:
              </p>
              : null
            }
            {favorite_analog_colors?.length > 0
              ? favorite_analog_colors.map(color => (
                <Link href={`/color/${color.id}`}>
                  <a>
                    {color.name}
                  </a>
                </Link>
              ))
              : null
            }
          </div>
          : null
        }
        <div className={styles.profileLists}>
          <header>
            <p>
              My Creations:
            </p>
          </header>
          {created_analog_colors?.length > 0 || created_packages?.length > 0 || created_recipes?.length > 0
            ? <>
              {created_packages?.length > 0
                ? <>
                  <p>
                    Packages:
                  </p>
                  {created_packages.map(package => (
                    <Link href={`/package/${package.slug}`}>
                      <a>
                        {package.name}
                      </a>
                    </Link>
                  ))}
                </>
                : null
              }
              {created_recipes?.length > 0
                ? <>
                  <p>
                    Recipes:
                  </p>
                  {created_recipes.map(recipe => (
                    <Link href={`/recipe/${recipe.id}`}>
                      <a>
                        [{recipe.display}]
                      </a>
                    </Link>
                  ))}
                </>
                : null
              }
              {created_analog_colors?.length > 0
                ? <>
                  <p>
                    Analog Colors:
                  </p>
                  {created_analog_colors.map(color => (
                    <Link href={`/color/${color.id}`}>
                      <a>
                        {color.name}
                      </a>
                    </Link>
                  ))}
                </>
                : null
              }
            </>
            : <p>
              You haven&apos;t created anything yet
            </p>
          }
        </div>
      </div>
      <p>
      </p>
    </main>
  )
}


export default Dashboard
