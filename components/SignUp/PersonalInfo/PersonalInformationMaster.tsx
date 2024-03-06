import React, { useState } from 'react';
import styles from "@/styles/wizard.module.css";
import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import { useSelector } from 'react-redux';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SendEmailOTP from '@/services/api/auth_api/get_email_otp_for_registration_api';
import { toast } from "react-toastify";
import VerifyEmailOTP from '@/services/api/auth_api/verify_email_otp_for_registration_api';
import EnterEmail from './EnterEmail';
import EnterEmailVerificationCode from './EnterEmailVerificationCode';
import EnterPassword from './EnterPassword';
import EnterNameAndPhoneNumber from './EnterNameAndPhoneNumber';
import UploadCv from './UploadCv';
const PersonalInformationMaster = ({ formData, onFormDataChange, setStep, setInternalStep,
    internalStep
}: any) => {
    const translationDataFromStore = useSelector(translation_text_from_Store);
    const [currentStep, setCurrentStep] = useState(1);
    const [otpValues, setOtpValues] = useState<any>(['', '', '', '', '', '']);
    const validateEmail = (email: any) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    // Validation function for password
    const validatePassword = (password: any) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
        return passwordRegex.test(password);
    };

    const validateStep1 = () => {
        if (!validateEmail(formData.usr)) {
            toast.error(translationDataFromStore?.data?.toast_email_error, {
                autoClose: 3000,
                className: "custom-toast", // Close the notification after 3 seconds
            });
          
        }
    };

    const handleValidateOtpInput = () => {
        const isOtpFilled = otpValues.every((value: string) => value !== '');

        if (!isOtpFilled) {
            toast.error(
                translationDataFromStore?.data?.toast_notify_enter_otp_to_verify_email,
                {
                    autoClose: 3000,
                    className: "custom-toast",
                }
            );
  
        }
    }

    const handleValidateCv = () => {
        if (formData.upload_cv !== null) {
            setStep(1)
        } else {

            toast.error(translationDataFromStore?.data?.toast_upload_cv_error, {
                autoClose: 3000,
                className: "custom-toast", // Close the notification after 3 seconds
            });
        }
    }

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



    const handleSendEmailOtp = async () => {
        validateStep1();
        const verifyEmail = await SendEmailOTP(formData.usr);
        console.log('email verify', verifyEmail);
        if (verifyEmail?.data?.message?.msg === 'success') {
            toast.success(`${translationDataFromStore?.data?.toast_notify_otp_sent_on_email}`, {
                autoClose: 3000,
                className: "custom-toast", // Close the notification after 3 seconds
            })
            setTimeout(() => {
                setInternalStep(internalStep + 1);
            }, 5000)
        } else {
            console.log('email success')
        }
    }


    const handleVerifyEmailOtp = async () => {
        handleValidateOtpInput();
        const otpString = otpValues.join('');
        const verifyEmail = await VerifyEmailOTP(otpString, formData.usr);
        console.log('email verify', verifyEmail);
        // setInternalStep(internalStep + 1);
        if (verifyEmail?.data?.message?.msg === 'success') {
            toast.success(translationDataFromStore?.data?.toast_notify_otp_verified, {
                autoClose: 3000,
                className: "custom-toast",
            })
            setTimeout(() => {
                setInternalStep(internalStep + 1);
            }, 5000)
        } else if (verifyEmail?.data?.message?.msg === 'error') {
            toast.error(translationDataFromStore?.data?.toast_notify_otp_incorrect, {
                autoClose: 3000,
                className: "custom-toast",
            })
        } else {
            console.log('otp error else')
        }
    }

    console.log('verify', formData.usr)
    const handleNext = () => {
        if (internalStep === 3) {
            if (!validatePassword(formData.password)) {
                toast.error(translationDataFromStore?.data?.toast_password_error, {
                    autoClose: 3000,
                    className: "custom-toast", // Close the notification after 3 seconds
                });
                return false;
            } else {
                setInternalStep(internalStep + 1);
            }
        } else if (internalStep === 4) {
            if (formData.first_name === "") {
                toast.error(translationDataFromStore?.data?.toast_first_name_error, {
                    autoClose: 3000,
                    className: "custom-toast", // Close the notification after 3 seconds
                });

            }
            else if (formData.last_name === "") {
                toast.error(translationDataFromStore?.data?.toast_last_name_error, {
                    autoClose: 3000,
                    className: "custom-toast", // Close the notification after 3 seconds
                });

            }

            else if (formData.phone_no === "") {
                toast.error(translationDataFromStore?.data?.toast_number_error, {
                    autoClose: 3000,
                    className: "custom-toast", // Close the notification after 3 seconds
                });

            } else {
                setInternalStep(internalStep + 1);
            }
        } else if (internalStep === 5) {
            if (formData.upload_cv !== null) {
                setInternalStep(internalStep + 1);
            } else {

                toast.error(translationDataFromStore?.data?.toast_upload_cv_error, {
                    autoClose: 3000,
                    className: "custom-toast", // Close the notification after 3 seconds
                });
            }
        }

    };

    const handlePrev = () => {
        if (internalStep === 3) {
            setInternalStep(internalStep - 2);
        } else {
            setInternalStep(internalStep - 1);
        }

    };


    return (

        <div>
            {internalStep === 1 && (
                <EnterEmail
                    formData={formData}
                    onFormDataChange={onFormDataChange}
                    setInternalStep={setInternalStep}
                    internalStep={internalStep}
                />
            )}
            {internalStep === 2 && (

                <EnterEmailVerificationCode
                    setOtpValues={setOtpValues}
                    otpValues={otpValues}
                    handleChange={handleChange}
                    formData={formData}
                    handleSendEmailOtp={handleSendEmailOtp}

                />
            )}
            {internalStep === 3 && (
                <EnterPassword
                    formData={formData}
                    onFormDataChange={onFormDataChange}
                    setInternalStep={setInternalStep}
                    internalStep={internalStep}
                />
            )}
            {internalStep === 4 && (
                <EnterNameAndPhoneNumber
                    formData={formData}
                    onFormDataChange={onFormDataChange}
                    setInternalStep={setInternalStep}
                    internalStep={internalStep}
                />
            )}
            {internalStep === 5 && (
                <UploadCv
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
                                    if (internalStep === 1) {
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
                                {internalStep === 2 ? `${translationDataFromStore?.data?.verify}` : `${translationDataFromStore?.data?.next}`}
                                {/* {
                                    document.dir === 'ltr' ? <ArrowForwardIcon /> : <ArrowBackIcon />
                                } */}
                            </button>
                        ) : (
                            <button className={`btn ${styles.next_button}`} onClick={handleValidateCv}>
                                {translationDataFromStore?.data?.next}
                                {/* {document.dir === 'ltr' ? <ArrowForwardIcon /> : <ArrowBackIcon />} */}
                            </button>
                        )}
                    </div>
                    <div>
                        {internalStep !== 1 && (
                            <button
                                className={`btn ${styles.prev_button}`}
                                onClick={handlePrev}
                            >
                                {/* {
                                    document.dir === 'ltr' ? <ArrowBackIcon /> : <ArrowForwardIcon />
                                } */}

                                {translationDataFromStore?.data?.previous}
                            </button>
                        )}
                    </div>


                </div>
            </div>
        </div>

    );
};

export default PersonalInformationMaster;
