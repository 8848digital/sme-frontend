import React from "react";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Link from "next/link";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { useSelector } from "react-redux";
import styles from "@/styles/account.module.css";
import useContactSupport from "@/hooks/accounts_hooks/contact_support_hooks";

const AccountContactUsPage = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store);
  const { contactSupport }: any = useContactSupport();
  console.log("contactSupport", contactSupport);
  return (
    <div className="row mt-4">
      <div className={`col-md-12 `}>
        {/* <div className="mb-4">
          <SupportAgentIcon sx={{ fontSize: "45px", color: "#00b2d4" }} />
        </div> */}
        <div className="row">
          <div className="col-lg-4 col-md-6">
            {contactSupport?.support_details?.map((ele: any, idx: any) => {
              return (
                <>
                  <p className="text-capitalize fs-20 lh-24 fw-400">
                    {ele?.office_location_name}:
                  </p>
                  <div>
                    <div>
                      <span className="text-capitalize">
                        {translationDataFromStore?.data?.phone}
                      </span>
                      <span className="ps-2 grey">{ele?.Phone}</span>
                    </div>
                    <div>
                      <span className="text-capitalize">
                        {" "}
                        {translationDataFromStore?.data?.careers}:
                      </span>{" "}
                      <span className="ps-2 grey">{ele?.careers_mail_id}</span>
                    </div>
                    <div>
                      <span className="text-capitalize">
                        {translationDataFromStore?.data?.business_enquiries}:
                      </span>
                      <span className="ps-2 grey">
                        {ele?.business_enquiries_mail_id}
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className={`col-lg-2 col-md-4 ${styles.get_in_touch_wrapper}`}>
            <p className="text-capitalize fs-20 lh-24 fw-400">
              {" "}
              {translationDataFromStore?.data?.get_in_touch}:
            </p>
            <div className="btn btn_blue">
              <Link href="https://strategicgears.com/contact-us" legacyBehavior>
                <a target="_blank" className="text-white text-decoration-none">
                  {/* {translationDataFromStore?.data?.contact_support} */}
                  {contactSupport?.contact_us_label}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountContactUsPage;
