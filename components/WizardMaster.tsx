import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { storeFormDataAction } from "@/store/slices/formAction_slice";
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

import styles from "@/styles/wizard.module.css";
import { styled } from "@mui/material/styles";

const WizardMaster = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const dispatch = useDispatch();

  const [stepFormData, setStepFormData] = useState<any>({
    email: "",
    verificationCode: ["", "", "", ""], // Initialize an array for verification codes
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const handleNext = () => {
    if (currentStep < 3) {
      dispatch(storeFormDataAction(stepFormData) as any); // Dispatch action to store form data
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    dispatch(storeFormDataAction(stepFormData) as any); // Dispatch action to store form data
    // You can submit the data to your API or perform other actions here
  };

  const handleFormDataChange = (field: any, value: any) => {
    setStepFormData({
      ...stepFormData,
      [field]: value,
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 p-0">
          <div style={{ width: "380px" }} className={styles.image_cont}>
            <img
              src={sideImg.src}
              alt="Your Image"
              style={{ width: "100%", height: "800px" }}
            />
            <div className={styles.wizard_cont}>
              <Box sx={{ width: "100%" }}>
                <Stepper activeStep={currentStep - 1} orientation="vertical">
                  {data.map((e: number) => {
                    return (
                      <Step key={e} >
                        <StepLabel></StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Box>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-lg-8 mt-5">
          <div className="row ">
            <div className="col-4">
              <div>
                <h2 className="fs-3">Step {currentStep}</h2>
                <hr className={styles.step_hr} />
              </div>
            </div>
            <div className="col-8 position-relative">
              <div className={styles.progress_bar_div}>
                <div className="">
                  <p className="mb-4">{currentStep} of 10 completed</p>
                </div>

                <MobileStepper
                  variant="progress"
                  steps={11}
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
          </div>

          <div className="row">
            <div className="col-12">
              <div className="text-center" style={{ marginTop: "180px" }}>
                {currentStep > 1 && (
                  <button
                    className="btn btn-prev me-3"
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button className="btn btn-next" onClick={handleNext}>
                    Next
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
  );
};

export default WizardMaster;
