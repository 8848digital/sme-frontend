import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/wizard.module.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface IndustryExpericene {
  industry: string;
  service_line: string; // Change the type to string
  region: string;
  year_of_experience: string;
}

interface IndustryExpericeneChildTableProps {
  formData: any;
  onFormDataChange: (fieldName: string, value: any) => void;
}

const IndustryExpericeneChildTable = ({ formData, onFormDataChange
  , industryList, industryListLoading, regionList, regionListLoading,
  serviceList, serviceListLoading, yearOfExpList, yearOfExpListLoading

}: any) => {
  const [industryExpericene, setIndustryExpericene] = useState<IndustryExpericene[]>(
    formData.professional_experience && formData.professional_experience.length > 0
      ? formData.professional_experience
      : [
        {
          industry: '',
          service_line: '', // Change the initial year value to an empty string
          region: '',
          year_of_experience: ''
        },
      ]
  );

  const notifySuccess = (message: string) => {
    toast.success(message);
  };

  const notifyError = (message: string) => {
    toast.error(message);
  };

  const handleIndustryExpChange = (index: number, field: keyof IndustryExpericene, value: any) => {
    // if (field === 'year' && value instanceof Date) {
    //   // Convert the Date object to a string containing only the year
    //   value = value.getFullYear().toString();
    // }

    const updatedIndustryExp = industryExpericene.map((exp: any, expIndex: number) => {
      if (index === expIndex) {
        // Create a copy of the professional experience object and update the field
        return { ...exp, [field]: value };
      }
      return exp;
    });

    setIndustryExpericene(updatedIndustryExp);
    onFormDataChange('candidate_details', updatedIndustryExp);
  };

  const addRow = () => {
    setIndustryExpericene([...industryExpericene, { industry: '', service_line: '', region: '', year_of_experience:'' }]);
  };

  const removeRow = (index: number) => {
    const updatedIndustryExp = [...industryExpericene];
    updatedIndustryExp.splice(index, 1);

    setIndustryExpericene(updatedIndustryExp);
    notifyError('Industry Experience data deleted successfully');
    onFormDataChange('candidate_details', updatedIndustryExp);
  };

  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 p-0">
          <h1 className={`${styles.label_color}`} style={{ fontSize: '20px' }}>
            {/* {translationDataFromStore?.data?.professional_experience} */}
            Industry Experience
          </h1>
        </div>
      </div>
      <div className={`row ${styles.other_info}`}>
        <div className="col-12 p-0">
          <form className=" p-3 rounded">
            {industryExpericene.map((exp: any, index: number) => (
              <div className="row mb-3" key={index}>
                <div className="col-10">
                  <div className="row">

                    <div className="col-6 p-0">
                      <div className="d-flex flex-column me-3">
                        <label htmlFor="edu_label" className={`form-label mb-1 ${styles.label_color}`}>Industry</label>
                        <select

                          value={exp.industry}
                          onChange={(e) =>
                            handleIndustryExpChange(
                              index,
                              "industry",
                              e.target.value
                            )
                          }

                          className={` form-control w-100 ${styles.label_color}`}
                        >
                          <option value="">
                            {translationDataFromStore?.data?.select}
                          </option>
                          {industryList &&
                            industryList.map((data: any, index: any) => {
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
                      <div className="d-flex flex-column me-3">
                        <label htmlFor="edu_label" className={`form-label mb-1 ${styles.label_color}`}>Service Line</label>
                        <select

                          value={exp.service_line}
                          onChange={(e) =>
                            handleIndustryExpChange(
                              index,
                              "service_line",
                              e.target.value
                            )
                          }

                          className={` form-control w-100 ${styles.label_color}`}
                        >
                          <option value="">
                            {translationDataFromStore?.data?.select}
                          </option>
                          {serviceList &&
                            serviceList.map((data: any, index: any) => {
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
                      <div className="d-flex flex-column mt-3 me-3">
                        <label htmlFor="edu_label" className={`form-label mb-1 ${styles.label_color}`}>Region</label>
                        <select

                          value={exp.region}
                          onChange={(e) =>
                            handleIndustryExpChange(
                              index,
                              "region",
                              e.target.value
                            )
                          }

                          className={` form-control w-100 ${styles.label_color}`}
                        >
                          <option value="">
                            {translationDataFromStore?.data?.select}
                          </option>
                          {regionList &&
                            regionList.map((data: any, index: any) => {
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
                      <div className="d-flex flex-column mt-3 me-3">
                        <label htmlFor="edu_label" className={`form-label mb-1 ${styles.label_color}`}>Year of Exp</label>
                        <select

                          value={exp.year_of_experience}
                          onChange={(e) =>
                            handleIndustryExpChange(
                              index,
                              "year_of_experience",
                              e.target.value
                            )
                          }

                          className={` form-control w-100 ${styles.label_color}`}
                        >
                          <option value="">
                            {translationDataFromStore?.data?.select}
                          </option>
                          {yearOfExpList &&
                            yearOfExpList.map((data: any, index: any) => {
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

export default IndustryExpericeneChildTable;
