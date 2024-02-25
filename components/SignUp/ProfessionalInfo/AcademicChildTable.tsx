import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/wizard.module.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// Define the shape of a certification object
interface Certification {
  education_level: string;
  year: string; // Change the type to string
  gpa: string;
  gpa_out_of: string;
}

const AcademicChildTable: React.FC<{
  educationLevel: any;
  loading: boolean;
  formData: any;
  onFormDataChange: (fieldName: string, value: any) => void;
}> = ({ formData, onFormDataChange, educationLevel, loading }) => {
  const initialCertifications: Certification[] =
    formData.academic_background && formData.academic_background.length > 0
      ? formData.academic_background
      : [
        {
          education_level: "",
          year: "", // Change the initial year value to an empty string
          gpa: "",
          gpa_out_of: "",
        },
      ];

  const [certifications, setCertifications] = useState<Certification[]>(
    initialCertifications
  );
  console.log("form edu in wizard", educationLevel);
  const notifySuccess = (message: string) => {
    toast.success(message);
  };

  const notifyError = (message: string) => {
    toast.error(message);
  };

  const handleCertificationChange = (
    index: number,
    field: keyof Certification,
    value: any
  ) => {
    if (field === "year" && value instanceof Date) {
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
    onFormDataChange("academic_background", updatedCertifications);
  };

  const addRow = () => {
    setCertifications([
      ...certifications,
      { education_level: "", year: "", gpa: "", gpa_out_of: "" },
    ]);
  };

  const removeRow = (index: number) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);

    setCertifications(updatedCertifications);
    notifyError("Academic data deleted successfully");
    onFormDataChange("academic_background", updatedCertifications);
  };

  const translationDataFromStore = useSelector(translation_text_from_Store);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 p-0">
          {/* <h2>{translationDataFromStore?.data?.signup_step5_academic}</h2> */}
          <h1 className={`${styles.label_color}`} style={{ fontSize: '20px' }}>{translationDataFromStore?.data?.other_information}</h1>
        </div>
      </div>
      <div className={`row ${styles.other_info}`}>
        <div className="col-12 p-0">
          <form className=" p-3 rounded">

            {certifications.map((cert:any, index:number) => (
              <div className="row mb-3" key={index}>
                <div className="col-10">
                  <div className="row">

                    <div className="col-6 p-0">
                      <div className="d-flex flex-column me-3">
                        <label htmlFor="edu_label" className={`form-label mb-1 ${styles.label_color}`}>  {translationDataFromStore?.data?.signup_step5_level}</label>
                        <select
                          name={`education_level[${index}]`}
                          value={cert.education_level}
                          onChange={(e) =>
                            handleCertificationChange(
                              index,
                              "education_level",
                              e.target.value
                            )
                          }
                         
                          className={` form-control w-100 ${styles.label_color}`}
                        >
                          <option value="">
                            {translationDataFromStore?.data?.select}
                          </option>
                          {educationLevel &&
                            educationLevel.map((data: any, index: any) => {
                              return (
                                <>
                                  <option value={data?.name}>
                                    {data?.name}{" "}
                                    {data?.label && (
                                      <span>&#40;{data?.label}&#41;</span>
                                    )}
                                  </option>
                                </>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="col-6 p-0">
                      <div className="d-flex flex-column" >
                        <label htmlFor="year" className={`form-label mb-1 ${styles.label_color}`}> {translationDataFromStore?.data?.year}</label>
                        <DatePicker
                          selected={cert.year ? new Date(cert.year) : null}
                          placeholderText={
                            translationDataFromStore?.data?.year_placeholder
                          }
                          onChange={(date: Date | null) =>
                            handleCertificationChange(index, "year", date)
                          }
                          showYearPicker
                          dateFormat="yyyy"
                          className={` form-control w-100 ${styles.label_color}`}
                        />
                      </div>
                    </div>
                    <div className="col-6 p-0">
                      <div className="d-flex flex-column mt-3 me-3">
                        <label htmlFor="year" className={`form-label mb-1 ${styles.label_color}`}> {translationDataFromStore?.data?.signup_step5_gpaoutof}</label>

                        <select
                          name={`gpa_out_of[${index}]`}
                          value={cert.gpa_out_of}
                          onChange={(e) =>
                            handleCertificationChange(
                              index,
                              "gpa_out_of",
                              e.target.value
                            )
                          }
                          className={` form-control w-100 ${styles.label_color}`}
                        >
                          <option value="">
                            {translationDataFromStore?.data?.select}
                          </option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-6 p-0">

                      <div className="d-flex flex-column mt-3 " >
                        <label htmlFor="year" className={`form-label mb-1 ${styles.label_color}`}> {translationDataFromStore?.data?.signup_step5_gpa}</label>
                        <input
                          type="text"
                          name={`gpa[${index}]`}
                          placeholder={
                            translationDataFromStore?.data
                              ?.signup_step5_gpa_placeholder
                          }
                          value={cert.gpa}
                          onChange={(e) =>
                            handleCertificationChange(index, "gpa", e.target.value)
                          }
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

export default AcademicChildTable;
