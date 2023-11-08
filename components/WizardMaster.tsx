import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultiStep from "./StepsProgressIndicator";
import Step1EnterEmail from "./SignUp/PersonalInfo/Step1EnterEmail";
import Step3EnterName from "./SignUp/PersonalInfo/Step3EnterName";
import Step2VarificationCode from "./SignUp/PersonalInfo/Step2VarificationCode";
import sideImg from "../public/assets/side-img.jpg";
// import StepWizard from "react-step-wizard";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import MobileStepper from "@mui/material/MobileStepper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "@/styles/wizard.module.css";
import { styled } from "@mui/material/styles";
import Step2of3UploadCv from "./SignUp/ProfessionalInfo/Step4UploadCv";
import Step2of3ExtractedDataFromCv from "./SignUp/ProfessionalInfo/Step5ExtractedDataFromCv";
import Step3of3SelectAvailability from "./SignUp/Preferences/Step6SelectAvailability";
import Step3of3EnterRates from "./SignUp/Preferences/Step7EnterRates";
import StepsDone from "./SignUp/Preferences/StepsDone";
import ThankYou from "./SignUp/ThankYou";
import UploadPhoto from "./SignUp/BuildYourBio/UploadPhoto";
import EnterBio from "./SignUp/BuildYourBio/EnterBio";
import SelectTechnicalSkills from "./SignUp/BuildYourBio/SelectTechnicalSkills";
import SelectLanguageSkills from "./SignUp/BuildYourBio/SelectLanguageSkills";
import SelectCertifications from "./SignUp/BuildYourBio/SelectCertifications";
import ProfileCompleted from "./SignUp/BuildYourBio/ProfileCompleted";
import { useRouter } from "next/router";
import {
  form_details_from_store,
  resetFormData,
  setFormData,
} from "@/store/slices/form_slice";
import SmeRegistrationApi from "@/services/api/auth_api/sme_registration";
import { ToastContainer, toast } from "react-toastify";
import { setSignUpUserAccessToken } from "@/store/slices/auth_slice/signup_user_access_token_slice";
import useEducationLevel from "@/hooks/general_hooks/education_level-hooks";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";

const WizardMaster = () => {
  const [currentStep, setCurrentStep] = useState<any>(1);
  const data = [1, 2, 3, 4, 5, 6, 7];
  const dispatch = useDispatch();
  const router = useRouter();
  const { translationData, translationLoading } = useTranslationText();
  const [stepFormData, setStepFormData] = useState<any>({
    usr: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_no: '',
    upload_cv: null, // Initialize cvFile to null
    preferences:'',
    hourly_rates:'',
    price_basis:'',
    academic_background:[],
    professional_experience:[],
  });
  const {educationLevel , loading} = useEducationLevel();
  console.log('form edu',educationLevel)
  const validateEmail = (email:any) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  

  // Validation function for password
  const validatePassword = (password:any) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  };
  
  const validateStep1 = () => {
    if (!validateEmail(stepFormData.usr)) {
      toast.error("Please Enter a Valid Email Address",{
        autoClose: 3000,
        className: 'custom-toast',// Close the notification after 3 seconds
    });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!validatePassword(stepFormData.password)) {
      toast.error("Password must have at least 1 special character, 1 uppercase letter, 1 number, and be 8 characters long.",{
        autoClose: 3000,
        className: 'custom-toast',// Close the notification after 3 seconds
    });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (stepFormData.first_name === '') {
      toast.error("Please enter your first name.",{
        autoClose: 3000,
        className: 'custom-toast',// Close the notification after 3 seconds
    });
      return false;
    }
    if (stepFormData.last_name === '') {
      toast.error("Please enter your last name.",{
        autoClose: 3000,
        className: 'custom-toast',// Close the notification after 3 seconds
    });
      return false;
    }
  
    if (stepFormData.phone_no === '') {
      toast.error("Please enter your phone number.",{
        autoClose: 3000,
        className: 'custom-toast',// Close the notification after 3 seconds
    });
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    if (stepFormData.upload_cv === null) {
      toast.error("Please upload your CV.",{
        autoClose: 3000,
        className: 'custom-toast',// Close the notification after 3 seconds
    });
      return false;
    }
    return true;
  };

  const validateStep5 = () => {
    if (stepFormData.academic_background.length === 0) {
      toast.error("Please Enter the Academic Information.",{
        autoClose: 3000,
        className: 'custom-toast',// Close the notification after 3 seconds
    });
      return false;
    }else if (stepFormData.professional_experience.length === 0 ){
      toast.error("Please Enter the Professional Experience.",{
        autoClose: 3000,
        className: 'custom-toast',// Close the notification after 3 seconds
    });
      return false;
    }
    return true;
  };

  const validateStep6 = () => {
    if (stepFormData.preferences === '') {
      toast.error("Please Select Availibility.",{
        autoClose: 3000,
        className: 'custom-toast',// Close the notification after 3 seconds
    });
      return false;
    }
    return true;
  };

  const validateStep7 = () => {
    if (stepFormData.hourly_rates === '') {
      toast.error("Please Enter hourly/weekly/monthly Rates",{
        autoClose: 3000,
        className: 'custom-toast',// Close the notification after 3 seconds
    });
      return false;
    }
    if (stepFormData.price_basis === '') {
      toast.error("Please Select Price Basis",{
        autoClose: 3000,
        className: 'custom-toast',// Close the notification after 3 seconds
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
    if (field === 'certification_level') {
      // If the field is 'certification_level', update it with the provided value
      setStepFormData({
        ...stepFormData,
        certification_level: value.certifications,
      });
    } else if (field === 'professionalexp') {
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

console.log('signup form data',stepFormData);
  const handleSubmit = async () => {
    if (validateStep7()) {
      if (currentStep === 7) {
        dispatch(setFormData(stepFormData) as any);
        // You can submit the data to your API or perform other actions here
        try {
          const response = await SmeRegistrationApi(stepFormData);
          console.log('form Data values in render file api res', response);
          dispatch(setSignUpUserAccessToken(response));
          if (response.msg === 'success') {
            // Handle the success response, e.g., show a success message or redirect the user
            console.log('API Response:', response);
            toast.success(`${response.data}`, {
              autoClose: 5000, // Time in milliseconds (5 seconds)
              className: 'custom-toast',// Close the notification after 3 seconds
            });
            router.push('/steps-done');
            dispatch(resetFormData());
          } else if (response.msg === 'error') {
            // Handle the failure or error case, e.g., show an error message to the user
            toast.error(`${response.error}`, {
              autoClose: 5000, // Time in milliseconds (5 seconds)
              className: 'custom-toast',// Close the notification after 3 seconds
            });
            console.error('API request failed');
          }
        } catch (error) {
          // Handle any unexpected errors
          console.error('API request error:', error);
        }
      }
    }
  };

  return (
    <div className="container" >
      <div className={styles.wizard_wrapper}>

      <div className="row">
        {/* <div className="col-md-4 p-0 d-none d-sm-block">
          <div style={{ width: "380px" }} className={styles.image_cont}>
            <img
              src={sideImg.src}
              alt="Your Image"
              style={{ width: "100%", height: "700px" }}
            />
            <div className={styles.wizard_cont}>
              <Box sx={{ width: "100%" }}>
                <Stepper activeStep={currentStep - 1} orientation="vertical">
                  {data.map((e: number) => {
                    return (
                      <Step key={e}>
                        <StepLabel></StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Box>
            </div>
          </div>
        </div> */}
        <div className="col-md-12 col-lg-12 mt-5">
          <div className="row " style={{maxWidth:'800px',margin:'0 auto'}}>
            <div className="col-4 ">
              <div className="">
                <h2 className="fs-3 text-white">{translationData?.step} {currentStep}</h2>
                <hr className={styles.step_hr} />
              </div>
            </div>
            <div className="col-8 position-relative">
              <div className={styles.progress_bar_div}>
                <div className="" style={{marginLeft:'109px'}}>
                  <p className="mb-4 text-white">{currentStep} of 7 {translationData?.completed}</p>
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
                formData={stepFormData}
                onFormDataChange={handleFormDataChange}
              />
            )}
            {currentStep === 7 && (
              <Step3of3EnterRates
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
                      <ArrowBackIcon />
                      {translationData?.previous}
                    </button>
                  )}
                  {currentStep < 7 ? (
                    <button
                      className="btn btn-next d-flex align-items-center justify-content-center"
                      onClick={handleNext}
                    >
                      {translationData?.next}
                      <ArrowForwardIcon />
                    </button>
                  ) : (
                    <button className="btn btn-next" onClick={handleSubmit}>
                      {translationData?.submit}
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
  );
};

export default WizardMaster;
