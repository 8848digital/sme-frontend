import React from 'react';
import styles from "@/styles/wizard.module.css";

const Step3of3SelectAvailability = ({ formData, onFormDataChange }: any) => {
  const handleAvailabilityChange = (event: any) => {
    const availability = event.target.value;
    onFormDataChange('preferences', availability);
  };

  return (
    <div className="container">
      <div className={`card p-4 ${styles.common_wizard_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-3">
              <h1>Step 6 of 7</h1>
              <h2>Preferences</h2>
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
                  value={formData.selectAvailability}
                  onChange={handleAvailabilityChange}
                >
                  <option value="Select">Select</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>

              {/* Add more form fields for preferences here */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3of3SelectAvailability;
