import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { RootState } from "@/store/root-reducer";
import { useRouter } from "next/router";
import { language_selector } from "@/store/slices/language_slice";
import { fetchPreferences, preferences_from_store } from "@/store/slices/general_slice/get_preferences_slice";


const usePreferences = () => {
  const dispatch = useDispatch();
  const prefrencesFromStore = useSelector(preferences_from_store);
  // console.log("@our technical from store", technical);
  const {languageToggle , language_abbr}  = useSelector(language_selector);
  const language_selector_from_redux: any = useSelector(language_selector);
  const router = useRouter();
  const [preference, setPreference] = useState<any>([]);
  const [cLoading , setCustomLoading] = useState<boolean>(true)

  useEffect(() => {
    dispatch(fetchPreferences({language_abbr}) as any);
  }, [router , dispatch , language_selector_from_redux]);
  
  useEffect(() => {

    if (prefrencesFromStore?.loading === false ) 
    {
   
      setPreference(prefrencesFromStore?.data);
    }
    
  }, [prefrencesFromStore]);

  return { preference, preferenceLoading: prefrencesFromStore?.loading , cLoading };
};

export default usePreferences;
