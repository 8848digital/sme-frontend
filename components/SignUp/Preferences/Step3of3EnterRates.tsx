import React from 'react';

const Step3of3EnterRates = ({ formData, onFormDataChange }:any) => {
  const handleRatesChange = (event:any) => {
    const rates = event.target.value;

    // Update the Redux state using the onFormDataChange prop
    onFormDataChange('rates', rates);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="text-center" style={{ marginTop: '150px' }}>
            <h1>Step 3 of 3</h1>
            <h3>Preferences</h3>
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
                value={formData.rates} // Bind value to the Redux state
                onChange={handleRatesChange} // Handle change and update state
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step3of3EnterRates;
