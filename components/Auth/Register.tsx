import {
  ErrorMessage,
  Field,
  Formik,
  Form as FormikForm,
  useFormikContext,
} from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
// import { RegistrationValidation } from '@/validation/registrationValidation';
import RegistrationApi from "@/services/api/auth_api/register_api";
import UploadFileApi from "@/services/api/auth_api/upload_file_api";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { toast } from "react-toastify";

const Register = () => {
  const [message, setMessage] = useState("");
  const [newValue, setnewValue] = useState<any>("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const router = useRouter();
  const [wantUpdates, setWantUpdates] = useState(false);
  const [termsAndConditon, setTermsAndConditon] = useState(false);
  const translationDataFromStore = useSelector(translation_text_from_Store);

  let handlesubmit = async (values: any, action: any) => {
    values.want_updates = wantUpdates ? 1 : 0;
    values.agree_terms_conditions = termsAndConditon ? 1 : 0;
    console.log("submit clicked", values);

    try {
      const response = await RegistrationApi(values);
      //   action.resetForm();

      // Check if the registration was successful
      if (response.msg === "success") {
        // Show a success toast notification
        toast.success(
          response.data === "SME Registration done successfully"
            ? translationDataFromStore?.data?.toast_sme_register_success
            : translationDataFromStore?.data?.toast_user_exist_error,
          {
            className: "custom-toast",
            autoClose: 30000, // Close the notification after 3 seconds
          }
        );
        setTimeout(() => {
          router.push("/");
        }, 30000);
        // Optionally, you can redirect the user to another page
        // router.push('/success'); // Import useRouter from 'next/router'
      } else if (response.msg === "error") {
        // Handle other response statuses as needed
        // For example, display an error toast notification
        toast.error(
          response.data === "User Already Exists"
            ? translationDataFromStore?.data?.toast_user_exist_error
            : translationDataFromStore?.data?.toast_user_exist_error,
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          }
        );
      } else {
        // For example, display an error toast notification
        toast.error("Registration Failed", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  const FormObserver: React.FC = () => {
    const { values } = useFormikContext();
    useEffect(() => {
      setnewValue(values);
    }, [values]);
    return null;
  };

  const [uploadResponse, setUploadResponse] = useState<{
    file_url: string;
  } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedFile = e.target.files?.[0];
    if (newSelectedFile) {
      try {
        const response = await UploadFileApi({ file: newSelectedFile });
        // Handle the uploadResponse as needed
        console.log("Upload Response:", response.file_url);

        // Set the upload response and selected file to the state
        setUploadResponse(response);
        setSelectedFile(newSelectedFile);

        // Continue with any other logic you need
      } catch (error) {
        console.error("Upload Error:", error);
      }
    }
  };

  const clearSelectedFile = () => {
    // Clear the selected file and upload response
    setSelectedFile(null);
    setUploadResponse(null);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  console.log("upload", uploadResponse?.file_url);
  return (
    <>
      <div className="container mb-5">
        <Formik
          initialValues={{
            usr: "",
            password: "",
            name: "",
            designation: "",
            full_organization_name: "",
            is_existing: 0,
            organization_abbreviation: "",
            reference: "",
            agree_terms_conditions: "",
            want_updates: "",
            contact_email: "",
            contact_phone: "",
            logo: uploadResponse?.file_url,
          }}
          // validationSchema={RegistrationValidation}
          onSubmit={(values, action) => {
            handlesubmit(values, action);
          }}
        >
          {({ handleChange, handleBlur, setFieldValue }) => (
            <FormikForm>
              <div className="register_class password-wrapper">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <h2 className="text-center">Sign Up/Registration</h2>
                    </div>
                    <div className="col-lg-7" style={{ marginLeft: "-6px" }}>
                      <div className="form-group">
                        <div className="row mt-3">
                          <div className="col-md-12">
                            {/* <Form.Label className="login-label">
                                                                Email
                                                            </Form.Label> */}

                            <Field
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="email"
                              name="usr"
                              className="form-control"
                              placeholder="Enter Email"
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
                      </div>

                      <div className="form-group">
                        <div className="row mt-4">
                          <div className="col-md-12">
                            {/* <Form.Label className="login-label">
                                                                Password
                                                            </Form.Label> */}
                            <Field
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Enter Password"
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
                      </div>

                      <div className="form-group">
                        <div className="row mt-4">
                          <div className="col-md-12">
                            {/* <Form.Label className="login-label">
                                                                Password
                                                            </Form.Label> */}
                            <Field
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="organizationName"
                              name="full_organization_name"
                              className="form-control"
                              placeholder="Enter Organization Name"
                            />
                            <div className="row">
                              <div className="col-12">
                                <div className="error_message">
                                  <ErrorMessage name="full_organization_name" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="row mt-4">
                          <div className="col-md-12">
                            {/* <Form.Label className="login-label">
                                                                Password
                                                            </Form.Label> */}
                            <Field
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="OrganizationAbbr"
                              name="organization_abbreviation"
                              className="form-control"
                              placeholder="Enter Organization Abbr(Max 6 Char)"
                            />
                            <div className="row">
                              <div className="col-12">
                                <div className="error_message">
                                  <ErrorMessage name="organization_abbreviation" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="row mt-4">
                          <div className="col-md-12">
                            {/* <Form.Label className="login-label">
                                                                Password
                                                            </Form.Label> */}
                            <Field
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="name"
                              name="name"
                              className="form-control"
                              placeholder="Enter Name"
                            />
                            <div className="row">
                              <div className="col-12">
                                <div className="error_message">
                                  <ErrorMessage name="name" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="row mt-4">
                          <div className="col-md-12">
                            {/* <Form.Label className="login-label">
                                                                Password
                                                            </Form.Label> */}
                            <Field
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="designation"
                              name="designation"
                              className="form-control"
                              placeholder="Enter Designation"
                            />
                            <div className="row">
                              <div className="col-12">
                                <div className="error_message">
                                  <ErrorMessage name="designation" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="row mt-4">
                          <div className="col-md-12">
                            {/* <Form.Label className="login-label">
                                                                Password
                                                            </Form.Label> */}
                            <Field
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              name="contact_email"
                              className="form-control"
                              placeholder="Enter Contact Email"
                            />
                            <div className="row">
                              <div className="col-12">
                                <div className="error_message">
                                  <ErrorMessage name="contact_email" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="row mt-4">
                          <div className="col-md-12">
                            {/* <Form.Label className="login-label">
                                                                Password
                                                            </Form.Label> */}
                            <Field
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              name="contact_phone"
                              className="form-control"
                              placeholder="Enter Contact Phone"
                            />
                            <div className="row">
                              <div className="col-12">
                                <div className="error_message">
                                  <ErrorMessage name="contact_phone" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 text-center">
                      <Form.Group controlId="fileUpload">
                        <div className="row mt-3">
                          <div className="col-md-12">
                            {selectedFile ? (
                              <div className="selected-file">
                                <span>{selectedFile.name}</span>
                                <span
                                  className="delete-file"
                                  onClick={clearSelectedFile}
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="fas fa-times-circle cross-class text-red"></i>
                                </span>
                              </div>
                            ) : (
                              <div className="file file--upload">
                                <label
                                  htmlFor="input-file"
                                  className="upload-label label-color"
                                >
                                  <div className="upload-circle">
                                    <i className="fas fa-upload "></i>
                                  </div>
                                  Upload Logo
                                </label>
                                <input
                                  id="input-file"
                                  type="file"
                                  ref={fileInputRef}
                                  onChange={(e) => {
                                    handleFileSelect(e);
                                    const fileName = e.target.files?.[0]?.name;
                                    const filePath = `/files/${fileName}`;
                                    setFieldValue("logo", filePath); // Set the file path as value
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </Form.Group>

                      <Form.Group controlId="formConditions">
                        <div className="row mt-3">
                          <div className="col-md-12">
                            <Form.Check
                              type="checkbox"
                              label="I agree to the terms & conditions & and have read the GDPR Disclaimer"
                              name="agree_terms_conditions"
                              checked={termsAndConditon}
                              onChange={(e: any) =>
                                setTermsAndConditon(e.target.checked)
                              }
                              className="label-color text-start"
                            />
                          </div>
                        </div>
                      </Form.Group>

                      <div
                        className={`${
                          isAlertVisible === true ? "login_btn" : ""
                        } mt-4 mb-2 text-center`}
                      >
                        <button type="submit" className={` btn btn-primary`}>
                          Register
                        </button>
                        <br />

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
                              ? "OTP send sucessfully on registered email"
                              : "Please enter valid or registered email"}
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <span className="label-color">
                          Already Have An Account?
                          <Link href="/login" legacyBehavior>
                            <a>LogIn Here</a>
                          </Link>
                        </span>
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
  );
};

export default Register;
