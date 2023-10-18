import React, { useState } from 'react';

const SelectCertifications: React.FC = () => {
  // Define an array of coding certifications
  const certifications: string[] = [
    'AWS Certified Developer',
    'Microsoft Certified: Azure Administrator Associate',
    'Google Cloud Professional Cloud Architect',
    'Cisco Certified Network Associate (CCNA)',
    'CompTIA A+',
    'Certified Information Systems Security Professional (CISSP)',
    'Certified ScrumMaster (CSM)',
  ];

  // Create a state to track the selected certifications
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);

  // Handle checkbox change
  const handleCheckboxChange = (certification: string) => {
    if (selectedCertifications.includes(certification)) {
      // If the certification is already selected, remove it
      setSelectedCertifications(selectedCertifications.filter((cert) => cert !== certification));
    } else {
      // If the certification is not selected, add it
      setSelectedCertifications([...selectedCertifications, certification]);
    }
  };

  return (
    <div className="container">
      <div className="row" style={{ marginTop: '160px' }}>
        <div className="col-12">
          <div className="text-center">
            <h1>Select Coding Certifications Here</h1>
          </div>
          <form>
            <div className="mb-3 row  mt-5 justify-content-center">
              {certifications.map((certification) => (
                <div key={certification} className="form-check form-check-inline col-6">
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
          <div className="text-center">
            <p>Selected Certifications: {selectedCertifications.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCertifications;
