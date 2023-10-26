import React from 'react';
import { Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import styles from "@/styles/wizard.module.css";
const AcademicBackgroundSchema = Yup.object().shape({
  certifications: Yup.array().of(
    Yup.object().shape({
      certification_level: Yup.string().required('Certification Level is required'),
      year: Yup.string().required('Year is required'),
      gpa: Yup.string().required('GPA is required'),
    })
  ),
});

const AcademicChildTable = ({ formData, onFormDataChange }: any) => {
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
          <h2>Academic Background</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Formik
            initialValues={{
              certifications: formData.academic_background && formData.academic_background.length > 0
                ? formData.academic_background
                : [
                    {
                      certification_level: '',
                      year: '',
                      gpa: '',
                    },
                  ],
            }}
            validationSchema={AcademicBackgroundSchema}
            onSubmit={(values) => {
              // Form submission logic
              console.log('values', values);
              notifySuccess('Academic data added successfully');
            }}
          >
            {({ values, handleSubmit, handleBlur, handleChange }) => (
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

                <FieldArray
                  name="certifications"
                  render={(arrayHelpers) => (
                    <>
                      {values.certifications.map((cert: any, index: any) => (
                        <div className="row mb-3" key={index}>
                          <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                            <Field
                              type="text"
                              name={`certifications.${index}.certification_level`}
                              placeholder="Certification Level"
                              onBlur={handleBlur}
                              onChange={(e: any) => {
                                // Update the form data in real-time
                                handleChange(e);
                                onFormDataChange('academic_background', values.certifications);
                              }}
                            />
                            <div className="error_message">
                              <ErrorMessage name={`certifications.${index}.certification_level`} />
                            </div>
                          </div>
                          <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                            <Field
                              type="text"
                              name={`certifications.${index}.year`}
                              placeholder="Year"
                              onBlur={handleBlur}
                              onChange={(e: any) => {
                                // Update the form data in real-time
                                handleChange(e);
                                onFormDataChange('academic_background', values.certifications);
                              }}
                            />
                            <div className="error_message">
                              <ErrorMessage name={`certifications.${index}.year`} />
                            </div>
                          </div>
                          <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                            <Field
                              type="text"
                              name={`certifications.${index}.gpa`}
                              placeholder="GPA"
                              onBlur={handleBlur}
                              onChange={(e: any) => {
                                // Update the form data in real-time
                                handleChange(e);
                                onFormDataChange('academic_background', values.certifications);
                              }}
                            />
                            <div className="error_message">
                              <ErrorMessage name={`certifications.${index}.gpa`} />
                            </div>
                          </div>
                          <div className={`col-md-3 border ${styles.wizard_childtable_responsive_class}`}>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => {
                                arrayHelpers.remove(index);
                                notifyError('Academic data deleted successfully');
                                // Update the form data in real-time after deletion
                                onFormDataChange('academic_background', values.certifications);
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
                                certification_level: '',
                                year: '',
                                gpa: '',
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

export default AcademicChildTable;
