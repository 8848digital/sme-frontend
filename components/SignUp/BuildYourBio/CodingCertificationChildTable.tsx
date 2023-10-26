import React from "react";
import { Formik, Field, FieldArray } from "formik";
import styles from "@/styles/bio.module.css";
const CodingCertificationChildTable = ({ bioData, onFormDataChange }: any) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          {/* <h2>Coding Certification</h2> */}
        </div>
      </div>
      <div className="row">
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
              <form className="border p-3 rounded">
                <div className="row">
                  <div className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}>
                    <strong>Certification Name</strong>
                  </div>
                  <div className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}>
                    <strong>Issuing organization</strong>
                  </div>
                  <div className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}>
                    <strong>Issue Date</strong>
                  </div>
                  <div className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}></div>
                </div>
                <FieldArray
                  name="certifications"
                  render={(arrayHelpers) => (
                    <>
                      {values.certifications.map((cert:any, index:number) => (
                        <div className="row mb-3" key={index}>
                          <div className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}>
                            <Field
                              type="text"
                              name={`certifications.${index}.certification_name`}
                              placeholder="Certification Name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </div>
                          <div className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}>
                            <Field
                              type="text"
                              name={`certifications.${index}.issuing_organization`}
                              placeholder="Issuing organization"
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </div>
                          <div className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}>
                            <Field
                              type="date"
                              name={`certifications.${index}.date`}
                              placeholder="Issue Date"
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </div>
                          <div className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="row">
                        <div className="col-md-9"></div>
                        <div className={`col-md-3 pt-1 pb-1 ${styles.bio_childtable_responsive_class}`}>
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

export default CodingCertificationChildTable;
