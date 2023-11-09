import Link from 'next/link';
import React from 'react';
import styles from "@/styles/bio.module.css";
import useTranslationText from '@/hooks/general_hooks/transaltion_text_hook';
import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import { useSelector } from 'react-redux';

const StepsDone = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store)

  return (
    <div className="container">
      <div className={`card p-4 ${styles.steps_done_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-4">
              <h1>{translationDataFromStore?.data?.done}</h1>
              <h2>{translationDataFromStore?.data?.signup_complete_description}</h2>
            </div>
            <div className='text-center mt-5'>
              <Link href='/build-your-bio' className='btn btn-signup mx-2'>{translationDataFromStore?.data?.build_your_bio_btn}</Link>
              <Link href='/thank-you' className='btn btn-later mx-2'>{translationDataFromStore?.data?.later}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepsDone;
