import Link from 'next/link';
import React from 'react';
import styles from "@/styles/bio.module.css";
import useTranslationText from '@/hooks/general_hooks/transaltion_text_hook';

const StepsDone = () => {
  const { translationData, translationLoading } = useTranslationText();
  return (
    <div className="container">
      <div className={`card p-4 ${styles.steps_done_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-4">
              <h1>{translationData?.done}</h1>
              <h2>{translationData?.signup_complete_description}</h2>
            </div>
            <div className='text-center mt-5'>
              <Link href='/build-your-bio' className='btn btn-signup mx-2'>{translationData?.build_your_bio_btn}</Link>
              <Link href='/thank-you' className='btn btn-later mx-2'>{translationData?.later}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepsDone;
