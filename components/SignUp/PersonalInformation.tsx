import React, { useState } from 'react';
import Step1EnterEmail from './PersonalInfo/Step1EnterEmail';
import Step2of3UploadCv from './ProfessionalInfo/Step4UploadCv';
import Step3EnterName from './PersonalInfo/Step3EnterName';
import Step2VarificationCode from './PersonalInfo/Step2VarificationCode';
import styles from "@/styles/wizard.module.css";
import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import { useSelector } from 'react-redux';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const PersonalInformation = ({ formData, onFormDataChange, setStep ,setInternalStep ,internalStep }: any) => {
    const translationDataFromStore = useSelector(translation_text_from_Store);
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        setInternalStep(internalStep + 1);
    };

    const handlePrev = () => {
        setInternalStep(internalStep - 1);
    };

    return (
        <div className="container">
            <div>
                {internalStep === 1 && (
                    <Step1EnterEmail
                        formData={formData}
                        onFormDataChange={onFormDataChange}
                        setInternalStep={setInternalStep}
                    internalStep={internalStep}
                    />
                )}
                {internalStep === 2 && (
                    <Step2VarificationCode
                        formData={formData}
                        onFormDataChange={onFormDataChange}
                        setInternalStep={setInternalStep}
                        internalStep={internalStep}
                    />
                )}
                {internalStep === 3 && (
                    <Step3EnterName
                        formData={formData}
                        onFormDataChange={onFormDataChange}
                        setInternalStep={setInternalStep}
                        internalStep={internalStep}
                    />
                )}
                {internalStep === 4 && (
                    <Step2of3UploadCv
                        formData={formData}
                        onFormDataChange={onFormDataChange}
                        setInternalStep={setInternalStep}
                        internalStep={internalStep}
                    />
                )}
        
                <div className={styles.button_wrapper}>
                    <div className="text-center">
                      
                        <div className="mb-5 text-center">
                            {internalStep !== 4 ? (
                                <button
                                    className={`btn ${styles.next_button}`}
                                    onClick={handleNext}
                                >
                                    {translationDataFromStore?.data?.next}
                                    {
                                        document.dir === 'ltr' ? <ArrowForwardIcon /> : <ArrowBackIcon />
                                    }
                                </button>
                            ) : (
                                <button className={`btn ${styles.next_button}`} onClick={() => { setStep(1) }}>
                                    {translationDataFromStore?.data?.next}
                                </button>
                            )}
                        </div>
                        <div>
                            {internalStep !== 1 && (
                                <button
                                    className={`btn ${styles.prev_button}`}
                                    onClick={handlePrev}
                                >
                                    {
                                        document.dir === 'ltr' ? <ArrowBackIcon /> : <ArrowForwardIcon />
                                    }

                                    {translationDataFromStore?.data?.previous}
                                </button>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInformation;