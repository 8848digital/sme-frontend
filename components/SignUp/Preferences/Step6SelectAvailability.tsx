import React from 'react';
import styles from "@/styles/wizard.module.css";
import useTranslationText from '@/hooks/general_hooks/transaltion_text_hook';

const Step3of3SelectAvailability = ({ formData, onFormDataChange }: any) => {
  const handleAvailabilityChange = (event: any) => {
    const availability = event.target.value;
    onFormDataChange('preferences', availability);
  };
  const { translationData, translationLoading } = useTranslationText();
  return (
    <div className="container">
      <div className={`card p-4 ${styles.common_wizard_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-3">
              <h1>{translationData?.step} 6 {translationData?.of} 7</h1>
              <h2>{translationData?.signup_step6_preference}</h2>
            </div>
            <form>
              <div className="mb-3 d-flex flex-column justify-content-center align-items-center mt-5">
                <label htmlFor="availability" className="form-label mt-2 pe-2">
                  {translationData?.signup_step6_availability}
                </label>
                <select
                  id="availability"
                  name="availability"
                  className="form-select w-25"
                  value={formData.preferences}
                  onChange={handleAvailabilityChange}
                >
                  <option value="Select">{translationData?.select}</option>
                  <option value="Full Time">{translationData?.signup_step6_full_time}</option>
                  <option value="Part Time">{translationData?.signup_step6_part_time}</option>
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
