import { useRouter } from 'next/router'
import React, { SyntheticEvent, useState } from 'react'
import ReactHTMLDatalist from "react-html-datalist"

import { BACKEND_URL } from '../.env'
import { useNoTokenSignOut } from '../react/hooks'
import { useAppSelector } from '../redux/hooks'

import styles from '../styles/Form.module.scss'


const NewColorForm = () => {
  useNoTokenSignOut()

  const router = useRouter()
  const [ name, setName ] = useState('')
  const [ medium, setMedium ] = useState('')

  const [ brandname, setBrandname ] = useState('')
  const [ body, setBody ] = useState('heavy')
  const [ glossiness, setGlossiness ] = useState(100)
  const { user: { id: creator_id }, token: { value: token } } = useAppSelector(state => state)


  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLFormElement
    setName(target.value)
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    fetch(`${BACKEND_URL}/colors`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        color: {
          creator_id,
          name,
        },
      }),
    })
    .then(resp => resp.json())
    .then(color => router.push(`/colors/${color.slug}`))
  }


  return (
    <main>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            Create New Color
          </legend>
          <div className={styles.formField}>
            <label htmlFor='name'>
              Name:&nbsp;
            </label>
            <input type='text' id='name' name='name' value={name} placeholder='Color Name' onChange={handleChange} />
          </div>
          <div className={styles.formField}>
            <label htmlFor='medium'>
              Medium:&nbsp;
            </label>
            <input type='text' id='medium' name='medium' value={medium} placeholder='Color Medium' onChange={handleChange} />
          </div>
          <div className={styles.formField}>
            <span>IMAGE FILLER</span>
          </div>
          <div className={styles.formField}>
            <label htmlFor='brandname'>
              Brandname:&nbsp;
            </label>
            <input type='text' id='brandname' name='brandname' value={brandname} placeholder='Color Brandname' onChange={handleChange} />
          </div>
          <div className={styles.formField}>
            <label htmlFor='body'>
              Body:&nbsp;
            </label>
            <ReactHTMLDatalist
              id='bodyList'
              name='bodyList'
              onChange={handleChange}
              options={[
                {
                  text: 'Heavy',
                  value: 'heavy',
                },
                {
                  text: 'Medium',
                  value: 'medium',
                },
                {
                  text: 'Light',
                  value: 'light',
                },
              ]}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor='glossiness'>
              Glossiness:&nbsp;
            </label>

          </div>
        </fieldset>
        <button type='submit' className={styles.btn}>
          Submit
        </button>
      </form>
    </main>
  )
}


export default NewColorForm
