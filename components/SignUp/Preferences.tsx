
import React, { useState } from 'react';
import Step2of3ExtractedDataFromCv from './ProfessionalInfo/Step5ExtractedDataFromCv';
import { useSelector } from 'react-redux';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import styles from "@/styles/wizard.module.css";
import Step3of3SelectAvailability from './Preferences/Step6SelectAvailability';
import { useRouter } from 'next/router';
import Step3of3EnterRates from './Preferences/Step7EnterRates';
const Preferences = ({ formData, onFormDataChange, loading, educationLevel,
  setStep, setInternalStep, internalStep, preference, preferenceLoading,
  priceBasisLoading, priceBasis }: any) => {
  const translationDataFromStore = useSelector(translation_text_from_Store);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const handleNext = () => {
    router.push("/steps-done");
  };

  const handlePrev = () => {
    // setCurrentStep(currentStep - 1);
    setStep(1)
  };

  const handleStepSubmit = () => {
    router.push("/steps-done");
  };

  return (
    <div >
      <div>
      {
        currentStep === 1 && (

          <Step3of3EnterRates
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
                onClick={handleNext}
              >
                {translationDataFromStore?.data?.next}
                {document.dir === 'ltr' ? <ArrowForwardIcon /> : <ArrowBackIcon />}
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
                {document.dir === 'ltr' ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                {translationDataFromStore?.data?.previous}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preferences