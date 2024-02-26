import React from "react";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/job_request.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useJobRequest from "@/hooks/job_request_hooks/job_request_hooks";
import { fetchJobRequest } from "@/store/slices/job_request_slice/job_request_slice";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
const JobRequestList = ({ jobRequestData }: any) => {
  const translationDataFromStore = useSelector(translation_text_from_Store);
  return (
    <>
      <div className="container">
        <div className={styles.job_request_wrapper}>
          <div className={styles.job_request_heading}>
            <h1>{translationDataFromStore?.data?.job_request}</h1>
          </div>
          <div className="row border rounded">
            <div className={`col-12 ${styles.job_request_content_heading}`}>
              <div className="row">
                <div className="col-md-4 border-bottom">
                  <div>
                    <h2>
                      {translationDataFromStore?.data?.job_request_project_id}
                    </h2>
                  </div>
                </div>
                <div className="col-md-4 border-bottom">
                  <div>
                    <h2>{translationDataFromStore?.data?.project_name}</h2>
                  </div>
                </div>
                <div className="col-md-4 border-bottom">
                  <div className="text-end">
                    <h2>{translationDataFromStore?.data?.action}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              {jobRequestData &&
                jobRequestData.length > 0 &&
                jobRequestData.map((data: any, index: number) => {
                  return (
                    <div className="row">
                      <div className="col-md-4 border-bottom">
                        <div className={styles.job_request_content}>
                          <h2 className="fs-16 fw-500 ">{data.project_id}</h2>
                        </div>
                      </div>
                      <div className="col-md-4 border-bottom">
                        <div className={styles.job_request_content}>
                          <h2 className="fs-14 grey">{data.project_name}</h2>
                        </div>
                      </div>
                      <div className="col-md-4 border-bottom">
                        <div className="text-end">
                          <button
                            className={` ${styles.btn_decline}`}
                            type="button"
                          >
                            Decline
                          </button>

                          <button className={styles.btn_view} type="button">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobRequestList;
