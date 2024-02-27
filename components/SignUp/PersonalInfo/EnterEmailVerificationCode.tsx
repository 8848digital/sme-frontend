import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import React, { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import styles from "@/styles/wizard.module.css";
import Logo from '@/components/Logo';
import Link from 'next/link';
import SendEmailOTP from '@/services/api/auth_api/get_email_otp_for_registration_api';
import { toast } from "react-toastify";

const EnterEmailVerificationCode = ({ handleChange, setOtpValues, otpValues ,formData,handleSendEmailOtp }: any) => {
    const translationDataFromStore = useSelector(translation_text_from_Store);
    const handleResendEmailOtp = async () => {
        const verifyEmail = await SendEmailOTP(formData.usr);
        console.log('email verify', verifyEmail);
        if (verifyEmail?.data?.message?.msg === 'success') {
            toast.success(translationDataFromStore?.data?.toast_notify_enter_otp_to_verify_email, {
                autoClose: 3000,
                className: "custom-toast", // Close the notification after 3 seconds
            })
        } else {
            console.log('email success')
        }
    }

    console.log('otp', otpValues)
    return (
        <>
            <div>
                <div
                    className={`${styles.common_wizard_wrapper}`}
                >
                    <div className="row">
                        <div className="col-12">
                            <div className="">
                                <Logo />
                            </div>
                            <div className=" mt-5">
                                <h1 className="" style={{ fontSize: '20px' }}>
                                    {translationDataFromStore?.data?.enter_emai_verification_code}
                                    </h1>
                                <label className="grey mt-4" htmlFor="email">
                                {translationDataFromStore?.data?.secure}
                                    </label>
                                <div className={`${styles.flexContainer} form-group`}>
                                    {otpValues.map((value: any, index: number) => (
                                        <input
                                            key={index}
                                            id={`otp-input-${index}`}
                                            type="text"
                                            maxLength={1}
                                            value={value}
                                            onChange={(event) => handleChange(index, event)}
                                            className={`form-control ${styles.otp_input}`}
                                          
                                        />
                                    ))}
                                </div>

                                <p className='grey mb-0 mt-2' onClick={handleSendEmailOtp}>{translationDataFromStore?.data?.no_received}? <Link href="">{translationDataFromStore?.data?.resend}</Link></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EnterEmailVerificationCode;
