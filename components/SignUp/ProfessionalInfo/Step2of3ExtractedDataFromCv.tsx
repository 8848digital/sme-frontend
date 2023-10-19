import React from 'react';
import styles from "@/styles/wizard.module.css";

const Step2of3ExtractedDataFromCv = () => {
  return (
    <div className="container">
      <div className={`card p-4 ${styles.common_wizard_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-5">
              <h1>Step 2 of 3</h1>
              <h2>Professional Information</h2>
              <p>This data will be extracted from CV</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2of3ExtractedDataFromCv;
