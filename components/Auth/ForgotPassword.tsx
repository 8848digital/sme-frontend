import React from 'react'
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { get_access_token } from '@/store/slices/auth_slice/login_slice';
import ForgetPasswordLinkAPI from '@/services/api/auth_api/forget_password_link_api';
import { toast } from 'react-toastify';
import styles from "@/styles/auth.module.css";
interface FormValues {
  email: any
}

const ForgotPassword = () => {
  const token = useSelector(get_access_token);
  const router = useRouter();
  const initialValues: FormValues = {
    email: "",
  };
  const [message, setMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  useEffect(() => {
    if (message === "success" || message === "error") {
      setIsAlertVisible(true);
    }
  }, [message]);
  const handlesubmit = async (values: any, action: any) => {
    console.log('values', values)
    const response = await ForgetPasswordLinkAPI(values.email, token.token);
    if (response === 'success') {
      toast.success('Password Reset Link Sent to your Registerd Email successfully', {
        autoClose: 3000,
        className: 'custom-toast',// Close the notification after 3 seconds
      });
      action.resetForm();
      setTimeout(() => {
        router.push('/');
      }, 5000)
    } else if (response === 'error') {
      toast.error(`Enter Correct Email ${response.error}`, {
        autoClose: 3000,
        className: 'custom-toast',// Close the notification after 3 seconds
      });
    } else {
      toast.error(`Enter Correct Email! ${response.error}`, {
        autoClose: 3000,
        className: 'custom-toast',// Close the notification after 3 seconds
      });
    }



  }
  return (
    <>

      <div className="container mt-5">
        <div className={` card ${styles.auth_common_wrapper}`}>

          <div className="row">
            <div className="col-12">

              <div className="page_heading text-center">
                <h1 className="text-uppercase">forgot your password</h1>
                <p className="mt-4 ms-2">
                  Please enter your email address associated with your account and we
                  will email you instructions to reset your password.
                </p>
              </div>
            </div>
            <div className={`col-lg-6 col-sm-9 col-12 mx-auto form_wrap`}>
              <Formik
                initialValues={initialValues}
                // validationSchema={ForgotValidation}
                onSubmit={(values, action) => handlesubmit(values, action)}
              >
                {({ handleChange, handleBlur }) => (
                  <FormikForm className="">
                    <div className=" text-center mt-2">
                      <div className="container">
                        <div className="row">
                          {/* <div className="col-md-3 ">
                        <div className="label text-end">
                          <label htmlFor="" className="forgotpassword_label">
                            Email ID:
                          </label>
                        </div>
                      </div> */}
                          <div className="col-md-12">
                            <div className="email_block form-group">
                              <Field
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={handleChange}
                                placeholder='Enter Your Email Here'
                              />
                              <br />
                              <div className="error_message">
                                <ErrorMessage name="email" />
                              </div>
                            </div>
                            {isAlertVisible && (
                              <div
                                className={`alert ${message === "success"
                                  ? "alert-success"
                                  : "alert-danger"
                                  } otp_alertbox`}
                                role="alert"
                              >
                                {message === "success"
                                  ? "Link is send sucessfully on registered email"
                                  : "Please enter valid or registered email"}
                              </div>
                            )}
                          </div>

                        </div>

                        <div className={`${styles.custom_btn}`}>
                          <button
                            type="button"
                            className={`btn btn-signup ${styles.common_btn} me-md-5`}
                            style={{ fontWeight: "600" }}
                          >
                            <Link href="/login" className="text-white" style={{textDecoration:'none'}}>
                              Back
                            </Link>
                          </button>
                          <button
                            type="submit"
                            className='btn btn-signup'
                            style={{ fontWeight: "600" }}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </FormikForm>
                )}
              </Formik>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default ForgotPassword;