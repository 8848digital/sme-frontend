import React, { useState } from "react";
import styles from "@/styles/bio.module.css";

const UploadPhoto = () => {
  const [selectedFile, setSelectedFile] = useState<any>("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDeleteFile = () => {
    setSelectedFile("");
  };

  return (
    <div className="container">
      <div className={`card p-4 ${styles.common_bio_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
        <div className="row">
          <div className="col-12">
            <div className="bio_wrapper">
              <div className="text-center mt-4">
                <h1>Start Building Your Bio</h1>
                <h3>Upload Your Photo Here</h3>
              </div>
              <div className="mt-5 text-center">
                <form>
                  <div className="mb-3 file-input-wrapper">
                    <label htmlFor="cvUpload" className="file-input-button">
                      Upload Photo
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="cvUpload"
                      name="cv"
                      accept=".pdf, .doc, .docx"
                      onChange={handleFileChange}
                    />
                    {selectedFile ? (
                      <div className="file-attachment">
                        <a
                          href={URL.createObjectURL(selectedFile)}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={selectedFile.name}
                          className="file-attachment-link"
                        >
                          {selectedFile.name}
                        </a>
                      </div>
                    ) : (
                      <div className="file-attachment-link">No file chosen</div>
                    )}
                  </div>

                  {/* Add more form fields for professional information here */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
