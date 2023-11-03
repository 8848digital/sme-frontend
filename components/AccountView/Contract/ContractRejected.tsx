import React from "react";
import styles from "@/styles/account.module.css";
import rejectImg from "../../../public/assets/reject_img.jpg";
const ContractRejected = () => {
  return (
    <>
    <div className="container">

      <div className="row justify-content-center">
        <div className="col-12 text-center my-4">
          <div className={`  row justify-content-md-center card  ${styles.account_wrapper}`}>
            <div className="mb-5 pt-4">
              <img src={rejectImg.src} alt="" width="100px" />
            </div>
          <h4 className="color">
            You Have Successfully Rejected this Job Request.
          </h4>

          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContractRejected;
