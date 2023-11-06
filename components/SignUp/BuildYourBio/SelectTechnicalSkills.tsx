import React, { useState, useEffect, useCallback } from "react";
import styles from "@/styles/bio.module.css";
import useFetchOurTechnicalSkills from "@/hooks/buildYourBio/technical-skill-hooks";
import Loaders from "@/components/Loaders";
import LoaderForSkills from "@/components/LoaderForSkills";

const SelectTechnicalSkills = ({ bioData, onFormDataChange , ourSkill , loading}: any) => {
  const [technical, setTechnical] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);
  // const { ourSkill, loading } = useFetchOurTechnicalSkills();

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

  const handleOtherTechSkills = (e: any) => {
    const otherTechSkills = e.target.value;
    onFormDataChange(
      "other_technical_skills", otherTechSkills);
  }
  return (
    <div className="container">
      {loading  ? (
        <>
          <Loaders />
        </>
      ) : (
        <div
          className={`card p-4 ${styles.common_bio_wrapper}`}
          style={{ maxWidth: "800px", maxHeight: "420px" }}
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
                    {
                      ourSkill?.map((skills: any, index: number) => (
                        <div key={index} className="form-check form-check-inline">
                          <input
                            type="checkbox"
                            id={skills.name}
                            value={skills.name}
                            checked={technical.includes(skills.name)}
                            onChange={() => handleCheckboxChange(skills.name)}
                            className="form-check-input"
                          />
                          <label htmlFor={skills.name} className="form-check-label">
                            {skills.name}
                          </label>
                        </div>
                      ))
                    }

                  </div>
                </form>
              </div>
              <div className="col-12 px-4 mt-3">
                <div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-4 ">
                        <div className="text-end mt-1">

                          <label htmlFor="exampleFormControlInput1">Other Technical Skills</label>
                        </div>
                      </div>
                      <div className="col-8">
                        <input type="text" className="form-control" id="other_tech_skills" placeholder="Enter Other Technical Skills" onChange={(e: any) => { handleOtherTechSkills(e) }} value={bioData?.other_technical_skills}/>
                        <div className="pb-3" style={{ color: 'grey', fontSize: '12px' }}>
                          (Add other technical skills comma-separated like, Ruby, Python, etc...)
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

export default SelectTechnicalSkills;
