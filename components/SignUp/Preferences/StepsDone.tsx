import Link from 'next/link'
import React from 'react'

const StepsDone = () => {
  return (
    <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center" style={{ marginTop: '150px' }}>
              <h1>Done</h1>
              <h3>Our team will review your profile and get back to you soon !!!</h3>
            </div>
            <div className='text-center mt-5'>
            <Link href='/build-your-bio' className='btn btn-signup mx-2'>Build your bio</Link>
            <Link href='/thank-you' className='btn btn-later mx-2'>Later?</Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default StepsDone