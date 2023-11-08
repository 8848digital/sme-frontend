import { eudcation_level_from_store, fetchEducationLevel } from "@/store/slices/auth_slice/education_level_slice";
import { language_selector } from "@/store/slices/language_slice";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useEducationLevel = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const educationLevelStore = useSelector(eudcation_level_from_store);
  //   console.log("@our technical from store", language);
  const {languageToggle , language_abbr}  = useSelector(language_selector);
  const language_selector_from_redux: any = useSelector(language_selector);
  const [educationLevel, setEducationLevel] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchEducationLevel({language_abbr}) as any);
  }, [router ,dispatch , language_selector_from_redux]);

  useEffect(() => {
    if (educationLevelStore.data) {
      setEducationLevel(educationLevelStore?.data);
    }
  }, [educationLevelStore]);

  return { educationLevel, loading:educationLevelStore?.loading };
};

export default useEducationLevel;
