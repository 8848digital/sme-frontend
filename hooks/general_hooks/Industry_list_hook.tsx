import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { RootState } from "@/store/root-reducer";
import { useRouter } from "next/router";
import { language_selector } from "@/store/slices/general_slice/language_slice";
import { fetchPriceBasis, price_basis_from_store } from "@/store/slices/general_slice/price_basis_slice";
import { fetchIndustryList, industry_list_from_store } from "@/store/slices/general_slice/industry_list_slice";

const useIndustryList = () => {
  const dispatch = useDispatch();
  const industry_list = useSelector(industry_list_from_store);
  // console.log("@our technical from store", technical);
  const {languageToggle , language_abbr}  = useSelector(language_selector);
  const language_selector_from_redux: any = useSelector(language_selector);
  const router = useRouter();
  const [industryList, setIndustryList] = useState<any>([]);
  const [industryListLoading , setIndustryListLoading] = useState<boolean>(true)

  useEffect(() => {
    dispatch(fetchIndustryList({language_abbr}) as any);
  }, [router , dispatch , language_selector_from_redux]);
  
  useEffect(() => {

    if (industry_list?.loading === false ) 
    {
   
      setIndustryList(industry_list?.data);
    }
    
  }, [industry_list]);

  
  return { industryList, industryListLoading: industry_list?.loading
  };
};

export default useIndustryList;
