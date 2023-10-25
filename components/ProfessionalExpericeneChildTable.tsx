import React from 'react';
import { Formik, Field, FieldArray, ErrorMessage } from 'formik';
// import { FaTimes } from 'react-icons/fa'; // Import cross icon
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
const ProfessionalExpericeneChildTable = ({ formData, onFormDataChange }: any) => {
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
              professional_exp:formData.professional_experience && formData.professional_experience.length > 0
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
              console.log('values', values);

              onFormDataChange('professional_experience', values.professional_exp)
              notifySuccess('Professional Experience data added successfully');
            }}
          >
            {({ values, handleSubmit, handleBlur, handleChange }) => (
              <form onSubmit={handleSubmit}>
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
                          {values.professional_exp.map((PE:any, index:any) => (
                            <tr key={index}>
                              <td>
                                <Field
                                  type="text"
                                  name={`professional_exp.${index}.title`}
                                  placeholder="Title"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
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
                                  onChange={handleChange}
                                />
                                <div className="error_message">
                                  <ErrorMessage name={`professional_exp.${index}.year`} />
                                </div>
                              </td>
                              <td>
                                <Field
                                  type="text"
                                  name={`professional_exp.${index}.company`}
                                  placeholder="company"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                                 <div className="error_message">
                                  <ErrorMessage  name={`professional_exp.${index}.company`} />
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
                                  {/* <FaTimes /> */} Delete
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

export default ProfessionalExpericeneChildTable;
