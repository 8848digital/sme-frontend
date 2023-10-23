import React from 'react';
import { Formik, Field, FieldArray } from 'formik';
// import { FaTimes } from 'react-icons/fa'; // Import cross icon

const CodingCertificationChildTable = ({ formData, onFormDataChange }:any) => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-start">
      {/* <h2>Coding Certification</h2> */}
        </div>
        <div className="col-12">
          <Formik
            initialValues={{
              certification_in_bio: [
                {
                  certification_name: '',
                  issuing_organization: '',
                  issue_date: '',
                },
              ],
            }}
            onSubmit={(values) => {
              console.log('values', values);
              onFormDataChange('certification_in_bio' , values)
            }}
          >
            {({ values, handleSubmit, handleBlur, handleChange }) => (
              <form onSubmit={handleSubmit}>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Certification Name</th>
                      <th>Issuing organization</th>
                      <th>Issue Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <FieldArray
                      name="certification_in_bio"
                      render={(arrayHelpers) => (
                        <>
                          {values.certification_in_bio.map((cert, index) => (
                            <tr key={index}>
                              <td>
                                <Field
                                  type="text"
                                  name={`certification_in_bio.${index}.certification_name`}
                                  placeholder="Certification Name"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <Field
                                  type="text"
                                  name={`certification_in_bio.${index}.issuing_organization`}
                                  placeholder="Issuing organization"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <Field
                                  type="text"
                                  name={`certification_in_bio.${index}.issue_date`}
                                  placeholder="Issue Date"
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

export default CodingCertificationChildTable;
