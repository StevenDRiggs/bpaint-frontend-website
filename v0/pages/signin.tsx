import type { NextPage } from 'next'
import {useState} from 'react'

import styles from '../styles/SignUpSignIn.module.scss'


const SignIn: NextPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = event => {
    const target = event.target as HtmlElement
    eval(`set${target.name}(target.value.trim())`)
  }

  const handleSubmit = event => {
    event.preventDefault()
      fetch('http://localhost:5000/login', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username_or_email: usernameOrEmail,
            password,
          },
        }),
      })
      .then(resp => resp.json())
      .then(json => alert(JSON.stringify(json)))
      .catch(err => alert(`ERROR: ${JSON.stringify(err)}`))
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
    </main>
  )
}


export default SignIn
