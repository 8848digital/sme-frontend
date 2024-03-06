import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/wizard.module.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface ProfessionalExperience {
  title: string;
  start_date: string; // Change the type to string
  end_date: string; // Change the type to string
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
          start_date: '',
          end_date: '',
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
    const updatedProfessionalExp = professionalExp.map((exp: any, expIndex: number) => {
      if (index === expIndex) {
        // If the field is a date, convert it to the desired format
        if (field === 'start_date' || field === 'end_date') {
          // Format the date to "YYYY-MM-DD"
          const formattedDate = value ? format(new Date(value), 'yyyy-MM-dd') : '';
          return { ...exp, [field]: formattedDate };
        }
        // For other fields, just update the value
        return { ...exp, [field]: value };
      }
      return exp;
    });
  
    setProfessionalExp(updatedProfessionalExp);
    onFormDataChange('professional_experience', updatedProfessionalExp);
  };

  const addRow = () => {
    setProfessionalExp([...professionalExp, { title: '', start_date: '', end_date: '', company: '' }]);
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
          <h1 className={`fs-20 ${styles.label_color}`}>
            {translationDataFromStore?.data?.professional_experience}</h1>
        </div>
      </div>
      <div className={`row ${styles.other_info}`}>
        <div className="col-12 p-0">
          <form className=" p-3 rounded">
            {professionalExp.map((exp, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-10">
                  <div className="row">
                    <div className="col-6 p-0">
                      <div className="d-flex flex-column me-3">
                        <label htmlFor={`title_${index}`} className={`form-label mb-1 ${styles.label_color}`}>{translationDataFromStore?.data?.title}</label>
                        <input
                          type="text"
                          name={`title[${index}]`}
                          id={`title_${index}`}
                          placeholder={`${translationDataFromStore?.data?.title}`}
                          value={exp.title}
                          onChange={(e) => handleProfessionalExpChange(index, 'title', e.target.value)}
                          className={` form-control w-100 ${styles.label_color}`}
                        />
                      </div>
                    </div>
                    <div className="col-6 p-0">
                      <div className="d-flex flex-column me-3">
                        <label htmlFor={`company_${index}`} className={`form-label mb-1 ${styles.label_color}`}>{translationDataFromStore?.data?.company}
                        </label>
                        <input
                          type="text"
                          name={`company[${index}]`}
                          id={`company_${index}`}
                          placeholder={`${translationDataFromStore?.data?.company}`}
                          value={exp.company}
                          onChange={(e) => handleProfessionalExpChange(index, 'company', e.target.value)}
                          className={` form-control w-100 ${styles.label_color}`}

                        />
                      </div>
                    </div>

                    <div className="col-6 p-0">
                      <div className="mt-3 d-flex flex-column me-3">
                        <label htmlFor={`from_date_${index}`} className={`form-label mb-1 ${styles.label_color}`}>
                          From Date
                        </label>
                        <DatePicker
                          // selected={exp.start_date ? new Date(exp.start_date) : null}
                          selected={exp.start_date ? new Date(exp.start_date) : null}
                          onChange={(date) => handleProfessionalExpChange(index, "start_date", date)}
                          id={`from_date_${index}`}
                          className="form-control w-100 cursor"
                          dateFormat="dd/MM/yyyy" // Set the date format
                          placeholderText="DD/MM/YYYY" // Set a placeholder for clarity
                          // Use the customInput prop if you want to customize the input field further
                          customInput={<input type="text" />} // This will ensure that clicking anywhere in the input field opens the date picker
                        />
                      </div>
                    </div>
                    <div className="col-6 p-0">
                      <div className="mt-3 d-flex flex-column me-3">
                        <label htmlFor={`end_date_${index}`} className={`form-label mb-1 ${styles.label_color}`}>
                          To Date
                        </label>
                        <DatePicker
                          selected={exp.end_date ? new Date(exp.end_date) : null}
                          onChange={(date) => handleProfessionalExpChange(index, "end_date", date)}
                          id={`from_date_${index}`}
                          className="form-control w-100 cursor"
                          dateFormat="dd/MM/yyyy" // Set the date format
                          placeholderText="DD/MM/YYYY" // Set a placeholder for clarity
                          // Use the customInput prop if you want to customize the input field further
                          customInput={<input type="text" />} // This will ensure that clicking anywhere in the input field opens the date picker
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
