import React, { useState } from 'react';
import styles from "@/styles/bio.module.css";

const SelectCertifications: React.FC = () => {
  const certifications: string[] = [
    'AWS Certified Developer',
    'Microsoft Certified: Azure Administrator Associate',
    'Google Cloud Professional Cloud Architect',
    'Cisco Certified Network Associate (CCNA)',
    'CompTIA A+',
    'Certified Information Systems Security Professional (CISSP)',
    'Certified ScrumMaster (CSM)',
  ];

  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);

  const handleCheckboxChange = (certification: string) => {
    if (selectedCertifications.includes(certification)) {
      setSelectedCertifications(selectedCertifications.filter((cert) => cert !== certification));
    } else {
      setSelectedCertifications([...selectedCertifications, certification]);
    }
  };

  return (
    <div className="container">
      <div className={`card p-4 ${styles.common_bio_wrapper}`} style={{ maxWidth: '800px', height: '400px' }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h1>Coding Certifications</h1>
            </div>
            <form>
              <div className="mb-3 row mt-5 justify-content-center">
                {certifications.map((certification) => (
                  <div key={certification} className="form-check form-check-inline col-12 col-sm-6">
                    <input
                      type="checkbox"
                      id={certification}
                      value={certification}
                      checked={selectedCertifications.includes(certification)}
                      onChange={() => handleCheckboxChange(certification)}
                      className="form-check-input"
                    />
                    <label htmlFor={certification} className="form-check-label">
                      {certification}
                    </label>
                  </div>
                ))}
              </div>
            </form>
            {/* <div className="text-center">
              <p>Selected Certifications: {selectedCertifications.join(', ')}</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCertifications;
