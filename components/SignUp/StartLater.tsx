import Link from 'next/link'
import React from 'react'

const StartLater = () => {
    return (
        <>
            <div className="container">
                <div className="row">

                    <div className="col-12">
                        <div className='start-later-wrapper card p-4 shadow-lg' style={{ maxWidth: '800px', height: '400px' }}>
                            <h1>Sign Up In Just 3 Easy Steps!</h1>
                            <h2 className='mb-5'>Complete your registration in less than 2 minutes and get started!</h2>
                            <div className="">
                                <Link href='/wizard-master' className='btn btn-signup me-5'>Start</Link>
                                <Link href='' className='btn btn-later'>Later</Link>
                            </div>
                            <div className='mt-4 d-flex align-items-center justify-content-center'>
                                <input className="form-control w-100 me-2 " type="text" placeholder='Enter Email ...' />
                                <button type='button' className='btn btn-secondary  background'>Send</button>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StartLater