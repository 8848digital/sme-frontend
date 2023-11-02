import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import styles from "@/styles/wizard.module.css";

// Define the shape of a certification object
interface Certification {
  certification_level: string;
  year: string; // Change the type to string
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
          year: '', // Change the initial year value to an empty string
          gpa: '1',
        },
      ];

  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications);

  const notifySuccess = (message: string) => {
    toast.success(message);
  };

  const notifyError = (message: string) => {
    toast.error(message);
  };

  const handleCertificationChange = (index: number, field: keyof Certification, value: any) => {
    if (field === 'year' && value instanceof Date) {
      // Convert the Date object to a string containing only the year
      value = value.getFullYear().toString();
    }

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
    setCertifications([...certifications, { certification_level: '', year: '', gpa: '1' }]);
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
                <strong>Education Level</strong>
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
                  {/* <input
                    type="text"
                    name={`certification_level[${index}]`}
                    placeholder="Education Level"
                    value={cert.certification_level}
                    onChange={(e) => handleCertificationChange(index, 'certification_level', e.target.value)}
                  /> */}
                  <select
                    name={`certification_level[${index}]`}
                    value={cert.certification_level}
                    onChange={(e) => handleCertificationChange(index, 'certification_level', e.target.value)}
                  className={`${styles.input_custom_class}`}
                  >
                     <option value="">Select</option>
                    <option value="bachelor's">Bachelor's</option>
                    <option value="master's">Master's</option>
                    <option value="doctor's">Doctor's</option>
                    
                  </select>
                </div>
                <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                  <DatePicker
                    selected={cert.year ? new Date(cert.year) : null}
                    placeholderText="Select Year"
                    onChange={(date: Date | null) => handleCertificationChange(index, 'year', date)}
                    showYearPicker
                    dateFormat="yyyy"
                    className={`${styles.input_custom_class}`}
                  />
                </div>
                <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                  <select
                    name={`gpa[${index}]`}
                    value={cert.gpa}
                    onChange={(e) => handleCertificationChange(index, 'gpa', e.target.value)}
                    className={`${styles.input_custom_class}`}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                  <button type="button" className={`btn ${styles.btn_delete_row}`} onClick={() => removeRow(index)}>
                    Delete Row
                  </button>
                </div>
              </div>
            ))}
            <div className="row">
              <div className="col-md-9"></div>
              <div className={`col-md-3 pt-1 pb-1 ${styles.wizard_childtable_responsive_class}`}>
                <button type="button" className={`btn ${styles.btn_add_row}`} onClick={addRow}>
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
