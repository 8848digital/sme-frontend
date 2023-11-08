import useTranslationText from '@/hooks/general_hooks/transaltion_text_hook';
import Link from 'next/link';
import React from 'react';

const SignupStart = () => {
  const { translationData, translationLoading } = useTranslationText();
  return (
    <>
      <div className="container">
        <div className="start-wrapper card p-4 shadow-lg" style={{ maxWidth: '800px', height: '400px' }}> {/* Added inline styles for width and height */}
          <div className="row">
            <div className="col-12">
              <div className='text-center'>
                <h1 className='mb-4'>{translationData?.signup_header}</h1>
                <h2 className=''>{translationData?.signup_description}</h2>
                <div className="signup-btn mt-5">
                  <Link href='/wizard-master' className='btn btn-signup mx-2'>{translationData?.start}</Link>
                  <Link href='/signup-later' className='btn btn-later mx-2'>{translationData?.later}</Link>
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
