import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Step1EnterEmail from "./PersonalInfo/Step1EnterEmail";
import Step2VarificationCode from "./PersonalInfo/Step2VarificationCode";
import Step3EnterName from "./PersonalInfo/Step3EnterName";
// import StepWizard from "react-step-wizard";
import useEducationLevel from "@/hooks/general_hooks/education_level-hooks";
import usePreferences from "@/hooks/general_hooks/preferences_hook";
import usePriceBasis from "@/hooks/general_hooks/price_basis_hook";
import SmeRegistrationApi from "@/services/api/auth_api/sme_registration";
import { setSignUpUserAccessToken } from "@/store/slices/auth_slice/signup_user_access_token_slice";
import {
  form_details_from_store,
  resetFormData,
  setFormData,
} from "@/store/slices/auth_slice/form_slice";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { language_selector } from "@/store/slices/general_slice/language_slice";
import styles from "@/styles/wizard.module.css";
import MobileStepper from "@mui/material/MobileStepper";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Step3of3SelectAvailability from "./Preferences/Step6SelectAvailability";
import Step3of3EnterRates from "./Preferences/Step7EnterRates";
import Step2of3UploadCv from "./ProfessionalInfo/Step4UploadCv";
import Step2of3ExtractedDataFromCv from "./ProfessionalInfo/Step5ExtractedDataFromCv";
import ButtonLoader from "../ButtonLoader";
import PersonalInformation from "./PersonalInformation";
import OtherInformation from "./OtherInformation";
import Preferences from "./Preferences";

const WizardMaster = () => {
  const [currentStep, setCurrentStep] = useState<any>(0);
  const [internalStep, setInternalStep] = useState<any>(1);

  const dispatch = useDispatch();
  const router = useRouter();
  const translationDataFromStore = useSelector(translation_text_from_Store);
  const { language_abbr }: any = useSelector(language_selector);
  console.log(language_abbr);
  const [loginbtnLoader, setLoginbtnLoader] = useState(false);

  const [stepFormData, setStepFormData] = useState<any>({
    usr: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_no: "",
    upload_cv: null, // Initialize cvFile to null
    preferences: "",
    hourly_rates: "",
    price_basis: "",
    academic_background: [],
    professional_experience: [],
  });

  const steps: string[] = [
    "Enter Email",
    "Verification Code",
    "Enter Name",
    "Upload CV",
    "Extracted Data",
    "Select Availability",
    "Enter Rates",
  ];

  const { educationLevel, loading } = useEducationLevel();
  console.log("form edu", educationLevel);
  const { priceBasis, priceBasisLoading } = usePriceBasis();
  console.log("form price basis", priceBasis);
  const { preference, preferenceLoading } = usePreferences();
  console.log("form preference", preference);

  const validateEmail = (email: any) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  // Validation function for password
  const validatePassword = (password: any) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateStep1 = () => {
    if (!validateEmail(stepFormData.usr)) {
      toast.error(translationDataFromStore?.data?.toast_email_error, {
        autoClose: 3000,
        className: "custom-toast", // Close the notification after 3 seconds
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!validatePassword(stepFormData.password)) {
      toast.error(translationDataFromStore?.data?.toast_password_error, {
        autoClose: 3000,
        className: "custom-toast", // Close the notification after 3 seconds
      });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (stepFormData.first_name === "") {
      toast.error(translationDataFromStore?.data?.toast_first_name_error, {
        autoClose: 3000,
        className: "custom-toast", // Close the notification after 3 seconds
      });
      return false;
    }
    if (stepFormData.last_name === "") {
      toast.error(translationDataFromStore?.data?.toast_last_name_error, {
        autoClose: 3000,
        className: "custom-toast", // Close the notification after 3 seconds
      });
      return false;
    }

    if (stepFormData.phone_no === "") {
      toast.error(translationDataFromStore?.data?.toast_number_error, {
        autoClose: 3000,
        className: "custom-toast", // Close the notification after 3 seconds
      });
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    if (stepFormData.upload_cv === null) {
      toast.error(translationDataFromStore?.data?.toast_upload_cv_error, {
        autoClose: 3000,
        className: "custom-toast", // Close the notification after 3 seconds
      });
      return false;
    }
    return true;
  };

  const validateStep5 = () => {
    if (stepFormData.academic_background.length === 0) {
      toast.error(
        translationDataFromStore?.data?.toast_academic_information_error,
        {
          autoClose: 3000,
          className: "custom-toast", // Close the notification after 3 seconds
        }
      );
      return false;
    } else if (stepFormData.professional_experience.length === 0) {
      toast.error(
        translationDataFromStore?.data?.toast_professional_experience_error,
        {
          autoClose: 3000,
          className: "custom-toast", // Close the notification after 3 seconds
        }
      );
      return false;
    }
    return true;
  };

  const validateStep6 = () => {
    if (stepFormData.preferences === "") {
      toast.error(translationDataFromStore?.data?.toast_select_error, {
        autoClose: 3000,
        className: "custom-toast", // Close the notification after 3 seconds
      });
      return false;
    }
    return true;
  };

  const validateStep7 = () => {
    if (stepFormData.hourly_rates === "") {
      toast.error(translationDataFromStore?.data?.toast_rates_error, {
        autoClose: 3000,
        className: "custom-toast", // Close the notification after 3 seconds
      });
      return false;
    }
    if (stepFormData.price_basis === "") {
      toast.error(translationDataFromStore?.data?.toast_price_error, {
        autoClose: 3000,
        className: "custom-toast", // Close the notification after 3 seconds
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    // Check validation before proceeding to the next step
    if (currentStep < 6) {
      let isValid = true;

      switch (currentStep) {
        case 0:
          isValid = validateStep1();
          break;
        case 1:
          isValid = validateStep2();
          break;
        case 2:
          isValid = validateStep3();
          break;
        case 3:
          isValid = validateStep4();
          break;
        case 4:
          isValid = validateStep5();
          break;
        case 5:
          isValid = validateStep6();
          break;
        case 6:
          isValid = validateStep7();
          break;
        default:
          break;
      }

      if (!isValid) {
        return;
      }

      // If all validations pass, proceed to the next step
      dispatch(setFormData(stepFormData) as any);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formDataFromStore = useSelector(form_details_from_store);
  console.log("form Data values", formDataFromStore);

  const handleFormDataChange = (field: string, value: any) => {
    if (field === "certification_level") {
      // If the field is 'certification_level', update it with the provided value
      setStepFormData({
        ...stepFormData,
        certification_level: value.certifications,
      });
    } else if (field === "professionalexp") {
      // If the field is 'professionalexp', update it with the provided value
      setStepFormData({
        ...stepFormData,
        professionalexp: value.professional_exp,
      });
    } else {
      // For other fields, update the stepFormData object as usual
      setStepFormData({
        ...stepFormData,
        [field]: value,
      });
    }
  };

  console.log("signup form data", stepFormData);
  const handleSubmit = async () => {
    if (validateStep7()) {
      if (currentStep === 7) {
        dispatch(setFormData(stepFormData) as any);
        // You can submit the data to your API or perform other actions here
        try {
          const response = await SmeRegistrationApi(stepFormData);
          console.log("form Data values in render file api res", response);
          dispatch(setSignUpUserAccessToken(response));
          if (response.msg === "success") {
            setLoginbtnLoader(true);
            // Handle the success response, e.g., show a success message or redirect the user
            console.log("API Response:", response);
            toast.success(`${response.data}`, {
              autoClose: 5000, // Time in milliseconds (5 seconds)
              className: "custom-toast", // Close the notification after 3 seconds
            });
            router.push("/steps-done");
            dispatch(resetFormData());
          } else if (response.msg === "error") {
            setLoginbtnLoader(false);

            // Handle the failure or error case, e.g., show an error message to the user
            toast.error(`${response.error}`, {
              autoClose: 5000, // Time in milliseconds (5 seconds)
              className: "custom-toast", // Close the notification after 3 seconds
            });
            console.error("API request failed");
          }
        } catch (error) {
          // Handle any unexpected errors
          console.error("API request error:", error);
        }
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-9 col-lg-9 ">
            <div className={styles.wizard_wrapper}>
              <div>
                {currentStep === 0  && (
                  <PersonalInformation
                    formData={stepFormData}
                    onFormDataChange={handleFormDataChange}
                    setStep={setCurrentStep}
                    setInternalStep={setInternalStep}
                    internalStep={internalStep}

                  />
                )}
                
                {currentStep === 1 && (
                  <OtherInformation
                    educationLevel={educationLevel?.data}
                    loading={loading}
                    formData={stepFormData}
                    onFormDataChange={handleFormDataChange}
                    setStep={setCurrentStep}
                    setInternalStep={setInternalStep}
                    internalStep={internalStep}
                  />
                )}
                {currentStep === 2 && (
                  <Preferences
                    preference={preference}
                    preferenceLoading={preferenceLoading}
                    priceBasis={priceBasis}
                    priceBasisLoading={priceBasisLoading}
                    formData={stepFormData}
                    onFormDataChange={handleFormDataChange}
                    setStep={setCurrentStep}
                    setInternalStep={setInternalStep}
                    internalStep={internalStep}
                  />
                )}
              </div>
{/* 
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <div className={styles.button_wrapper}>
                    <div className="">
                      <div>
                        {currentStep > 0 && (
                          <button
                            className={`btn ${styles.prev_button}`}
                            onClick={handlePrevious}
                          >
                            {
                              document.dir === 'ltr' ? <ArrowBackIcon /> : <ArrowForwardIcon />
                            }

                            {translationDataFromStore?.data?.previous}
                          </button>
                        )}
                      </div>
                      <div className="mt-3">
                        {currentStep < 6 ? (
                          <button
                            className={`btn ${styles.next_button}`}
                            onClick={handleNext}
                          >
                            {translationDataFromStore?.data?.next}
                            {
                              document.dir === 'ltr' ? <ArrowForwardIcon /> : <ArrowBackIcon />
                            }
                          </button>
                        ) : (
                          <button className="btn btn-next" onClick={handleSubmit}>
                            {translationDataFromStore?.data?.submit}
                          </button>
                        )}
                      </div>


                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-md-3 col-lg-3">
            
            <div className={styles.stepper_wrapper}>
              <div className={styles.stepper_content}>
                <h4>
                <span className="pe-1">{translationDataFromStore?.data?.step}</span>
                <span className="pe-1">{currentStep}</span>{translationDataFromStore?.data?.of}<span className="pe-1 ps-1">6</span>
                </h4>
                <h5>Organize detailed information for future work</h5>
              </div>

              <Stepper
                activeStep={currentStep}
                orientation="vertical"
                style={{ height: "100%" }}
              >
                {steps.map((label: any, index: any) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        </div>
      </div>
      {loginbtnLoader && <ButtonLoader />}
    </>
  );
};

export default WizardMaster;
