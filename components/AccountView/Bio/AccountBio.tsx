import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AccountProfile } from "@/datasets/AccuontProfile";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AccountUpdateModal from "./AccountUpdateModal";
import styles from "@/styles/account.module.css";
import { CONNREFUSED } from "dns";
import { CONSTANTS } from "@/services/config/api-config";
import Link from "next/link";

const AccountBio = ({ profileData, loading }: any) => {
  console.log('profile through props', profileData);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const updateUser = (updatedUser: any) => {
    console.log("Updated User:", updatedUser);
  };
  return (
    <div className="container">
      <div className={`profile_wrapper ${styles.account_wrapper} card `}>
        <div className="row">
          <div className="mb-4">
            <h1 className={`${styles.header_text}`}>Bio</h1>
          </div>

          <div className="col-sm-4">
            <div className="text-center mt-4">
              {/* <AccountCircleIcon sx={{ fontSize: "100px" }} /> */}
              {
                profileData && profileData?.photo_url === null || profileData && profileData?.photo_url === "" ? <>
                  <AccountCircleIcon sx={{ fontSize: "100px", color:'#00B2D4' }} />
                </> : <>
                  <img src={`${CONSTANTS.API_BASE_URL}/${profileData?.photo_url}`} width='100px' />
                </>

              }
            </div>
          </div>
          <div className="col-sm-6 ">
            {
              profileData && profileData?.bio === null || profileData && profileData?.bio === "" ? <>
                <p>You Have not entered your bio yet.</p>
              </> : <>

                <p>{profileData && profileData?.bio}</p>
              </>
            }
            <div>
              {
                profileData && profileData?.technical_skills.length > 0 ? <>
                  <h2>Technical Skills</h2>
                  <ul>
                    {profileData && profileData?.technical_skills?.map((skills: any, index: any) => (
                      <li key={index}>{skills?.technical_skills}</li>
                    ))}
                  </ul>
                </> : <>
                  <h2>Technical Skills</h2>
                  <p> No Technical Skills details available yet.</p>
                </>
              }
            </div>

            <div>
              {
                profileData && profileData.language.length > 0 ? <>
                  <h2>Languages</h2>
                  <ul>
                    {profileData && profileData.language.map((language: any, index: any) => (
                      <li key={index}>{language?.language}</li>
                    ))}
                  </ul>
                </> : <>
                  <h2>Languages</h2>
                  <p> No Language details available yet.</p>
                </>
              }

            </div>

            <div>
              {
                profileData && profileData?.certifications.length > 0 ? <>
                  <h2>Certifications</h2>
                  <ul>
                    {profileData && profileData?.certifications.map((certification: any, index: any) => (
                      <>
                        <div className="col-4">

                          <li key={index}>{certification?.certification_name}</li>
                        </div>

                      </>
                    ))}
                  </ul>
                </> : <>
                  <h2>Languages</h2>
                  <p> No Certifications details available yet.</p>
                </>
              }

            </div>
            <div className="text-center">
              {/* <button onClick={handleOpenModal} className="btn btn-later">
                Update
              </button> */}
              {/* <button onClick={handleOpenModal} className="btn btn-later">
                Update
              </button> */}
              <div className='mt-5'>

                <Link href='/build-your-bio' target='_blank' className='btn btn-signup mx-2'>Update/Build Your Bio Here</Link>
              </div>
            </div>
          </div>


        </div>


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
  );
};

export default AccountBio;
