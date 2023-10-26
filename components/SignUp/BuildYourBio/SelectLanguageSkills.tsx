import React, { useState, useEffect } from "react";
import styles from "@/styles/bio.module.css";
import useFetchOurLanguage from "@/hooks/buildYourBio/language-hooks";

const SelectLanguageSkills = ({ bioData, onFormDataChange }: any) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const { language, ourLanguage } = useFetchOurLanguage();
  // console.log(technical, ourSkill);
  const handleCheckboxChange = (languages: string) => {
    if (selectedLanguages.includes(languages)) {
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== languages)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, languages]);
    }
  };
  // console.log(selectedLanguages);

  useEffect(() => {
    const subSectorArray: any = selectedLanguages.map((language: string) => ({
      language,
    }));
    onFormDataChange("language", subSectorArray);
  }, [selectedLanguages]);

  return (
    <div className="container">
      <div
        className={`card p-4 ${styles.common_bio_wrapper}`}
        style={{ maxWidth: "800px", maxHeight: "400px" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h1>Languages</h1>
            </div>

            {/* <div className="text-center mt-5">
              <p>Selected Languages: {selectedLanguages.join(', ')}</p>
            </div> */}
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-5">
              <form>
                <div
                  className="mb-3 d-flex justify-content-center mt-3 flex-column"
                  style={{ height: "12rem", overflowY: "scroll" }}
                >
                  {!language.loading && (
                    <>
                      {ourLanguage.map((language: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="form-check form-check-inline"
                          >
                            <input
                              type="checkbox"
                              id={language.name}
                              value={language.name}
                              checked={selectedLanguages.includes(
                                language.name
                              )}
                              onChange={() =>
                                handleCheckboxChange(language.name)
                              }
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
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectLanguageSkills;
