import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { BACKEND_URL } from '../.env'
import { clearToken } from '../redux/features/token/tokenSlice'
import { clearUser, setUser } from '../redux/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { persistor } from '../redux/store'

import { UserState } from '../redux/features/user/userSlice'


export const useTokenForLogin = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const token = useAppSelector(state => state.token.value)

  useEffect(() => {
    if (token) {
      let user: UserState
      const errors: string[] = []

      fetch(`${BACKEND_URL}/validate`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      })
      .then(async resp => {
        const json = await resp.json()
        user = json.user
        errors.push(json.errors)
      })
      .catch(err => errors.push(err))
      .then(() => {
        if (user) {
          dispatch(setUser(user))
          router.push('/dashboard')
        }
        if (errors.some(err => !(err === undefined))) {
          console.log('errors:', errors)
          dispatch(clearToken())
        }
      })
    } else {
      console.log('token does not exist')
    }
  }, [token])
}


export const useNoTokenSignOut = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const token = useAppSelector(state => state.token.value)

  useEffect(() => {
    if (!token) {
      dispatch(clearUser())
      router.push('/')
    }
  }, [token])
}
