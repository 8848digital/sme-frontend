import {
  fetchLanguage,
  our_language,
} from "@/store/slices/buildYourBio_slice/language_slice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchOurLanguage = () => {
  const dispatch = useDispatch();
  const language = useSelector(our_language);
  //   console.log("@our technical from store", language);
  const router = useRouter()

  const [ourLanguage, setOurLanguage] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchLanguage() as any);
  }, [router , dispatch]);

  useEffect(() => {
    if (language?.loading === false) {
     
      setOurLanguage(language?.data);
    }
    
  }, [language]);

  return { ourLanguage, loadingLanguage:language?.loading };
};

export default useFetchOurLanguage;
