import React, { useState } from "react";
import styles from "@/styles/bio.module.css";
import useFetchOurTechnicalSkills from "@/hooks/account/technical-skill-hooks";

const SelectTechnicalSkills: React.FC = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const { technical, ourSkill } = useFetchOurTechnicalSkills();
  console.log(technical, ourSkill);
  const handleCheckboxChange = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== language)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  return (
    <div className="container">
      <div
        className={`card p-4 ${styles.common_bio_wrapper}`}
        style={{ maxWidth: "800px",maxHeight: "400px" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="text-center ">
              <h1>Technical Skills</h1>
            </div>

            {/* <div className="text-center">
              <p>Selected Languages: {selectedLanguages.join(', ')}</p>
            </div> */}
          </div>
          <div className="row justify-content-center">
            <div className="col-5">
              <form>
                <div
                  className="mb-3 d-flex justify-content-center mt-3 flex-column"
                  style={{ minHeight: "8rem", overflowY: "scroll" }}
                >
                  {!technical.loading  && (
                    <>
                      {ourSkill.map((language: any, index: number) => {
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

export default SelectTechnicalSkills;
