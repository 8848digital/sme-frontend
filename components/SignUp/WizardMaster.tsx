import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ButtonLoader from "../ButtonLoader";
import useIndustryList from "@/hooks/general_hooks/Industry_list_hook";
import useRegionList from "@/hooks/general_hooks/region_list_hook";
import useServiceList from "@/hooks/general_hooks/service_list_hook";
import useYearOfExpList from "@/hooks/general_hooks/year_of_exp_list_hook";
import Image from "next/image";
import { useMediaQuery } from '@mui/material';
import tagLine from '../../public/assets/tag_line.png'
import PersonalInformationMaster from "./PersonalInfo/PersonalInformationMaster";
import OtherInformationMaster from "./ProfessionalInfo/OtherInformationMaster";
import PreferencesMaster from "./Preferences/PreferencesMaster";
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
    candidate_details: []
  });

  const steps: string[] = [
    `${translationDataFromStore?.data?.signup_step_personal_information}`,
    `${translationDataFromStore?.data?.signup_step_other_information}`,
    `${translationDataFromStore?.data?.signup_step_preferences}`,
  ];

  const { educationLevel, loading } = useEducationLevel();
  console.log("form edu", educationLevel);
  const { priceBasis, priceBasisLoading } = usePriceBasis();
  console.log("form price basis", priceBasis);
  const { preference, preferenceLoading } = usePreferences();
  console.log("form preference", preference);
  const { industryList, industryListLoading } = useIndustryList();
  const { regionList, regionListLoading } = useRegionList();
  const { serviceList, serviceListLoading } = useServiceList();
  const { yearOfExpList, yearOfExpListLoading } = useYearOfExpList();
  console.log("list", industryList, regionList, serviceList, yearOfExpList);

  console.log('form',stepFormData)

  const handleFormDataChange = (field: string, value: any) => {
      setStepFormData({
        ...stepFormData,
        [field]: value,
      });
    
  };

  const handleSubmit = async () => {
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

  };
  const isSmallScreen = useMediaQuery('(max-width: 576px)');
  return (
    <>
      <div className="container-fluid">
        <div className="row" >
          <div className={`col-md-8 col-lg-8 ${isSmallScreen ? 'order-1' : ''}`}>
            <div className={styles.wizard_wrapper}>
              <div>
                {currentStep === 0 && (
                  <PersonalInformationMaster
                    formData={stepFormData}
                    onFormDataChange={handleFormDataChange}
                    setStep={setCurrentStep}
                    setInternalStep={setInternalStep}
                    internalStep={internalStep}
                  />
                )}

                {currentStep === 1 && (
                  <OtherInformationMaster
                    educationLevel={educationLevel?.data}
                    loading={loading}
                    formData={stepFormData}
                    onFormDataChange={handleFormDataChange}
                    setStep={setCurrentStep}
                    setInternalStep={setInternalStep}
                    internalStep={internalStep}
                    industryList={industryList}
                    industryListLoading={industryListLoading}
                    regionList={regionList}
                    regionListLoading={regionListLoading}
                    serviceList={serviceList}
                    serviceListLoading={serviceListLoading}
                    yearOfExpList={yearOfExpList}
                    yearOfExpListLoading={yearOfExpListLoading}
                  />
                )}
                {currentStep === 2 && (
                  <PreferencesMaster
                    preference={preference}
                    preferenceLoading={preferenceLoading}
                    priceBasis={priceBasis}
                    priceBasisLoading={priceBasisLoading}
                    formData={stepFormData}
                    onFormDataChange={handleFormDataChange}
                    setStep={setCurrentStep}
                    setInternalStep={setInternalStep}
                    internalStep={internalStep}
                    handleSubmit={handleSubmit}
                  />
                )}
              </div>
            </div>
          </div>
         
            {isSmallScreen ? (<div className={`col-md-4 col-lg-4 stepper_css ${styles.stepper_bg}`}>
              <div>

                <div className={styles.stepper_wrapper} >
                  <div className={styles.stepper_content}>
                    <h4>
                      <span className="pe-1 ps-1">{translationDataFromStore?.data?.step}</span>
                      <span className="pe-1 ps-1">{currentStep === 0 ? 1 : currentStep}</span>{translationDataFromStore?.data?.of}<span className="pe-1 ps-1">3</span>
                      
                    </h4>
                    <h4>
                    <span>{currentStep === 0 ? `${translationDataFromStore?.data?.signup_step_personal_information}`:''}</span>
                      <span>{currentStep === 1 ? `${translationDataFromStore?.data?.signup_step_other_information}`:''}</span>
                      <span>{currentStep === 2 ? `${translationDataFromStore?.data?.signup_step_preferences}`:''}</span>
                    </h4>
                  </div>
                  <div>
                    <Stepper
                      activeStep={currentStep}
                      orientation="horizontal"
                      style={{ height: "100%" }}
                      className=""
                    >
                      {steps.map((label: any, index: any) => (
                        <Step key={label}>
                          <StepLabel></StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </div>
                 
                </div>
              </div>

            </div>) : (
              <div className={`col-md-4 col-lg-4 stepper_css ${styles.stepper_bg}`}>
                <div>

                  <div className={styles.stepper_wrapper} >
                    <div className={styles.stepper_content}>
                      <h4>
                        <span className="pe-1 ps-1">{translationDataFromStore?.data?.step}</span>
                        <span className="pe-1 ps-1">{currentStep === 0 ? 1 : currentStep}</span>{translationDataFromStore?.data?.of}<span className="pe-1 ps-1">3</span>
                        <span>{translationDataFromStore?.data?.sign_up}</span>
                      </h4>
                      <h4>{translationDataFromStore?.data?.singup_stepper_heading}</h4>
                    </div>
                    <div>
                      <Stepper
                        activeStep={currentStep}
                        orientation="vertical"
                        style={{ height: "100%" }}
                        className=""
                      >
                        {steps.map((label: any, index: any) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </div>
                    <div className={styles.tagline_content}>

                      <div >
                        <Image
                          src={tagLine.src}
                          alt='tag line logo'
                          width={isSmallScreen ? 48 : 72}
                          height={isSmallScreen ? 48 : 72} />
                      </div>
                      <div className="ms-3">
                        <p className="mb-0">
                          {translationDataFromStore?.data?.signup_stepper_tag_line}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

     
      </div>
    </>
  );
};

export default WizardMaster;
