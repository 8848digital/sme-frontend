import Logo from "@/components/Logo";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/wizard.module.css";
import { ChangeEvent } from "react";
import { useSelector } from "react-redux";

interface Step3Props {
  formData: any;
  onFormDataChange: (field: string, value: any) => void;
}

const Step3EnterName = ({ formData, onFormDataChange }: any) => {
  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const firstName = e.target.value;
    onFormDataChange("first_name", firstName);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const lastName = e.target.value;
    onFormDataChange("last_name", lastName);
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value;
    onFormDataChange("phone_no", phoneNumber);
  };
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <div className="container">
      <div
        className={`${styles.common_wizard_wrapper}`}
        style={{ maxWidth: "360px", height: "315px" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="">
              <Logo
              />
            </div>
            <div className="mt-5">
              <h1>
                {/* {translationDataFromStore?.data?.step} */}
                {/* 3{" "}
                {translationDataFromStore?.data?.of} 7 */}
              </h1>
              <h2 style={{ fontSize: '20px' }}>
                {/* {translationDataFromStore?.data?.signup_personal} */}
                Other Information
                </h2>
              <div className="form-group ">
                <label htmlFor="email">First Name</label>
                <input
                  className="form-control input-filed-height"
                  type="text"
                  placeholder={
                    translationDataFromStore?.data?.first_name_placeholder
                  }
                  value={formData.first_name}
                  onChange={handleFirstNameChange}
                />
              </div>
              <div className="form-group mt-3">
              <label htmlFor="email">Last Name</label>
              <input
                className="form-control input-filed-height"
                type="text"
                placeholder={
                  translationDataFromStore?.data?.last_name_placeholder
                }
                value={formData.last_name}
                onChange={handleLastNameChange}
              />
              </div>
              <div className="form-group mt-3">
              <label htmlFor="email">Phone Number</label>
              <input
                className="form-control input-filed-height"
                type="number"
                placeholder={translationDataFromStore?.data?.phone_number}
                value={formData.phone_no}
                onChange={handlePhoneNumberChange}
              />
              </div>
              {/* <Link href='' className='mt-3'>Verify Number</Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Step3EnterName;
