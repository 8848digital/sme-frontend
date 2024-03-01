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
import { language_selector } from "@/store/slices/general_slice/language_slice";

const useContractList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [contractData, setContractData] = useState<any>(null);
  const contractFromStore = useSelector(contract_data_from_Store);
  const token = useSelector(get_access_token);
  console.log("profile token", token.token);
  const { languageToggle, language_abbr } = useSelector(language_selector);
  useEffect(() => {
    dispatch(fetchContractList({token:token?.token , language_abbr}) as any);
  }, [dispatch, language_abbr]);


  useEffect(() => {
    if (contractFromStore.data) {
      setContractData(contractFromStore?.data);
    }
  }, [contractFromStore]);

  return { contractData, loading:contractFromStore?.loading };
};

export default useContractList;
