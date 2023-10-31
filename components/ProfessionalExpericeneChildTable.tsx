import React, { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import styles from "@/styles/wizard.module.css";

interface ProfessionalExperience {
  title: string;
  year: string;
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
            year: '',
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

  const handleProfessionalExpChange = (index:any, field:any, value:any) => {
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
    setProfessionalExp([
      ...professionalExp,
      { title: '', year: '', company: '' },
    ]);
  };

  const removeRow = (index: number) => {
    const updatedProfessionalExp = [...professionalExp];
    updatedProfessionalExp.splice(index, 1);
    setProfessionalExp(updatedProfessionalExp);
    notifyError('Professional Experience data deleted successfully');
    onFormDataChange('professional_experience', updatedProfessionalExp);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h2>Professional Experience</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <form className="border p-3 rounded">
            <div className="row">
              <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                <strong>Title</strong>
              </div>
              <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                <strong>Year</strong>
              </div>
              <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                <strong>Company</strong>
              </div>
              <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}></div>
            </div>
            {professionalExp.map((exp, index) => (
              <div className="row mb-3" key={index}>
                <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                  <input
                    type="text"
                    name={`title[${index}]`}
                    placeholder="Title"
                    value={exp.title}
                    onChange={(e) => handleProfessionalExpChange(index, 'title', e.target.value)}
                  />
                  <div className="error_message">
                    {/* Display error message here */}
                  </div>
                </div>
                <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                  <input
                    type="text"
                    name={`year[${index}]`}
                    placeholder="Year"
                    value={exp.year}
                    onChange={(e) => handleProfessionalExpChange(index, 'year', e.target.value)}
                  />
                  <div className="error_message">
                    {/* Display error message here */}
                  </div>
                </div>
                <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                  <input
                    type="text"
                    name={`company[${index}]`}
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleProfessionalExpChange(index, 'company', e.target.value)}
                  />
                  <div className="error_message">
                    {/* Display error message here */}
                  </div>
                </div>
                <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                  <button type="button" className="btn btn-danger" onClick={() => removeRow(index)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div className="row">
              <div className="col-md-9"></div>
              <div className={`col-md-3 pt-1 pb-1 ${styles.wizard_childtable_responsive_class}`}>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={addRow}
                >
                  Add Row
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
