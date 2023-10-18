import React from 'react'
import thankyouImg from '../../public/assets/thankyou-1.png'
import thankyouImg1 from '../../public/assets/tv1.png'
import Link from 'next/link'

const ThankYou = () => {
  return (
    <div className="container">
        <div className="row">
          <div className="col-12">
            <div className='mb-5'>
                <img src={thankyouImg.src} alt="" width='120px'/>
            </div>
            <div className="">
            
              <h3>Thank you for your interest in working with strategic gears !!!</h3>
            </div>
            <div>
            <Link href='/' className='btn btn-signup '>Go To Home</Link>
           
            </div>
            <div>
            
            </div>
          </div>
        </div>
      </div>
  )
}

export default ThankYou