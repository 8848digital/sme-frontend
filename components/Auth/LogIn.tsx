import React, { useEffect, useState } from "react";
import {
  Formik,
  Form as FormikForm,
  ErrorMessage,
  useFormikContext,
} from "formik";
import { Form } from "react-bootstrap";
import { LoginValidation } from "@/validation/loginValidation";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  getAccessToken,
  get_access_token,
} from "@/store/slices/auth_slice/login_slice";
import { toast } from "react-toastify";
import styles from "@/styles/auth.module.css";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import Logo from "../Logo";
import useLoginTheme from "@/hooks/login_hooks/login_theme_hooks";
import { CONSTANTS } from "@/services/config/api-config";

const LogIn = () => {
  const [message, setMessage] = useState("");
  const [newValue, setNewValue] = useState<any>("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Added showPassword state
  const [loginAlert, setLoginAlert] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const tokenFromStore = useSelector(get_access_token);

  const translationDataFromStore = useSelector(translation_text_from_Store);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  let handleSubmit = async (values: any) => {
    try {
      const response = await dispatch(
        getAccessToken({ usr: values.usr, password: values.password })
      );
      console.log("login ", response.payload);
      if (
        response?.payload.data ===
          "Waiting for admin approval for SME Registerd User" &&
        response?.payload.msg === "success"
      ) {
        toast.error(
          `${translationDataFromStore?.data?.waiting_for_admin_approval}`,
          {
            autoClose: 5000,
            className: "custom-toast",
          }
        );
      } else if (response.payload.msg === "success") {
        toast.success(translationDataFromStore?.data?.toast_login_success, {
          autoClose: 3000,
          className: "custom-toast",
        });
        router.push("/");
      } else {
        toast.error(translationDataFromStore?.data?.toast_login_error, {
          autoClose: 5000,
          className: "custom-toast",
        });
      }
    } catch (error) {
      toast.error(translationDataFromStore?.data?.toast_login_error, {
        autoClose: 5000,
        className: "custom-toast",
      });

      console.error("Login error:", error);
    }
  };

  const onKeydown = (keyEvent: any) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
      handleSubmit(newValue);
    }
  };

  const FormObserver: React.FC = () => {
    const { values } = useFormikContext();
    useEffect(() => {
      setNewValue(values);
    }, [values]);
    return null;
  };
  const { loginThemeData }: any = useLoginTheme();
  console.log("loginThemeData from", loginThemeData);
  return (
    <div className="container-fuild mt-5 pt-5">
      <div className="row">
        <div className={`col-lg-7 ${styles.main_container}`}>
          <Formik
            initialValues={{
              usr: "",
              password: "",
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ handleChange, handleBlur }) => (
              <FormikForm>
                <div className={`${styles.login_wrapper}`}>
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 p-0">
                        <Logo />
                      </div>

                      <div className="col-lg-12 p-0">
                        <p className={styles.login_header}>
                          {translationDataFromStore?.data?.login_header}
                          {/* {loginThemeData?.heading} */}
                        </p>
                        {/* <p>{loginThemeData?.tag_line}</p> */}
                      </div>
                      <div className="col-lg-12 p-0">
                        <Form.Group controlId="formName">
                          <div className="row mt-3">
                            <div className="col-md-12">
                              <label>
                                {translationDataFromStore?.data?.email}
                              </label>
                              <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                name="usr"
                                className="login_inputs w-100"
                                onKeyDown={onKeydown}
                                placeholder={
                                  translationDataFromStore?.data
                                    ?.email_placeholder
                                }
                                required
                                autoComplete="off"
                              />
                              <div className="row">
                                <div className="col-12">
                                  <div className="error_message">
                                    <ErrorMessage name="usr" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                          <div className="row mt-4">
                            <div className="col-md-12">
                              <label>
                                {/* Password */}
                                {translationDataFromStore?.data?.change_password
                                  .split(" ")
                                  .pop()}
                              </label>
                              <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type={showPassword ? "text" : "password"} // Toggle password visibility
                                name="password"
                                className="login_inputs w-100"
                                onKeyDown={onKeydown}
                                placeholder={
                                  translationDataFromStore?.data
                                    ?.password_placeholder
                                }
                                required
                                autoComplete="off"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={togglePasswordVisibility}
                                      >
                                        {showPassword ? (
                                          <VisibilityIcon />
                                        ) : (
                                          <VisibilityOffIcon />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <div className="row">
                                <div className="col-12">
                                  <div className="error_message">
                                    <ErrorMessage name="password" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form.Group>

                        <div className="text-end">
                          <span className="label-color">
                            {/* {translationDataFromStore?.data?.login_forget_text}{" "} */}
                            <Link href="/forget-password" legacyBehavior>
                              <a className={styles.forget_password}>
                                {/* {translationDataFromStore?.data?.login_forget_link} */}
                                {
                                  translationDataFromStore?.data
                                    ?.login_forget_text
                                }
                              </a>
                            </Link>
                          </span>
                        </div>
                      </div>

                      <div
                        className={`${
                          isAlertVisible === true ? "login_btn" : ""
                        } mt-4 mb-3 text-center p-0 `}
                      >
                        <button
                          type="submit"
                          className={` btn btn-signup ${styles.btn_log_in}`}
                        >
                          {/* <LockOutlinedIcon />{" "} */}
                          {translationDataFromStore?.data?.login}
                        </button>
                        <br />
                      </div>

                      <div className="text-center">
                        <p>
                          Dont't have an account?{" "}
                          <span className={styles.forget_password}>
                            {translationDataFromStore?.data?.signup}
                          </span>
                        </p>
                      </div>

                      {/* <div className="col-lg-6 google_btn">
                    <div className="row"> */}
                      {/* Add Google login button here */}
                      {/* </div>
                  </div> */}
                    </div>
                  </div>
                </div>
                <FormObserver />
              </FormikForm>
            )}
          </Formik>
        </div>

        <div className={`col-lg-5 ${styles.img_main_wrapper}`}>
          <div className={styles.img_container}>
            <img
              src={`${CONSTANTS.API_BASE_URL}${loginThemeData?.main_image}`}
            />
            <div className={styles.img_content}>
              <p className={styles.img_heading}>{loginThemeData?.heading}</p>
              <div className="row">
                <div className="col-lg-2">
                  <img
                    src={`${CONSTANTS.API_BASE_URL}${loginThemeData?.logo_image}`}
                    style={{ height: "72px", width: "72px" }}
                  />
                </div>
                <div className="col-lg-4 p-0">
                  <span className={styles.log_content}>
                    {loginThemeData?.tag_line}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
