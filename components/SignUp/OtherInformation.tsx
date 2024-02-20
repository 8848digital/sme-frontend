import React, { useState } from 'react';
import Step2of3ExtractedDataFromCv from './ProfessionalInfo/Step5ExtractedDataFromCv';
import { useSelector } from 'react-redux';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import styles from "@/styles/wizard.module.css";

const OtherInformation = ({ formData, onFormDataChange, loading, educationLevel, setStep , setInternalStep ,internalStep}: any) => {
    const translationDataFromStore = useSelector(translation_text_from_Store);
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        setStep(2)
    };

    const handlePrev = () => {
        // setCurrentStep(currentStep - 1);
        setStep(0)
    };

    const handleStepSubmit = () => {
        setStep(2); // Assuming you're setting step 2 after completing step 4
    };

    return (
        <div className="container">
            {currentStep === 1 && (
                <Step2of3ExtractedDataFromCv
                    educationLevel={educationLevel}
                    loading={loading}
                    formData={formData}
                    onFormDataChange={onFormDataChange}
                />
            )}
            <div className={styles.button_wrapper}>
                <div className="text-center">
                    
                    <div className="mb-5 text-center">
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
                                className={`btn ${styles.prev_button}`}
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
    );
};

export default OtherInformation;
