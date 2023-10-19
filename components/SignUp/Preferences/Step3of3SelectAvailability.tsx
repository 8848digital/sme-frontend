import React from 'react';

const Step3of3SelectAvailability = ({ formData, onFormDataChange }:any) => {
  const handleAvailabilityChange = (event:any) => {
    const availability = event.target.value;

    // Update the Redux state using the onFormDataChange prop
    onFormDataChange('selectAvailability', availability);
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
            <div className="mb-3 d-flex flex-column justify-content-center align-items-center mt-5">
              <label htmlFor="availability" className="form-label mt-2 pe-2">
                Select Availability
              </label>
              <select
                id="availability"
                name="availability"
                className="form-select w-25"
                value={formData.selectAvailability} // Bind value to the Redux state
                onChange={handleAvailabilityChange} // Handle change and update state
              >
                <option value="Select">Select</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
              </select>
            </div>

            {/* Add more form fields for preferences here */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step3of3SelectAvailability;
