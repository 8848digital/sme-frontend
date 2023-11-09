import useTranslationText from '@/hooks/general_hooks/transaltion_text_hook';
import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

const SignupStart = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store)

  return (
    <>
      <div className="container">
        <div className="start-wrapper card p-4 shadow-lg" style={{ maxWidth: '800px', height: '400px' }}> {/* Added inline styles for width and height */}
          <div className="row">
            <div className="col-12">
              <div className='text-center'>
                <h1 className='mb-4'>{translationDataFromStore?.data?.signup_header}</h1>
                <h2 className=''>{translationDataFromStore?.data?.signup_description}</h2>
                <div className="signup-btn mt-5">
                  <Link href='/wizard-master' className='btn btn-signup mx-2'>{translationDataFromStore?.data?.start}</Link>
                  <Link href='/signup-later' className='btn btn-later mx-2'>{translationDataFromStore?.data?.later}</Link>
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
