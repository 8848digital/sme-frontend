import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { RootState } from "@/store/root-reducer";
import { useRouter } from "next/router";
import { language_selector } from "@/store/slices/general_slice/language_slice";
import { fetchPriceBasis, price_basis_from_store } from "@/store/slices/general_slice/price_basis_slice";

const usePriceBasis = () => {
  const dispatch = useDispatch();
  const price_basis = useSelector(price_basis_from_store);
  // console.log("@our technical from store", technical);
  const {languageToggle , language_abbr}  = useSelector(language_selector);
  const language_selector_from_redux: any = useSelector(language_selector);
  const router = useRouter();
  const [priceBasis, setPriceBasis] = useState<any>([]);
  const [cLoading , setCustomLoading] = useState<boolean>(true)

  useEffect(() => {
    dispatch(fetchPriceBasis({language_abbr}) as any);
  }, [router , dispatch , language_selector_from_redux]);
  
  useEffect(() => {

    if (price_basis?.loading === false ) 
    {
   
      setPriceBasis(price_basis?.data);
    }
    
  }, [price_basis]);

  return { priceBasis, priceBasisLoading: price_basis?.loading , cLoading };
};

export default usePriceBasis;
