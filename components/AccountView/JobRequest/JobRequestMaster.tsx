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
      <JobNotification details={jobDetails} />
    </>
  );
};

export default JobRequestMaster;
