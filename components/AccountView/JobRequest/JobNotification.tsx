import { useState } from "react";
import JobDescription from "./JobDescription";
// import JobApprove from "./JobApprove";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/account.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useJobRequest from "@/hooks/job_request_hooks/job_request_hooks";
import { fetchJobRequest } from "@/store/slices/job_request_slice/job_request_slice";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";

const JobNotification = ({ jobRequestData }: any) => {
  console.log("job request data in render", jobRequestData);
  const [tabs, setTabs] = useState<any>("table");
  const router = useRouter();
  const dispatch = useDispatch();
  const [descriptionData, setDescriptionData] = useState<any>([]);
  const translationDataFromStore = useSelector(translation_text_from_Store);

  const openDescription = (e: any, tabs: string) => {
    setDescriptionData(e);
    setTabs(tabs);
  };

  const token = useSelector(get_access_token);
  const viewLess = () => {
    setTabs("table");
    dispatch(fetchJobRequest(token?.token) as any);
  };

  return (
    <div className="container ">
      <div
        className={`  row justify-content-md-center card  ${styles.account_wrapper}`}
      >
        <div className="mb-4 row p-0">
          <div className="col-sm-6">
            {" "}
            <h1 className={`${styles.header_text}`}>
              {translationDataFromStore?.data?.job_request}
            </h1>
          </div>
          <div className="col-sm-6 text-sm-end rtl_text_align_start">
            {tabs === "description" && (
              <button className="btn btn-later px-2" onClick={() => viewLess()}>
                {translationDataFromStore?.data?.view_less_btn}
              </button>
            )}
          </div>
        </div>
        {tabs === "table" && (
          <>
            <div className="col-12 p-0" style={{ overflowX: "scroll" }}>
              <table className="table table-bordered">
                <thead className="p-2">
                  <tr className="">
                    <th className="text-center">
                      {translationDataFromStore?.data?.job_request_project_id}
                    </th>
                    <th className="text-center">
                      {translationDataFromStore?.data?.project_name}
                    </th>
                    <th className="text-center">
                      {translationDataFromStore?.data?.action}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jobRequestData &&
                    jobRequestData.length > 0 &&
                    jobRequestData.map((data: any, index: number) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              <h2 className="text-center text-capitalize">
                                {data.project_id}
                              </h2>
                            </td>
                            <td>
                              <h2 className="text-center text-capitalize">
                                {data.project_name}
                              </h2>
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-later px-2 mt-0 py-1 "
                                onClick={() =>
                                  openDescription(data, "description")
                                }
                              >
                                {translationDataFromStore?.data?.view_full_btn}
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
              {jobRequestData && jobRequestData.length > 0 ? (
                <></>
              ) : (
                <div className="text-center">
                  <p>{translationDataFromStore?.data?.no_data_available}</p>
                </div>
              )}
            </div>
          </>
        )}

        {tabs === "description" && (
          <div className="p-0">
            <JobDescription
              jobData={descriptionData}
              onclick={openDescription}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobNotification;
