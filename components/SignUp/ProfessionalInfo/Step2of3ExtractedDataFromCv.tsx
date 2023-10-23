import React from 'react';
import styles from "@/styles/wizard.module.css";
import AcademicChildTable from '@/components/AcademicChildTable';
import ProfessionalExpericeneChildTable from '@/components/ProfessionalExpericeneChildTable';

const Step2of3ExtractedDataFromCv = ({ formData, onFormDataChange }:any) => {
  return (
    <div className="container">
      <div className={`card p-4 ${styles.common_wizard_wrapper}`} style={{ maxWidth: '800px'}}>
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-2">
              <h1>Step 5 of 7</h1>
              <h2>Professional Information</h2>
            </div>
          </div>
          <div className="col-12">
             <AcademicChildTable formData={formData} onFormDataChange={onFormDataChange}/>

          </div>
          <div className="col-12 mt-5">
             <ProfessionalExpericeneChildTable formData={formData} onFormDataChange={onFormDataChange}/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2of3ExtractedDataFromCv;
