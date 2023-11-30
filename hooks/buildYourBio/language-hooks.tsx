import {
  fetchLanguage,
  our_language,
} from "@/store/slices/buildYourBio_slice/language_slice";
import { language_selector } from "@/store/slices/general_slice/language_slice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchOurLanguage = () => {
  const dispatch = useDispatch();
  const language = useSelector(our_language);
  //   console.log("@our technical from store", language);
  const router = useRouter()
  const {languageToggle , language_abbr}  = useSelector(language_selector);
  const language_selector_from_redux: any = useSelector(language_selector);
  const [ourLanguage, setOurLanguage] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchLanguage({language_abbr}) as any);
  }, [router , dispatch , language_selector_from_redux]);

  useEffect(() => {
    if (language?.loading === false) {
     
      setOurLanguage(language?.data);
    }
    
  }, [language]);

  return { ourLanguage, loadingLanguage:language?.loading };
};

export default useFetchOurLanguage;
