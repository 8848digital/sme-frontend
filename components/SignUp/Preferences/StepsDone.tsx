import Link from 'next/link';
import React from 'react';
import styles from "@/styles/bio.module.css";

const StepsDone = () => {
  return (
    <div className="container">
      <div className={`card p-4 ${styles.steps_done_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-4">
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
    </div>
  );
}

export default StepsDone;
