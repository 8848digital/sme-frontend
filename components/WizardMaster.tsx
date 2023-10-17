import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { storeFormDataAction } from '@/store/slices/formAction_slice';
import MultiStep from './StepsProgressIndicator';
import Step1EnterEmail from './SignUp/PersonalInfo/Step1EnterEmail';
import Step3EnterName from './SignUp/PersonalInfo/Step3EnterName';
import Step2VarificationCode from './SignUp/PersonalInfo/Step2VarificationCode';
import sideImg from '../public/assets/side-img.jpg'
import StepWizard from 'react-step-wizard';
const WizardMaster = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();

  const [stepFormData, setStepFormData] = useState<any>({
    email: '',
    verificationCode: ['', '', '', ''], // Initialize an array for verification codes
    firstName: '',
    lastName: '',
    phoneNumber: '',
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
          <div style={{ width: '380px' }}>
            <img src={sideImg.src} alt="Your Image" style={{ width: '100%',height:'800px' }} />
          </div>
        </div>
        <div className="col-md-8">
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
              <div className="text-center" style={{ marginTop: '180px' }}>
                {currentStep > 1 && (
                  <button className="btn btn-prev me-3" onClick={handlePrevious}>
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
