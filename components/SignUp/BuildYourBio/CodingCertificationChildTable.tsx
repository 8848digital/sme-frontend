import React, { useState } from 'react';

interface Certification {
  certification_name: string;
  issuing_organization: string;
  issue_date: string;
}

interface CodingCertificationChildTableProps {
  bioData: any;
  onFormDataChange: (fieldName: string, value: Certification[]) => void;
}

const CodingCertificationChildTable: React.FC<CodingCertificationChildTableProps> = ({ bioData, onFormDataChange }) => {
  const initialCertifications: Certification[] =
    bioData.certifications && bioData.certifications.length > 0
      ? bioData.certifications
      : [
          {
            certification_name: '',
            issuing_organization: '',
            issue_date: '',
          },
        ];

  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications);

  const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
    const updatedCertifications = certifications.map((cert, certIndex) => {
      if (index === certIndex) {
        // Create a copy of the certification object and update the field
        return { ...cert, [field]: value };
      }
      return cert;
    });

    setCertifications(updatedCertifications);
    onFormDataChange('certifications', updatedCertifications);
  };

  const addRow = () => {
    setCertifications([...certifications, { certification_name: '', issuing_organization: '', issue_date: '' }]);
  };

  const removeRow = (index: number) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
    onFormDataChange('certifications', updatedCertifications);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          {/* <h2>Coding Certification</h2> */}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <form className="border p-3 rounded">
            <div className="row">
              <div className="col-md-3">
                <strong>Certification Name</strong>
              </div>
              <div className="col-md-3">
                <strong>Issuing organization</strong>
              </div>
              <div className="col-md-3">
                <strong>Issue Date</strong>
              </div>
              <div className="col-md-3"></div>
            </div>
            {certifications.map((cert, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-3">
                  <input
                    type="text"
                    placeholder="Certification Name"
                    value={cert.certification_name}
                    onChange={(e) => handleCertificationChange(index, 'certification_name', e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    placeholder="Issuing organization"
                    value={cert.issuing_organization}
                    onChange={(e) => handleCertificationChange(index, 'issuing_organization', e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="date"
                    placeholder="Issue Date"
                    value={cert.issue_date}
                    onChange={(e) => handleCertificationChange(index, 'issue_date', e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <button type="button" className="btn btn-danger" onClick={() => removeRow(index)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div className="row">
              <div className="col-md-9"></div>
              <div className="col-md-3 pt-1 pb-1">
                <button type="button" className="btn btn-success" onClick={addRow}>
                  Add Row
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CodingCertificationChildTable;
