import React from "react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "@/styles/bio.module.css";
import account_style from "@/styles/account.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { form_details_from_store } from "@/store/slices/build_bio_slice";
import { CONSTANTS } from "@/services/config/api-config";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const ProfileCompleted = () => {
  // const userData = {
  //   photoUrl: "/path-to-user-photo.jpg",
  //   bio: "I am a passionate developer interested in web technologies.",
  //   techSkills: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
  //   languages: ["English", "Hindi", "Arabic"],
  //   certifications: [
  //     "AWS Certified Developer",
  //     "Microsoft Certified: Azure Administrator Associate",
  //   ],
  // };
  const userData = useSelector(form_details_from_store);
  console.log(userData);
  // const shareProfile = () => {
  //   const shareUrl = "https://example.com/user-profile"; // Replace with the actual profile URL
  //   window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`);
  // };

  const router = useRouter();

  return (
    <div className="container">
      <div
        className={`card p-4 ${styles.profile_wrapper}`}
        style={{ maxWidth: "800px" }}
      >
        <div className="row">
          <div className="text-center my-3">
            <h1>Thank You for completing your bio.</h1>
          </div>

          <div className="col-sm-4 text-end">
            <div
              style={{ height: "150px", width: "150px", overflow: "hidden" }}
            >
              {userData && (userData?.photo_url === null) ? (
                <AccountCircleIcon sx={{ fontSize: "100px", color: "#00B2D4" }} />
              ) : (
                <img src={`${CONSTANTS.API_BASE_URL}${userData?.photo_url}`} width="150px" />
              )}

            </div>
          </div>

          <div className="col-sm-8">
            {userData?.bio.length > 0 && (
              <>
                <p>{userData?.bio}</p>
              </>
            )}
            <div>
              {userData?.technical_skills && userData?.technical_skills.length > 0 ? (
                <>
                  <h2>Technical Skills</h2>
                  <ul>
                    {userData?.technical_skills.map((skills: any, index: any) => (
                      <li className={`${styles.li_marker}`} key={index}>
                        {skills?.technical_skills}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h2>Technical Skills</h2>
                  <p>You have not updated/build your techincal skills.</p>
                </>
              )}
            </div>

            <div>
              {userData?.language && userData?.language.length > 0 ? (
                <>
                  <h2>Languages</h2>
                  <ul>
                    {userData?.language.map((language: any, index: any) => (
                      <li className={`${styles.li_marker}`} key={index}>
                        {language?.language}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h2>Languages</h2>
                  <p>You have not updated/build your Languages.</p>
                </>
              )}
            </div>

            <div>
              {userData?.certifications && userData?.certifications?.length > 0 ? (
                <>
                  <h2>Certifications</h2>
                  <ul>
                    {userData?.certifications.map((certification: any, index: any) => (
                      <li className={`${styles.li_marker}`} key={index}>
                        {certification?.certification_name}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h2>Certifications</h2>
                  <p>You have not updated/build your certifications.</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="text-center pt-3 pb-3">
          <button
            type="button"
            className="btn btn-signup"
            onClick={() => router.push("/")}
          >
            Go To Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompleted;
