import GetContactSupportAPI from "@/services/api/account_api/contact_support_api";
import { language_selector } from "@/store/slices/general_slice/language_slice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useContactSupport = () => {
  const [contactSupport, setContactSupport] = useState([]);
  const { languageToggle, language_abbr } = useSelector(language_selector);
  const language_selector_from_redux: any = useSelector(language_selector);
  console.log("language_abbr", language_abbr);

  const getcontactSupportData = async () => {
    if (language_abbr !== undefined) {
      const fetchcontactSupportData: any = await GetContactSupportAPI(
        language_abbr
      );

      if (fetchcontactSupportData?.msg === "success") {
        setContactSupport(fetchcontactSupportData?.data);
      } else {
        setContactSupport([]);
      }
    }
  };

  useEffect(() => {
    getcontactSupportData();
  }, [language_abbr]);

  // useEffect(() => {
  //   getcontactSupportData();
  // }, []);

  return {
    contactSupport,
  };
};

export default useContactSupport;
