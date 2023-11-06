import React from "react";
import styles from "@/styles/account.module.css";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const AccountMaster = () => {
  return (
    <div className="container">
      <div className={`card ${styles.account_wrapper} `}>
        <div className={`mb-4`}>
          <h1 className={`${styles.header_text}`}>Account</h1>
        </div>
        <div className="row justify-content-evenly my-4 mx-2">
          {/* <div className="my-3 ">
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
          </div> */}
          <div className={`col-md-3 text-center ${styles.account_card}`}>
            <div className="mb-4">
              <SupportAgentIcon className={`${styles.account_card_icon}`} />
            </div>
            <div className="">
              <Link
                href="https://strategicgears.com/index.php/contact-us"
                legacyBehavior
              >
                <a target="_blank" className="color  px-3">
                  Contact Support
                </a>
              </Link>
            </div>
          </div>
          <div className={`col-md-3 text-center ${styles.account_card} `}>
            <div className="mb-4">
              <EditIcon className={`${styles.account_card_icon}`} />
            </div>
            <div className="">
              <Link href="/account/change-password" legacyBehavior>
                <a className="color px-3">Change Password</a>
              </Link>
            </div>
          </div>
          <div className={`col-md-3 text-center ${styles.account_card}`}>
            <div className="mb-4">
              <DeleteOutlineIcon className={`${styles.account_card_icon}`} />
            </div>
            <div className="">
              <Link href="/account/account-delete" legacyBehavior>
                <a className="color px-3">Delete Account</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMaster;
