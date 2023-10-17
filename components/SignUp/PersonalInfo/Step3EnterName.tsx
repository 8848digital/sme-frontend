import React, { ChangeEvent } from 'react';
import Link from 'next/link';

interface Step3Props {
    formData: any; // Define your form data interface
    onFormDataChange: (field: string, value: any) => void;
}

const Step3EnterName: React.FC<Step3Props> = ({ formData, onFormDataChange }) => {
    const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const firstName = e.target.value;

        // Call the parent's (WizardMaster's) onFormDataChange to update the formData
        onFormDataChange('firstName', firstName);
    };

    const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const lastName = e.target.value;

        // Call the parent's (WizardMaster's) onFormDataChange to update the formData
        onFormDataChange('lastName', lastName);
    };

    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const phoneNumber = e.target.value;

        // Call the parent's (WizardMaster's) onFormDataChange to update the formData
        onFormDataChange('phoneNumber', phoneNumber);
    };

    return (
        <div className="container">
            <div className="row">
               
                <div className="col-12">
                    <div className='text-center' style={{ marginTop: '150px' }}>
                        <h1>Step 3 of 3</h1>
                        <h3>Personal Information</h3>
                        <div className='mt-4 d-flex align-items-center justify-content-center flex-column'>
                              
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
                            </div>

                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step3EnterName;
