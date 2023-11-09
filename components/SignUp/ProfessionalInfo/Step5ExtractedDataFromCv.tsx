import React from 'react';
import styles from "@/styles/wizard.module.css";
import AcademicChildTable from '@/components/AcademicChildTable';
import ProfessionalExpericeneChildTable from '@/components/ProfessionalExpericeneChildTable';
import useTranslationText from '@/hooks/general_hooks/transaltion_text_hook';
import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import { useSelector } from 'react-redux';

const Step2of3ExtractedDataFromCv = ({ formData, onFormDataChange , educationLevel , loading }:any) => {
  const transtationDataFromStore = useSelector(translation_text_from_Store)


  return (
    <div className="container">
      <div className={`card p-4 ${styles.common_wizard_wrapper}`}  style={{ maxWidth: "900px" }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-2">
              <h1>{transtationDataFromStore?.data?.step} 5 {transtationDataFromStore?.data?.of} 7</h1>
              <h2>{transtationDataFromStore?.data?.professional_experience}</h2>
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
