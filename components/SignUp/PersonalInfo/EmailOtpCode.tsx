import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import React, { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import styles from "@/styles/wizard.module.css";
import Logo from '@/components/Logo';

const EmailOtpCode: React.FC = () => {
    const translationDataFromStore = useSelector(translation_text_from_Store);
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);

    const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
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

    const handleSendOtp = () => {
        const otp = otpValues.join('');
        // Here you can send `otp` to your API
        console.log('OTP:', otp);
        // Reset the OTP input fields
        setOtpValues(['', '', '', '', '', '']);
    };

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
                                    <label className="grey" htmlFor="email">Secure</label>
                                <div className={`${styles.flexContainer} form-group mt-4`}>
                                    {otpValues.map((value, index) => (
                                        <input
                                            key={index}
                                            id={`otp-input-${index}`}
                                            type="text"
                                            maxLength={1}
                                            value={value}
                                            onChange={(event) => handleChange(index, event)}
                                            className='form-control'
                                            style={{ width: '61px',height:'60px', marginRight: '5px' ,textAlign:'center',fontSize:'40px'}}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmailOtpCode;
