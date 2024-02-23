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
import EmailOtpCode from './PersonalInfo/EmailOtpCode';
import SendEmailOTP from '@/services/api/auth_api/get_email_otp_for_registration_api';
import { toast } from "react-toastify";
import VerifyEmailOTP from '@/services/api/auth_api/verify_email_otp_for_registration_api';
const PersonalInformation = ({ formData, onFormDataChange, setStep, setInternalStep, internalStep }: any) => {
    const translationDataFromStore = useSelector(translation_text_from_Store);
    const [currentStep, setCurrentStep] = useState(1);
     
    const handleSendEmailOtp = async () => {
        const verifyEmail = await SendEmailOTP(formData.usr);
        console.log('email verify', verifyEmail);
        if (verifyEmail?.data?.message?.msg === 'success') {
            toast.success("Otp sent on you email", {
                autoClose: 3000,
                className: "custom-toast", // Close the notification after 3 seconds
            })
            setTimeout(()=>{
                setInternalStep(internalStep + 1);
            },5000)
        } else {
            console.log('email success')
        }
    }

    const [otpValues, setOtpValues] = useState<any>(['', '', '', '', '', '']);

    const handleChange = (index: number, event: any) => {
        const value = event.target.value;
        if (!isNaN(Number(value)) && value.length <= 1) {
            const updatedOtpValues = [...otpValues];
            updatedOtpValues[index] = value;
            setOtpValues(updatedOtpValues);
            if (index < 5 && value !== '') {
                const nextInput = document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement;
                if (nextInput) nextInput.focus();
            }
        }
    };
    const handleVerifyEmailOtp = async () => {
        const otpString = otpValues.join('');
        const verifyEmail = await VerifyEmailOTP(otpString, formData.usr);
        console.log('email verify', verifyEmail);
        // setInternalStep(internalStep + 1);
        if (verifyEmail?.data?.message?.msg === 'success') {
            toast.success("Otp verified", {
                autoClose: 3000,
                className: "custom-toast",
            })
            setTimeout(() => {
                setInternalStep(internalStep + 1);
             },5000)
        } else if (verifyEmail?.data?.message?.msg === 'error') {
            console.log('otp error')
        }else {
            console.log('otp error else')
        }
    }

    console.log('verify', formData.usr)
    const handleNext = async () => {
        setInternalStep(internalStep + 1);
        // if(internalStep === 1) {
        //     handleSendEmailOtp();
        //     setTimeout(() => {
        //         setInternalStep(internalStep + 1);
        //     }, 5000);
        // } {
        //     setInternalStep(internalStep + 1);
        // }
    };

    const handlePrev = () => {
        if (internalStep === 3){
            setInternalStep(internalStep - 2);
        }else {
            setInternalStep(internalStep - 1);
        }
            
    };


    return (

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

                <EmailOtpCode
                    setOtpValues={setOtpValues}
                    otpValues={otpValues}
                    handleChange={handleChange}
                    handleSendEmailOtp={handleSendEmailOtp}
                />
            )}
            {internalStep === 3 && (
                <Step2VarificationCode
                    formData={formData}
                    onFormDataChange={onFormDataChange}
                    setInternalStep={setInternalStep}
                    internalStep={internalStep}
                />
            )}
            {internalStep === 4 && (
                <Step3EnterName
                    formData={formData}
                    onFormDataChange={onFormDataChange}
                    setInternalStep={setInternalStep}
                    internalStep={internalStep}
                />
            )}
            {internalStep === 5 && (
                <Step2of3UploadCv
                    formData={formData}
                    onFormDataChange={onFormDataChange}
                    setInternalStep={setInternalStep}
                    internalStep={internalStep}
                />
            )}

            <div className={`${styles.common_wizard_btn}`}>
                <div className={styles.button_wrapper}>

                    <div className="mb-3 ">
                        {internalStep !== 5 ? (

                            <button
                                className={`btn ${styles.next_button}`}
                                onClick={() => {
                                    if(internalStep === 1)
                                    {
                                        handleSendEmailOtp();
                                    }
                                    else if (internalStep === 2) {
                                        handleVerifyEmailOtp();
                                    } else {
                                        
                                        handleNext();
                                    }
                                }}
                            >
                                {/* {translationDataFromStore?.data?.next} */}
                               {internalStep === 2 ? 'Verify':'Next'} 
                                {
                                    document.dir === 'ltr' ? <ArrowForwardIcon /> : <ArrowBackIcon />
                                }
                            </button>
                        ) : (
                            <button className={`btn ${styles.next_button}`} onClick={() => { setStep(1) }}>
                                {translationDataFromStore?.data?.next}
                                {document.dir === 'ltr' ? <ArrowForwardIcon /> : <ArrowBackIcon />}
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

    );
};

export default PersonalInformation;
