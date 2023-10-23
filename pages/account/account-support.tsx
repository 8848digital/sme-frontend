import React from "react";
import styles from "@/styles/account.module.css";

const AccountSupport = () => {
  return (
    <div className="container">
      <div className={`row card ${styles.account_minwrapper}`}>
        <div className=" my-3">
          <h1 className={`${styles.header_text}`}>Contact Support</h1>
        </div>
        <div className="text-center my-5">
          <h1>Thanks for contacting us</h1>
          <h1>We will reach you out soon !</h1>
        </div>
      </div>
    </div>
  );
};

export default AccountSupport;
