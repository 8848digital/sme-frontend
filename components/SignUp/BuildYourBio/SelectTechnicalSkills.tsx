import Loaders from "@/components/Loaders";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/bio.module.css";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SelectTechnicalSkills = ({
  bioData,
  onFormDataChange,
  ourSkill,
  loading,
}: any) => {
  const [technical, setTechnical] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);
  // const { ourSkill, loading } = useFetchOurTechnicalSkills();
  const translationDataFromStore = useSelector(translation_text_from_Store);

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
    onFormDataChange("other_technical_skills", otherTechSkills);
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
              <div className="text-center ">
                <h1>
                  {translationDataFromStore?.data?.build_your_bio_step3_header}
                </h1>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-5">
                <form>
                  <div
                    className="mb-3 d-flex justify-content-center mt-3 flex-column"
                    style={{ minHeight: "8rem", overflowY: "scroll" }}
                  >
                    {ourSkill &&
                      ourSkill?.map((skills: any, index: number) => (
                        <div
                          key={index}
                          className="form-check form-check-inline rtl_chechbox"
                        >
                          <input
                            type="checkbox"
                            id={skills.name}
                            value={skills.name}
                            checked={technical.includes(skills.name)}
                            onChange={() => handleCheckboxChange(skills.name)}
                            className="form-check-input"
                          />
                          <label
                            htmlFor={skills.name}
                            className="form-check-label"
                          >
                            {skills.name}{" "}
                            {skills?.label && (
                              <span>&#40;{skills?.label}&#41;</span>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectTechnicalSkills;
