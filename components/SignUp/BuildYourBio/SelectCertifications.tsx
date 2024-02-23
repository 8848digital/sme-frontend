import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/bio.module.css";
import { useSelector } from "react-redux";
import CodingCertificationChildTable from "./CodingCertificationChildTable";

const SelectCertifications = ({ bioData, onFormDataChange }: any) => {
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <div className={styles.common_step_wrapper}>
      <div className="col-12 p-0">
        <div className=" mt-4 mb-3 text-start">
          <h5>
            {
              translationDataFromStore?.data
                ?.build_your_bio_step5_certification_name
            }
          </h5>
          <CodingCertificationChildTable
            bioData={bioData}
            onFormDataChange={onFormDataChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectCertifications;
