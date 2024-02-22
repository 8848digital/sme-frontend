import getLoginThemeApi from "@/services/api/auth_api/login_theme_api";
import { language_selector } from "@/store/slices/general_slice/language_slice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useLoginTheme = () => {
  const [loginThemeData, setLoginThemeData] = useState([]);
  const { languageToggle, language_abbr } = useSelector(language_selector);

  const getLoginThemeData = async () => {
    const fetchLoginThemeData: any = await getLoginThemeApi(language_abbr);

    if (fetchLoginThemeData?.msg === "success") {
      setLoginThemeData(fetchLoginThemeData?.data);
    } else {
      setLoginThemeData([]);
    }
  };
  console.log("loginThemeData", loginThemeData);

  useEffect(() => {
    getLoginThemeData();
  }, [language_abbr]);

  return {
    loginThemeData,
  };
};

export default useLoginTheme;
