import ContractDescription from "@/components/AccountView/Contract/ContractDescription";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/contract.module.css";

const InactiveContractCard = ({ filteredContractsInactive }: any) => {
  console.log("job contract inactive in card", filteredContractsInactive);
  console.log("job contract active in card", filteredContractsInactive);

  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <div className="container">
      <div className="row border rounded">
        <div className={`col-12 ${styles.contract_content_heading}`}>
          <div className="row">
            <div className="col-md-4 border-bottom">
              <h2>{translationDataFromStore?.data?.project_name}</h2>
            </div>
            <div className="col-md-4 border-bottom">
              <h2 className="">{translationDataFromStore?.data?.status}</h2>
            </div>
            <div className="col-md-4 border-bottom">
              <h2 className="text-end ">
                {translationDataFromStore?.data?.action}
              </h2>
            </div>
          </div>
          {filteredContractsInactive && filteredContractsInactive.length > 0 ? (
            <></>
          ) : (
            <div className="text-center">
              <p>{translationDataFromStore?.data?.no_data_available}</p>
            </div>
          )}
        </div>
        <div className="col-12">
          {filteredContractsInactive &&
            filteredContractsInactive.length > 0 && (
              <>
                {filteredContractsInactive.map((data: any, index: any) => {
                  return (
                    <div className="row">
                      <div
                        className={`col-md-4 border-bottom d-flex align-items-center ${styles.border_bottom_none}`}
                      >
                        <div className={styles.job_request_content}>
                          <h2 className="fs-16 ">
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
                          <h2 className={`fs-14 ${styles.unactive}`}>
                            <label
                              className={`${styles.label_mob} fs-14 grey pe-2`}
                            >
                              {translationDataFromStore?.data?.status}:
                            </label>
                            {data?.status}
                          </h2>
                        </div>
                      </div>

                      <div className="col-md-4 border-bottom">
                        <div className="row">
                          <div className="col-md-2 col-lg-4 col-xl-5 col-xxl-6"></div>

                          <ContractDescription data={data} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
        </div>
      </div>
    </div>
  );
};
export default InactiveContractCard;
