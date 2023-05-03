import Image from 'next/image'
import { Inter } from 'next/font/google'
import Register from '@/components/register/register'
import Login from '@/components/login/login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Register/>
  )
}
