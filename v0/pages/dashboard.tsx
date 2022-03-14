import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { reloadUser, useNoTokenSignOut } from '../react/hooks'
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


  useEffect(() => {
    if (token && Object.values(user).some(val => val === null)) {
      reloadUser(token, dispatch, router)
    }
  })

  return (
    <main>
      <div className={styles.profile}>
        <div>
          <Image src={user.image_url || 'https://picsum.photos/50'} width={200} height={300} />
          <p className={styles.username}>
            {username}
          </p>
        </div>
        <p>
        </p>
        {// @ts-ignore
          favorite_analog_colors?.length > 0 || favorite_packages?.length > 0 || favorite_recipes?.length > 0
          ? <div className={styles.profileLists}>
            <header>
              <p>
                My Favorites:
              </p>
            </header>
            {// @ts-ignore
              favorite_packages?.length > 0
              ? <p>
                Packages:
              </p>
              : null
            }
            {// @ts-ignore
              favorite_packages?.length > 0
              // @ts-ignore
              ? favorite_pkgs.map(pkg => (
                <Link key={pkg.id} href={`/pkg/${pkg.slug}`}>
                  <a>
                    {pkg.name}
                  </a>
                </Link>
              ))
              : null
            }
            {// @ts-ignore
              favorite_recipes?.length > 0
              ? <p>
                Recipes:
              </p>
              : null
            }
            {// @ts-ignore
              favorite_recipes?.length > 0
              // @ts-ignore
              ? favorite_recipes.map(recipe => (
                <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
                  <a>
                    [{recipe.display}]
                  </a>
                </Link>
              ))
              : null
            }
            {// @ts-ignore
              favorite_analog_colors?.length > 0
              ? <p>
                Analog Colors:
              </p>
              : null
            }
            {// @ts-ignore
              favorite_analog_colors?.length > 0
              // @ts-ignore
              ? favorite_analog_colors.map(color => (
                <Link key={color.id} href={`/color/${color.id}`}>
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
                  {created_packages.map(pkg => (
                    <Link key={pkg.id} href={`/pkg/${pkg.slug}`}>
                      <a>
                        {pkg.name}
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
                    <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
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
                    <div key={color.id}>
                      <Link href={`/color/${color.id}`}>
                        <a>
                          <Image src={color.image_url} width={25} height={25} className={styles.colorBlob} />
                          {color.name}
                        </a>
                      </Link>
                    </div>
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
    </main>
  )
}


export default Dashboard
