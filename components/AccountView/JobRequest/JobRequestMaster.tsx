import useJobRequest from "@/hooks/job_request_hooks/job_request_hooks";
import JobNotification from "./JobNotification";
import JobRequestList from "./JobRequestList";
import JobDesc from "./JobDesc";
const JobRequestMaster = () => {
  const  {jobRequestData , loading } = useJobRequest();
  console.log('job request data in master',jobRequestData)
  return (
    <>
      {/* <JobNotification jobRequestData={jobRequestData} /> */}
      <JobRequestList jobRequestData={jobRequestData}/>
      {/* <JobDesc/> */}
    </>
  );
};

export default JobRequestMaster;
