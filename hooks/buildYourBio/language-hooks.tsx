import {
  fetchLanguage,
  our_language,
} from "@/store/slices/buildYourBio_slice/language_slice";
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
    if (language.data) {
      setOurLanguage(language?.data);
    }
  }, [language]);

  return { ourLanguage, loading:language?.loading };
};

export default useFetchOurLanguage;
