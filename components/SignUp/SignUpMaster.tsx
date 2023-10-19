import Link from 'next/link'
import React from 'react'

const SignUpMaster = () => {
    return (
        <>
            <div className='container'>
                <div className="signup-wrapper">
                <div className="row">
                    <div className="col-12">
                        <div className="signup_intro">
                            <h1>Welcome To SME</h1>
                            {/* <p>You Can Sign Up Here</p> */}
                        {/* <div className="signup-btn">
                            <Link href='/signup-start' className='btn btn-signup'>Signup</Link>
                        </div> */}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default SignUpMaster