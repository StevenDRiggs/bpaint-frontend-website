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

    const [ isDigital, setIsDigital ] = useState(false)
    const [ name, setName ] = useState('')
    const [ medium, setMedium ] = useState('')
    const [ brandname, setBrandname ] = useState('')
    const [ body, setBody ] = useState('heavy')
    const [ glossiness, setGlossiness ] = useState(100)
    const { user: { id: creator_id }, token: { value: token } } = useAppSelector(state => state)


    const handleChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLFormElement
        eval(`set${target.name}(target.value)`)
    }

    const handleRadioChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLFormElement
        setIsDigital(target.value === 'true')
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
                <fieldset className={styles.formFieldset}>
                    <legend>
                        Create New Color
                    </legend>
                    <div className={styles.formField}>
                        <label htmlFor='analogDigital' className={styles.formLabel}>
                            Color Type:
                        </label>
                        <div id='analogDigital' className={styles.formField}>
                            <label htmlFor='analogRadioOption1'>
                                Analog
                            </label>
                            <input type='radio' id='analogRadioOption1' value={false} onChange={handleRadioChange} checked={!isDigital} />
                            <label htmlFor='analogRadioOption2'>
                                Digital
                            </label>
                            <input type='radio' id='analogRadioOption2' value={true} onChange={handleRadioChange} checked={isDigital} />
                        </div>
                    </div>
                    {!isDigital
                        ? <>
                            <div className={styles.formField}>
                                <label htmlFor='name' className={styles.formLabel}>
                                    Name:
                                </label>
                                <input type='text' id='name' name='Name' value={name} placeholder='Color Name' onChange={handleChange} />
                            </div>
                            <div className={styles.formField}>
                                <label htmlFor='medium' className={styles.formLabel}>
                                    Medium:
                                </label>
                                <input type='text' id='medium' name='Medium' value={medium} placeholder='Color Medium' onChange={handleChange} />
                            </div>
                            <div className={styles.formField}>
                                {/* TODO: replace with image link/file upload field */}
                                <span>IMAGE FILLER</span>
                            </div>
                            <div className={styles.formField}>
                                <label htmlFor='brandname' className={styles.formLabel}>
                                    Brandname:
                                </label>
                                <input type='text' id='brandname' name='Brandname' value={brandname} placeholder='Color Brandname' onChange={handleChange} />
                            </div>
                            <div className={styles.formField}>
                                <label htmlFor='body' className={styles.formLabel}>
                                    Body:
                                </label>
                                <ReactHTMLDatalist
                                    id='bodyList'
                                    name='Body'
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
                                <label htmlFor='glossiness' className={styles.formLabel}>
                                    Glossiness:
                                </label>
                                {/* TODO: finish form */}
                            </div>
                        </>
                        : null
                    }
                </fieldset>
                <button type='submit' className={styles.btn}>
                    Submit
                </button>
            </form>
        </main>
    )
}


export default NewColorForm
