import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import React, { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import styles from "@/styles/wizard.module.css";
import Logo from '@/components/Logo';
import Link from 'next/link';


const EmailOtpCode = ({ handleChange, setOtpValues, otpValues ,handleSendEmailOtp }: any) => {
    const translationDataFromStore = useSelector(translation_text_from_Store);


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
                                <h1 className="" style={{ fontSize: '20px' }}>Enter Verification Code</h1>
                                <label className="grey mt-4" htmlFor="email">Secure</label>
                                <div className={`${styles.flexContainer} form-group`}>
                                    {otpValues.map((value: any, index: number) => (
                                        <input
                                            key={index}
                                            id={`otp-input-${index}`}
                                            type="text"
                                            maxLength={1}
                                            value={value}
                                            onChange={(event) => handleChange(index, event)}
                                            className='form-control'
                                            style={{ width: '61px', height: '60px', marginRight: '5px', textAlign: 'center', fontSize: '40px' }}
                                        />
                                    ))}
                                </div>

                                <p className='grey mb-0 mt-2' onClick={handleSendEmailOtp}>No Received? <Link href="">Resend</Link></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmailOtpCode;
