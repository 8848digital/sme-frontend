import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/bio.module.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import wizard_styles from "../../../styles/wizard.module.css";
import CommonInputField from "./CommonInputField";
import AddButton from "./AddButton";
interface Certification {
  certification_name: string;
  issuing_organization: string;
  issue_date: string;
}

interface CodingCertificationChildTableProps {
  bioData: any;
  onFormDataChange: (fieldName: string, value: Certification[]) => void;
}

const CodingCertificationChildTable: React.FC<
  CodingCertificationChildTableProps
> = ({ bioData, onFormDataChange }) => {
  const initialCertifications: Certification[] =
    bioData.certifications && bioData.certifications.length > 0
      ? bioData.certifications
      : [
          {
            certification_name: "",
            issuing_organization: "",
            issue_date: "",
          },
        ];

  const [certifications, setCertifications] = useState<Certification[]>(
    initialCertifications
  );
  const translationDataFromStore = useSelector(translation_text_from_Store);

  const handleCertificationChange = (
    index: number,
    field: keyof Certification,
    value: string
  ) => {
    const updatedCertifications = certifications.map((cert, certIndex) => {
      if (index === certIndex) {
        // Create a copy of the certification object and update the field
        return { ...cert, [field]: value };
      }
      return cert;
    });

    setCertifications(updatedCertifications);
    onFormDataChange("certifications", updatedCertifications);
  };

  const addRow = () => {
    setCertifications([
      ...certifications,
      { certification_name: "", issuing_organization: "", issue_date: "" },
    ]);
  };

  const removeRow = (index: number) => {
    if (certifications?.length > 1) {
      const updatedCertifications = [...certifications];
      updatedCertifications.splice(index, 1);
      setCertifications(updatedCertifications);
      onFormDataChange("certifications", updatedCertifications);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          {/* <h2>Coding Certification</h2> */}
        </div>
      </div>
      <div className="row">
        <div className="col-12 p-0">
          {certifications?.map((cert, index) => (
            <div className="row mb-3 p-0" key={index}>
              <CommonInputField
                placeholder={`${translationDataFromStore?.data?.build_your_bio_step5_certification_name}`}
                onChange={handleCertificationChange}
                name="certification_name"
                value={cert.certification_name}
                deleteButton={removeRow}
                index={index}
              />

              <div className="mt-3">
                <input
                  type="text"
                  className={styles.common_input_field}
                  placeholder={
                    translationDataFromStore?.data
                      ?.build_your_bio_step5_organization
                  }
                  value={cert.issuing_organization}
                  onChange={(e) =>
                    handleCertificationChange(
                      index,
                      "issuing_organization",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="mt-3">
                <input
                  type="date"
                  className={styles.common_input_field}
                  placeholder="Issue Date"
                  value={cert.issue_date}
                  onChange={(e) =>
                    handleCertificationChange(
                      index,
                      "issue_date",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}
          <AddButton
            translationDataFromStore={translationDataFromStore}
            onClick={addRow}
          />
        </div>
      </div>
    </div>
  );
};

export default CodingCertificationChildTable;
