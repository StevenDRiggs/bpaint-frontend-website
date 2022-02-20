import type { NextPage } from 'next'
import Link from 'next/link'
import { SyntheticEvent, useState } from 'react'

import { useTokenForLogin } from '../react/hooks'
import { login } from '../redux/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

import styles from '../styles/SignUpSignIn.module.scss'


const SignIn: NextPage = () => {
  useTokenForLogin()

  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const { token, user } = useAppSelector(state => state)

  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLFormElement
    eval(`set${target.name}(target.value.trim())`)
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    dispatch(login({
      usernameOrEmail,
      password,
    }))
  }


  return (
    <main>
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.formField}>
          <legend>
            Username or Email:
          </legend>
          <input
            type='text'
            id='usernameOrEmail'
            name='UsernameOrEmail'
            value={usernameOrEmail}
            placeholder='Username or Email'
            onChange={handleChange}
            required
          />
        </fieldset>
        <fieldset className={styles.formField}>
          <legend>
            Password:
          </legend>
          <input
            type='password'
            id='password'
            name='Password'
            value={password}
            placeholder='Password'
            onChange={handleChange}
            required
          />
        </fieldset>
        <input
          type='submit'
          className={styles.submitButton}
          value='Sign In'
        />
      </form>
      <p>
        Don't have an account yet?
      </p>
      <Link href='/signup'>
        <a>
          Sign up here
        </a>
      </Link>
    </main>
  )
}


export default SignIn
