import React from 'react';
import { Formik, Field, FieldArray } from 'formik';
// import { FaTimes } from 'react-icons/fa'; // Import cross icon

const ProfessionalExpericeneChildTable = ({ formData, onFormDataChange }:any) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-start">
          <h2>Professional Experience</h2>
        </div>
        <div className="col-12">
          <Formik
            initialValues={{
              professional_exp: [
                {
                  title: '',
                  year: '',
                  company: '',
                },
              ],
            }}
            onSubmit={(values) => {
              console.log('values', values);
              onFormDataChange('professionalexp' , values)
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
                          {values.professional_exp.map((PE, index) => (
                            <tr key={index}>
                              <td>
                                <Field
                                  type="text"
                                  name={`title.${index}.title`}
                                  placeholder="title"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <Field
                                  type="text"
                                  name={`professional_exp.${index}.year`}
                                  placeholder="Year"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <Field
                                  type="text"
                                  name={`professional_exp.${index}.company`}
                                  placeholder="company"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => arrayHelpers.remove(index)}
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
