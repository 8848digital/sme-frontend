import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import styles from "@/styles/wizard.module.css";
import { toast } from "react-toastify";
import OtherProfessionalExperienceInfo from './OtherProfessionalExperienceInfo';
const OtherInformationMaster = ({ formData, onFormDataChange, loading, educationLevel,
    setStep, setInternalStep, internalStep,
    industryList, industryListLoading, regionList, regionListLoading,
    serviceList, serviceListLoading, yearOfExpList, yearOfExpListLoading

}: any) => {
    const translationDataFromStore = useSelector(translation_text_from_Store);
    const [currentStep, setCurrentStep] = useState(1);
    const handleValidateOtherInfo = () => {
        if (formData.academic_background.length === 0) {
            toast.error(
                translationDataFromStore?.data?.toast_academic_information_error,
                {
                    autoClose: 3000,
                    className: "custom-toast", // Close the notification after 3 seconds
                }
            );
        } else if (formData.professional_experience.length === 0) {
            toast.error(
                translationDataFromStore?.data?.toast_professional_experience_error,
                {
                    autoClose: 3000,
                    className: "custom-toast", // Close the notification after 3 seconds
                }
            );

        } else if (formData.candidate_details.length === 0) {
            toast.error(
                  translationDataFromStore?.data?.toast_notify_industry_exp
                ,
                {
                    autoClose: 3000,
                    className: "custom-toast", // Close the notification after 3 seconds
                }
            );

        } else {
            setStep(2)
        }
    };
    const handleNext = () => {
        if (currentStep === 1) {

            handleValidateOtherInfo()
        }
    };

    const handlePrev = () => {
        // setCurrentStep(currentStep - 1);
        setStep(0)
    };

    const handleStepSubmit = () => {
        setStep(2); // Assuming you're setting step 2 after completing step 4
    };

    return (
        <div >

            <div >
                {currentStep === 1 && (
                    <OtherProfessionalExperienceInfo
                        educationLevel={educationLevel}
                        loading={loading}
                        formData={formData}
                        onFormDataChange={onFormDataChange}
                        industryList={industryList}
                        industryListLoading={industryListLoading}
                        regionList={regionList}
                        regionListLoading={regionListLoading}
                        serviceList={serviceList}
                        serviceListLoading={serviceListLoading}
                        yearOfExpList={yearOfExpList}
                        yearOfExpListLoading={yearOfExpListLoading}
                    />
                )}
            </div>
            <div >
                <div className={`${styles.common_wizard_btn}`}>

                    <div className="mb-3 ">
                        {currentStep === 1 ? (
                            <button
                                className={`btn ${styles.next_button}`}
                                onClick={handleNext}
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
    );
};

export default OtherInformationMaster;
