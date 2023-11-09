import { useState } from "react";
import JobDescription from "./JobDescription";
// import JobApprove from "./JobApprove";
import styles from "@/styles/account.module.css";
import { useRouter } from "next/router";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { useSelector } from "react-redux";

const JobNotification = ({ jobRequestData }: any) => {
  console.log("job request data in render", jobRequestData);
  const [tabs, setTabs] = useState<any>("table");
  const router = useRouter();
  const [descriptionData, setDescriptionData] = useState<any>([]);
  const translationDataFromStore = useSelector(translation_text_from_Store)

  const openDescription = (e: any, tabs: string) => {
    setDescriptionData(e);
    setTabs(tabs);
  };
  return (
    <div className="container ">
      <div
        className={`  row justify-content-md-center card  ${styles.account_wrapper}`}
      >
        <div className="mb-4 row">
          <div className="col-sm-6">
            {" "}
            <h1 className={`${styles.header_text}`}>{translationDataFromStore?.data?.job_request}</h1>
          </div>
          <div className="col-sm-6 text-sm-end">
            {tabs === "description" && (
              <button
                className="btn btn-later px-2"
                onClick={() => setTabs("table")}
              >
             {translationDataFromStore?.data?.view_less_btn}
              </button>
            )}
          </div>
        </div>
        {tabs === "table" && (
          <>
            <div className="col-12" style={{overflowX:"scroll"}}>
              <table className="table table-bordered">
                <thead className="p-2">
                  <tr className="">
                    <th className="text-center">{translationDataFromStore?.data?.job_request_project_id}</th>
                    <th className="text-center">{translationDataFromStore?.data?.project_name}</th>
                    <th className="text-center">{translationDataFromStore?.data?.action}</th>
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
          <div>
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
