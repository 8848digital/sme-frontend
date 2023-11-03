import React from 'react';
import style from "../../styles/homepage.module.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import subscriptionApi from '@/services/api/general_api/subscription_api';
import { toast } from 'react-toastify';

interface FormValues {
    usr: string;
   
}

const validationSchema = Yup.object({
    usr: Yup.string().email('Invalid email address').required('Email is required'),
});

const StartLater = () => {
    const initialValues: FormValues = {
        usr: '',
      

    };

    const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: any) => {
        try {
            // Logging the values to see if they are captured correctly
            console.log('Form Values:', values);

            const response = await subscriptionApi(values.usr);
            console.log('API Response:', response);
            if ( response.msg === 'success') {
                toast.success(`${response.data}`, {
                    autoClose: 3000,
                    className: 'custom-toast',// Close the notification after 3 seconds
                });
            }
            resetForm();
            // Handle the response here, you can show a success message or handle errors
        } catch (error) {
            console.error('API Error:', error);
            // Handle the error, show an error message, etc.
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container">
            <div className="row">

                <div className="col-12">
                    <div className='start-later-wrapper card p-4 shadow-lg' style={{ maxWidth: '800px', height: '400px' }}>
                        <h1>Sign Up In Just 3 Easy Steps!</h1>
                        <h2 className='mb-5'>Complete your registration in less than 2 minutes and get started!</h2>
                        <div className="">
                            <Link href='/wizard-master' className='btn btn-signup me-5'>Start</Link>
                            <Link href='/' className='btn btn-later'>Later</Link>
                        </div>

                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            {({ isSubmitting }) => (
                                <Form>
                                     {/* <p>Enter Your Email Address To get updates !!</p> */}
                                    <div className='d-flex mt-5'>
                                   
                                        <div className="form-group me-2">
                                            {/* <label htmlFor="email">
                                            Email Address<span className="text-danger">*</span>
                                        </label> */}
                                            <Field type="email" id="usr" name="usr" required className="form-control" placeholder='Enter Email ...' />
                                            <ErrorMessage name="usr" component="div" className="text-danger" />
                                        </div>

                                        <button type="submit" className='btn btn-secondary  background' disabled={isSubmitting}>
                                            Send
                                        </button>
                                    </div>

                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default StartLater