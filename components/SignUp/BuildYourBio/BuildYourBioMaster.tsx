import BuildYourBioAPI from "@/services/api/buildYourBio_api/buildYourBio_api";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { SignUpUserAccessToken_from_store } from "@/store/slices/auth_slice/signup_user_access_token_slice";
import {
  form_details_from_store,
  setBuildBioData,
  setResetBuildBioData,
} from "@/store/slices/buildYourBio_slice/build_bio_slice";
import wizardStyles from "@/styles/wizard.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { MobileStepper } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import EnterBio from "./EnterBio";
import SelectCertifications from "./SelectCertifications";
import SelectLanguageSkills from "./SelectLanguageSkills";
import SelectTechnicalSkills from "./SelectTechnicalSkills";
import UploadPhoto from "./UploadPhoto";
import styles from "@/styles/bio.module.css";
import { bio_data_store } from "@/store/slices/buildYourBio_slice/bio_slice";
import useFetchOurTechnicalSkills from "@/hooks/buildYourBio/technical-skill-hooks";
import useFetchOurLanguage from "@/hooks/buildYourBio/language-hooks";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
const BuildYourBioMaster = () => {
  const [currentStep, setCurrentStep] = useState<any>(1);
  const dispatch = useDispatch();
  const BuildYourBioData = useSelector(form_details_from_store);
  const getBioData = useSelector(bio_data_store);
  const { ourSkill, loading } = useFetchOurTechnicalSkills();
  const { ourLanguage, loadingLanguage } = useFetchOurLanguage();
  const translationDataFromStore = useSelector(translation_text_from_Store);

  // console.log(BuildYourBioData);
  const router = useRouter();
  const [bioData, setBioData] = useState<any>({
    photo_url: null,
    bio: "",
    technical_skills: [],
    other_technical_skills: "",
    language: [],
    other_languages: "",
    certifications: [],
  });
  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBioDataChange = (field: any, value: any) => {
    // For other fields, update the stepFormData object as usual
    setBioData({
      ...bioData,
      [field]: value,
    });
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // PASSING DATA OT STORE OF PUT APIs
  const signuptoken: any = useSelector(SignUpUserAccessToken_from_store);
  console.log(signuptoken);
  const loginToken: any = useSelector(get_access_token);
  console.log(loginToken);
  let accessToken: any;
  if (loginToken?.token?.length > 0) {
    accessToken = loginToken?.token;
  } else {
    accessToken = signuptoken?.data?.access_token;
  }
  // console.log(accessToken);
  const [LoggedIn, setLoggedIn] = useState<any>(false);

  let isLoggedIn: any;
  useEffect(() => {
    if (typeof window !== "undefined") {
      isLoggedIn = localStorage.getItem("LoggedIn");
      setLoggedIn(isLoggedIn);
    }
  }, [router]);
  const handleSubmit = async () => {
    if (currentStep === 5) {
      // dispatch(setResetBuildBioData() as any); // Dispatch action to store form data
      dispatch(setBuildBioData(bioData)); // Dispatch action to store form data
      const response = await BuildYourBioAPI(bioData, accessToken);
  
      if (response?.msg === 'success' && response?.data === "Thank You for updating your profile") {

        toast.success(translationDataFromStore?.data?.toast_update_profile_success,
          {
            autoClose: 5000,
            className: "custom-toast", // Close the notification after 3 seconds
          }
        );
        router.push("/profile-complete");
        setTimeout(() => {
          if (LoggedIn === "true") {
            router.push("/account-view");
            dispatch(setResetBuildBioData() as any); // Dispatch action to store form data
          } else {
            router.push("/login");
            dispatch(setResetBuildBioData() as any); // Dispatch action to store form data
          }
        }, 5000);
      } else if(response.msg === 'error') {
        toast.error(translationDataFromStore?.data?.bio_update_error_msg,
          {
            autoClose: 5000,
            className: "custom-toast", // Close the notification after 3 seconds
          }
        );
      }else {

      }

      // You can submit the data to your API or perform other actions here
    }
  };

  const handleBioData = () => {
    setBioData(getBioData.data);
    dispatch(setBuildBioData(getBioData.data));
  };

  useEffect(() => {
    if (LoggedIn === "true" && router.pathname === "/build-your-bio") {
      handleBioData();
    }
  }, [LoggedIn, router.pathname]);
  console.log("bio", bioData);

  return (
    <>
      <div className="container-fluid">
        <div className={styles.bio_wrapper}>
          <div className="row " style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div className="col-4 ">
              <div className="">
                <h2 className="fs-3 text-white">
                  {translationDataFromStore?.data?.step} {currentStep}
                </h2>
                <hr className={wizardStyles.step_hr} />
              </div>
            </div>
            <div className="col-8 position-relative">
              <div className={wizardStyles.progress_bar_div}>
                <div className={wizardStyles.progress_bar_div_tag}>
                
                  {
                        document.dir === 'ltr' ?
                         <p className="mb-4 text-white">
                        <span className="ps-1 pe-1">{currentStep}</span>{translationDataFromStore?.data?.of}<span className="pe-1 ps-1">5</span> 
                        {translationDataFromStore?.data?.completed}</p> 
                        : 
                        <p className="mb-4 text-white">
                     {/* <span className="ps-1 pe-1">{currentStep}</span> */}
                     {translationDataFromStore?.data?.steps_bar_of_arabic}<span className="pe-1 ps-1">5</span> 
                     {translationDataFromStore?.data?.steps_bar_arabic}<span className="ps-1 pe-1">{currentStep}</span>
                        {translationDataFromStore?.data?.completed} 
                        {/* {currentStep}من 7 خطوات مكتملة */}
                      </p>
                      } 
                </div>

                <MobileStepper
                  variant="progress"
                  steps={6}
                  backButton={<></>}
                  nextButton={<></>}
                  activeStep={currentStep}
                  className={wizardStyles.progress_bar}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {currentStep === 1 && (
                <UploadPhoto
                  bioData={bioData}
                  onFormDataChange={handleBioDataChange}
                />
              )}
              {currentStep === 2 && (
                <EnterBio
                  bioData={bioData}
                  onFormDataChange={handleBioDataChange}
                />
              )}
              {currentStep === 3 && (
                <SelectTechnicalSkills
                  ourSkill={ourSkill?.data}
                  loading={loading}
                  bioData={bioData}
                  onFormDataChange={handleBioDataChange}
                />
              )}
              {currentStep === 4 && (
                <SelectLanguageSkills
                  ourLanguage={ourLanguage?.data}
                  loading={loadingLanguage}
                  bioData={bioData}
                  onFormDataChange={handleBioDataChange}
                />
              )}

              {currentStep === 5 && (
                <SelectCertifications
                  bioData={bioData}
                  onFormDataChange={handleBioDataChange}
                />
              )}
            </div>

            <div className="col-12">
              <div
                className=" d-flex justify-content-center"
                style={{ marginTop: "50px", marginBottom: "20px" }}
              >
                <div className="d-sm-flex d-static">
                  {currentStep > 1 && (
                    <button
                      className="btn btn-prev me-3 d-flex align-items-center justify-content-center"
                      onClick={handlePrevious}
                    >
                      <ArrowBackIcon />
                      {translationDataFromStore?.data?.previous}
                    </button>
                  )}
                  {currentStep < 5 ? (
                    <button
                      className="btn btn-next d-flex align-items-center justify-content-center"
                      onClick={handleNext}
                    >
                      {translationDataFromStore?.data?.next}
                      <ArrowForwardIcon />
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
    </>
  );
};

export default BuildYourBioMaster;
