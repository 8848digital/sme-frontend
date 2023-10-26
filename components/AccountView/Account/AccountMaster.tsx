import React from "react";
import styles from "@/styles/account.module.css";
import Link from "next/link";

const AccountMaster = () => {
  return (
    <div className="container">
      <div className={`card row ${styles.account_wrapper } `}>
        <div className={`mb-4`}>
          <h1 className={`${styles.header_text}`}>Account</h1>
        </div>
        <div className="row text-center">
          <div className="my-3 ">
            <Link href="/account/change-password" legacyBehavior>
              <a className="btn btn-signup font-size-3">Change Password</a>
            </Link>
          </div>
          <div className="my-3">
            <Link href="/account/account-delete" legacyBehavior>
              <a className="btn btn-signup font-size-3">Delete Account</a>
            </Link>
          </div>
          <div className="my-3">
            <Link href="https://strategicgears.com/index.php/contact-us" legacyBehavior>
              <a target="_blank" className="btn btn-signup font-size-3">Contact Support</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMaster;
