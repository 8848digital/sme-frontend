import React from "react";
import noData from "../public/assets/no-connection.png";
import Image from "next/image";
import styles from "../styles/no_data.module.css";
import { useSelector } from "react-redux";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import Link from "next/link";
import { useRouter } from "next/router";

const NoDataFound = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store);
  const router = useRouter();
  return (
    <div className="container">
      <div className={styles.no_data_wrapper}>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-xl-4 col-lg-6 col-md-6 text-center">
            {/* <Image
              src={noData}
              width={60}
              height={60}
              alt="No Connection"
              className="text-center"
            /> */}
            {router.pathname === "/job-request-list" ? <>
            <p className="fs-20 fw-500 pt-4 lh-24">
              {translationDataFromStore?.data?.no_job_request_data_found_heading1}
            </p></> : <>
            <p className="fs-20 fw-500 pt-4 lh-24">
              {translationDataFromStore?.data?.contract_list_headig}
            </p>
            </>
           }
           
            <p className="fs-16 grey lh-24 fw-400">
              {translationDataFromStore?.data?.no_job_request_data_found_heading2}
            </p>
              <Link href='/account-view' className="sg_blue">

              {translationDataFromStore?.data?.update_your_profile}
              </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;
