import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { BACKEND_URL } from '../../.env'
import { useNoTokenSignOut } from '../../react/hooks'
import { useAppSelector } from '../../redux/hooks'


const PackagesShow = () => {
  useNoTokenSignOut()

  const { user, token: { value: token } } = useAppSelector(state => state)
  const router = useRouter()
  const { idOrSlug } = router.query
  const [ pkg, setPkg ] = useState({})


  useEffect(() => {
    console.log(idOrSlug)
    if (idOrSlug) {
      fetch(`${BACKEND_URL}/packages/${idOrSlug}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(resp => resp.json())
      .then(json => setPkg(json))
    }
  }, [idOrSlug])

  return (
    <main>
      {pkg?.errors || pkg?.analog_recipes
        ? pkg.errors
          ? <div>
            {pkg.errors.map((err, index) => (
              <p key={index}>
                {err}
              </p>
            ))}
          </div>
          : pkg.analog_recipes.length == 0
            ? <p>
              No recipes added yet
            </p>
            : <p>
              TODO: add Package show page
            </p>
        : <p>
          LOADING...
        </p>
      }
    </main>
  )
}


export default PackagesShow
