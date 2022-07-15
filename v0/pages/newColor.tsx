import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ReactHTMLDatalist from "react-html-datalist"

import LoadingIcon from '../components/loadingIcon'
import { BACKEND_URL } from '../.env'
import { useNoTokenSignOut } from '../react/hooks'
import { useAppSelector } from '../redux/hooks'

// @ts-ignore
import styles from '../styles/Form.module.scss'


const colorBodyDatalistOptions = [
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
]

const colorMediumDatalistOptions = [
    {
        text: 'Acrylic Paint',
        value: 'acrylic_paint',
    },
    {
        text: 'Oil Paint',
        value: 'oil_paint',
    },
    {
        text: 'Gouache',
        value: 'gouache',
    },
    {
        text: 'Watercolor Paint',
        value: 'watercolor_paint',
    },
    {
        text: 'Latex Paint',
        value: 'latex_paint',
    },
    {
        text: 'Colored Pencil',
        value: 'colored_pencil',
    },
    {
        text: 'Crayon',
        value: 'crayon',
    },
    {
        text: 'Pastel',
        value: 'pastel',
    },
    {
        text: 'Wax',
        value: 'wax',
    },
    {
        text: 'Dye',
        value: 'dye',
    },
    {
        text: 'Ink',
        value: 'ink',
    },
    {
        text: 'Powdercoat',
        value: 'powdercoat',
    },
    {
        text: 'Plastic/Resin',
        value: 'plastic_or_resin',
    },
]


const NewColorForm = () => {
    // useNoTokenSignOut()

    const router = useRouter()

    const verifyButton = useRef()
    const colorNameInput = useRef()
    const dropArea = useRef()

    const svgString = encodeURIComponent(renderToStaticMarkup(<LoadingIcon isLoading={true} />))

    const [ isFileUploaded, setIsFileUploaded ] = useState(false)
    const [ uploadedFile, setUploadedFile ] = useState<File|null>(null)
    const [ fileUrl, setFileUrl ] = useState('')
    const [ isValueInFileUrl, setIsValueInFileUrl ] = useState(false)
    const [ errors, setErrors ] = useState<string[]>([])
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
        // @ts-ignore
        URL.revokeObjectURL(uploadedFile)
        setUploadedFile(null)
        setIsFileUploaded(false)
        setFileUrl('')
    }

    const handleFileUploadDragEnter = (event: SyntheticEvent) => {
        event.preventDefault()
        event.stopPropagation()
    }

    const handleFileUploadDragLeave = (event: SyntheticEvent) => {
        event.preventDefault()
        event.stopPropagation()

        // @ts-ignore
        dropArea.current.style.opacity = 1.0
    }

    const handleFileUploadDragOver = (event: SyntheticEvent) => {
        event.preventDefault()
        event.stopPropagation()

        // @ts-ignore
        dropArea.current.style.opacity = 0.5
    }

    const handleFileUploadDrop = (event: SyntheticEvent) => {
        event.preventDefault()
        event.stopPropagation()

        // @ts-ignore
        const { files } = event.dataTransfer
        setIsFileUploaded(true)
        setUploadedFile(files[0])
        setFileUrl(URL.createObjectURL(files[0]))
    }

    const handleEnterKeyFromFileUrl = (event: SyntheticEvent) => {
        // @ts-ignore
        if (event.key === 'Enter') {
            // @ts-ignore
            verifyButton.current.click()
            // @ts-ignore
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

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()

        const colorRoute = isAnalog ? 'analog' : 'digital'

        await fetch(`${BACKEND_URL}/${colorRoute}_colors`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Authentication': 'TEMPORARY FILLER',
            'Content-Type': 'multipart/form-data',
          },
          body: JSON.stringify({
            analog_color: {
              image: uploadedFile,
              name: colorName,
              body: colorBody,
              brandname: colorBrandname,
              glossiness: colorGlossiness,
              lightfastness: colorLightfastness,
              medium: colorMedium,
              opaqueness: colorOpaqueness,
              series: colorSeries,
              thickness: colorThickness,
              tinting: colorTinting,
              creator_id: 1, // TEMP
            },
          }),
        })
        .then(() => router.replace('/'))
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
                        <strong>Create New Color</strong>
                    </legend>
                    <div className={`${styles.formField} ${styles.formFieldAsContainer} ${styles.vertical}`}>
                        {isFileUploaded
                            ? <>
                                <Image src={fileUrl} width={150} height={100} />
                                {/* @ts-ignore */}
                                <FontAwesomeIcon icon={faCircleXmark} size='lg' className={styles.cancelUploadIcon} onClick={cancelImageUpload} />
                            </>
                            : <>
                                <label>
                                    Drag an image<wbr /> of your color<wbr /> here:
                                </label>
                                {/* TODO: fix this so it shows */}
                                {/* @ts-ignore */}
                                <div className={styles.dragAndDrop} style={{backgroundImage: `url("data:image/svg+xml, ${svgString}")`}} onDragEnter={handleFileUploadDragEnter} onDragLeave={handleFileUploadDragLeave} onDragOver={handleFileUploadDragOver} onDrop={handleFileUploadDrop} ref={dropArea} />
                                <p>
                                    <strong>- OR -</strong>
                                </p>
                                <input type='file' accept='image/*' className={styles.fileInput} onChange={handleImageUpload} hidden={isValueInFileUrl} />
                                <p>
                                    <strong>- OR -</strong>
                                </p>
                                <label htmlFor='colorImageUrl'>
                                    Enter a URL for your image:
                                </label>
                                <input type='text' id='colorImageUrl' name='FileUrl' value={fileUrl} onChange={handleTextFieldChange} onKeyDown={handleEnterKeyFromFileUrl} />
                                {/* @ts-ignore */}
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
                        {/* @ts-ignore */}
                        <input type='text' id='colorName' name='ColorName' className={styles.formInput} value={colorName} onChange={handleTextFieldChange} ref={colorNameInput} />
                    </div>
                    <hr className={styles.formDivider} />
                    <label>
                        Additional Information
                    </label>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorBody'>
                            Body:
                        </label>
                        <ReactHTMLDatalist name='ColorBody' options={colorBodyDatalistOptions} classNames={styles.formInput} onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorBrandname'>
                            Brandname:
                        </label>
                        <input type='text' id='colorBrandname' name='ColorBrandname' className={styles.formInput} value={colorBrandname} onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorGlossiness'>
                            Glossiness:
                        </label>
                        <input type='number' id='colorGlossiness' name='ColorGlossiness' className={styles.formInput} value={colorGlossiness} min='0' max='100' onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorLightfastness'>
                            Lightfastness:
                        </label>
                        <input type='number' id='colorLightfastness' name='ColorLightfastness' className={styles.formInput} value={colorLightfastness} min='0' max='100' onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorMedium'>
                            Medium:
                        </label>
                        <ReactHTMLDatalist name='ColorMedium' options={colorMediumDatalistOptions} classNames={styles.formInput} onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorOpaqueness'>
                            Opaqueness:
                        </label>
                        <input type='number' id='colorOpaqueness' name='ColorOpaqueness' className={styles.formInput} value={colorOpaqueness} min='0' max='100'onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorSeries'>
                            Series:
                        </label>
                        <input type='text' id='colorSeries' name='ColorSeries' className={styles.formInput} value={colorSeries} onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorThickness'>
                            Thickness:
                        </label>
                        <input type='number' id='colorThickness' name='ColorThickness' className={styles.formInput} value={colorThickness} min='0' max='100' onChange={handleTextFieldChange} />
                    </div>
                    <div className={`${styles.formField} ${styles.inputGroup}`}>
                        <label htmlFor='colorTinting'>
                            Tinting:
                        </label>
                        <input type='number' id='colorTinting' name='ColorTinting' className={styles.formInput} value={colorTinting} min='0' max='100' onChange={handleTextFieldChange} />
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
