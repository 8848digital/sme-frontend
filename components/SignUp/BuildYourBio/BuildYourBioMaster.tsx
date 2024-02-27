import BuildYourBioAPI from "@/services/api/buildYourBio_api/buildYourBio_api";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { SignUpUserAccessToken_from_store } from "@/store/slices/auth_slice/signup_user_access_token_slice";
import {
  form_details_from_store,
  setBuildBioData,
  setResetBuildBioData,
} from "@/store/slices/buildYourBio_slice/build_bio_slice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import EnterBio from "./EnterBio";
import SelectCertifications from "./SelectCertifications";
import SelectTechnicalSkills from "./SelectTechnicalSkills";
import UploadPhoto from "./UploadPhoto";
import styles from "@/styles/bio.module.css";
import { bio_data_store } from "@/store/slices/buildYourBio_slice/bio_slice";
import useFetchOurTechnicalSkills from "@/hooks/buildYourBio/technical-skill-hooks";
import useFetchOurLanguage from "@/hooks/buildYourBio/language-hooks";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import HorizontalLinearStepper from "./BioStepper";
const BuildYourBioMaster = () => {
  const [currentStep, setCurrentStep] = useState<any>(0);
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

  const initialTechnical =
    getBioData?.data?.technical_skills?.length > 0
      ? getBioData?.data?.technical_skills
      : [{ technical_skills: "" }];

  const [technical, setTechnical] = useState<any>(initialTechnical);
  const initialLanguage =
    getBioData?.data?.language?.length > 0
      ? getBioData?.data?.language
      : [{ language: "" }];
  const [selectedLanguages, setSelectedLanguages] =
    useState<any>(initialLanguage);

  console.log(getBioData.data, "technical skills");
  const handleNext = () => {
    if (currentStep < 3) {
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
    if (currentStep > 0) {
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
    console.log(bioData, "inside submit");
    if (currentStep === 3) {
      // dispatch(setResetBuildBioData() as any); // Dispatch action to store form data
      dispatch(setBuildBioData(bioData)); // Dispatch action to store form
      const response = await BuildYourBioAPI(bioData, accessToken);

      if (
        response?.msg === "success" &&
        response?.data === "Thank You for updating your profile"
      ) {
        toast.success(
          translationDataFromStore?.data?.toast_update_profile_success,
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
      } else if (response.msg === "error") {
        toast.error(translationDataFromStore?.data?.bio_update_error_msg, {
          autoClose: 5000,
          className: "custom-toast", // Close the notification after 3 seconds
        });
      } else {
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
  console.log(translationDataFromStore, "translation text");

  return (
  
    <>
      <div className="container-fluid">
        <div className={styles.bio_wrapper}>
          <HorizontalLinearStepper activeStep={currentStep} />
        </div>

        <div className="col-12 d-flex justify-content-center">
          {currentStep === 0 && (
            <div className={styles.upload_photo_wrapper}>
              <UploadPhoto
                bioData={bioData}
                onFormDataChange={handleBioDataChange}
              />
            </div>
          )}
          {currentStep === 1 && (
            <EnterBio
              bioData={bioData}
              onFormDataChange={handleBioDataChange}
            />
          )}
          {currentStep === 2 && (
            <SelectTechnicalSkills
              ourSkill={ourSkill?.data}
              ourLanguage={ourLanguage?.data}
              loading={loading}
              bioData={bioData}
              onFormDataChange={handleBioDataChange}
              technical={technical}
              setTechnical={setTechnical}
              selectedLanguages={selectedLanguages}
              setSelectedLanguages={setSelectedLanguages}
            />
          )}

          {currentStep === 3 && (
            <SelectCertifications
              bioData={bioData}
              onFormDataChange={handleBioDataChange}
            />
          )}
        </div>

        <div className={styles.step_change_button_wrapper}>
          <div className="d-flex flex-wrap justify-content-center ">
            <div className="mx-2">
              <button
                className={`${styles.step_change_button} bg-white`}
                onClick={handlePrevious}
              >
                {translationDataFromStore?.data?.previous}
              </button>
            </div>
            <div className="">
              {currentStep === 3 ? (
                <button
                  className={` ${styles.step_change_button} bg_blue`}
                  style={{ color: "white" }}
                  onClick={handleSubmit}
                >
                  {translationDataFromStore?.data?.submit}
                </button>
              ) : (
                <button
                  className={` ${styles.step_change_button} bg_blue`}
                  style={{ color: "white" }}
                  onClick={handleNext}
                >
                  {translationDataFromStore?.data?.next}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildYourBioMaster;
