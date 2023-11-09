import Link from 'next/link'
import React from 'react'
import {navbarData} from "@/datasets/navbar"
import useTranslationText from '@/hooks/general_hooks/transaltion_text_hook';
import { useSelector } from 'react-redux';
import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';

const Footer = () => {
  const transtationDataFromStore = useSelector(translation_text_from_Store)

  return (
    <>
     <footer className="footer">
      <div className="container">
      <div className="row">
        <div className="col-12 text-center">
        <p className='mb-0 text-white pt-2 pb-2' style={{fontSize:'14px'}}>{transtationDataFromStore?.data?.footer}</p>
        </div>
      </div>
      
      </div>
     
    </footer>
    </>
  )
}

export default Footer