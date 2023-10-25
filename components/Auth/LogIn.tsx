import React, { useEffect, useState } from 'react'
import {
    Formik,
    Form as FormikForm,
    ErrorMessage,
    useFormikContext,
} from "formik";
import { Form } from "react-bootstrap";
import { LoginValidation } from '@/validation/loginValidation';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { getAccessToken, get_access_token } from '@/store/slices/auth_slice/login_slice';
import { toast } from 'react-toastify';
import styles from "@/styles/auth.module.css";
const LogIn = () => {
    const [message, setMessage] = useState("");
    const [newValue, setnewValue] = useState<any>("");
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [loginAlert, setloginAlert] = useState(false);
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showErrorToast, setshowErrorToast] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const tokenFromStore = useSelector(get_access_token);
    console.log('login token from store', tokenFromStore);
    let handlesubmit = async (values: any) => {
        console.log('login value check', values.email);
        try {
            const response = await dispatch(getAccessToken({ usr: values.email, password: values.password }));
            console.log('login render file', response.payload);
            // On success
            if (response.payload.msg === 'success') {
                // Show a success notification
                toast.success('Login successful', {
                    autoClose: 3000,
                    className: 'custom-toast',// Close the notification after 3 seconds
                });
                router.push("/");
            } else if (response.payload.msg === 'error') {
                toast.error('Login failed. Please check your credentials and try again.', {
                    autoClose: 5000,
                    className: 'custom-toast',// Close the notification after 3 seconds
                });
            }else{
                toast.error('Login failed. Please check your credentials and try again.', {
                    autoClose: 5000,
                    className: 'custom-toast',// Close the notification after 3 seconds
                });
            }
        } catch (error) {
            // On error
            // Show an error notification
            toast.error('Login failed. Please check your credentials and try again.', {
                autoClose: 5000, // Close the notification after 5 seconds
            });

            // Handle the error as needed
            console.error('Login error:', error);
        }
    };


    const onKeydown = (keyEvent: any) => {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
            handlesubmit(newValue);
        }
    }
    const FormObserver: React.FC = () => {
        const { values } = useFormikContext();
        useEffect(() => {
            setnewValue(values);
        }, [values]);
        return null;
    };
    return (
        <>
            <div className="container page-margin-top">
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={LoginValidation}
                    onSubmit={(values) => {
                        handlesubmit(values);
                    }}
                >
                    {({ handleChange, handleBlur }) => (
                        <FormikForm>
                            <div className={` card ${styles.login_wrapper}`}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h1 className="text-center">
                                                Login
                                            </h1>
                                        </div>
                                        <div className="col-lg-12" >
                                            <Form.Group controlId="formName" >
                                                <div className="row mt-3">


                                                    <div className="col-md-12">
                                                        {/* <Form.Label className="login-label">
                                                                Email
                                                            </Form.Label> */}

                                                        <Form.Control
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            type="text"
                                                            name="email"
                                                            className="login_inputs"
                                                            onKeyDown={onKeydown}
                                                            placeholder='Enter Email'
                                                        />
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="error_message">
                                                                    <ErrorMessage name="email" />
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </Form.Group>

                                            <Form.Group controlId="formPassword" >
                                                <div className="row mt-4">
                                                    <div className="col-md-12">
                                                        {/* <Form.Label className="login-label">
                                                                Password
                                                            </Form.Label> */}
                                                        <Form.Control
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            type="password"
                                                            name="password"
                                                            className="login_inputs"
                                                            onKeyDown={onKeydown}
                                                            placeholder='Enter Password'

                                                        />
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="error_message">
                                                                    <ErrorMessage name="password" />
                                                                </div>
                                                                {/* {loginAlert && <div
                                                                        className="alert alert-danger login_alertbox"
                                                                        role="alert"
                                                                    >
                                                                        {login.error === "Invalid login credentials"
                                                                            ? "Invalid login credentials"
                                                                            : ""}
                                                                    </div>} */}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </Form.Group>

                                            <div className={`${isAlertVisible === true ? 'login_btn' : ""} mt-4 mb-2 text-center`}>
                                                <button type="submit" className={` btn btn-primary`}>
                                                    <LockOutlinedIcon />  Log in
                                                </button><br />


                                                {isAlertVisible && (
                                                    <div
                                                        className={`alert ${message === "success"
                                                            ? "alert-success"
                                                            : "alert-danger"
                                                            } otp_alertbox`}
                                                        role="alert"
                                                    >
                                                        {message === "success"
                                                            ? "OTP send sucessfully on registered email"
                                                            : "Please enter valid or registered email"}
                                                    </div>
                                                )}
                                            </div>
                                            {/* <div className='text-center'>
                                                <span className='label-color'>Don&apos;t have an account?<Link href="/register" legacyBehavior><a>Sign Up</a></Link></span>
                                            </div> */}
                                            <div className='text-center'>
                                                <span className='label-color'>Forget Password? <Link href="/forget-password" legacyBehavior><a>Click Here</a></Link></span>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 google_btn">
                                            <div className="row">
                                                {/* <div className="col-12 text-lg-start text-center">
                              <div className="login-with-google mt-2">
                                <Googlelogin />
                             
                              </div>
                            </div> */}

                                                {/* <div className={`col-12 text-lg-start register_account`}>
                              <div
                                className="register ms-2"
                                style={{ marginTop: "33px" }}
                              >
                                <span className="not_an_account">
                                  Not an account?{" "}
                                  <Link
                                    className="text-underline"
                                    href="/register"
                                  >
                                    <a className="text-underline blue ">
                                      Register
                                    </a>
                                  </Link>
                                </span>
                              </div>
                            </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <FormObserver />
                        </FormikForm>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default LogIn