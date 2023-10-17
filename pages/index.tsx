import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import SignUpMaster from '@/components/SignUp/SignUpMaster'
import SignupStart from '@/components/SignUp/SignupStart'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <SignUpMaster/>
    </>
  )
}
