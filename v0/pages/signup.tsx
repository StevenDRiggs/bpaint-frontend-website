import type { NextPage } from 'next'
import Link from 'next/link'
import { SyntheticEvent, useState } from 'react'

import { useTokenForLogin } from '../react/hooks'
import { signup } from '../redux/features/user/userSlice'
import { useAppDispatch } from '../redux/hooks'

// @ts-ignore
import styles from '../styles/SignUpSignIn.module.scss'


const SignUp: NextPage = () => {
  useTokenForLogin()

  const dispatch = useAppDispatch()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')

  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLFormElement
    eval(`set${target.name}(target.value.trim())`)
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    if (password === passwordConf) {
      dispatch(signup({
        username,
        email,
        password,
      }))
    } else {
      alert('Password and Password Confirmation must match')
    }
  }


  return (
    <main>
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.formField}>
          <legend>
            Username:
          </legend>
          <input
            type='text'
            id='username'
            name='Username'
            value={username}
            placeholder='Awesome Username'
            onChange={handleChange}
            minLength={5}
            maxLength={50}
            required
          />
        </fieldset>
        <fieldset className={styles.formField}>
          <legend>
            Email:
          </legend>
          <input
            type='email'
            id='email'
            name='Email'
            value={email}
            placeholder='email@example.com'
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
            placeholder='sup3r s3cur3 p@$$w0rd'
            onChange={handleChange}
            minLength={5}
            required
          />
        </fieldset>
        <fieldset className={styles.formField}>
          <legend>
            Retype your password:
          </legend>
          <input
            type='password'
            id='passwordConf'
            name='PasswordConf'
            value={passwordConf}
            placeholder='sup3r s3cur3 p@$$w0rd'
            onChange={handleChange}
            minLength={5}
            required
          />
        </fieldset>
        <input
          type='submit'
          className={styles.submitButton}
          value='Sign Up'
        />
      </form>
      <p>
        Already have an account?
      </p>
      <Link href='/signin'>
        <a>
          Sign in here
        </a>
      </Link>
    </main>
  )
}


export default SignUp
