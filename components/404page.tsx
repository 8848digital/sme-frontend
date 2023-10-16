import React from 'react'
import Image from 'next/image'
import Link from "next/link";

const Pagenotfound = () => {
  return (
    <>
      <div className="container" style={{ margin: 'auto auto' }}>
        <div className="row">
          <div className="col-12">
            <div className='text-center'>
            <h3 className="notfound_heading">Looking for something ?</h3>
            <p className="notfound_p">We&apos;re sorry. The Web address you entered is not a functioning page on our site.</p>
            <Link href="/" legacyBehavior><a className="btn btn-primary" type='button'>Go Home</a></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pagenotfound 