import React, { useState } from "react";
import { Button, Modal, Box, TextField, Chip } from "@mui/material";
import EnterBio from "@/components/SignUp/BuildYourBio/EnterBio";
import CodingCertificationChildTable from "@/components/SignUp/BuildYourBio/CodingCertificationChildTable";

interface User {
  photoUrl: string;
  bio: string;
  techSkills: string[];
  languages: string[];
  certifications: string[];
}

const AccountUpdateModal = ({ user, isOpen, onClose, onUpdateUser }: any) => {
  const [updatedUser, setUpdatedUser] = useState<any>(user);
  // IMAGE UPLOAD
  const [selectedFile, setSelectedFile] = useState<any>("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDeleteFile = () => {
    setSelectedFile("");
  };

  const codingLanguages: string[] = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "Ruby",
    "Swift",
    "PHP",
  ];
  const languages: string[] = [
    "Hindi",
    "English",
    "Arabic",
    "Spanish",
    "French",
    "Chinese",
    "Japanese",
  ];
  const certifications: string[] = [
    "AWS Certified Developer",
    "Microsoft Certified: Azure Administrator Associate",
    "Google Cloud Professional Cloud Architect",
    "Cisco Certified Network Associate (CCNA)",
    "CompTIA A+",
    "Certified Information Systems Security Professional (CISSP)",
    "Certified ScrumMaster (CSM)",
  ];

  const handleSave = () => {
    onUpdateUser(updatedUser);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          padding: 5,
          minWidth: 650,
          height: "600px",
          overflowY: "scroll",
        }}
      >
        <h3 className="mb-4 text-center">Update User Data</h3>
        <div className="my-3 text-center border py-3">
          {/* <TextField
            label="Photo URL"
            fullWidth
            value={updatedUser.photoUrl}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, photoUrl: e.target.value })
            }
          /> */}

          <div className=" file-input-wrapper">
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
              <div
                className="file-attachment mt-2"
                style={{ width: "150px", height: "80px" }}
              >
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="image"
                  style={{ height: "100%", width: "100%" }}
                  className="object-fit-contain "
                />
              </div>
            ) : (
              <div className="file-attachment-link">No file chosen</div>
            )}
          </div>
        </div>
        <div className="my-3">
          <div className="col-12">
            <div className="text-center">
              <h1>Enter Your Bio Here</h1>
            </div>
            <div className="">
              <div className="mb-3">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={6}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="my-3">
          <div className="col-12 border py-2">
            <div className="text-center">
              <h1>Technical Skills</h1>
            </div>
            <form>
              <div className="mb-3 d-flex justify-content-center mt-3 flex-wrap">
                {codingLanguages.map((language) => (
                  <div key={language} className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      id={language}
                      value={language}
                      // checked={selectedLanguages.includes(language)}
                      // onChange={() => handleCheckboxChange(language)}
                      className="form-check-input"
                    />
                    <label htmlFor={language} className="form-check-label">
                      {language}
                    </label>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>

        <div className="my-3">
          <div className="col-12 border py-2">
            <div className="text-center">
              <h1>Languages</h1>
            </div>
            <form>
              <div className="mb-3 d-flex justify-content-center mt-3 flex-wrap">
                {languages.map((language) => (
                  <div key={language} className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      id={language}
                      value={language}
                      // checked={selectedLanguages.includes(language)}
                      // onChange={() => handleCheckboxChange(language)}
                      className="form-check-input"
                    />
                    <label htmlFor={language} className="form-check-label">
                      {language}
                    </label>
                  </div>
                ))}
              </div>
            </form>
            {/* <div className="text-center mt-5">
              <p>Selected Languages: {selectedLanguages.join(', ')}</p>
            </div> */}
          </div>
        </div>

        <div className="col-12">
            <div className="text-center mt-4 mb-3">
              <h1>Coding Certifications</h1>
            </div>
           {/* <CodingCertificationChildTable/> */}
          </div>
        <div className="d-flex my-4 justify-content-around">
          <button className="btn btn-later mt-0" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-signup" onClick={handleSave}>
            Save
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default AccountUpdateModal;
