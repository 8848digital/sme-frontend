import React, { useState } from "react";
import styles from "@/styles/bio.module.css";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";

const EnterBio = ({ bioData, onFormDataChange }: any) => {
  const [selectedFile, setSelectedFile] = useState<any>("");
  const { translationData, translationLoading } = useTranslationText();


  const handleBioChange = (event: any) => {
    const bio = event.target.value;
    onFormDataChange("bio", bio);
  };

  const handleDeleteFile = () => {
    setSelectedFile("");
  };

  return (
    <div className="container">
      <div
        className={`card p-4 ${styles.common_bio_wrapper}`}
        style={{ maxWidth: "800px", minHeight: "300px" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h1>{translationData?.build_your_bio_step2_header}</h1>
              <h3></h3>
            </div>
            <div className="mt-5">
              <div className="mb-3">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={6}
                  value={bioData?.bio}
                  onChange={handleBioChange}
                  style={{ resize: "none" }}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EnterBio;
