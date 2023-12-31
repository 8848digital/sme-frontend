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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MobileStepper from "@mui/material/MobileStepper";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Step3of3SelectAvailability from "./Preferences/Step6SelectAvailability";
import Step3of3EnterRates from "./Preferences/Step7EnterRates";
import Step2of3UploadCv from "./ProfessionalInfo/Step4UploadCv";
import Step2of3ExtractedDataFromCv from "./ProfessionalInfo/Step5ExtractedDataFromCv";
import ButtonLoader from "../ButtonLoader";

const WizardMaster = () => {
  const [currentStep, setCurrentStep] = useState<any>(1);

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
    if (currentStep < 7) {
      let isValid = true;

      switch (currentStep) {
        case 1:
          isValid = validateStep1();
          break;
        case 2:
          isValid = validateStep2();
          break;
        case 3:
          isValid = validateStep3();
          break;
        case 4:
          isValid = validateStep4();
          break;
        case 5:
          isValid = validateStep5();
          break;
        case 6:
          isValid = validateStep6();
          break;
        case 7:
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
    if (currentStep > 1) {
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
        <div className={styles.wizard_wrapper}>
          <div className="row">
            <div className="col-md-12 col-lg-12 ">
              <div
                className="row "
                style={{ maxWidth: "800px", margin: "0 auto" }}
              >
                <div className="col-4 ">
                  <div className="">
                    <h2 className="fs-3 text-white">
                      {translationDataFromStore?.data?.step} {currentStep}
                    </h2>
                    <hr className={styles.step_hr} />
                  </div>
                </div>
                <div className="col-8 position-relative">
                  <div className={styles.progress_bar_div}>
                    <div className="" style={{ marginInline: "10px" }}>
                      {
                        document.dir === 'ltr' ?
                         <p className="mb-4 text-white">
                        <span className="ps-1 pe-1">{currentStep}</span>{translationDataFromStore?.data?.of}<span className="pe-1 ps-1">7</span> 
                        {translationDataFromStore?.data?.completed}</p> 
                        : 
                        <p className="mb-4 text-white">
                     {/* <span className="ps-1 pe-1">{currentStep}</span> */}
                     {translationDataFromStore?.data?.steps_bar_of_arabic}<span className="pe-1 ps-1">7</span> 
                     {translationDataFromStore?.data?.steps_bar_arabic}<span className="ps-1 pe-1">{currentStep}</span>
                        {translationDataFromStore?.data?.completed} 
                        {/* {currentStep}من 7 خطوات مكتملة */}
                      </p>
                      } 
                    </div>

                    <MobileStepper
                      variant="progress"
                      steps={8}
                      backButton={<></>}
                      nextButton={<></>}
                      activeStep={currentStep}
                      className={styles.progress_bar}
                    />
                  </div>
                </div>
              </div>

              <div>
                {currentStep === 1 && (
                  <Step1EnterEmail
                    formData={stepFormData}
                    onFormDataChange={handleFormDataChange}
                  />
                )}
                {currentStep === 2 && (
                  <Step2VarificationCode
                    formData={stepFormData}
                    onFormDataChange={handleFormDataChange}
                  />
                )}
                {currentStep === 3 && (
                  <Step3EnterName
                    formData={stepFormData}
                    onFormDataChange={handleFormDataChange}
                  />
                )}
                {currentStep === 4 && (
                  <Step2of3UploadCv
                    formData={stepFormData}
                    onFormDataChange={handleFormDataChange}
                  />
                )}
                {currentStep === 5 && (
                  <Step2of3ExtractedDataFromCv
                    educationLevel={educationLevel?.data}
                    loading={loading}
                    formData={stepFormData}
                    onFormDataChange={handleFormDataChange}
                  />
                )}
                {currentStep === 6 && (
                  <Step3of3SelectAvailability
                    preference={preference}
                    preferenceLoading={preferenceLoading}
                    formData={stepFormData}
                    onFormDataChange={handleFormDataChange}
                  />
                )}
                {currentStep === 7 && (
                  <Step3of3EnterRates
                    priceBasisLoading={priceBasisLoading}
                    priceBasis={priceBasis}
                    formData={stepFormData}
                    onFormDataChange={handleFormDataChange}
                  />
                )}
              </div>

              <div className="row">
                <div className="col-12">
                  <div
                    className=" d-flex justify-content-center"
                    style={{ marginBottom: "50px" }}
                  >
                    <div className="d-sm-flex d-static">
                      {currentStep > 1 && (
                        <button
                          className="btn btn-prev me-3 d-flex align-items-center justify-content-center"
                          onClick={handlePrevious}
                        >
                          {
                            document.dir === 'ltr' ? <ArrowBackIcon /> :  <ArrowForwardIcon /> 
                          }
                          
                          {translationDataFromStore?.data?.previous}
                        </button>
                      )}
                      {currentStep < 7 ? (
                        <button
                          className="btn btn-next d-flex align-items-center justify-content-center"
                          onClick={handleNext}
                        >
                          {translationDataFromStore?.data?.next}
                          {
                            document.dir === 'ltr' ?  <ArrowForwardIcon /> :  <ArrowBackIcon /> 
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
            </div>
          </div>
        </div>
      </div>
      {loginbtnLoader && <ButtonLoader />}
    </>
  );
};

export default WizardMaster;
