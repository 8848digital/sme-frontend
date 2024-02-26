import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import styles from "@/styles/account.module.css";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { useSelector } from "react-redux";
import Link from "next/link";
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
