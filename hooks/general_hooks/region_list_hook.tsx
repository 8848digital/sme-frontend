import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { RootState } from "@/store/root-reducer";
import { useRouter } from "next/router";
import { language_selector } from "@/store/slices/general_slice/language_slice";
import { fetchPriceBasis, price_basis_from_store } from "@/store/slices/general_slice/price_basis_slice";
import { fetchIndustryList, industry_list_from_store } from "@/store/slices/general_slice/industry_list_slice";
import { fetchRegionList, region_list_from_store } from "@/store/slices/general_slice/region_list_slice";

const useRegionList = () => {
  const dispatch = useDispatch();
  const region_list = useSelector(region_list_from_store);
  // console.log("@our technical from store", technical);
  const {languageToggle , language_abbr}  = useSelector(language_selector);
  const language_selector_from_redux: any = useSelector(language_selector);
  const router = useRouter();
  const [regionList, setRegionList] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchRegionList({language_abbr}) as any);
  }, [router , dispatch , language_selector_from_redux]);
  
  useEffect(() => {

    if (region_list?.loading === false ) 
    {
   
      setRegionList(region_list?.data);
    }
    
  }, [region_list]);

  
  return { regionList, regionListLoading: region_list?.loading
  };
};

export default useRegionList;
