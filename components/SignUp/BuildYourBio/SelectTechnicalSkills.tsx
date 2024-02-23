import Loaders from "@/components/Loaders";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/bio.module.css";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchSelectInputField from "./SearchSelectInputField";
import AddButton from "./AddButton";

const SelectTechnicalSkills = ({
  bioData,
  onFormDataChange,
  ourSkill,
  ourLanguage,
  loading,
  technical,
  setTechnical,
  selectedLanguages,
  setSelectedLanguages,
}: any) => {
  const [initialized, setInitialized] = useState(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState();
  const [selectDropDownReset, setSelectDropDownReset] = useState(false);

  const [initializedLang, setInitializedLang] = useState(false);
  // const { ourSkill, loading } = useFetchOurTechnicalSkills();
  const translationDataFromStore = useSelector(translation_text_from_Store);

  // useEffect(() => {
  //   if (!initialized && bioData && bioData.technical_skills) {
  //     setTechnical(
  //       bioData.technical_skills.map((lang: any) => lang.technical_skills)
  //     );
  //     setInitialized(true);
  //   }
  // }, [initialized, bioData]);
  // useEffect(() => {
  //   if (!initializedLang && bioData && bioData.language) {
  //     setTechnical(bioData.language.map((lang: any) => lang.language));
  //     setInitializedLang(true);
  //   }
  // }, [initializedLang, bioData]);

  const handleCheckboxChange = useCallback((technical_skills: string) => {
    console.log(technical, "technical");
    setTechnical((prevtechnical: any) => {
      if (prevtechnical.includes(technical_skills)) {
        return prevtechnical.filter((lang: any) => lang !== technical_skills);
      } else {
        return [...prevtechnical, technical_skills];
      }
    });
  }, []);
  // Update the bioData prop when technical change
  useEffect(() => {
    onFormDataChange("technical_skills", technical);
  }, [technical]);

  const handleOtherTechSkills = (e: any) => {
    const otherTechSkills = e.target.value;
    onFormDataChange("other_technical_skills", otherTechSkills);
  };
  const removeTechnicalRow = (index: number) => {
    const updatedSkill = [...technical];
    updatedSkill.splice(index, 1);
    setTechnical(updatedSkill);
    onFormDataChange("other_technical_skills", updatedSkill);
  };
  const removeLanguageRow = (index: number) => {
    const updatedSkill = [...selectedLanguages];
    updatedSkill.splice(index, 1);
    setSelectedLanguages(updatedSkill);
    onFormDataChange("other_languages", updatedSkill);
  };
  const AddTechnicalSkillRow = () => {
    const newRow = { technical_skills: "" };
    setTechnical((prevTechnical: any) => [...prevTechnical, newRow]);
    setSelectDropDownReset(true);
  };
  const AddLangSkillRow = () => {
    const newRow = { language: "" };
    setSelectedLanguages((prevTechnical: any) => [...prevTechnical, newRow]);
    setSelectDropDownReset(true);
  };

  // useEffect(() => {
  //   if (!initializedLang && bioData && bioData.language) {
  //     setSelectedLanguages(bioData.language.map((lang: any) => lang.language));
  //     setInitializedLang(true);
  //   }
  // }, [initialized, bioData]);
  const handleCheckboxChangeLang = useCallback((language: string) => {
    setSelectedLanguages((prevSelectedLanguages: any) => {
      if (prevSelectedLanguages.includes(language)) {
        return prevSelectedLanguages.filter((lang: any) => lang !== language);
      } else {
        return [...prevSelectedLanguages, language];
      }
    });
  }, []);
  // Update the bioData prop when selectedLanguages change
  useEffect(() => {
    onFormDataChange("language", selectedLanguages);
  }, [selectedLanguages]);

  const handleOtherLanguages = (e: any) => {
    const otherLanguages = e.target.value;
    onFormDataChange("other_languages", otherLanguages);
  };
  console.log(bioData, "selected languages");
  return (
    <div className="">
      {loading ? (
        <>
          <Loaders />
        </>
      ) : (
        <>
          <div className={` pt-4 ${styles.common_step_wrapper}`}>
            <div className="text-start ">
              <h5>{translationDataFromStore?.data?.bio_skills}</h5>
              {technical?.map((skills: any, index: any) => (
                <div key={index}>
                  <SearchSelectInputField
                    SkillList={ourSkill}
                    defaultValue={skills.technical_skills}
                    selectedDropdownValue={selectedDropdownValue}
                    setSelectedDropdownValue={setSelectedDropdownValue}
                    placeholder={
                      translationDataFromStore?.data
                        ?.build_your_bio_step3_header
                    }
                    selectDropDownReset={selectDropDownReset}
                    setSelectDropDownReset={setSelectDropDownReset}
                    // handleFieldChange={handleCheckboxChange}
                    setTechnical={setTechnical}
                    technical={technical}
                    removeRow={removeTechnicalRow}
                    index={index}
                    name="technical_skills"
                  />
                </div>
              ))}
            </div>

            <div className="">
              <AddButton
                translationDataFromStore={translationDataFromStore}
                onClick={AddTechnicalSkillRow}
              />
            </div>

            <div className="text-start ">
              <h5 className="mt-3">
                {translationDataFromStore?.data?.build_your_bio_step4_header}
              </h5>
              {selectedLanguages.map((languages: any, index: any) => (
                <div key={index}>
                  <SearchSelectInputField
                    SkillList={ourLanguage}
                    defaultValue={languages?.language}
                    selectedDropdownValue={selectedDropdownValue}
                    setSelectedDropdownValue={setSelectedDropdownValue}
                    placeholder={
                      translationDataFromStore?.data
                        ?.build_your_bio_step4_header
                    }
                    selectDropDownReset={selectDropDownReset}
                    setSelectDropDownReset={setSelectDropDownReset}
                    setTechnical={setSelectedLanguages}
                    removeRow={removeLanguageRow}
                    index={index}
                    name="language"
                  />
                </div>
              ))}
            </div>

            <div className="">
              <AddButton
                translationDataFromStore={translationDataFromStore}
                onClick={AddLangSkillRow}
              />
            </div>
          </div>
        </>
      )}
      {/* <div className="col-12 px-4 mt-3">
                <div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4 ">
                        <div className="text-md-end text-center mt-1 rtl_text_align_start">
                          <label htmlFor="exampleFormControlInput1">
                            {
                              translationDataFromStore?.data
                                ?.build_your_bio_step3_input_label
                            }
                          </label>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <input
                          type="text"
                          className="form-control"
                          id="other_tech_skills"
                          placeholder={
                            translationDataFromStore?.data
                              ?.build_your_bio_step3_input_placeholder
                          }
                          onChange={(e: any) => {
                            handleOtherTechSkills(e);
                          }}
                          value={bioData?.other_technical_skills}
                        />
                        <div
                          className="pb-3"
                          style={{ color: "grey", fontSize: "12px" }}
                        >
                          {
                            translationDataFromStore?.data
                              ?.build_your_bio_step3_input_tag
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
    </div>
  );
};

export default SelectTechnicalSkills;
