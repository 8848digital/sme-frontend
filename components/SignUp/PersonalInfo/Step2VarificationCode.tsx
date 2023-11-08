import Link from 'next/link';
import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import Material-UI icons
import styles from "@/styles/wizard.module.css";
import useTranslationText from '@/hooks/general_hooks/transaltion_text_hook';

interface Step2Props {
    formData: any;
    onFormDataChange: (field: string, value: any) => void;
}

const Step2VarificationCode = ({ formData, onFormDataChange }: any) => {
    const [userPassword, setUserPassword] = useState<any>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userPwd = e.target.value;
        setUserPassword(userPwd);
        onFormDataChange('password', userPwd);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
  const { translationData, translationLoading } = useTranslationText();

    return (
        <div className="container">
            <div className={`card p-4 ${styles.common_wizard_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
                <div className="row">
                    <div className="col-12">
                        <div className='text-center mt-5'>
                            <h1>{translationData?.step} 2 {translationData?.of} 7</h1>
                            <h2>{translationData?.signup_personal}</h2>
                            {/* <p><span className='pe-2'>Email:</span>{formData.usr}</p> */}
                            <p className='mb-2 me-2'>{translationData?.enter_password}</p>
                            <div>
                                <div className='d-flex align-items-center justify-content-center flex-column'>
                                    <TextField
                                        className="w-75"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e:any) => handleVerificationCodeChange(e)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={togglePasswordVisibility}>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
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
