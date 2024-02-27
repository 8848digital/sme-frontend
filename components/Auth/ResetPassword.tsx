import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";

import ResetPasswordAPI from "@/services/api/auth_api/reset_password_api";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import styles from "@/styles/auth.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
interface FormValues {
  email: any;
  new_password: any;
  confirmPassword: any;
}

const ResetPassword = () => {
  const token = useSelector(get_access_token);
  const router = useRouter();
  const initialValues: FormValues = {
    email: "",
    new_password: "",
    confirmPassword: "",
  };
  const translationDataFromStore = useSelector(translation_text_from_Store);
  const handlesubmit = async (values: any, action: any) => {
    console.log("values", values);
    if (values.new_password !== values.confirmPassword) {
      // Display an error message or handle it as needed
      console.error("New password and confirm password do not match");
      toast.error("Enter the correct New/Confirm Password", {
        autoClose: 3000,
        className: "custom-toast", // Close the notification after 3 seconds
      });
    } else if (values.new_password === values.confirmPassword) {
      const response = await ResetPasswordAPI(
        values.email,
        values.new_password
      );
      if (response === "success") {
        toast.success("Password has changed successfully", {
          autoClose: 3000,
          className: "custom-toast", // Close the notification after 3 seconds
        });
        action.resetForm();
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } else if (response === "error") {
        toast.error(`Check your password again! ${response.error}`, {
          autoClose: 3000,
          className: "custom-toast", // Close the notification after 3 seconds
        });
      } else {
        toast.error(`Check your password again! ${response.error}`, {
          autoClose: 3000,
          className: "custom-toast", // Close the notification after 3 seconds
        });
      }
    } else {
      console.error("New password and confirm password do not match");
      toast.error("Enter the correct New/Confirm Password", {
        autoClose: 3000,
        className: "custom-toast", // Close the notification after 3 seconds
      });
    }
  };
  return (
    <>
      <div className="container">
        <div className={`  ${styles.password_wrapper}`}>
          <div className="page_heading text-center">
            <p className="text-capitalize fs-32 fw-500 lh-24">
              {translationDataFromStore?.data?.reset_password}
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            // validationSchema={Resetpassword_Validation}
            onSubmit={(values, action) => handlesubmit(values, action)}
          >
            {({ handleChange }) => (
              <FormikForm className="pt-2 p-0 m-0">
                <div className="container ">
                  <div className="row mb-2 form-group  d-flex justify-content-center">
                    <div className="col-md-9 col-lg-6">
                      {/* <div className="password_block "> */}
                      <label htmlFor="" className="mb-1">
                        {translationDataFromStore?.data?.email}:
                      </label>
                      <Field
                        type="email"
                        className="form-control  m-0"
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter Registered Email Here"
                      />

                      <div className="error_message">
                        <ErrorMessage name="email" />
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="row mb-2 form-group d-flex justify-content-center">
                    <div className="col-md-9 col-lg-6">
                      <div className="password_block">
                        <label htmlFor="" className="mb-1">
                          {translationDataFromStore?.data?.change_password_new}:
                        </label>
                        <Field
                          type="password"
                          className="form-control"
                          name="new_password"
                          onChange={handleChange}
                          placeholder="Enter New Password"
                        />

                        <div className="error_message">
                          <ErrorMessage name="new_password" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2 form-group d-flex justify-content-center">
                    <div className="col-md-9 col-lg-6">
                      <label htmlFor="" className="mb-1">
                        {translationDataFromStore?.data?.confirm_password}:
                      </label>
                      <Field
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        onChange={handleChange}
                        placeholder="Confirm New Password"
                      />

                      <div className="error_message">
                        <ErrorMessage name="confirmPassword" />
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.custom_btn} text-center w-100 `}>
                    {/* <button
                        type="button"
                        className={`btn btn-signup ${styles.common_btn} me-md-5`}
                      >
                        <Link
                          href="/login"
                          className="text-white"
                          style={{ textDecoration: "none" }}
                        >
                          BACK
                        </Link>
                      </button> */}
                    <button type="submit" className="btn btn_blue w-50 mt-3">
                      {translationDataFromStore?.data?.reset_password_btn}
                    </button>
                  </div>
                </div>
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
