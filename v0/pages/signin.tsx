import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'

import { login } from '../redux/features/user/userSlice'
import { useAppDispatch } from '../redux/hooks'

import styles from '../styles/SignUpSignIn.module.scss'


const SignIn: NextPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()

  const handleChange = event => {
    const target = event.target as HtmlElement
    eval(`set${target.name}(target.value.trim())`)
  }

  const handleSubmit = event => {
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
