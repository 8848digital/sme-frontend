import Link from 'next/link'
import React from 'react'

const SignupStart = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                  
                    <div className="col-12">
                        <div className='start-wrapper text-center'>
                            <h1>Sign Up In Just 3 Easy Steps!</h1>
                            <h3>Complete your registration in less than 2 minutes and get started!</h3>
                            <div className="signup-btn mt-4">
                                <Link href='/wizard-master' className='btn btn-signup mx-2'>Start</Link>
                                <Link href='/signup-later' className='btn btn-later mx-2'>Later</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupStart