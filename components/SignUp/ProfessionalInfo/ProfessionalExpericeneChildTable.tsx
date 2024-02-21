import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/wizard.module.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface ProfessionalExperience {
  title: string;
  year: string; // Change the type to string
  company: string;
}

interface ProfessionalExperienceChildTableProps {
  formData: any;
  onFormDataChange: (fieldName: string, value: any) => void;
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

  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 p-0">
          <h1 className={`${styles.label_color}`} style={{ fontSize: '20px' }}>{translationDataFromStore?.data?.professional_experience}</h1>
        </div>
      </div>
      <div className={`row ${styles.other_info}`}>
        <div className="col-12 p-0">
          <form className=" p-3 rounded">
            {professionalExp.map((exp, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-10">
                  <div className="row">
                    <div className="col-12 p-0">
                      <div className="d-flex flex-column me-3">
                        <label htmlFor={`title_${index}`} className={`form-label mb-1 ${styles.label_color}`}>Title</label>
                        <input
                          type="text"
                          name={`title[${index}]`}
                          id={`title_${index}`}
                          placeholder="Title"
                          value={exp.title}
                          onChange={(e) => handleProfessionalExpChange(index, 'title', e.target.value)}
                          className={` form-control w-100 ${styles.label_color}`}
                        />
                      </div>
                    </div>
                    <div className="col-6 p-0">
                      <div className="d-flex flex-column mt-3 me-3" >
                        <label htmlFor={`year_${index}`} className={`form-label mb-1 ${styles.label_color}`}>Year</label>
                        <DatePicker
                          selected={exp.year ? new Date(exp.year) : null}
                          id={`year_${index}`}
                          onChange={(date: Date | null) => handleProfessionalExpChange(index, 'year', date)}
                          showYearPicker
                          dateFormat="yyyy"
                          className={` form-control w-100 ${styles.label_color}`}
                          placeholderText={
                            translationDataFromStore?.data?.year_placeholder
                          }
                        />
                      </div>
                    </div>
                    <div className="col-6 p-0">
                      <div className="d-flex flex-column mt-3 me-3">
                        <label htmlFor={`company_${index}`} className={`form-label mb-1 ${styles.label_color}`}>Company</label>
                        <input
                          type="text"
                          name={`company[${index}]`}
                          id={`company_${index}`}
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => handleProfessionalExpChange(index, 'company', e.target.value)}
                          className={` form-control w-100 ${styles.label_color}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '100%' }}>
                    {/* Disable delete button when index is 0 */}
                    {index !== 0 && (
                      <DeleteIcon onClick={() => removeRow(index)} style={{ cursor: 'pointer', color: '#00A5CD' }} />
                    )}
                    <AddIcon onClick={addRow} style={{ cursor: 'pointer', color: '#00A5CD', marginLeft: '5px' }} />
                  </div>
                </div>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalExperienceChildTable;
