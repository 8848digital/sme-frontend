import React, { useState, useEffect, useCallback } from "react";
import styles from "@/styles/bio.module.css";
import useFetchOurTechnicalSkills from "@/hooks/buildYourBio/technical-skill-hooks";
import Loaders from "@/components/Loaders";

const SelectTechnicalSkills = ({ bioData, onFormDataChange }: any) => {
  const [technical, setTechnical] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);
  const { ourSkill, loading } = useFetchOurTechnicalSkills();

  useEffect(() => {
    if (!initialized && bioData && bioData.technical_skills) {
      setTechnical(
        bioData.technical_skills.map((lang: any) => lang.technical_skills)
      );
      setInitialized(true);
    }
  }, [initialized, bioData]);

  const handleCheckboxChange = useCallback((technical_skills: string) => {
    setTechnical((prevtechnical) => {
      if (prevtechnical.includes(technical_skills)) {
        return prevtechnical.filter((lang) => lang !== technical_skills);
      } else {
        return [...prevtechnical, technical_skills];
      }
    });
  }, []);
  // Update the bioData prop when technical change
  useEffect(() => {
    onFormDataChange(
      "technical_skills",
      technical.map((technical_skills) => ({ technical_skills }))
    );
  }, [technical]);

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
              <div className="text-center ">
                <h1>Technical Skills</h1>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-5">
                <form>
                  <div
                    className="mb-3 d-flex justify-content-center mt-3 flex-column"
                    style={{ minHeight: "8rem", overflowY: "scroll" }}
                  >
                    {ourSkill && ourSkill?.map((language: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="form-check form-check-inline"
                        >
                          <input
                            type="checkbox"
                            id={language.name}
                            value={language.name}
                            checked={technical.includes(language.name)}
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

export default SelectTechnicalSkills;
