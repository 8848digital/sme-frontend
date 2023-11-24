import React from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import ForgetPasswordLinkAPI from "@/services/api/auth_api/forget_password_link_api";
import { toast } from "react-toastify";
import styles from "@/styles/auth.module.css";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
interface FormValues {
  email: any;
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
  const translationDataFromStore = useSelector(translation_text_from_Store);

  const handlesubmit = async (values: any, action: any) => {
    console.log("values", values);
    const response = await ForgetPasswordLinkAPI(values.email, token.token);
    console.log('forget resposne',response)
    if (response.msg === "success") {
      toast.success(
        translationDataFromStore?.data?.toast_password_reset_link_success,
        {
          autoClose: 3000,
          className: "custom-toast", // Close the notification after 3 seconds
        }
      );
      action.resetForm();
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } else if (response.msg === "error") {
      toast.error(
        `${translationDataFromStore?.data?.toast_email_error}`
        ,
        {
          autoClose: 3000,
          className: "custom-toast", // Close the notification after 3 seconds
        }
      );
    } else {
      toast.error(
        `${translationDataFromStore?.data?.toast_email_error} ${response.error}`,
        {
          autoClose: 3000,
          className: "custom-toast", // Close the notification after 3 seconds
        }
      );
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className={` card ${styles.password_wrapper}`}>
          <div className="row">
            <div className="col-12">
              <div className="page_heading text-center">
                <h1 className="text-uppercase">
                  {translationDataFromStore?.data?.forget_header}
                </h1>
                <p className="mt-4 ms-2">
                  {translationDataFromStore?.data?.forget_description}
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
                                placeholder={
                                  translationDataFromStore?.data?.email_placeholder
                                }
                              />
                              <br />
                              <div className="error_message">
                                <ErrorMessage name="email" />
                              </div>
                            </div>
                            {isAlertVisible && (
                              <div
                                className={`alert ${
                                  message === "success"
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
                            className={`btn btn-signup ${styles.common_btn} `}
                            style={{ fontWeight: "600" }}
                          >
                            <Link
                              href="/login"
                              className="text-white"
                              style={{ textDecoration: "none" }}
                            >
                              {translationDataFromStore?.data?.back}
                            </Link>
                          </button>
                          <button
                            type="submit"
                            className="btn btn-signup mx-2"
                            style={{ fontWeight: "600" }}
                          >
                            {translationDataFromStore?.data?.send}
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
  );
};

export default ForgotPassword;
