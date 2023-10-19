import Link from 'next/link';
import React from 'react';

const SignupStart = () => {
  return (
    <>
      <div className="container">
        <div className="start-wrapper card p-4 shadow-lg" style={{ maxWidth: '800px', height: '400px' }}> {/* Added inline styles for width and height */}
          <div className="row">
            <div className="col-12">
              <div className='text-center'>
                <h1 className='mb-4'>Sign Up In Just 3 Easy Steps!</h1>
                <h2 className=''>Complete your registration in less than 2 minutes and get started!</h2>
                <div className="signup-btn mt-5">
                  <Link href='/wizard-master' className='btn btn-signup mx-2'>Start</Link>
                  <Link href='/signup-later' className='btn btn-later mx-2'>Later</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupStart;
