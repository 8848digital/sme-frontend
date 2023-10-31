import React, { useState } from "react";
import styles from "@/styles/bio.module.css";
import CodingCertificationChildTable from "./CodingCertificationChildTable";

const SelectCertifications = ({ bioData, onFormDataChange }: any) => {
  return (
    <div className="container">
      <div
        className={`card p-4 ${styles.common_bio_wrapper}`}
        style={{ maxWidth: "800px" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-4 mb-3">
              <h1>Certifications</h1>
            </div>
            <CodingCertificationChildTable
              bioData={bioData}
              onFormDataChange={onFormDataChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCertifications;
