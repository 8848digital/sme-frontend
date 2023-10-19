import React, { useState } from 'react';
import styles from "@/styles/bio.module.css";

const EnterBio = () => {
  const [selectedFile, setSelectedFile] = useState<any>('');

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDeleteFile = () => {
    setSelectedFile('');
  };

  return (
    <div className="container">
      <div className={`card p-4 ${styles.common_bio_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h1>Enter Your Bio Here</h1>
              <h3></h3>
            </div>
            <div className='mt-5'>
              <div className="mb-3">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows={6}></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterBio;
