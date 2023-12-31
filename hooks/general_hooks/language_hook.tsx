import {
  languageSliceData,
  language_selector,
} from "@/store/slices/general_slice/language_slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const useFetchOurHtmlLanguage = () => {
  const dispatch = useDispatch();

  const language_selector_from_redux: any = useSelector(language_selector);

  const HandleLangToggle = (event: any) => {
    // console.log("handletoggle", event?.target?.checked);
    if (language_selector_from_redux.language_abbr === 'en') {
      const slicePayload: any = {
        languageToggle: !language_selector_from_redux.languageToggle,
        language_abbr: "ar",
      };
      // setLanguage({})
      dispatch(languageSliceData(slicePayload));
    } else {
      const slicePayload: any = {
        languageToggle: !language_selector_from_redux.languageToggle,
        language_abbr: "en",
      };
      dispatch(languageSliceData(slicePayload));
    }
  };
  const checkSelectedLang = () => {
    if (language_selector_from_redux.language_abbr !== 'en') {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  };

  useEffect(() => {
    checkSelectedLang();
  }, [language_selector_from_redux]);

  return { HandleLangToggle, language_selector_from_redux };
};

export default useFetchOurHtmlLanguage;
