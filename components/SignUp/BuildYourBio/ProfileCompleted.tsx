import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "@/styles/bio.module.css";
import { useRouter } from "next/router";

const ProfileCompleted: React.FC = () => {
  const userData = {
    photoUrl: "/path-to-user-photo.jpg",
    bio: "I am a passionate developer interested in web technologies.",
    techSkills: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
    languages: ["English", "Hindi", "Arabic"],
    certifications: [
      "AWS Certified Developer",
      "Microsoft Certified: Azure Administrator Associate",
    ],
  };

  const shareProfile = () => {
    const shareUrl = "https://example.com/user-profile"; // Replace with the actual profile URL
    window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`);
  };

  const router = useRouter();

  return (
    <div className="container">
      <div className={`card p-4 ${styles.profile_wrapper}`} style={{ maxWidth: '800px'}}>
        <div className="row">
          <div className="text-center my-3">
            <h1>Thank You for completing your profile.</h1>
          </div>

          <div className="col-sm-4">
            <div className="text-center">
              <AccountCircleIcon sx={{ fontSize: "100px" }} />
            </div>
          </div>
          <div className="col-sm-8">
            <p>{userData.bio}</p>

            <div>
              <h2>Technical Skills</h2>
              <ul>
                {userData.techSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2>Languages</h2>
              <ul>
                {userData.languages.map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2>Certifications</h2>
              <ul>
                {userData.certifications.map((certification, index) => (
                  <li key={index}>{certification}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center pt-3 pb-3">
          <button type="button" className="btn btn-signup" onClick={() => router.push('/')}>Go To Home</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompleted;
