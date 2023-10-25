import Link from 'next/link';
import React, { useState } from 'react';
import styles from "@/styles/wizard.module.css";

interface Step2Props {
    formData: any;
    onFormDataChange: (field: string, value: any) => void;
}

const Step2VarificationCode = ({ formData, onFormDataChange }: any) => {
    const [userPassword, setUserPassword] = useState<any>('');

    const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userPwd = e.target.value;
        setUserPassword(userPwd);
        onFormDataChange('password', userPwd);
    };

    return (
        <div className="container">
            <div className={`card p-4 ${styles.common_wizard_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
                <div className="row">
                    <div className="col-12">
                        <div className='text-center mt-5'>
                            <h1>Step 2 of 7</h1>
                            <h2>Personal Information</h2>
                            <p>{formData.email}</p>
                                <p className='mb-2 me-2'>Enter Password</p>
                            <div>
                                <div className='d-flex align-items-center justify-content-center flex-column'>
                                   
                                        <input
                                           
                                            className="form-control me-2 w-75"
                                            type="password"
                                            
                                            value={formData.password}
                                            onChange={(e) => handleVerificationCodeChange(e)}
                                        />
                                   
                                </div>
                            </div>
                            {/* <p className='mt-2'>Not received? <Link href=''>Re-send</Link></p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2VarificationCode;
