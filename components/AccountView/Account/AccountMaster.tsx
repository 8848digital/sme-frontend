import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/account.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Link from "next/link";
import { useSelector } from "react-redux";
const AccountMaster = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <div className="container">
      <div className={`card ${styles.account_wrapper} `}>
        <div className={`mb-4`}>
          <h1 className={`${styles.header_text}`}>
            {translationDataFromStore?.data?.account}
          </h1>
        </div>
        <div className="row justify-content-evenly my-4 mx-2">
          <div className={`col-md-3 text-center ${styles.account_card}`}>
            <div className="mb-4">
              <SupportAgentIcon sx={{ fontSize: "45px", color: "#00b2d4" }} />
            </div>
            <div className="">
              <Link
                href="https://strategicgears.com/contact-us"
                legacyBehavior
              >
                <a target="_blank" className="color  px-3">
                  {translationDataFromStore?.data?.contact_support}
                </a>
              </Link>
            </div>
          </div>
          <div className={`col-md-3 text-center ${styles.account_card} `}>
            <div className="mb-4">
              <EditIcon sx={{ fontSize: "45px", color: "#00b2d4" }} />
            </div>
            <div className="">
              <Link href="/change-password" legacyBehavior>
                <a className="color px-3">
                  {translationDataFromStore?.data?.change_password}
                </a>
              </Link>
            </div>
          </div>
          <div className={`col-md-3 text-center ${styles.account_card}`}>
            <div className="mb-4">
              <DeleteOutlineIcon sx={{ fontSize: "45px", color: "#00b2d4" }} />
            </div>
            <div className="">
              <Link href="/account-delete" legacyBehavior>
                <a className="color px-3">
                  {translationDataFromStore?.data?.delete_account}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMaster;
