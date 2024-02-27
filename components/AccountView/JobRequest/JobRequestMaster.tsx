import useJobRequest from "@/hooks/job_request_hooks/job_request_hooks";
import JobRequestList from "./JobRequestList";
const JobRequestMaster = () => {
  const  {jobRequestData , loading } = useJobRequest();
  console.log('job request data in master',jobRequestData)
  return (
    <>
      <JobRequestList jobRequestData={jobRequestData} loading={loading}/>
    </>
  );
};

export default JobRequestMaster;
