import React from "react";
import ContractDescription from "@/components/AccountView/Contract/ContractDescription";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { useSelector } from "react-redux";
import styles from "../styles/contract.module.css";

import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import Loaders from "@/components/Loaders";
import NoDataFound from "@/components/NoDataFound";

const ActiveContractCard = ({ filteredContractsActiveUnsigned }: any) => {
  const token = useSelector(get_access_token);

  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <div className="container">
      {filteredContractsActiveUnsigned &&
      filteredContractsActiveUnsigned.length > 0 ? (
        <div className="row border rounded">
          <div className={`col-12 ${styles.contract_content_heading}`}>
            <div className="row">
              <div className="col-md-4 border-bottom">
                <div>
                  <h2>{translationDataFromStore?.data?.contract_project_id}</h2>
                </div>
              </div>
              <div className="col-md-4 border-bottom">
                <div>
                  <h2 className="">{translationDataFromStore?.data?.status}</h2>
                </div>
              </div>

              <div className="col-md-4 border-bottom">
                <div>
                  <h2 className={`text-end ${styles.action}`}>
                    {translationDataFromStore?.data?.action}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            {filteredContractsActiveUnsigned &&
              filteredContractsActiveUnsigned.length > 0 ? (
                <>
                  {filteredContractsActiveUnsigned.map(
                    (data: any, index: any) => {
                      return (
                        <div className="row">
                          <div
                            className={`col-md-4 border-bottom d-flex align-items-center ${styles.border_bottom_none}`}
                          >
                            <div className={styles.job_request_content}>
                              <h2 className="fs-16 fw-500 ">
                                <label
                                  className={`${styles.label_mob} fs-14 grey pe-2`}
                                >
                                  {
                                    translationDataFromStore?.data
                                      ?.job_request_project_id
                                  }
                                  :
                                </label>
                                {data?.custom_project_name}
                              </h2>
                            </div>
                          </div>

                          <div
                            className={`col-md-4 border-bottom d-flex align-items-center ${styles.border_bottom_none}`}
                          >
                            <div className={styles.job_request_content}>
                              <h2
                                className={`fs-14 grey ${
                                  data?.status === "Active"
                                    ? styles.active
                                    : styles.Unsigned
                                }`}
                              >
                                <label
                                  className={`${styles.label_mob} fs-14 grey pe-2`}
                                >
                                  {translationDataFromStore?.data?.status}:
                                </label>
                                {data?.status}
                              </h2>
                            </div>
                          </div>

                          <div className="col-md-4 border-bottom ">
                            <div className="row">
                              <div className="col-md-0 col-lg-3 col-xl-5 col-xxl-5"></div>
                              <ContractDescription data={data} />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </>
              ):(
                <NoDataFound/>
              )}
          </div>
        </div>
      ) : (
        <Loaders />
      )}
    </div>
  );
};
export default ActiveContractCard;
