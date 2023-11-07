import Link from 'next/link'
import React from 'react'
import {navbarData} from "@/datasets/navbar"

const Footer = () => {
  return (
    <>
     <footer className="footer">
      <div className="container">
      <div className="row">
        <div className="col-12 text-center">
        <p className='mb-0 text-white pt-2 pb-2' style={{fontSize:'14px'}}>{navbarData.footer[0].text }</p>
        </div>
      </div>
      
      </div>
     
    </footer>
    </>
  )
}

export default Footer