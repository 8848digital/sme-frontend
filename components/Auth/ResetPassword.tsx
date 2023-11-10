import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";

import ResetPasswordAPI from "@/services/api/auth_api/reset_password_api";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import styles from "@/styles/auth.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
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
        <div className={` card ${styles.auth_common_wrapper}`}>
          <div className="page_heading text-center">
            <h1 className="text-uppercase">Reset Your Password</h1>
          </div>
          <Formik
            initialValues={initialValues}
            // validationSchema={Resetpassword_Validation}
            onSubmit={(values, action) => handlesubmit(values, action)}
          >
            {({ handleChange }) => (
              <FormikForm className="">
                <div className=" text-center mt-4">
                  <div className="container">
                    <div className="row mb-2 form-group">
                      <div className="col-md-3 ">
                        <div className="">
                          <label htmlFor="" className="">
                            Email ID:
                          </label>
                        </div>
                      </div>
                      <div className="col-md-9 col-lg-6">
                        {/* <div className="password_block "> */}
                        <Field
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={handleChange}
                          placeholder="Enter Registered Email Here"
                        />
                        <br />
                        <div className="error_message">
                          <ErrorMessage name="email" />
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                    <div className="row mb-2 form-group">
                      <div className="col-md-3 ">
                        <div className="">
                          <label htmlFor="" className="">
                            New Password:
                          </label>
                        </div>
                      </div>
                      <div className="col-md-9 col-lg-6">
                        <div className="password_block">
                          <Field
                            type="password"
                            className="form-control"
                            name="new_password"
                            onChange={handleChange}
                            placeholder="Enter New Password"
                          />
                          <br />
                          <div className="error_message">
                            <ErrorMessage name="new_password" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-2 form-group">
                      <div className="col-md-3 ">
                        <div className="">
                          <label htmlFor="" className="">
                            Confirm Password:
                          </label>
                        </div>
                      </div>
                      <div className="col-md-9 col-lg-6">
                        <Field
                          type="password"
                          className="form-control"
                          name="confirmPassword"
                          onChange={handleChange}
                          placeholder="Confirm New Password"
                        />
                        <br />
                        <div className="error_message">
                          <ErrorMessage name="confirmPassword" />
                        </div>
                      </div>
                    </div>
                    <div className={`${styles.custom_btn}`}>
                      <button
                        type="button"
                        className={`btn btn-signup ${styles.common_btn} me-md-5`}
                        style={{ fontWeight: "600" }}
                      >
                        <Link
                          href="/login"
                          className="text-white"
                          style={{ textDecoration: "none" }}
                        >
                          BACK
                        </Link>
                      </button>
                      <button
                        type="submit"
                        className="btn btn-signup"
                        style={{ fontWeight: "600" }}
                      >
                        Change Password
                      </button>
                    </div>
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
