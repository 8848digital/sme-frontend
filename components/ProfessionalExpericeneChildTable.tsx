import React from 'react';
import { Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import styles from "@/styles/wizard.module.css";
const ProfessionalExperienceSchema = Yup.object().shape({
  professional_exp: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Title is required'),
      year: Yup.string().required('Year is required'),
      company: Yup.string().required('Company is required'),
    })
  ),
});

const ProfessionalExperienceChildTable = ({ formData, onFormDataChange }: any) => {
  const notifySuccess = (message: string) => {
    toast.success(message);
  };

  const notifyError = (message: string) => {
    toast.error(message);
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
          <Formik
            initialValues={{
              professional_exp: formData.professional_experience && formData.professional_experience.length > 0
                ? formData.professional_experience
                : [
                    {
                      title: '',
                      year: '',
                      company: '',
                    },
                  ],
            }}
            validationSchema={ProfessionalExperienceSchema}
            onSubmit={(values) => {
              // Form submission logic
              console.log('values', values);
              notifySuccess('Professional Experience data added successfully');
              onFormDataChange('professional_experience', values.professional_exp);
            }}
          >
            {({ values, handleSubmit, handleBlur, handleChange }) => (
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

                <FieldArray
                  name="professional_exp"
                  render={(arrayHelpers) => (
                    <>
                      {values.professional_exp.map((PE: any, index: any) => (
                        <div className="row mb-3" key={index}>
                          <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                            <Field
                              type="text"
                              name={`professional_exp.${index}.title`}
                              placeholder="Title"
                              onBlur={handleBlur}
                              onChange={(e:any) => {
                                // Update the form data in real-time
                                handleChange(e);
                                onFormDataChange('professional_experience', values.professional_exp);
                              }}
                            />
                            <div className="error_message">
                              <ErrorMessage name={`professional_exp.${index}.title`} />
                            </div>
                          </div>
                          <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                            <Field
                              type="text"
                              name={`professional_exp.${index}.year`}
                              placeholder="Year"
                              onBlur={handleBlur}
                              onChange={(e:any) => {
                                // Update the form data in real-time
                                handleChange(e);
                                onFormDataChange('professional_experience', values.professional_exp);
                              }}
                            />
                            <div className="error_message">
                              <ErrorMessage name={`professional_exp.${index}.year`} />
                            </div>
                          </div>
                          <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                            <Field
                              type="text"
                              name={`professional_exp.${index}.company`}
                              placeholder="Company"
                              onBlur={handleBlur}
                              onChange={(e:any) => {
                                // Update the form data in real-time
                                handleChange(e);
                                onFormDataChange('professional_experience', values.professional_exp);
                              }}
                            />
                            <div className="error_message">
                              <ErrorMessage name={`professional_exp.${index}.company`} />
                            </div>
                          </div>
                          <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => {
                                arrayHelpers.remove(index);
                                notifyError('Professional Experience data deleted successfully');
                                // Update the form data in real-time after deletion
                                onFormDataChange('professional_experience', values.professional_exp);
                              }}
                            >
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
                            onClick={() =>
                              arrayHelpers.push({
                                title: '',
                                year: '',
                                company: '',
                              })
                            }
                          >
                            Add Row
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalExperienceChildTable;
