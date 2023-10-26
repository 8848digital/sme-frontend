import React from 'react';
import { Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

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
      <div className="row">
        <div className="col-12 text-start">
          <h2>Academic Background</h2>
        </div>
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
              <form>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Certification Level</th>
                      <th>Year</th>
                      <th>GPA</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <FieldArray
                      name="certifications"
                      render={(arrayHelpers) => (
                        <>
                          {values.certifications.map((cert: any, index: any) => (
                            <tr key={index}>
                              <td>
                                <Field
                                  type="text"
                                  name={`certifications.${index}.certification_level`}
                                  placeholder="Certification Level"
                                  onBlur={handleBlur}
                                  onChange={(e:any) => {
                                    // Update the form data in real-time
                                    handleChange(e);
                                    onFormDataChange('academic_background', values.certifications);
                                  }}
                                />
                                <div className="error_message">
                                  <ErrorMessage name={`certifications.${index}.certification_level`} />
                                </div>
                              </td>
                              <td>
                                <Field
                                  type="text"
                                  name={`certifications.${index}.year`}
                                  placeholder="Year"
                                  onBlur={handleBlur}
                                  onChange={(e:any) => {
                                    // Update the form data in real-time
                                    handleChange(e);
                                    onFormDataChange('academic_background', values.certifications);
                                  }}
                                />
                                <div className="error_message">
                                  <ErrorMessage name={`certifications.${index}.year`} />
                                </div>
                              </td>
                              <td>
                                <Field
                                  type="text"
                                  name={`certifications.${index}.gpa`}
                                  placeholder="GPA"
                                  onBlur={handleBlur}
                                  onChange={(e:any) => {
                                    // Update the form data in real-time
                                    handleChange(e);
                                    onFormDataChange('academic_background', values.certifications);
                                  }}
                                />
                                <div className="error_message">
                                  <ErrorMessage name={`certifications.${index}.gpa`} />
                                </div>
                              </td>
                              <td>
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
                                    certification_level: '',
                                    year: '',
                                    gpa: '',
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

export default AcademicChildTable;
