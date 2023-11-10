import React from "react";
import styles from "@/styles/account.module.css";
import thankyouImg from "../../../public/assets/thankyou-1.png";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { useSelector } from "react-redux";
const ContractThankyou = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center my-4">
            <div
              className={`  row justify-content-md-center card  ${styles.account_wrapper}`}
            >
              <div className="mb-5 pt-4">
                <img src={thankyouImg.src} alt="" width="100px" />
              </div>
              <h4 className="color">
                {translationDataFromStore?.data?.job_approve_thankyou_desp1}
              </h4>
              <h4 className="mt-2 color">
                {translationDataFromStore?.data?.job_approve_thankyou_desp2}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractThankyou;
