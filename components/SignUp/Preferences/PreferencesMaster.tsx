import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import styles from "@/styles/wizard.module.css";
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import PreferencesInfo from './PreferencesInfo';
const PreferencesMaster = ({ formData, onFormDataChange, loading, educationLevel,
  setStep, setInternalStep, internalStep, preference, preferenceLoading,
  priceBasisLoading, priceBasis ,handleSubmit }: any) => {
  const translationDataFromStore = useSelector(translation_text_from_Store);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

   const handleValidatePreference = () => {
    if (formData.preferences === "") {
      toast.error(translationDataFromStore?.data?.toast_select_error, {
        autoClose: 3000,
        className: "custom-toast", // Close the notification after 3 seconds
      });

    }else if (formData.hourly_rates === "") {
      toast.error(translationDataFromStore?.data?.toast_rates_error, {
        autoClose: 3000,
        className: "custom-toast", // Close the notification after 3 seconds
      });
    }else if (formData.price_basis === "") {
      toast.error(translationDataFromStore?.data?.toast_price_error, {
        autoClose: 3000,
        className: "custom-toast", // Close the notification after 3 seconds
      });
    }else {
      handleSubmit();
    }
   }
 
  const handlePrev = () => {
    // setCurrentStep(currentStep - 1);
    setStep(1)
  };

  const handleStepSubmit = () => {
    if ( currentStep == 1) {
      handleValidatePreference();
    }
   
  };

  return (
    <div >
      <div>
      {
        currentStep === 1 && (

          <PreferencesInfo
            preference={preference}
            priceBasis={priceBasis}
            preferenceLoading={preferenceLoading}
            priceBasisLoading={priceBasisLoading}
            formData={formData}
            onFormDataChange={onFormDataChange}
            setInternalStep={setInternalStep}
            internalStep={internalStep}
            loading={loading}
            educationLevel={educationLevel}

          />
        )
      }
      </div>
      <div className={`${styles.common_wizard_btn}`}>
        <div className={styles.button_wrapper}>

          <div className="mb-3">
            {currentStep === 1 ? (
              <button
                className={`btn ${styles.next_button}`}
                onClick={handleStepSubmit}
              >
                {translationDataFromStore?.data?.next}
                {/* {document.dir === 'ltr' ? <ArrowForwardIcon /> : <ArrowBackIcon />} */}
              </button>
            ) : (
              <button className={`btn ${styles.next_button}`} onClick={handleStepSubmit}>
                {translationDataFromStore?.data?.next}
              </button>
            )}
          </div>
          <div>
            {currentStep === 1 && (
              <button
                className={`btn mb-3 ${styles.prev_button}`}
                onClick={handlePrev}
              >
                {/* {document.dir === 'ltr' ? <ArrowBackIcon /> : <ArrowForwardIcon />} */}
                {translationDataFromStore?.data?.previous}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreferencesMaster;