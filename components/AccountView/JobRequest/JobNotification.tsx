import React from "react";
import { useState } from "react";
import JobDescription from "./JobDescription";
import JobApprove from "./JobApprove";
import JobThank from "./JobThank";
import styles from "@/styles/account.module.css";

const JobNotification = ({ details }: any) => {
  console.log(details);
  const [tabs, setTabs] = useState<any>("table");
  const [descriptionData, setDescriptionData] = useState<any>([]);
  const openDescription = (e: any, tabs: string) => {
    setDescriptionData(e);
    setTabs(tabs);
  };
  return (
    <div className="container ">
      <div
        className={`  row justify-content-md-center card  ${styles.account_minwrapper}`}
      >
        <div className=" my-3">
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
                  {details.length > 0 &&
                    details.map((e: any, index: number) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <h2 className="ps-2">{e.project}</h2>
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-next px-2 mt-0 py-1 "
                                onClick={() =>
                                  openDescription(e, "description")
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
              details={descriptionData}
              onclick={openDescription}
            />
          </div>
        )}
        {tabs === "approve" && (
          <div>
            <JobApprove details={descriptionData} onclick={openDescription} />
          </div>
        )}
        {tabs === "thank" && (
          <>
            <JobThank />
          </>
        )}
      </div>
    </div>
  );
};

export default JobNotification;
