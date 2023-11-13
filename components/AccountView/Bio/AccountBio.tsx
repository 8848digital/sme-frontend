import Loaders from "@/components/Loaders";
import { AccountProfile } from "@/datasets/AccuontProfile";
import { CONSTANTS } from "@/services/config/api-config";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/account.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import AccountUpdateModal from "./AccountUpdateModal";

const AccountBio = ({ bioData, loading }: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const translationDataFromStore = useSelector(translation_text_from_Store);

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
      {loading ? (
        <Loaders />
      ) : (
        <div className={`profile_wrapper ${styles.account_wrapper} card `}>
          <div className="row">
            <div className="mb-4">
              <h1 className={`${styles.header_text}`}>
                {translationDataFromStore?.data?.bio}
              </h1>
            </div>

            <div className="col-sm-6">
              <div className="text-center mt-4">
                {bioData &&
                (bioData.photo_url === null || bioData.photo_url === "") ? (
                  <AccountCircleIcon
                    sx={{ fontSize: "100px", color: "#00B2D4" }}
                  />
                ) : (
                  <img
                    src={
                      bioData?.photo_url &&
                      `${CONSTANTS.API_BASE_URL}${bioData.photo_url}`
                    }
                    width="150px"
                  />
                )}
              </div>
            </div>
            <div className="col-sm-6 ">
              {bioData ? (
                <>
                  {bioData.bio === null || bioData.bio === "" ? (
                    <p>{translationDataFromStore?.data?.bio_no_data_added}</p>
                  ) : (
                    <p>{bioData.bio}</p>
                  )}
                  <div>
                    {bioData.technical_skills &&
                    bioData.technical_skills.length > 0 ? (
                      <>
                        <h2>
                          {translationDataFromStore?.data?.bio_technical_skills}
                        </h2>
                        <ul>
                          {bioData.technical_skills.map(
                            (skills: any, index: any) => (
                              <li className={`${styles.li_marker}`} key={index}>
                                {skills.technical_skills}
                              </li>
                            )
                          )}
                        </ul>
                      </>
                    ) : (
                      <>
                        <h2>
                          {translationDataFromStore?.data?.bio_technical_skills}
                        </h2>
                        <p>
                          {
                            translationDataFromStore?.data
                              ?.bio_profile_complete_technical_tag
                          }
                        </p>
                      </>
                    )}
                  </div>

                  <div>
                    {bioData.language && bioData.language.length > 0 ? (
                      <>
                        <h2>{translationDataFromStore?.data?.bio_languages}</h2>
                        <ul>
                          {bioData.language.map((language: any, index: any) => (
                            <li className={`${styles.li_marker}`} key={index}>
                              {language.language}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <>
                        <h2>{translationDataFromStore?.data?.bio_languages}</h2>
                        <p>
                          {
                            translationDataFromStore?.data
                              ?.bio_profile_complete_language_tag
                          }
                        </p>
                      </>
                    )}
                  </div>

                  <div>
                    {bioData.certifications &&
                    bioData.certifications.length > 0 ? (
                      <>
                        <h2>
                          {translationDataFromStore?.data?.bio_certification}
                        </h2>
                        <ul>
                          {bioData.certifications.map(
                            (certification: any, index: any) => (
                              <li className={`${styles.li_marker}`} key={index}>
                                {certification.certification_name}
                              </li>
                            )
                          )}
                        </ul>
                      </>
                    ) : (
                      <>
                        <h2>
                          {translationDataFromStore?.data?.bio_certification}
                        </h2>
                        <p>
                          {
                            translationDataFromStore?.data
                              ?.bio_profile_complete_certification_tag
                          }
                        </p>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <p>{translationDataFromStore?.data?.bio_no_data}</p>
              )}
              <div className="text-center"></div>
            </div>
            <div className="mt-4 text-center">
              <Link href="/build-your-bio" className="btn btn-signup p-1 mx-2 " style={{fontSize:"15px"}}>
                {translationDataFromStore?.data?.bio_update_btn}
              </Link>
            </div>
          </div>
        </div>
      )}

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
