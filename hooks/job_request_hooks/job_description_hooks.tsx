import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/store/root-reducer";

import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { fetchJobRequest, job_request_data_from_Store } from "@/store/slices/job_request_slice/job_request_slice";
import { fetchJobDescription, job_description_data_from_Store } from "@/store/slices/job_request_slice/job_description_slice";
import { useRouter } from "next/router";

const useJobDescription = () => {
  const dispatch = useDispatch();
  const [jobDescriptionData, setJobDescriptionData] = useState<any>(null);
  const jobDescriptionFromStore = useSelector(job_description_data_from_Store);
  const token = useSelector(get_access_token);
  console.log('profile token', token.token);

  const {query} = useRouter();
  const router = useRouter()
  const name = query.id
  console.log('query',query.id)
  useEffect(() => {
    dispatch(fetchJobDescription({token:token?.token , name}) as any);
  }, [dispatch,router ]);

  useEffect(() => {
    if (jobDescriptionFromStore.data) {
      setJobDescriptionData(jobDescriptionFromStore?.data);
    }
  }, [jobDescriptionFromStore]);

  return {jobDescriptionData , loading :jobDescriptionFromStore?.loading};
};

export default useJobDescription;
