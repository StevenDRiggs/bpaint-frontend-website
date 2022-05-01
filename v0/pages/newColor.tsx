import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'
import ReactHTMLDatalist from "react-html-datalist"

import { BACKEND_URL } from '../.env'
import { useNoTokenSignOut } from '../react/hooks'
import { useAppSelector } from '../redux/hooks'

import styles from '../styles/Form.module.scss'


const NewColorForm = () => {
    useNoTokenSignOut()


    const verifyButton = useRef()
    const colorNameInput = useRef()

    const [ isFileUploaded, setIsFileUploaded ] = useState(false)
    const [ uploadedFile, setUploadedFile ] = useState()
    const [ fileUrl, setFileUrl ] = useState('')
    const [ isValueInFileUrl, setIsValueInFileUrl ] = useState(false)
    const [ errors, setErrors ] = useState([])
    const [ isAnalog, setIsAnalog ] = useState(true)
    const [ colorName, setColorName ] = useState('')
    const [ colorBody, setColorBody ] = useState('')
    const [ colorBrandname, setColorBrandname ] = useState('')
    const [ colorGlossiness, setColorGlossiness ] = useState('')
    const [ colorLightfastness, setColorLightfastness ] = useState('')
    const [ colorMedium, setColorMedium ] = useState('')
    const [ colorOpaqueness, setColorOpaqueness ] = useState('')
    const [ colorSeries, setColorSeries ] = useState('')
    const [ colorThickness, setColorThickness ] = useState('')
    const [ colorTinting, setColorTinting ] = useState('')


    const cancelImageUpload = () => {
        URL.revokeObjectURL(uploadedFile)
        setUploadedFile(null)
        setIsFileUploaded(false)
        setFileUrl('')
    }

    const handleEnterKeyFromFileUrl = (event: SyntheticEvent) => {
        if (event.key === 'Enter') {
            verifyButton.current.click()
            colorNameInput.current.focus()
        }
    }

    const handleImageUpload = (event: SyntheticEvent) => {
        const target = event.target as HTMLFormElement

        const { files } = target
        setIsFileUploaded(true)
        setUploadedFile(files[0])
        setFileUrl(URL.createObjectURL(files[0]))
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault()
    }

    const handleTextFieldChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLFormElement

        eval(`set${target.name}(target.value)`)
    }

    const verifyImageFromUrl = async () => {
        const response = await fetch(fileUrl)
        const imageBlob = await response.blob()

        if (imageBlob.type.startsWith('image/')) {
            setIsFileUploaded(true)
            setUploadedFile(new File([imageBlob], 'tmp'))
            setFileUrl(response.url)
        } else {
            setErrors([
                ...errors,
                'An error occurred while verifying your image. Please make sure you are linking to a valid image format (APNG, AVIF, GIF, JPEG, PNG, SVG, or WebP)',
            ])
        }
    }


    useEffect(() => {
        setErrors([])
    }, [isFileUploaded, uploadedFile, fileUrl, isValueInFileUrl, colorName])

    useEffect(() => {
        if (fileUrl.length > 0 && !isValueInFileUrl) {
            setIsValueInFileUrl(true)
        } else if (fileUrl.length === 0) {
            setIsValueInFileUrl(false)
        }
    }, [fileUrl])

    return (
        <main>
            <form className={styles.form} onSubmit={handleSubmit}>
                {errors.length > 0
                    ? <>
                        <ul className={styles.errorsList}>
                            {errors.map((message, index) => (
                                <li key={index} className={styles.errorMessage}>
                                    {message}
                                </li>
                            ))}
                        </ul>
                    </>
                    : null
                }
                <fieldset className={styles.formFieldset}>
                    <legend>
                        Create New Color
                    </legend>
                    <div className={`${styles.formField} ${styles.formFieldAsContainer} ${styles.vertical}`}>
                        {isFileUploaded
                            ? <>
                                <Image src={fileUrl} width={150} height={100} />
                                <FontAwesomeIcon icon={faCircleXmark} size='lg' className={styles.cancelUploadIcon} onClick={cancelImageUpload} />
                            </>
                            : <>
                                <label htmlFor='colorImageUpload'>
                                    Upload an image of <wbr />your color:
                                </label>
                                <input type='file' accept='image/*' id='colorImageUpload' className={styles.fileInput} onChange={handleImageUpload} disabled={isValueInFileUrl} />
                                <p>
                                    <strong>- OR -</strong>
                                </p>
                                <label htmlFor='colorImageUrl'>
                                    Enter a URL for your image:
                                </label>
                                <input type='text' id='colorImageUrl' name='FileUrl' value={fileUrl} onChange={handleTextFieldChange} onKeyDown={handleEnterKeyFromFileUrl} />
                                <button type='button' onClick={verifyImageFromUrl} ref={verifyButton} hidden={!isValueInFileUrl}>
                                    Verify
                                </button>
                            </>
                        }
                    </div>
                    <hr className={styles.formDivider} />
                    <div className={`${styles.formField} ${styles.vertical}`}>
                        <label>
                            Color Type
                        </label>
                        <div className={styles.radioButtonsContainer}>
                            <div className={styles.inputGroup}>
                                <label htmlFor='analogColorType'>
                                    Analog
                                </label>
                                <input type='radio' id='analogColorType' checked={isAnalog} onClick={() => setIsAnalog(true)} />
                            </div>
                            <div className={styles.singleRadioGroup}>
                                <label htmlFor='digitalColorType'>
                                    Digital
                                </label>
                                <input type='radio' id='digitalColorType' checked={!isAnalog} onClick={() => setIsAnalog(false)} />
                            </div>
                        </div>
                    </div>
                    <hr className={styles.formDivider} />
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorName'>
                            Color Name:
                        </label>
                        <input type='text' id='colorName' name='ColorName' value={colorName} onChange={handleTextFieldChange} ref={colorNameInput} />
                    </div>
                    <hr className={styles.formDivider} />
                    <label>
                        Additional Information
                    </label>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorBody'>
                            Body:
                        </label>
                        <input type='text' id='colorBody' name='ColorBody' value={colorBody} onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorBrandname'>
                            Brandname:
                        </label>
                        <input type='text' id='colorBrandname' name='ColorBrandname' value={colorBrandname} onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorGlossiness'>
                            Glossiness:
                        </label>
                        <input type='text' id='colorGlossiness' name='ColorGlossiness' value={colorGlossiness} onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorLightfastness'>
                            Lightfastness:
                        </label>
                        <input type='text' id='colorLightfastness' name='ColorLightfastness' value={colorLightfastness} onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorMedium'>
                            Medium:
                        </label>
                        <input type='text' id='colorMedium' name='ColorMedium' value={colorMedium} onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorOpaqueness'>
                            Opaqueness:
                        </label>
                        <input type='text' id='colorOpaqueness' name='ColorOpaqueness' value={colorOpaqueness} onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorSeries'>
                            Series:
                        </label>
                        <input type='text' id='colorSeries' name='ColorSeries' value={colorSeries} onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorThickness'>
                            Thickness:
                        </label>
                        <input type='text' id='colorThickness' name='ColorThickness' value={colorThickness} onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorTinting'>
                            Tinting:
                        </label>
                        <input type='text' id='colorTinting' name='ColorTinting' value={colorTinting} onChange={handleTextFieldChange} />
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
