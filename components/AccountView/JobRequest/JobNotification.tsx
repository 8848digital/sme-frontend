import React from "react";
import { useState } from "react";
import JobDescription from "./JobDescription";
import JobApprove from "./JobApprove";
import JobThank from "./JobThank";
import styles from "@/styles/account.module.css";
import { useRouter } from "next/router";

const JobNotification = ({ jobRequestData }: any) => {
  console.log('job request data in render',jobRequestData);
  const [tabs, setTabs] = useState<any>("table");
  const router = useRouter();
  const [descriptionData, setDescriptionData] = useState<any>([]);
  const openDescription = (e: any, tabs: string) => {
    setDescriptionData(e);
    setTabs(tabs);
  };
  return (
    <div className="container ">
      <div
        className={`  row justify-content-md-center card  ${styles.account_wrapper}`}
      >
        <div className="mb-4">
          <h1 className={`${styles.header_text}`}>Job Request</h1>
        </div>
        {tabs === "table" && (
          <>
            <div className="col-12">
              <table className="table table-bordered">
                <thead className="p-2">
                  <tr className="">
                    <th className="text-center">Project Name</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobRequestData  &&
                    jobRequestData.map((data: any, index: number) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              <h2 className="text-center text-capitalize">{data.project_name}</h2>
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-later px-2 mt-0 py-1 "
                                onClick={() =>
                                  openDescription(data, "description")
                                }
                              >
                                View Full{" "}
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
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
