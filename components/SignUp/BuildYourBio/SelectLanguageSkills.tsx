import React, { useState, useEffect, useCallback } from "react";
import styles from "@/styles/bio.module.css";
import useFetchOurLanguage from "@/hooks/buildYourBio/language-hooks";
import Loaders from "@/components/Loaders";
import LoaderForSkills from "@/components/LoaderForSkills";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { useSelector } from "react-redux";
const SelectLanguageSkills = ({
  bioData,
  onFormDataChange,
  ourLanguage,
  loading,
}: any) => {
  // Use a unique identifier for key to help React identify each checkbox
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);
  const translationDataFromStore = useSelector(translation_text_from_Store);

  // const { ourLanguage, loadingLanguage } = useFetchOurLanguage();
  // Synchronize the state with bioData prop when it changes
  useEffect(() => {
    if (!initialized && bioData && bioData.language) {
      setSelectedLanguages(bioData.language.map((lang: any) => lang.language));
      setInitialized(true);
    }
  }, [initialized, bioData]);
  const handleCheckboxChange = useCallback((language: string) => {
    setSelectedLanguages((prevSelectedLanguages) => {
      if (prevSelectedLanguages.includes(language)) {
        return prevSelectedLanguages.filter((lang) => lang !== language);
      } else {
        return [...prevSelectedLanguages, language];
      }
    });
  }, []);
  // Update the bioData prop when selectedLanguages change
  useEffect(() => {
    onFormDataChange(
      "language",
      selectedLanguages.map((language) => ({ language }))
    );
  }, [selectedLanguages]);

  const handleOtherLanguages = (e: any) => {
    const otherLanguages = e.target.value;
    onFormDataChange("other_languages", otherLanguages);
  };

  return (
    <div className="container">
      {loading ? (
        <>
          <Loaders />
        </>
      ) : (
        <div
          className={`card p-4 ${styles.common_bio_wrapper}`}
          style={{ maxWidth: "800px", minHeight: "420px" }}
        >
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1>
                  {translationDataFromStore?.data?.build_your_bio_step4_header}
                </h1>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-5">
                <form>
                  <div
                    className="mb-3 d-flex justify-content-center mt-3 flex-column"
                    style={{ height: "12rem", overflowY: "scroll" }}
                  >
                    {ourLanguage &&
                      ourLanguage?.map((language: any, index: number) => (
                        <div
                          key={index}
                          className="form-check form-check-inline rtl_chechbox"
                        >
                          <input
                            type="checkbox"
                            id={language.name}
                            value={language.name}
                            checked={selectedLanguages.includes(language.name)}
                            onChange={() => handleCheckboxChange(language.name)}
                            className="form-check-input"
                          />
                          <label
                            htmlFor={language.name}
                            className="form-check-label"
                          >
                            {language?.name}{" "}
                            {language?.label && (
                              <span>&#40;{language?.label}&#41;</span>
                            )}
                          </label>
                        </div>
                      ))}
                  </div>
                </form>
              </div>
              <div className="col-12 px-4 mt-3">
                <div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4 ">
                        <div className="text-md-end text-center mt-1 rtl_text_align_start">
                          <label htmlFor="exampleFormControlInput1">
                            {
                              translationDataFromStore?.data
                                ?.build_your_bio_step4_input_label
                            }
                          </label>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <input
                          type="text"
                          className="form-control"
                          id="other_language"
                          placeholder={
                            translationDataFromStore?.data
                              ?.build_your_bio_step4_input_placeholder
                          }
                          onChange={(e: any) => {
                            handleOtherLanguages(e);
                          }}
                          value={bioData.other_languages}
                        />
                        <div
                          className="pb-3"
                          style={{ color: "grey", fontSize: "12px" }}
                        >
                          {
                            translationDataFromStore?.data
                              ?.build_your_bio_step4_input_tag
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SelectLanguageSkills;
