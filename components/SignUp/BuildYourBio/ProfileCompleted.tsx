// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CONSTANTS } from "@/services/config/api-config";
import { form_details_from_store } from "@/store/slices/buildYourBio_slice/build_bio_slice";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/bio.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Certificate } from "crypto";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const ProfileCompleted = () => {
  const userData = useSelector(form_details_from_store);
  const translationDataFromStore = useSelector(translation_text_from_Store);

  console.log(userData, "user data");
  // const shareProfile = () => {
  //   const shareUrl = "https://example.com/user-profile"; // Replace with the actual profile URL
  //   window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`);
  // };

  const router = useRouter();
  const query = router.asPath.split("/");
  console.log(query, "query");

  return (
    <div className="container d-flex justify-content-center">
      <div className={` p-4 ${styles.profile_wrapper}`}>
        <div className="d-flex justify-content-center">
          <div className="">
            <div className="d-flex justify-content-center">
              <div style={{ width: "150px" }}>
                <div className={`${styles.circular_image}  `}>
                  {userData && userData?.photo_url === null ? (
                    <AccountCircleIcon
                      sx={{ fontSize: "180px", color: "#00B2D4" }}
                    />
                  ) : (
                    <img
                      src={`${CONSTANTS.API_BASE_URL}${userData?.photo_url}`}
                      width="180px"
                    />
                  )}
                </div>
                <h6 className="mt-3 text-center">
                  {translationDataFromStore?.data?.your_current_photo}
                </h6>
              </div>
            </div>
            <div className="p-2">
              <h5 className="my-2">{`${translationDataFromStore?.data?.bio}:`}</h5>
              <input
                type="text"
                className={`${styles.profile_completed_input} form-control`}
                value={
                  userData?.bio !== ""
                    ? userData?.bio
                    : translationDataFromStore?.data
                        ?.bio_profile_complete_language_tag
                }
                maxLength={500}
                readOnly
              />
              <p className="text-secondary">
                {500 - userData?.bio?.length}{" "}
                {translationDataFromStore?.data?.characters_left}
              </p>
            </div>
            <div className="p-2">
              <h5 className="my-2">{`${translationDataFromStore?.data?.bio_skills}:`}</h5>
              {userData?.technical_skills?.length !== 0 ? (
                userData?.technical_skills?.map((skills: any) => (
                  <input
                    type="text"
                    className={`${styles.profile_completed_input} form-control`}
                    value={skills?.technical_skills}
                    readOnly
                  />
                ))
              ) : (
                <input
                  type="text"
                  className={`${styles.profile_completed_input} form-control`}
                  value={
                    translationDataFromStore?.data
                      ?.bio_profile_complete_technical_tag
                  }
                  readOnly
                />
              )}
            </div>
            <div className="p-2">
              <h5 className="my-2">{`${translationDataFromStore?.data?.build_your_bio_step4_header}:`}</h5>

              {userData?.language?.length !== 0 ? (
                userData?.language?.map((language: any) => (
                  <input
                    type="text"
                    className={`${styles.profile_completed_input} form-control`}
                    value={language?.language}
                    readOnly
                  />
                ))
              ) : (
                <input
                  type="text"
                  className={`${styles.profile_completed_input} form-control`}
                  value={
                    translationDataFromStore?.data
                      ?.bio_profile_complete_language_tag
                  }
                  readOnly
                />
              )}
            </div>
            <div className="p-2">
              <h5 className="my-2">{`${translationDataFromStore?.data?.bio_certification}:`}</h5>
              {userData?.certifications?.length !== 0 ? (
                userData?.certifications?.map((Certificate: any) => (
                  <input
                    type="text"
                    className={`${styles.profile_completed_input} form-control`}
                    value={Certificate?.certification_name}
                    readOnly
                  />
                ))
              ) : (
                <input
                  type="text"
                  className={`${styles.profile_completed_input} form-control`}
                  value={
                    translationDataFromStore?.data
                      ?.bio_profile_complete_certification_tag
                  }
                  readOnly
                />
              )}
            </div>
            <div className="mt-4 p-2">
              <button className={styles.update_button}>
                {translationDataFromStore?.data?.update}
              </button>
            </div>
          </div>
        </div>
        {/* <div className="text-center pt-3 pb-3">
          <button
            type="button"
            className="btn btn-signup"
            onClick={() => router.push("/")}
          >
            {translationDataFromStore?.data?.go_to_home_btn}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileCompleted;
