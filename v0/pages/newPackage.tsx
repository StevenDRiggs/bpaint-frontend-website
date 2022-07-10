import React, { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/router'

import { BACKEND_URL } from '../.env'
import { useNoTokenSignOut } from '../react/hooks'
import { useAppSelector } from '../redux/hooks'

// @ts-ignore
import styles from '../styles/Form.module.scss'


const NewPackageForm = () => {
  useNoTokenSignOut()

  const router = useRouter()
  const [ name, setName ] = useState('')
  const { user: { id: creator_id }, token: { value: token } } = useAppSelector(state => state)


  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLFormElement
    setName(target.value)
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    fetch(`${BACKEND_URL}/packages`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        package: {
          creator_id,
          name,
        },
      }),
    })
    .then(resp => resp.json())
    .then(pkg => router.push(`/packages/${pkg.slug}`))
  }


  return (
    <main>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            Create New Package
          </legend>
          <div className={styles.formField}>
            <label htmlFor='name' className={styles.formLabel}>
              Name:
            </label>
            <input type='text' id='name' value={name} placeholder='Package Name' onChange={handleChange} />
          </div>
        </fieldset>
        <button type='submit' className={styles.btn}>
          Submit
        </button>
      </form>
    </main>
  )
}


export default NewPackageForm
