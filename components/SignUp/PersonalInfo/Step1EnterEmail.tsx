import Link from "next/link";
import styles from "@/styles/wizard.module.css";
import React, { useState, useRef } from "react";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
const Step1EnterEmail = ({ formData, onFormDataChange }: any) => {
  // Handle the form field change
  const handleEmailChange = (e: any) => {
    const email = e.target.value;

    // Call the parent's (WizardMaster's) onFormDataChange to update the formData
    onFormDataChange('usr', email);
  };
  const { translationData, translationLoading } = useTranslationText();

  return (
    <>
      <div className="container">
        <div className={`card shadow-lg p-4 ${styles.common_wizard_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
          <div className="row">
            <div className="col-12">
              <div className='text-center mt-5'>
                <h1>{translationData?.step} 1 {translationData?.of} 7</h1>
                <h2>{translationData?.signup_personal}</h2>
                <div className='mt-4 d-flex flex-column align-items-center justify-content-center'>
                  {/* <p className="mb-0">Mandatory field <span>*</span></p> */}
                  <input
                    className="form-control w-75 me-2 input-filed-height"
                    type="email"
                    placeholder={translationData?.email_placeholder}
                    value={formData.usr}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1EnterEmail;
