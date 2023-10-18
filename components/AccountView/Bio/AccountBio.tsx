import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AccountProfile } from "@/datasets/AccuontProfile";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AccountUpdateModal from "./AccountUpdateModal";
const AccountBio: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const updateUser = (updatedUser:any) => {
    console.log("Updated User:", updatedUser);
  };
  return (
    <div className="container">
      <div className="profile_wrapper mt-5">
        <div className="row">
          <div className="col-3">
            <div className="text-center">
              <AccountCircleIcon sx={{ fontSize: "100px" }} />
            </div>
          </div>
          <div className="col-9">
            <p>{AccountProfile.bio}</p>

            <div>
              <h2>Technical Skills</h2>
              <ul>
                {AccountProfile.techSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2>Languages</h2>
              <ul>
                {AccountProfile.languages.map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2>Certifications</h2>
              <ul>
                {AccountProfile.certifications.map((certification, index) => (
                  <li key={index}>{certification}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-12 text-center">
            <button onClick={handleOpenModal} className="btn btn-next">
              Update
            </button>
          </div>
          {/* The Modal */}
          <Dialog open={modalOpen} onClose={handleCloseModal}>
            <DialogContent>
              <AccountUpdateModal
                user={AccountProfile} // Pass the user data to the modal form
                isOpen={modalOpen}
                onClose={handleCloseModal}
                onUpdateUser={updateUser}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AccountBio;
