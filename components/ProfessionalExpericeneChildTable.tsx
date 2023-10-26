import React from 'react';
import { Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

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
      <div className="row">
        <div className="col-12 text-start">
          <h2>Professional Experience</h2>
        </div>
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
              <form>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Year</th>
                      <th>Company</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <FieldArray
                      name="professional_exp"
                      render={(arrayHelpers) => (
                        <>
                          {values.professional_exp.map((PE: any, index: any) => (
                            <tr key={index}>
                              <td>
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
                              </td>
                              <td>
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
                              </td>
                              <td>
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
                              </td>
                              <td>
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
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={3}></td>
                            <td>
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
                            </td>
                          </tr>
                        </>
                      )}
                    />
                  </tbody>
                </table>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalExperienceChildTable;
