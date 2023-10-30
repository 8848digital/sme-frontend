import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/store/root-reducer";

import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { fetchJobRequest, job_request_data_from_Store } from "@/store/slices/job_request_slice/job_request_slice";

const useJobRequest = () => {
  const dispatch = useDispatch();
  const [jobRequestData, setjobRequestData] = useState<any>(null);
  const jobRequestFromStore = useSelector(job_request_data_from_Store);
  const token = useSelector(get_access_token);
  console.log('profile token', token.token);

  useEffect(() => {
    dispatch(fetchJobRequest(token?.token) as any);
  }, [dispatch, token]);

  useEffect(() => {
    if (jobRequestFromStore.data) {
      setjobRequestData(jobRequestFromStore?.data);
    }
  }, [jobRequestFromStore]);

  return {jobRequestData , loading :jobRequestFromStore?.loading};
};

export default useJobRequest;
