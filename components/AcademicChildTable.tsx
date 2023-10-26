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
              console.log('values', values);
              onFormDataChange('academic_background', values.certifications);
              notifySuccess('Academic data added successfully');
            }}
          >
            {({ values, handleSubmit, handleBlur, handleChange }) => (
              <form onSubmit={handleSubmit}>
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
                                  onChange={handleChange}
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
                                  onChange={handleChange}
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
                                  onChange={handleChange}
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
                                    certificationLevel: '',
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
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AcademicChildTable;
