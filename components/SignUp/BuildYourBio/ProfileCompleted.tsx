import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "@/styles/bio.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { form_details_from_store } from "@/store/slices/build_bio_slice";
import {CONSTANTS} from "@/services/config/api-config"

const ProfileCompleted: React.FC = () => {
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

  const shareProfile = () => {
    const shareUrl = "https://example.com/user-profile"; // Replace with the actual profile URL
    window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`);
  };

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

          <div className="col-sm-4">
            <div
              style={{ height: "150px", width: "150px", overflow: "hidden" }}
            >
              <img
                src={`${CONSTANTS.API_BASE_URL}/${userData.upload_photo}`}
                alt=""
                className="w-100"
              />
            </div>
          </div>
          <div className="col-sm-8">
            <p>{userData.enter_your_bio}</p>

            <div>
              <h2>Technical Skills</h2>
              <ul>
                {userData.technical_skills.map((skill: any, index: number) => (
                  <li key={index}>{skill.technical_skills}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2>Languages</h2>
              <ul>
                {userData.language.map((languages: any, index: number) => (
                  <li key={index}>{languages.language}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2>Certifications</h2>
              <ul>
                {userData.certifications.map(
                  (certification: any, index: number) => (
                    <li key={index}>{certification.certification_name}</li>
                  )
                )}
              </ul>
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
