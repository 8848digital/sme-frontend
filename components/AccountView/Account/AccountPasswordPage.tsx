import React from "react";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { useSelector } from "react-redux";
import ChangePassword from "@/components/AccountView/Account/ChangePassword";

const AccountPasswordPage = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store);
  return (
    <div className="mt-4">
      <ChangePassword />
    </div>
  );
};

export default AccountPasswordPage;
