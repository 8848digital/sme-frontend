import Link from 'next/link'
import React from 'react'
import {navbarData} from "@/datasets/navbar"
import useTranslationText from '@/hooks/general_hooks/transaltion_text_hook';

const Footer = () => {
  const { translationData, translationLoading } = useTranslationText();
  return (
    <>
     <footer className="footer">
      <div className="container">
      <div className="row">
        <div className="col-12 text-center">
        <p className='mb-0 text-white pt-2 pb-2' style={{fontSize:'14px'}}>{translationData?.footer}</p>
        </div>
      </div>
      
      </div>
     
    </footer>
    </>
  )
}

export default Footer