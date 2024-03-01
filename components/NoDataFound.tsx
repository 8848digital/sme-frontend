import React from "react";
import noData from "../public/assets/no-connection.png";
import Image from "next/image";
import styles from "../styles/no_data.module.css";
import { useSelector } from "react-redux";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";

const NoDataFound = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store);
  return (
    <div className="container">
      <div className={styles.no_data_wrapper}>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-xl-3 col-lg-4 col-md-5 text-center">
            <Image
              src={noData}
              width={60}
              height={60}
              alt="No Connection"
              className="text-center"
            />
            <p className="fs-20 fw-500 pt-4 lh-24">
              {translationDataFromStore?.data?.no_data_found}
            </p>
            <p className="fs-16 grey lh-24 fw-400">
              {translationDataFromStore?.data?.we_are_unable}
            </p>
            <button className="btn btn_blue">
              {translationDataFromStore?.data?.go_back_home}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;
