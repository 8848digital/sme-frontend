import React from "react";
import { Formik, Field, FieldArray, FormikProps } from "formik";
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
              certifications:
                bioData.certifications && bioData.certifications.length > 0
                  ? bioData.certifications
                  : [
                      {
                        certification_name: "",
                        issuing_organization: "",
                        date: "",
                      },
                    ],
            }}
            onSubmit={(values) => {
              console.log("values", values);

              // onFormDataChange('certifications', values.certifications);
            }}
          >
            {({
              values,
              handleBlur,
              handleChange,
            }: FormikProps<{
              certifications: {
                certification_name: string;
                issuing_organization: string;
                date: string;
              }[];
            }>) => (
              <form className="border p-3 rounded">
                <div className="row">
                  <div
                    className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}
                  >
                    <strong>Certification Name</strong>
                  </div>
                  <div
                    className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}
                  >
                    <strong>Issuing organization</strong>
                  </div>
                  <div
                    className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}
                  >
                    <strong>Issue Date</strong>
                  </div>
                  <div
                    className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}
                  ></div>
                </div>
                <FieldArray
                  name="certifications"
                  render={(arrayHelpers) => (
                    <>
                      {values.certifications.map((cert, index) => (
                        <div className="row mb-3" key={index}>
                          <div
                            className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}
                          >
                            <Field
                              type="text"
                              name={`certifications.${index}.certification_name`}
                              placeholder="Certification Name"
                              onBlur={handleBlur}
                              onChange={(e: any) => {
                                handleChange(e);
                                onFormDataChange(
                                  "certifications",
                                  values.certifications
                                );
                              }}
                            />
                          </div>
                          <div
                            className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}
                          >
                            <Field
                              type="text"
                              name={`certifications.${index}.issuing_organization`}
                              placeholder="Issuing organization"
                              onBlur={handleBlur}
                              onChange={(e: any) => {
                                handleChange(e);
                                onFormDataChange(
                                  "certifications",
                                  values.certifications
                                );
                              }}
                            />
                          </div>
                          <div
                            className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}
                          >
                            <Field
                              type="date"
                              name={`certifications.${index}.date`}
                              placeholder="Issue Date"
                              onBlur={handleBlur}
                              onChange={(e: any) => {
                                handleChange(e);
                                onFormDataChange(
                                  "certifications",
                                  values.certifications
                                );
                              }}
                            />
                          </div>
                          <div
                            className={`col-md-3 border ${styles.bio_childtable_responsive_class}`}
                          >
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
                        <div
                          className={`col-md-3 pt-1 pb-1 ${styles.bio_childtable_responsive_class}`}
                        >
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
