import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UploadPhoto from './UploadPhoto';
import EnterBio from './EnterBio';
import SelectTechnicalSkills from './SelectTechnicalSkills';
import SelectLanguageSkills from './SelectLanguageSkills';
import SelectCertifications from './SelectCertifications';
import ProfileCompleted from './ProfileCompleted';
const BuildYourBioMaster = () => {
    const [currentStep, setCurrentStep] = useState<any>(1);
    const dispatch = useDispatch();
    const router = useRouter();
    const handleNext = () => {
        if (currentStep < 7) {
            //   dispatch(storeFormDataAction(stepFormData) as any); // Dispatch action to store form data
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        // dispatch(storeFormDataAction(stepFormData) as any); // Dispatch action to store form data
        router.push('/')
        // You can submit the data to your API or perform other actions here
    };
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {currentStep === 1 && (
                            <UploadPhoto
                            // formData={stepFormData}
                            // onFormDataChange={handleFormDataChange}
                            />
                        )}
                        {currentStep === 2 && (
                            <EnterBio
                            // formData={stepFormData}
                            // onFormDataChange={handleFormDataChange}
                            />
                        )}
                        {currentStep === 3 && (
                            <SelectTechnicalSkills
                            // formData={stepFormData}
                            // onFormDataChange={handleFormDataChange}
                            />
                        )}
                        {currentStep === 4 && (
                            <SelectLanguageSkills
                            // formData={stepFormData}
                            // onFormDataChange={handleFormDataChange}
                            />
                        )}

                        {currentStep === 5 && (
                            <SelectCertifications
                            // formData={stepFormData}
                            // onFormDataChange={handleFormDataChange}
                            />
                        )}
                        {currentStep === 6 && (
                            <ProfileCompleted
                            // formData={stepFormData}
                            // onFormDataChange={handleFormDataChange}
                            />
                        )}
                    </div>

              
                <div className="col-12">
                    <div className=" d-flex justify-content-center" style={{ marginTop: "50px" }}>
                        <div className="d-flex">
                            {currentStep > 1 && (
                                <button
                                    className="btn btn-prev me-3 d-flex align-items-center justify-content-center"
                                    onClick={handlePrevious}
                                >
                                    <ArrowBackIcon />
                                    Previous
                                </button>
                            )}
                            {currentStep < 6 ? (
                                <button className="btn btn-next d-flex align-items-center justify-content-center" onClick={handleNext}>
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
        </div >
       </>
    )
}

export default BuildYourBioMaster