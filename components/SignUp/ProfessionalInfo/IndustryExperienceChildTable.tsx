import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/wizard.module.css";
import React, { useEffect, useState } from "react";
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

const IndustryExperienceChildTable = ({ formData, onFormDataChange
  , industryList, industryListLoading, regionList, regionListLoading,
  serviceList, serviceListLoading, yearOfExpList, yearOfExpListLoading

}: any) => {
  const initialIndustryExp: IndustryExpericene[] =
    formData.candidate_details && formData.candidate_details.length > 0
      ? formData.candidate_details
      : [
        {
          industry: "",
          service_line: "", // Change the initial year value to an empty string
          region: "",
          year_of_experience: ""
        },
      ]

  const [industryExperience, setIndustryExperience] = useState<IndustryExpericene[]>(initialIndustryExp);

  const notifySuccess = (message: string) => {
    toast.success(message);
  };

  const notifyError = (message: string) => {
    toast.error(message);
  };

  const handleIndustryExpChange = (index: number, field: keyof IndustryExpericene, value: any) => {
    const updatedIndustryExp = industryExperience.map((experience: any, expIndex: number) => {
      if (index === expIndex) {

        return { ...experience, [field]: value };
      }
      return experience;
    });

    setIndustryExperience(updatedIndustryExp);
    onFormDataChange('candidate_details', updatedIndustryExp);
  };

  const addRow = () => {
    setIndustryExperience([...industryExperience, { industry: "", service_line: "", region: "", year_of_experience: "" }]);
  };

  const removeRow = (index: number) => {
    const updatedIndustryExp = [...industryExperience];
    updatedIndustryExp.splice(index, 1);

    setIndustryExperience(updatedIndustryExp);
    notifyError('Industry Experience data deleted successfully');
    onFormDataChange('candidate_details', updatedIndustryExp);
  };

  // useEffect(() => {
  //   setIndustryExperience(
  //     formData.candidate_details && formData.candidate_details.length > 0
  //       ? formData.candidate_details
  //       : [{ industry: "", service_line: "", region: "", year_of_experience: "" }]
  //   );
  // }, [formData.candidate_details]);
  
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 p-0">
          <h1 className={`fs-20 ${styles.label_color}`}>
            {translationDataFromStore?.data?.industry_exp}
          </h1>
        </div>
      </div>
      <div className={`row ${styles.other_info}`}>
        <div className="col-12 p-0">
          <form className=" p-3 rounded">
            {industryExperience.map((exp: any, index: number) => (
              <div className="row mb-3" key={index}>
                <div className="col-10">
                  <div className="row">

                    <div className="col-6 p-0">
                      <div className="d-flex flex-column me-3">
                        <label htmlFor="edu_label" className={`form-label mb-1 ${styles.label_color}`}>{translationDataFromStore?.data?.industry}</label>
                        <select
                          name={`industry-${index}`}
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
                                  <option key={index} value={data?.name}>
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
                        <label htmlFor="edu_label" className={`form-label mb-1 ${styles.label_color}`}> {translationDataFromStore?.data?.service_line}</label>
                        <select
                          name={`service_line-${index}`}
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
                        <label htmlFor="edu_label" className={`form-label mb-1 ${styles.label_color}`}>{translationDataFromStore?.data?.region}</label>
                        <select
                          name={`region-${index}`}
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
                          name={`year_of_experience-${index}`}
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

export default IndustryExperienceChildTable;
