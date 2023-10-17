import Link from 'next/link'
import React from 'react'

const StepsDone = () => {
  return (
    <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h1>Done</h1>
              <h3>Our team will review your profile and get back to you soon !!!</h3>
            </div>
            <div>
            <Link href='' className='btn btn-signup me-5'>Build your bio</Link>
            <Link href='/signup-later' className='btn btn-later'>Later?</Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default StepsDone