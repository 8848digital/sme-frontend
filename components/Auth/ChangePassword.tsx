import ChangePasswordAPI from "@/services/api/auth_api/change_password_api";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/auth.module.css";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import TextField from "@mui/material/TextField";
// import { RootState } from "../store/root_reducer";

interface FormValues {
  old_password: any;
  new_password: any;
  confirmPassword: any;
}

const ChangePassword = () => {
  const dispatch = useDispatch<any>();
  const token = useSelector(get_access_token);
  const router = useRouter();
  const initialValues: FormValues = {
    old_password: "",
    new_password: "",
    confirmPassword: "",
  };
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = (field: string) => {
    switch (field) {
      case "old_password":
        setShowOldPassword((prev) => !prev);
        break;
      case "new_password":
        setShowNewPassword((prev) => !prev);
        break;
      case "confirmPassword":
        setShowConfirmPassword((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const translationDataFromStore = useSelector(translation_text_from_Store);

  const handlesubmit = async (values: any, action: any) => {
    console.log("values", values);
    if (values.new_password !== values.confirmPassword) {
      // Display an error message or handle it as needed
      console.error("New password and confirm password do not match");
      toast.error(
        translationDataFromStore?.data?.toast_confirm_password_error,
        {
          autoClose: 3000,
          className: "custom-toast", // Close the notification after 3 seconds
        }
      );
    } else if (values.new_password === values.confirmPassword) {
      const response = await ChangePasswordAPI(
        values.old_password,
        values.new_password,
        token.token
      );
      if (response === "success") {
        toast.success(
          translationDataFromStore?.data?.toast_change_password_success,
          {
            autoClose: 3000,
            className: "custom-toast", // Close the notification after 3 seconds
          }
        );
        action.resetForm();
        router.push("/");
      } else if (response === "error") {
        toast.error(
          `${translationDataFromStore?.data?.toast_check_password_error} ${response.error}`,
          {
            autoClose: 3000,
            className: "custom-toast", // Close the notification after 3 seconds
          }
        );
      } else {
        toast.error(
          `${translationDataFromStore?.data?.toast_check_password_error} ${response.error}`,
          {
            autoClose: 3000,
            className: "custom-toast", // Close the notification after 3 seconds
          }
        );
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
            <h1 className="text-uppercase">
              {translationDataFromStore?.data?.change_password_header}
            </h1>
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
                        <label htmlFor="" className="">
                          {translationDataFromStore?.data?.change_password_old}
                        </label>
                      </div>
                      <div className="col-md-12 col-lg-9">
                        {/* <div className="password_block "> */}
                        <TextField
                          className="form-control"
                          name="old_password"
                          onChange={handleChange}
                          placeholder={
                            translationDataFromStore?.data
                              ?.change_password_old_placeholder
                          }
                          type={showOldPassword ? "text" : "password"}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    togglePasswordVisibility("old_password")
                                  }
                                >
                                  {showOldPassword ? (
                                    <VisibilityIcon />
                                  ) : (
                                    <VisibilityOffIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <br />
                        <div className="error_message">
                          <ErrorMessage name="old_password" />
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                    <div className="row mb-2 form-group">
                      <div className="col-md-3 ">
                        <label htmlFor="" className="">
                          {translationDataFromStore?.data?.change_password_new}
                        </label>
                      </div>
                      <div className="col-md-12 col-lg-9">
                        <div className="password_block">
                          <TextField
                            className="form-control"
                            name="new_password"
                            onChange={handleChange}
                            placeholder={
                              translationDataFromStore?.data
                                ?.change_password_new_placeholder
                            }
                            type={showNewPassword ? "text" : "password"}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      togglePasswordVisibility("new_password")
                                    }
                                  >
                                    {showNewPassword ? (
                                      <VisibilityIcon />
                                    ) : (
                                      <VisibilityOffIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
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
                            {
                              translationDataFromStore?.data
                                ?.change_password_confirm
                            }
                          </label>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-9">
                        <TextField
                          className="form-control"
                          name="confirmPassword"
                          onChange={handleChange}
                          placeholder={
                            translationDataFromStore?.data
                              ?.change_password_confirm_placeholder
                          }
                          type={showConfirmPassword ? "text" : "password"}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    togglePasswordVisibility("confirmPassword")
                                  }
                                >
                                  {showConfirmPassword ? (
                                    <VisibilityIcon />
                                  ) : (
                                    <VisibilityOffIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
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
                      >
                        <Link
                          href="/"
                          className="text-white"
                          style={{ textDecoration: "none" }}
                        >
                          {translationDataFromStore?.data?.back}
                        </Link>
                      </button>
                      <button type="submit" className="btn btn-signup">
                        {translationDataFromStore?.data?.change_password_btn}
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
export default ChangePassword;
