import React, { useState } from 'react';

const SelectTechnicalSkills: React.FC = () => {
  // Define an array of coding languages
  const codingLanguages: string[] = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'Ruby',
    'Swift',
    'PHP',
  ];

  // Create a state to track the selected languages
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Handle checkbox change
  const handleCheckboxChange = (language: string) => {
    if (selectedLanguages.includes(language)) {
      // If the language is already selected, remove it
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
    } else {
      // If the language is not selected, add it
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  return (
    <div className="container">
      <div className="row" style={{ marginTop: '160px' }}>
        <div className="col-12">
          <div className="text-center">
            <h1>Select Technical Skills Here</h1>
          </div>
          <form>
            <div className="mb-3 d-flex justify-content-center mt-5">
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
          <div className="text-center">
            <p>Selected Languages: {selectedLanguages.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTechnicalSkills;
