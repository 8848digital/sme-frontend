import Logo from "@/components/Logo";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/wizard.module.css";
import { Height } from "@mui/icons-material";
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
          className={`${styles.common_wizard_wrapper}`}
          style={{ maxWidth: "360px", height: "315px" }}
        >
          <div className="row">
            <div className="col-12">
              <div className="">
                <Logo />
              </div>
              <div className=" mt-5">
                <h1>
                  {/* {translationDataFromStore?.data?.step}  */}
                  {/* 1{" "}{translationDataFromStore?.data?.of} 7 */}
                </h1>
                {/* <h2>{translationDataFromStore?.data?.signup_personal}</h2> */}
                <h1 style={{ fontSize: '20px' }}>Enter Your Email</h1>
                <div className="form-group mt-4">
                  <label htmlFor="email">Email</label>
                  <input
                    className=" form-control"
                    type="email"
                    placeholder={
                      translationDataFromStore?.data?.email_placeholder
                    }
                    value={formData.usr}
                    onChange={handleEmailChange}
                    style={{ height: '44px' }}
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
