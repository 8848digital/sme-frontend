import Link from "next/link";
import styles from "@/styles/wizard.module.css";

const Step1EnterEmail = ({ formData, onFormDataChange }: any) => {
  // Handle the form field change
  const handleEmailChange = (e: any) => {
    const email = e.target.value;

    // Call the parent's (WizardMaster's) onFormDataChange to update the formData
    onFormDataChange('email', email);
  };

  return (
    <>
      <div className="container">
        <div className={`card shadow-lg p-4 ${styles.common_wizard_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
          <div className="row">
            <div className="col-12">
              <div className='text-center mt-5'>
                <h1>Step 1 of 6</h1>
                <h2>Personal Information</h2>
                <div className='mt-4 d-flex align-items-center justify-content-center'>
                  <input
                    className="form-control w-75 me-2 input-filed-height"
                    type="email"
                    placeholder='Enter Email ...'
                    value={formData.email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1EnterEmail;
