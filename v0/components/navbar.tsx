import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faCalendarPlus, faFolderPlus, faHouse, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import React from 'react'
import ReactTooltip from 'react-tooltip'

import { clearUser } from '../redux/features/user/userSlice'
import { clearToken } from '../redux/features/token/tokenSlice'
import { useAppDispatch } from '../redux/hooks'

import styles from '../styles/Navbar.module.scss'


const Navbar = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const signOut = () => {
    dispatch(clearUser())
    dispatch(clearToken())
  }


  return (
    <>
      <nav className={styles.navbar}>
        <FontAwesomeIcon icon={faCircleXmark} size='2x' className={`${styles.icon} ${styles.signOutIcon}`} onClick={signOut} data-tip='Sign Out' />
        <div />
        <FontAwesomeIcon icon={faSquarePlus} size='2x' className={styles.icon} onClick={() => router.push('/newColor')} data-tip='Create New Color' />
        <FontAwesomeIcon icon={faCalendarPlus} size='2x' className={styles.icon} data-tip='Create New Recipe' />
        <FontAwesomeIcon icon={faFolderPlus} size='2x' className={styles.icon} onClick={() => router.push('/newPackage')} data-tip='Create New Package' />
        <div />
        <FontAwesomeIcon icon={faHouse} size='2x' className={styles.icon} onClick={() => router.push('/')} data-tip='Home' />
      </nav>
      <ReactTooltip />
    </>
  )
}


export default Navbar
