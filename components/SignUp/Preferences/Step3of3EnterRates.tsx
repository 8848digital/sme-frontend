import React from 'react';
import styles from "@/styles/wizard.module.css";

const Step3of3EnterRates = ({ formData, onFormDataChange }: any) => {
  const handleRatesChange = (event: any) => {
    const rates = event.target.value;
    onFormDataChange('rates', rates);
  };

  return (
    <div className="container">
      <div className={`card p-4 ${styles.common_wizard_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h1>Step 3 of 3</h1>
              <h2>Preferences</h2>
            </div>
            <form>
              <div className="mb-3 d-flex justify-content-center mt-5">
                <label htmlFor="enter-rates" className="form-label mt-2 pe-2">
                  Enter hourly/weekly/monthly Rates
                </label>
                <input
                  className="form-control w-50 me-2 input-filed-height"
                  type="text"
                  placeholder='Enter Rates ...'
                  value={formData.rates}
                  onChange={handleRatesChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3of3EnterRates;
