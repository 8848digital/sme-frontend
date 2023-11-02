import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import SignUpMaster from '@/components/SignUp/SignUpMaster'
import SignupStart from '@/components/SignUp/SignupStart'
import Step2of3UploadCv from '@/components/SignUp/ProfessionalInfo/Step2of3UploadCv'
import Step3of3SelectAvailability from '@/components/SignUp/Preferences/Step3of3SelectAvailability'
import Step3of3EnterRates from '@/components/SignUp/Preferences/Step3of3EnterRates'
import StepsDone from '@/components/SignUp/Preferences/StepsDone'
import ThankYou from '@/components/SignUp/ThankYou'
import BuildYourBioMaster from '@/components/SignUp/BuildYourBio/BuildYourBioMaster'
import LandingPage from '@/components/LandingPage/LandingPage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <LandingPage/>
    {/* <SignUpMaster/> */}
    {/* <BuildYourBioMaster/> */}
   
    </>
  )
}
