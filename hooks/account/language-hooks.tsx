import {
    fetchLanguage,
    our_language,
} from "@/store/slices/account_slice/language_slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchOurLanguage = () => {
  const dispatch = useDispatch();
  const language = useSelector(our_language);
//   console.log("@our technical from store", language);

  const [ourLanguage, setOurLanguage] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchLanguage() as any);
  }, [dispatch]);

  useEffect(() => {
    setOurLanguage(language?.data);
  }, [language]);

  return { language, ourLanguage };
};

export default useFetchOurLanguage;
