import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/wizard.module.css";
import { useSelector } from "react-redux";
const Step1EnterEmail = ({ formData, onFormDataChange }: any) => {
  // Handle the form field change
  const handleEmailChange = (e: any) => {
    const email = e.target.value;

    // Call the parent's (WizardMaster's) onFormDataChange to update the formData
    onFormDataChange("usr", email);
  };
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <>
      <div className="container">
        <div
          className={`card shadow-lg p-4 ${styles.common_wizard_wrapper}`}
          style={{ maxWidth: "800px", height: "300px" }}
        >
          <div className="row">
            <div className="col-12">
              <div className="text-center mt-5">
                <h1>
                  {/* {translationDataFromStore?.data?.step}  */}
                  1{" "}{translationDataFromStore?.data?.of} 7
                </h1>
                <h2>{translationDataFromStore?.data?.signup_personal}</h2>
                <div className="mt-4 d-flex flex-column align-items-center justify-content-center">
                  <input
                    className="form-control w-75 me-2 input-filed-height"
                    type="email"
                    placeholder={
                      translationDataFromStore?.data?.email_placeholder
                    }
                    value={formData.usr}
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
