import React from "react";
import { useState } from "react";
import JobDescription from "./JobDescription";
import JobApprove from "./JobApprove";
import JobThank from "./JobThank";

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
      <div className="row justify-content-md-center mt-5">
        {tabs === "table" && (
          <>
            <div className="col-8">
              <table className="table table-bordered">
                <thead className="p-2">
                  <tr className="">
                    <th>Project Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {details.length > 0 &&
                    details.map((e: any, index: number) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <h2>{e.project}</h2>
                            </td>
                            <td>
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
          <div>
            <JobThank />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobNotification;
