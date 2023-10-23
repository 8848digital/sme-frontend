import React from "react";
import styles from "@/styles/account.module.css";
import thankyouImg from "../../../public/assets/thankyou-1.png";

const AccounDeletePage = () => {
  return (
    <div className="container">
      <div className={`card  row ${styles.account_minwrapper} `}>
        <div className=" my-3">
          <h1 className={`${styles.header_text}`}>Reset Password</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-10 text-center">
            <div className="mb-5 pt-5">
              <img src={thankyouImg.src} alt="" width="120px" />
            </div>
            <div>
              <h1>Thank you for Been with Us.</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccounDeletePage;
