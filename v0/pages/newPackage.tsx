import React, { SyntheticEvent, useState } from 'react'
import { useAppSelector } from '../redux/hooks'

import styles from '../styles/Form.module.scss'


const NewPackageForm = () => {
  const [ name, setName ] = useState('')
  const userId = useAppSelector(state => state.user)


  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLElement
    setName(target.value)
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    const target = event.target as HTMLElement

    console.log(JSON.stringify({
      userId,
      formData: target.value,
    }))
  }


  return (
    <main>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            Create New Package
          </legend>
          <div className={styles.formField}>
            <label htmlFor='name'>
              Name:&nbsp;
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
