import Logo from "@/components/Logo";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/wizard.module.css";
import { ChangeEvent } from "react";
import { useSelector } from "react-redux";

interface Step3Props {
  formData: any;
  onFormDataChange: (field: string, value: any) => void;
}

const EnterNameAndPhoneNumber = ({ formData, onFormDataChange ,  setInternalStep,
  internalStep, }: any) => {
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
    <div >
      <div
        className={`${styles.common_wizard_wrapper}`}
      >
        <div className="row">
          <div className="col-12">
            <div className="">
              <Logo
              />
            </div>
            <div className="mt-5">
              <h2 className="fs-20">
              {translationDataFromStore?.data?.other_information}
                </h2>
              <div className="form-group ">
                <label className="grey" htmlFor="fname">
                {translationDataFromStore?.data?.first_name}
                  </label>
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
              <label className="grey" htmlFor="lname">{translationDataFromStore?.data?.last_name}</label>
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
              <label className="grey" htmlFor="phone_number">{translationDataFromStore?.data?.phone_number}</label>
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

export default EnterNameAndPhoneNumber;
