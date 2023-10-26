import React from "react";
import styles from "@/styles/account.module.css";
import thankyouImg from "../../../public/assets/thankyou-1.png";
const JobThank = () => {
  return (
    <>
    <div className="container">

      <div className="row justify-content-center">
        <div className="col-12 text-center my-4">
          <div className={`  row justify-content-md-center card  ${styles.account_wrapper}`}>
            <div className="mb-5 pt-4">
              <img src={thankyouImg.src} alt="" width="120px" />
            </div>
          <h1 className="">
            Thank you for approving this Job Request. We are excited to have you
            with our team.
          </h1>
          <h1 className="mt-2">The Project manager will be in contact with you.</h1>

          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default JobThank;
