import React from "react";
import styles from "@/styles/wizard.module.css";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";

const Step3of3EnterRates = ({ formData, onFormDataChange }: any) => {
  const handleRatesChange = (event: any) => {
    const rates = event.target.value;
    console.log("form rate", rates);
    onFormDataChange("hourly_rates", rates);
  };
  const handleSelectPriceBasis = (event: any) => {
    const rates = event.target.value;
    console.log("form rate", rates);
    onFormDataChange("price_basis", rates);
  };
  const { translationData, translationLoading } = useTranslationText();
  return (
    <div className="container">
      <div
        className={`card p-4 ${styles.common_wizard_wrapper}`}
        style={{ maxWidth: "800px", height: "300px" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h1>
                {translationData?.step} 7 {translationData?.of} 7
              </h1>
              <h2>{translationData?.signup_step6_preference}</h2>
            </div>
            <form className="">
              <div className="row">
                <div className="col-12 text-center mt-3">
                  <label htmlFor="enter-rates" className="form-label mt-2 pe-2">
                    {translationData?.signup_step7_description}
                  </label>
                </div>
                <div className="col-12">
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div>
                        <select
                          className="form-select input-filed-height"
                          aria-label="Default select example"
                          onChange={handleSelectPriceBasis}
                          value={formData.price_basis}
                        >
                          <option>{translationData?.signup_step7_select_placeholder}</option>
                          <option value="Monthly">{translationData?.signup_step7_select_monthly}</option>
                          <option value="Weekly">{translationData?.signup_step7_select_weekly}</option>
                          <option value="Hourly">{translationData?.signup_step7_select_hourly}</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 d-flex justify-content-center flex-column align-items-center">
                        <input
                          className="form-control w-100  input-filed-height"
                          type="text"
                          placeholder={translationData?.signup_step7_rate_placeholder}
                          value={formData.hourly_rates}
                          onChange={handleRatesChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3of3EnterRates;
