import useJobRequest from "@/hooks/job_request_hooks/job_request_hooks";
import JobNotification from "./JobNotification";
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
