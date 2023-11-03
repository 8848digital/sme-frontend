import React from "react";
import styles from "@/styles/account.module.css";
import thankyouImg from "../../../public/assets/thankyou-1.png";
const ContractThankyou = () => {
  return (
    <>
    <div className="container">

      <div className="row justify-content-center">
        <div className="col-12 text-center my-4">
          <div className={`  row justify-content-md-center card  ${styles.account_wrapper}`}>
            <div className="mb-5 pt-4">
              <img src={thankyouImg.src} alt="" width="100px" />
            </div>
          <h4 className="color">
            Thank you for approving this Contract. We are excited to have you
            with our team.
          </h4>
          <h4 className="mt-2 color">The Project manager will be in contact with you.</h4>

          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContractThankyou;
