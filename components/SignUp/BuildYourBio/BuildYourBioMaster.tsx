import BuildYourBioAPI from "@/services/api/buildYourBio_api/buildYourBio_api";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { SignUpUserAccessToken_from_store } from "@/store/slices/auth_slice/signup_user_access_token_slice";
import {
  form_details_from_store,
  setBuildBioData,
  setResetBuildBioData,
} from "@/store/slices/build_bio_slice";
import wizardStyles from "@/styles/wizard.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { MobileStepper } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import EnterBio from "./EnterBio";
import SelectCertifications from "./SelectCertifications";
import SelectLanguageSkills from "./SelectLanguageSkills";
import SelectTechnicalSkills from "./SelectTechnicalSkills";
import UploadPhoto from "./UploadPhoto";
import styles from "@/styles/bio.module.css";
const BuildYourBioMaster = () => {
  const [currentStep, setCurrentStep] = useState<any>(1);
  const dispatch = useDispatch();
  const BuildYourBioData = useSelector(form_details_from_store);

  // console.log(BuildYourBioData);
  const router = useRouter();
  const [bioData, setBioData] = useState<any>({
    upload_photo: null,
    enter_your_bio: "",
    technical_skills: [],
    language: [],
    certifications: [],
  });

  // console.log(bioData);

  // const validateStep1 = () => {
  //   if (bioData.upload_photo === null) {
  //     toast.error("Please Upload Image ");
  //     return false;
  //   }

  //   return true;
  // };
  // const validateStep2 = () => {
  //   if (bioData.enter_your_bio === "") {
  //     toast.error("Please Add Bio.");
  //     return false;
  //   }
  //   return true;
  // };

  // const validateStep3 = () => {
  //   if (bioData.technical_skills.length === 0) {
  //     toast.error("Please enter your technical skill.");
  //     return false;
  //   }
  //   return true;
  // };

  // const validateStep4 = () => {
  //   if (bioData.language.length === 0) {
  //     toast.error("Please enter your language.");
  //     return false;
  //   }
  //   return true;
  // };
  // const validateStep5 = () => {
  //   if (bioData.certifications.length === 0) {
  //     toast.error("Please enter certification.");
  //     return false;
  //   }
  //   return true;
  // };

  const handleNext = () => {
    // Check validation before proceeding to the next step
    if (currentStep < 5) {
      let isValid = true;

      // switch (currentStep) {
      //   case 1:
      //     isValid = validateStep1();
      //     break;
      //   case 2:
      //     isValid = validateStep2();
      //     break;
      //   case 3:
      //     isValid = validateStep3();
      //     break;
      //   case 4:
      //     isValid = validateStep4();
      //     break;
      //   case 5:
      //     isValid = validateStep5();
      //     break;

      //   default:
      //     break;
      // }

      if (!isValid) {
        return;
      }

      //   // If all validations pass, proceed to the next step
      //   dispatch(setFormData(stepFormData) as any);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBioDataChange = (field: any, value: any) => {
    if (field === "certification_level") {
      // If the field is 'certification_level', update it with the provided value
      setBioData({
        ...bioData,
        certification_in_bio: value.certifications,
      });
    } else if (field === "professionalexp") {
      // If the field is 'professionalexp', update it with the provided value
      setBioData({
        ...bioData,
        professionalexp: value.professional_exp,
      });
    } else {
      // For other fields, update the stepFormData object as usual
      setBioData({
        ...bioData,
        [field]: value,
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // PASSING DATA OT STORE OF PUT APIs
  const signuptoken: any = useSelector(SignUpUserAccessToken_from_store);
  // console.log(signuptoken);
  const loginToken: any = useSelector(get_access_token);
  // console.log(loginToken);
  let accessToken: any;
  if (loginToken?.data?.length > 0) {
    accessToken = loginToken?.data;
  } else {
    accessToken = signuptoken?.data?.acess_token;
  }
  // console.log(accessToken);

  const handleSubmit = async () => {
    dispatch(setResetBuildBioData() as any); // Dispatch action to store form data
    dispatch(setBuildBioData(bioData) as any); // Dispatch action to store form data
    const response = await BuildYourBioAPI(BuildYourBioData, accessToken);
    // console.log(response);
    toast.success(response?.data);
    router.push("/profile-complete");

    // You can submit the data to your API or perform other actions here
  };
  return (
    <>
      <div className="container-fluid">
        <div className={styles.bio_wrapper}>
          <div
            className="row "
            style={{ maxWidth: "800px", margin: "0 auto", }}
          >
            <div className="col-4 ">
              <div className="">
                <h2 className="fs-3 text-white">Step {currentStep}</h2>
                <hr className={wizardStyles.step_hr} />
              </div>
            </div>
            <div className="col-8 position-relative">
              <div className={wizardStyles.progress_bar_div}>
                <div className="" style={{ marginLeft: "109px" }}>
                  <p className="mb-4 text-white">
                    {currentStep} of 5 completed
                  </p>
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
                  bioData={bioData}
                  onFormDataChange={handleBioDataChange}
                />
              )}
              {currentStep === 4 && (
                <SelectLanguageSkills
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
                style={{ marginTop: "50px" }}
              >
                <div className="d-sm-flex d-static">
                  {currentStep > 1 && (
                    <button
                      className="btn btn-prev me-3 d-flex align-items-center justify-content-center"
                      onClick={handlePrevious}
                    >
                      <ArrowBackIcon />
                      Previous
                    </button>
                  )}
                  {currentStep < 5 ? (
                    <button
                      className="btn btn-next d-flex align-items-center justify-content-center"
                      onClick={handleNext}
                    >
                      Next
                      <ArrowForwardIcon />
                    </button>
                  ) : (
                    <button className="btn btn-next" onClick={handleSubmit}>
                      Submit
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
