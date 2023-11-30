import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import styles from "@/styles/wizard.module.css";
import useTranslationText from '@/hooks/general_hooks/transaltion_text_hook';
import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import { useSelector } from 'react-redux';

interface ProfessionalExperience {
  title: string;
  year: string; // Change the type to string
  company: string;
}

interface ProfessionalExperienceChildTableProps {
  formData: any; // Replace 'any' with your specific form data type
  onFormDataChange: (fieldName: string, value: any) => void; // Replace 'any' with the type of form data
}

const ProfessionalExperienceChildTable: React.FC<ProfessionalExperienceChildTableProps> = ({ formData, onFormDataChange }) => {
  const [professionalExp, setProfessionalExp] = useState<ProfessionalExperience[]>(
    formData.professional_experience && formData.professional_experience.length > 0
      ? formData.professional_experience
      : [
          {
            title: '',
            year: '', // Change the initial year value to an empty string
            company: '',
          },
        ]
  );

  const notifySuccess = (message: string) => {
    toast.success(message);
  };

  const notifyError = (message: string) => {
    toast.error(message);
  };

  const handleProfessionalExpChange = (index: number, field: keyof ProfessionalExperience, value: any) => {
    if (field === 'year' && value instanceof Date) {
      // Convert the Date object to a string containing only the year
      value = value.getFullYear().toString();
    }

    const updatedProfessionalExp = professionalExp.map((exp, expIndex) => {
      if (index === expIndex) {
        // Create a copy of the professional experience object and update the field
        return { ...exp, [field]: value };
      }
      return exp;
    });

    setProfessionalExp(updatedProfessionalExp);
    onFormDataChange('professional_experience', updatedProfessionalExp);
  };

  const addRow = () => {
    setProfessionalExp([...professionalExp, { title: '', year: '', company: '' }]);
  };

  const removeRow = (index: number) => {
    const updatedProfessionalExp = [...professionalExp];
    updatedProfessionalExp.splice(index, 1);

    setProfessionalExp(updatedProfessionalExp);
    notifyError('Professional Experience data deleted successfully');
    onFormDataChange('professional_experience', updatedProfessionalExp);
  };
  const translationDataFromStore = useSelector(translation_text_from_Store)


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h2>{translationDataFromStore?.data?.professional_experience}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <form className="border p-3 rounded">
            <div className="row">
              <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                <strong>{translationDataFromStore?.data?.title}</strong>
              </div>
              <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                <strong>{translationDataFromStore?.data?.year}</strong>
              </div>
              <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                <strong>{translationDataFromStore?.data?.company}</strong>
              </div>
              <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}></div>
            </div>
            {professionalExp.map((exp, index) => (
              <div className="row mb-3" key={index}>
                <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                  <input
                    type="text"
                    name={`title[${index}]`}
                    placeholder={translationDataFromStore?.data?.title}
                    value={exp.title}
                    onChange={(e) => handleProfessionalExpChange(index, 'title', e.target.value)}
                    className={`${styles.input_custom_class}`}
                  />
                  <div className="error_message">
                    {/* Display error message here */}
                  </div>
                </div>
                <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                  <DatePicker
                    selected={exp.year ? new Date(exp.year) : null}
                    placeholderText={translationDataFromStore?.data?.year_placeholder}
                    onChange={(date: Date | null) => handleProfessionalExpChange(index, 'year', date)}
                    showYearPicker
                    dateFormat="yyyy"
                    className={`${styles.input_custom_class}`}
                  />
                </div>
                <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                  <input
                    type="text"
                    name={`company[${index}]`}
                    placeholder={translationDataFromStore?.data?.company}
                    value={exp.company}
                    onChange={(e) => handleProfessionalExpChange(index, 'company', e.target.value)}
                    className={`${styles.input_custom_class}`}
                  />
                  <div className="error_message">
                    {/* Display error message here */}
                  </div>
                </div>
                <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                  <button type="button" className={`btn ${styles.btn_delete_row}`}  onClick={() => removeRow(index)}>
                    {translationDataFromStore?.data?.delete_row_btn}
                  </button>
                </div>
              </div>
            ))}
            <div className="row">
              <div className="col-md-9"></div>
              <div className={`col-md-3 pt-1 pb-1 ${styles.wizard_childtable_responsive_class}`}>
                <button
                  type="button"
                  className={`btn ${styles.btn_add_row}`}
                  onClick={addRow}
                >
                  {translationDataFromStore?.data?.add_row_btn}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalExperienceChildTable;
