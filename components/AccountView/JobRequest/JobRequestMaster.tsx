import React from "react";
import { useState } from "react";
import AccountSidebar from "../AccountSidebar";
import { jobDetails } from "@/datasets/JobDetails";
import JobNotification from "./JobNotification";
import JobDescription from "./JobDescription";
import JobApprove from "./JobApprove";
import useJobRequest from "@/hooks/job_request_hooks/job_request_hooks";
const JobRequestMaster = () => {
  const  {jobRequestData , loading } = useJobRequest();
  console.log('job request data in master',jobRequestData)
  return (
    <>
      <JobNotification jobRequestData={jobRequestData} />
    </>
  );
};

export default JobRequestMaster;
