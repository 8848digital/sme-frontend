import React, { useState, useEffect, useCallback } from "react";
import styles from "@/styles/bio.module.css";
import useFetchOurLanguage from "@/hooks/buildYourBio/language-hooks";
import Loaders from "@/components/Loaders";
const SelectLanguageSkills = ({ bioData, onFormDataChange }: any) => {
  // Use a unique identifier for key to help React identify each checkbox
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);
  const { ourLanguage, loading } = useFetchOurLanguage();
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
  return (
    <div className="container">
      {loading ? (
        <>
          <Loaders />
        </>
      ) : (
        <div
          className={`card p-4 ${styles.common_bio_wrapper}`}
          style={{ maxWidth: "800px", maxHeight: "400px" }}
        >
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1>Languages</h1>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-5">
                <form>
                  <div
                    className="mb-3 d-flex justify-content-center mt-3 flex-column"
                    style={{ height: "12rem", overflowY: "scroll" }}
                  >
                    {ourLanguage && ourLanguage?.map((language: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="form-check form-check-inline"
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
                            {language.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SelectLanguageSkills;
