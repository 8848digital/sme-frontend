import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { RootState } from "@/store/root-reducer";
import { useRouter } from "next/router";
import { language_selector } from "@/store/slices/general_slice/language_slice";
import { fetchPriceBasis, price_basis_from_store } from "@/store/slices/general_slice/price_basis_slice";
import { fetchIndustryList, industry_list_from_store } from "@/store/slices/general_slice/industry_list_slice";
import { fetchRegionList, region_list_from_store } from "@/store/slices/general_slice/region_list_slice";
import { service_list_from_store } from "@/store/slices/general_slice/service_list_slice";
import year_of_exp_list_slice, { fetchYearOfExpList, year_of_exp_list_from_store } from "@/store/slices/general_slice/year_of_exp_list_slice";

const useYearOfExpList = () => {
  const dispatch = useDispatch();
  const year_of_exp_list = useSelector(year_of_exp_list_from_store);
  // console.log("@our technical from store", technical);
  const {languageToggle , language_abbr}  = useSelector(language_selector);
  const language_selector_from_redux: any = useSelector(language_selector);
  const router = useRouter();
  const [yearOfExpList, setYearOfExpList] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchYearOfExpList({language_abbr}) as any);
  }, [router , dispatch , language_selector_from_redux]);
  
  useEffect(() => {

    if (year_of_exp_list?.loading === false ) 
    {
   
      setYearOfExpList(year_of_exp_list?.data);
    }
    
  }, [year_of_exp_list]);

  
  return { yearOfExpList, yearOfExpListLoading: year_of_exp_list?.loading
  };
};

export default useYearOfExpList;
