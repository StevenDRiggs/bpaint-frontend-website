import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useNoTokenSignOut } from '../react/hooks'
import { clearUser } from '../redux/features/user/userSlice'
import { clearToken } from '../redux/features/token/tokenSlice'
import { useAppDispatch } from '../redux/hooks'


const Dashboard: NextPage = () => {
  useNoTokenSignOut()

  const dispatch = useAppDispatch()
  const router = useRouter()

  const signOut = () => {
    dispatch(clearUser())
    dispatch(clearToken())
  }


  return (
    <>
      <button type='button' onClick={signOut}>
        Sign Out
      </button>
      <div>
        <Image src='https://picsum.photos/200/300' width={200} height={300} />
      </div>
    </>
  )
}


export default Dashboard
