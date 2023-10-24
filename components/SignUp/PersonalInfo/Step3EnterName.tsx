import React, { ChangeEvent } from 'react';
import Link from 'next/link';
import styles from "@/styles/wizard.module.css";

interface Step3Props {
    formData: any;
    onFormDataChange: (field: string, value: any) => void;
}

const Step3EnterName: React.FC<Step3Props> = ({ formData, onFormDataChange }) => {
    const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const firstName = e.target.value;
        onFormDataChange('first_name', firstName);
    };

    const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const lastName = e.target.value;
        onFormDataChange('last_name', lastName);
    };

    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const phoneNumber = e.target.value;
        onFormDataChange('phone_no', phoneNumber);
    };

    return (
        <div className="container">
            <div className={`card p-4 ${styles.common_wizard_wrapper}`} style={{ maxWidth: '800px', height: '350px' }}>
                <div className="row">
                    <div className="col-12">
                        <div className='text-center'>
                            <h1>Step 3 of 7</h1>
                            <h2>Personal Information</h2>
                            <div className=' d-flex align-items-center justify-content-center flex-column'>
                                <input
                                    className="form-control w-75 mt-3 input-filed-height"
                                    type="text"
                                    placeholder='Enter First Name ...'
                                    value={formData.firstName}
                                    onChange={handleFirstNameChange}
                                />
                                <input
                                    className="form-control w-75 mt-3 input-filed-height"
                                    type="text"
                                    placeholder='Enter Last Name ...'
                                    value={formData.lastName}
                                    onChange={handleLastNameChange}
                                />
                              
                                <input
                                    className="form-control w-75 mt-3 input-filed-height"
                                    type="text"
                                    placeholder='Phone Number ...'
                                    value={formData.phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                />
                                {/* <Link href='' className='mt-3'>Verify Number</Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step3EnterName;
