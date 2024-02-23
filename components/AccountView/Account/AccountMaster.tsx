import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/account.module.css";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import AccountSettingPage from "./AccountSettingPage";
import AccountPasswordPage from "./AccountPasswordPage";
import AccounDeletePage from "./AccountDeletePage";
import AccountContactUsPage from "./AccountContactUsPage";
const AccountMaster = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store);
  const [activeTab, setActiveTab] = useState("settings");

  const handleSelect = (selectedKey: any) => {
    setActiveTab(selectedKey);
  };

  return (
    <div className="container">
      <div className={` ${styles.account_wrapper} `}>
        <div className={`mb-3`}>
          <h1 className={`${styles.header_text}`}>
            {translationDataFromStore?.data?.account}
          </h1>
        </div>
        <div className={styles.tab_wrapper}>
          <Nav
            variant="underline"
            defaultActiveKey="settings"
            onSelect={handleSelect}
          >
            <Nav.Item className="pe-4">
              <Nav.Link
                eventKey="settings"
                className={`text-capitalize nav_link `}
              >
                settings
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="pe-4">
              <Nav.Link
                eventKey="password"
                className={`text-capitalize nav_link `}
              >
                {translationDataFromStore?.data?.change_password
                  ?.split(" ")
                  ?.pop()}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="contact_support"
                className={`text-capitalize nav_link `}
              >
                {translationDataFromStore?.data?.contact_support}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        {activeTab === "settings" && <AccountSettingPage />}
        {activeTab === "password" && <AccountPasswordPage />}
        {activeTab === "contact_support" && <AccountContactUsPage />}
      </div>
    </div>
  );
};

export default AccountMaster;
