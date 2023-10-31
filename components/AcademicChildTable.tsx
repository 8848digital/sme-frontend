import React, { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import styles from "@/styles/wizard.module.css";

// Define the shape of a certification object
interface Certification {
  certification_level: string;
  year: string;
  gpa: string;
}

const AcademicChildTable: React.FC<{ formData: any; onFormDataChange: (fieldName: string, value: any) => void }> = ({
  formData,
  onFormDataChange,
}) => {
  const initialCertifications: Certification[] = formData.academic_background && formData.academic_background.length > 0
    ? formData.academic_background
    : [
        {
          certification_level: '',
          year: '',
          gpa: '',
        },
      ];

  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications);

  const notifySuccess = (message: string) => {
    toast.success(message);
  };

  const notifyError = (message: string) => {
    toast.error(message);
  };

  const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
    const updatedCertifications = certifications.map((cert, certIndex) => {
      if (index === certIndex) {
        // Create a copy of the certification object and update the field
        return { ...cert, [field]: value };
      }
      return cert;
    });
  
    setCertifications(updatedCertifications);
    onFormDataChange('academic_background', updatedCertifications);
  };
  

  const addRow = () => {
    setCertifications([...certifications, { certification_level: '', year: '', gpa: '' }]);
  };

  const removeRow = (index: number) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);

    setCertifications(updatedCertifications);
    notifyError('Academic data deleted successfully');
    onFormDataChange('academic_background', updatedCertifications);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h2>Academic Background</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <form className="border p-3 rounded">
            <div className="row">
              <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                <strong>Certification Level</strong>
              </div>
              <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                <strong>Year</strong>
              </div>
              <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                <strong>GPA</strong>
              </div>
              <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}></div>
            </div>
            {certifications.map((cert, index) => (
              <div className="row mb-3" key={index}>
                <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                  <input
                    type="text"
                    name={`certification_level[${index}]`}
                    placeholder="Certification Level"
                    value={cert.certification_level}
                    onChange={(e) => handleCertificationChange(index, 'certification_level', e.target.value)}
                  />
                </div>
                <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                  <input
                    type="text"
                    name={`year[${index}]`}
                    placeholder="Year"
                    value={cert.year}
                    onChange={(e) => handleCertificationChange(index, 'year', e.target.value)}
                  />
                </div>
                <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                  <input
                    type="text"
                    name={`gpa[${index}]`}
                    placeholder="GPA"
                    value={cert.gpa}
                    onChange={(e) => handleCertificationChange(index, 'gpa', e.target.value)}
                  />
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
                <button type="button" className="btn btn-success" onClick={addRow}>
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

export default AcademicChildTable;
