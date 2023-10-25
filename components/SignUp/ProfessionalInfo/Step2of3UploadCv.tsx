import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import styles from '@/styles/wizard.module.css';
import UploadFileApi from '@/services/api/auth_api/upload_file_api';

interface Step2Props {
  formData: any;
  onFormDataChange: (field: string, value: any) => void;
}

const Step2of3UploadCv: React.FC<Step2Props> = ({ formData, onFormDataChange }: Step2Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  useEffect(() => {
    setSelectedFile(formData.upload_cv);
  }, [formData.upload_cv]);

  const [fileURL, setFileURL] = useState<any>(formData.upload_cv || null);

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onFormDataChange('upload_cv', file);

    if (file) {
      // Handle file upload and set file URL
      uploadFile(file);
    }
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
    onFormDataChange('upload_cv', null);
  };


  const uploadFile = async (file: File | null) => {
    if (file) {
      try {
        const response = await UploadFileApi({ file });
        console.log('Upload Response:', response.file_url);

        // Use the upload response as needed (e.g., store it in your form data)
        onFormDataChange('upload_cv', response.file_url);
        setFileURL(response.file_url);
      } catch (error) {
        console.error('Upload Error:', error);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      upload_cv: null,
    },
    onSubmit: () => {
      // Do nothing here, as we are handling file upload when the file is selected
    },
  });

  const { handleSubmit, setFieldValue } = formik;

const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="container">
      <div className={`card p-4 ${styles.common_wizard_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-5">
              <h1>Step 4 of 7</h1>
              <h2>Professional Information</h2>
            </div>
            <div className="mt-5 text-center">
              <form onSubmit={handleSubmit}>
              
                  <div className="row mt-3">
                    <div className="col-md-12">
                      {selectedFile ? (
                        <div className="selected-file">
                          <span>
                          {/* Display the file URL as a link */}
                          <a href={fileURL} target="_blank" rel="noopener noreferrer">
                            {fileURL}
                          </a>
                        </span>
                          <span className="delete-file" onClick={handleDeleteFile} style={{ cursor: 'pointer' }}>
                            <i className="fas fa-times-circle cross-class text-red"></i>
                          </span>
                        </div>
                      ) : (
                        <div className="file file--upload">
                          <label htmlFor="input-file" className="upload-label label-color">
                            <div className="upload-circle">
                              <i className="fas fa-upload "></i>
                            </div>
                            Upload Logo
                          </label>
                          <input
                            id="input-file"
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => {
                              handleFileChange(e);
                              const fileName = e.target.files?.[0]?.name;
                              const filePath = `/files/${fileName}`;
                              setFieldValue('logo', filePath); // Set the file path as value
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
               
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2of3UploadCv;
