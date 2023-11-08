import React from 'react';
import styles from "@/styles/wizard.module.css";
import AcademicChildTable from '@/components/AcademicChildTable';
import ProfessionalExpericeneChildTable from '@/components/ProfessionalExpericeneChildTable';
import useTranslationText from '@/hooks/general_hooks/transaltion_text_hook';

const Step2of3ExtractedDataFromCv = ({ formData, onFormDataChange , educationLevel , loading }:any) => {
  const { translationData, translationLoading } = useTranslationText();

  return (
    <div className="container">
      <div className={`card p-4 ${styles.common_wizard_wrapper}`}  style={{ maxWidth: "900px" }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-2">
              <h1>{translationData?.step} 5 {translationData?.of} 7</h1>
              <h2>{translationData?.professional_experience}</h2>
            </div>
          </div>
          <div className="col-12">
             <AcademicChildTable formData={formData} onFormDataChange={onFormDataChange} educationLevel={educationLevel} loading={loading} />

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
