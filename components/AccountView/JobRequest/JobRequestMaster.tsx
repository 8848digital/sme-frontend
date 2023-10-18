import React from "react";
import { useState } from "react";
import AccountSidebar from "../AccountSidebar";
import { jobDetails } from "@/datasets/JobDetails";
import JobNotification from "./JobNotification";
import JobDescription from "./JobDescription";
import JobApprove from "./JobApprove";
const JobRequestMaster = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-2">
            <AccountSidebar />
          </div>
          <div className="col-10">
            <div>
              <JobNotification details={jobDetails} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobRequestMaster;
