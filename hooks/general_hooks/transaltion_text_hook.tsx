import { fetchStaticTranslationText, translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { landing_data_from_Store, fetchLandingPage } from "@/store/slices/general_slice/landing_page_slice";
import { language_selector } from "@/store/slices/general_slice/language_slice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useTranslationText = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [translationData, setTranslationData] = useState<any>(null);
  const TranslationTextFromStore = useSelector(translation_text_from_Store);
  console.log(TranslationTextFromStore)
  const {languageToggle , language_abbr}  = useSelector(language_selector);
  const language_selector_from_redux: any = useSelector(language_selector);
  useEffect(() => {
    dispatch(fetchStaticTranslationText({language_abbr}) as any);
  }, [ dispatch , language_selector_from_redux]);

  useEffect(() => {
    if (TranslationTextFromStore.data && TranslationTextFromStore.error === "") {
      setTranslationData(TranslationTextFromStore?.data);
    }
  }, [TranslationTextFromStore]);

  return {translationData , translationLoading:TranslationTextFromStore?.loading};
};

export default useTranslationText;
