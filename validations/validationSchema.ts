import * as Yup from 'yup';
export const validationSchemas = [
    Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    Yup.object().shape({
        verificationCode: Yup.array()
            .of(Yup.string().required('Verification code is required'))
            .min(4, 'Verification code must have 4 digits')
            .max(4, 'Verification code must have 4 digits'),
    }),
    // Add more validation schemas for other steps if needed
];