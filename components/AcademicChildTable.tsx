import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import styles from "@/styles/wizard.module.css";
import useTranslationText from '@/hooks/general_hooks/transaltion_text_hook';
import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import { useSelector } from 'react-redux';

// Define the shape of a certification object
interface Certification {
  education_level: string;
  year: string; // Change the type to string
  gpa: string;
  gpa_out_of:string;
}

const AcademicChildTable: React.FC<{educationLevel:any ,loading:boolean ,  formData: any; onFormDataChange: (fieldName: string, value: any) => void }> = ({
  formData,
  onFormDataChange,
  educationLevel,
  loading
}) => {
  const initialCertifications: Certification[] = formData.academic_background && formData.academic_background.length > 0
    ? formData.academic_background
    : [
        {
          education_level: '',
          year: '', // Change the initial year value to an empty string
          gpa: '',
          gpa_out_of:''
        },
      ];

  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications);
console.log('form edu in wizard',educationLevel)
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
    setCertifications([...certifications, { education_level: '', year: '', gpa: '',gpa_out_of:'' }]);
  };

  const removeRow = (index: number) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);

    setCertifications(updatedCertifications);
    notifyError('Academic data deleted successfully');
    onFormDataChange('academic_background', updatedCertifications);
  };

  const translationDataFromStore = useSelector(translation_text_from_Store)
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h2>{translationDataFromStore?.data?.signup_step5_academic}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <form className="border p-3 rounded">
            <div className="row">
              <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                <strong>{translationDataFromStore?.data?.signup_step5_level}</strong>
              </div>
              <div className={`col-md-2 border ${styles.wizard_childtable_responsive_class}`}>
                <strong>{translationDataFromStore?.data?.year}</strong>
              </div>
              <div className={`col-md-2 border ${styles.wizard_childtable_responsive_class}`}>
                <strong>{translationDataFromStore?.data?.signup_step5_gpaoutof}</strong>
              </div>
              <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                <strong>{translationDataFromStore?.data?.signup_step5_gpa}</strong>
              </div>
              <div className={`col-md-2 border ${styles.wizard_childtable_responsive_class}`}></div>
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
                    value={cert.education_level}
                    onChange={(e) => handleCertificationChange(index, 'education_level', e.target.value)}
                  className={`${styles.input_custom_class_academic}`}
                  >
                     <option value="">{translationDataFromStore?.data?.select}</option>
                     {
                      educationLevel && educationLevel.map((data:any , index:any)=>{
                        return (
                          <>
                           <option value={data?.name}>{data?.name} {data?.label && (<span>&#40;{data?.label}&#41;</span>)}</option>
                          </>
                        )
                      })
                     }
                   
                    
                    
                  </select>
                </div>
                <div className={`col-md-2 border ${styles.wizard_childtable_responsive_class}`}>
                  <DatePicker
                    selected={cert.year ? new Date(cert.year) : null}
                    placeholderText={translationDataFromStore?.data?.year_placeholder}
                    onChange={(date: Date | null) => handleCertificationChange(index, 'year', date)}
                    showYearPicker
                    dateFormat="yyyy"
                    className={`${styles.input_custom_class_academic}`}
                  
                  />
                </div>
                <div className={`col-md-2 border ${styles.wizard_childtable_responsive_class}`}>
                  <select
                    name={`gpa_out_of[${index}]`}
                    value={cert.gpa_out_of}
                    onChange={(e) => handleCertificationChange(index, 'gpa_out_of', e.target.value)}
                    // className={`${styles.input_custom_class_academic}`}
                  >
                     <option value="">{translationDataFromStore?.data?.select}</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                <input
                    type="text"
                    name={`gpa[${index}]`}
                    placeholder={translationDataFromStore?.data?.signup_step5_gpa_placeholder}
                    value={cert.gpa}
                    onChange={(e) => handleCertificationChange(index, 'gpa', e.target.value)}
                    className={`${styles.input_custom_class_academic}`}
                  />
                </div>
                <div className={`col-md-2 border ${styles.wizard_childtable_responsive_class}`}>
                  <button type="button" className={`btn ${styles.btn_delete_row}`} onClick={() => removeRow(index)}>
                    {translationDataFromStore?.data?.delete_row_btn}
                  </button>
                </div>
              </div>
            ))}
            <div className="row">
              <div className="col-md-10"></div>
              <div className={`col-md-2 pt-1 pb-1 ${styles.wizard_childtable_responsive_class}`}>
                <button type="button" className={`btn ${styles.btn_add_row}`} onClick={addRow}>
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

export default AcademicChildTable;
