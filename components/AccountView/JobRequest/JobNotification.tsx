import React from "react";
import { useState } from "react";
import JobDescription from "./JobDescription";

const JobNotification = ({ details }: any) => {
  console.log(details);
  const [description, setDescription] = useState<boolean>(false);
  const [descriptionData, setDescriptionData] = useState<any>([]);
  const openDescription = (e: any) => {
    setDescriptionData(e);
    setDescription(true);
  };
  return (
    <div className="container ">
      <div className="row justify-content-md-center mt-5">
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
                        <td>{e.Project}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={(e) => openDescription(e)}
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
        {description && (
          <div>
            <JobDescription details={descriptionData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobNotification;
