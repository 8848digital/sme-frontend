import React, { useState, useEffect } from "react";
import styles from "@/styles/bio.module.css";
import useFetchOurTechnicalSkills from "@/hooks/buildYourBio/technical-skill-hooks";
import Loaders from "@/components/Loaders";

const SelectTechnicalSkills = ({ bioData, onFormDataChange }: any) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  console.log(bioData);
  const { ourSkill, loading } = useFetchOurTechnicalSkills();
  console.log(ourSkill);
  const handleCheckboxChange = (language: string) => {
    console.log(selectedLanguages);
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== language)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  useEffect(() => {
    const subSectorArray: any = selectedLanguages.map(
      (technical_skills: string) => ({ technical_skills })
    );
    onFormDataChange("technical_skills", subSectorArray);
  }, [selectedLanguages]);

  return (
    <div className="container">
      {!loading ? (
        <div
          className={`card p-4 ${styles.common_bio_wrapper}`}
          style={{ maxWidth: "800px", maxHeight: "400px" }}
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
              <div className="col-sm-5">
                <form>
                  <div
                    className="mb-3 d-flex justify-content-center mt-3 flex-column"
                    style={{ minHeight: "8rem", overflowY: "scroll" }}
                  >
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
      ) : (
        <>
          <Loaders />
        </>
      )}
    </div>
  );
};

export default SelectTechnicalSkills;
