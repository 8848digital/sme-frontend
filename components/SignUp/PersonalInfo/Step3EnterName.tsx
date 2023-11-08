import React, { ChangeEvent } from 'react';
import Link from 'next/link';
import styles from "@/styles/wizard.module.css";
import useTranslationText from '@/hooks/general_hooks/transaltion_text_hook';

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
  const { translationData, translationLoading } = useTranslationText();

    return (
        <div className="container">
            <div className={`card p-4 ${styles.common_wizard_wrapper}`} style={{ maxWidth: '800px', height: '350px' }}>
                <div className="row">
                    <div className="col-12">
                        <div className='text-center'>
                            <h1>{translationData?.step} 3 {translationData?.of} 7</h1>
                            <h2>{translationData?.signup_personal}</h2>
                            <div className=' d-flex align-items-center justify-content-center flex-column'>
                                <input
                                    className="form-control w-75 mt-3 input-filed-height"
                                    type="text"
                                    placeholder={translationData?.first_name_placeholder}
                                    value={formData.first_name}
                                    onChange={handleFirstNameChange}
                                />
                                <input
                                    className="form-control w-75 mt-3 input-filed-height"
                                    type="text"
                                    placeholder={translationData?.last_name_placeholder}
                                    value={formData.last_name}
                                    onChange={handleLastNameChange}
                                />
                              
                                <input
                                    className="form-control w-75 mt-3 input-filed-height"
                                    type="text"
                                    placeholder={translationData?.phone_number}
                                    value={formData.phone_no}
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
