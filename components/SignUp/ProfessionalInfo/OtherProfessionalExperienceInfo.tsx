import Logo from "@/components/Logo";
import AcademicChildTable from "@/components/SignUp/ProfessionalInfo/AcademicChildTable";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/wizard.module.css";
import { useSelector } from "react-redux";
import ProfessionalExperienceChildTable from "./ProfessionalExperienceChildTable";
import IndustryExperienceChildTable from "./IndustryExperienceChildTable";


const OtherProfessionalExperienceInfo = ({
  formData,
  onFormDataChange,
  educationLevel,
  loading,
  industryList, industryListLoading, regionList, regionListLoading,
  serviceList, serviceListLoading, yearOfExpList, yearOfExpListLoading
}: any) => {
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <div >
      <div
        className={`${styles.common_wizard_wrapper}`}
      >
        <div className="row">
          <div className="col-12">
            <div className="">
              <Logo />
            </div>
            <div className="text-center mt-5">
              <h1>
                {/* {translationDataFromStore?.data?.step}  */}
                {/* 5{" "}
                {translationDataFromStore?.data?.of} 7 */}
              </h1>
              {/* <h2>{translationDataFromStore?.data?.professional_experience}</h2> */}
            </div>
          </div>
          <div className={styles.wizard_content}>
            <div className="col-12">
              <AcademicChildTable
                formData={formData}
                onFormDataChange={onFormDataChange}
                educationLevel={educationLevel}
                loading={loading}
              />
            </div>
            <div className="col-12">
              <ProfessionalExperienceChildTable
                formData={formData}
                onFormDataChange={onFormDataChange}
              />
            </div>
            <div className="col-12">
              <IndustryExperienceChildTable
                formData={formData}
                onFormDataChange={onFormDataChange}
                industryList={industryList}
                industryListLoading={industryListLoading}
                regionList={regionList}
                regionListLoading={regionListLoading}
                serviceList={serviceList}
                serviceListLoading={serviceListLoading}
                yearOfExpList={yearOfExpList}
                yearOfExpListLoading={yearOfExpListLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherProfessionalExperienceInfo;
