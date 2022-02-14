import type { NextPage } from 'next'
import Image from 'next/image'


const Dashboard: NextPage = () => {
  return (
    <div>
      <Image src='https://picsum.photos/200/300' width={200} height={300} />
    </div>
  )
}


export default Dashboard
