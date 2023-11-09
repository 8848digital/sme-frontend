import React, { useState } from "react";
import styles from "@/styles/bio.module.css";
import CodingCertificationChildTable from "./CodingCertificationChildTable";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { useSelector } from "react-redux";

const SelectCertifications = ({ bioData, onFormDataChange }: any) => {
  const transtationDataFromStore = useSelector(translation_text_from_Store)

  return (
    <div className="container">
      <div
        className={`card p-4 ${styles.common_bio_wrapper}`}
        style={{ maxWidth: "900px" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-4 mb-3">
              <h1>{transtationDataFromStore?.data?.build_your_bio_step5_certification_name}</h1>
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
