import React from 'react';
import { Formik, Field, FieldArray } from 'formik';
// import { FaTimes } from 'react-icons/fa'; // Import cross icon

const AcademicChildTable = ({ formData, onFormDataChange }:any) => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-start">
      <h2>Academic Background</h2>
        </div>
        <div className="col-12">
          <Formik
            initialValues={{
              certifications: [
                {
                  certificationLevel: '',
                  year: '',
                  gpa: '',
                },
              ],
            }}
            onSubmit={(values) => {
              console.log('values', values);
              onFormDataChange('certification_level' , values)
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
                          {values.certifications.map((cert, index) => (
                            <tr key={index}>
                              <td>
                                <Field
                                  type="text"
                                  name={`certifications.${index}.certificationLevel`}
                                  placeholder="Certification Level"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <Field
                                  type="text"
                                  name={`certifications.${index}.year`}
                                  placeholder="Year"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <Field
                                  type="text"
                                  name={`certifications.${index}.gpa`}
                                  placeholder="GPA"
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
