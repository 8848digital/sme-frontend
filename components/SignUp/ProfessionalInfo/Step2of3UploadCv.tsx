import React, { useState, ChangeEvent, useEffect } from 'react';
import styles from "@/styles/wizard.module.css";

interface Step2Props {
  formData: any;
  onFormDataChange: (field: string, value: any) => void;
}

const Step2of3UploadCv: React.FC<Step2Props> = ({ formData, onFormDataChange }: Step2Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(formData.cvFile || null);

  useEffect(() => {
    setSelectedFile(formData.cvFile || null);
  }, [formData.cvFile]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onFormDataChange('cvFile', file);
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
    onFormDataChange('cvFile', null);
  };

  return (
    <div className="container">
      <div className={`card p-4 ${styles.common_wizard_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-5">
              <h1>Step 2 of 3</h1>
              <h2>Professional Information</h2>
            </div>
            <div className='mt-5 text-center'>
              <form>
                <div className="mb-3 file-input-wrapper">
                  <label htmlFor="cvUpload" className="file-input-button">
                    Upload CV
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
                      <button
                        type="button"
                        onClick={handleDeleteFile}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
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
  );
};

export default Step2of3UploadCv;
