import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/store/root-reducer";
import {
  fetchProfile,
  profile_data_Store,
} from "@/store/slices/profile_slice/profile_slice"; // Adjust the import path as needed
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import {
  contract_data_from_Store,
  fetchContractList,
} from "@/store/slices/contract_slice/get_contract_slice";
import GetContractAPI from "@/services/api/contract_api/get_contract_api";

const useContractList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [contractData, setContractData] = useState<any>(null);
  const contractFromStore = useSelector(contract_data_from_Store);
  const token = useSelector(get_access_token);
  console.log("profile token", token.token);

  useEffect(() => {
    dispatch(fetchContractList(token?.token) as any);
  }, [dispatch, token, contractData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 3000ms
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts or the effect re-runs
  }, []);

  useEffect(() => {
    if (contractFromStore.data) {
      setContractData(contractFromStore?.data);
    }
  }, [contractFromStore]);

  return { contractData, loading };
};

export default useContractList;
