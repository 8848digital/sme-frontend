import React, { useState } from 'react';

const SelectLanguageSkills: React.FC = () => {
  // Define an array of languages
  const languages: string[] = [
    'Hindi',
    'English',
    'Arabic',
    'Spanish',
    'French',
    'Chinese',
    'Japanese',
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
      <div className="row" style={{ marginTop: '150px' }}>
        <div className="col-12">
          <div className="text-center">
            <h1>Select Language Skills Here</h1>
          </div>
          <form>
            <div className="mb-3 d-flex justify-content-center mt-5 flex-wrap">
              {languages.map((language) => (
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

export default SelectLanguageSkills;
