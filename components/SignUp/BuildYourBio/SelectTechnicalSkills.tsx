import React, { useState } from 'react';
import styles from "@/styles/bio.module.css";

const SelectTechnicalSkills: React.FC = () => {
  const codingLanguages: string[] = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'Ruby',
    'Swift',
    'PHP',
  ];

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const handleCheckboxChange = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  return (
    <div className="container">
      <div className={`card p-4 ${styles.common_bio_wrapper}`} style={{ maxWidth: '800px', height: '300px' }}>
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-5">
              <h1>Technical Skills</h1>
            </div>
            <form>
              <div className="mb-3 d-flex justify-content-center mt-5 flex-wrap">
                {codingLanguages.map((language) => (
                  <div key={language} className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      id={language}
                      value={language}
                      checked={selectedLanguages.includes(language)}
                      onChange={() => handleCheckboxChange(language)}
                      className="form-check-input"
                    />
                    <label htmlFor={language} className="form-check-label">
                      {language}
                    </label>
                  </div>
                ))}
              </div>
            </form>
            {/* <div className="text-center">
              <p>Selected Languages: {selectedLanguages.join(', ')}</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTechnicalSkills;
