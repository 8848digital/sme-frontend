import Link from 'next/link'
import React, { useState } from 'react';

interface Step2Props {
    formData: any; // Define your form data interface
    onFormDataChange: (field: string, value: any) => void;
}

const Step2VarificationCode = ({ formData, onFormDataChange }:any) => {
    const [verificationCodes, setVerificationCodes] = useState(['', '', '', '']);

    const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        // Update the local state with the new value
        const newVerificationCode = e.target.value;
        const updatedVerificationCodes = [...verificationCodes];
        updatedVerificationCodes[index] = newVerificationCode;
        setVerificationCodes(updatedVerificationCodes);

        // Now, you can directly access the updatedVerificationCodes and send it to onFormDataChange
        onFormDataChange('verificationCode', updatedVerificationCodes);
    };

    return (
        <div className="container">
            <div className="row">
             
                <div className="col-12">
                    <div className='text-center' style={{ marginTop: '150px' }}>
                        <h1>Step 2 of 3</h1>
                        <h3>Personal Information</h3>

                        <p>{formData.email}</p>
                        <div>
                            <p>Enter Verification Code Below</p>
                            <div className='d-flex align-items-center justify-content-center'>
                                {verificationCodes.map((code, index) => (
                                    <input
                                        key={index}
                                        className="form-control me-2"
                                        type="text"
                                        style={{ width: '50px' }}
                                        value={code}
                                        onChange={(e) => handleVerificationCodeChange(e, index)}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className='mt-2'>Not received? <Link href=''>Re-send</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Step2VarificationCode;
