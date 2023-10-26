import React from "react";
import { Formik, Field, FieldArray } from "formik";
// import { FaTimes } from 'react-icons/fa'; // Import cross icon

const CodingCertificationChildTable = ({ bioData, onFormDataChange }: any) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-start">
          {/* <h2>Coding Certification</h2> */}
        </div>
        <div className="col-12">
          <Formik
            initialValues={{
              certifications: [
                {
                  certification_name: "",
                  issuing_organization: "",
                  date: "",
                },
              ],
            }}
            onSubmit={(values: any) => {
              console.log("values", values.certifications);
              onFormDataChange("certifications", values.certifications);
            }}
          >
            {({ values, handleSubmit, handleBlur, handleChange }) => (
              <form onChange={handleSubmit}>
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
                      name="certifications"
                      render={(arrayHelpers) => (
                        <>
                          {values.certifications.map((cert:any, index:number) => (
                            <tr key={index}>
                              <td>
                                <Field
                                  type="text"
                                  name={`certifications.${index}.certification_name`}
                                  placeholder="Certification Name"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <Field
                                  type="text"
                                  name={`certifications.${index}.issuing_organization`}
                                  placeholder="Issuing organization"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              </td>
                              <td>
                                <Field
                                  type="date"
                                  name={`certifications.${index}.date`}
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
                                    certification_name: "",
                                    issuing_organization: "",
                                    date: "",
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

export default CodingCertificationChildTable;
