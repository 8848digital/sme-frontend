import React from "react";
import styles from "@/styles/account.module.css";
import thankyouImg from "../../../public/assets/thankyou-1.png";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";

const AccounDeletePage = () => {
  const { translationData, translationLoading } = useTranslationText();
  return (
    <div className="container">
      <div className={`card  row ${styles.account_wrapper} `}>
        <div className="mb-4">
          <h1 className={`${styles.header_text}`}>{translationData?.delete_account}</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-10 text-center">
            {/* <div className="mb-5 pt-4">
              <img src={thankyouImg.src} alt="" width="120px" />
            </div> */}
            <div>
              <h1>{translationData?.delete_account_header}</h1>
              <p>{translationData?.delete_account_description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccounDeletePage;
