import ContractDescription from "@/components/AccountView/Contract/ContractDescription";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/contract.module.css";

const InactiveContractCard = ({ filteredContractsInactive }: any) => {
  console.log("job contract inactive in card", filteredContractsInactive);
  console.log("job contract active in card", filteredContractsInactive);
  const [tabs, setTabs] = useState<any>("table");
  const router = useRouter();
  const [descriptionData, setDescriptionData] = useState<any>([]);
  const translationDataFromStore = useSelector(translation_text_from_Store);

  const openDescription = (e: any, tabs: string) => {
    setDescriptionData(e);
    setTabs(tabs);
  };
  return (
    <div className="container">
      <div className="row border rounded">
        {/* {tabs === "table" && ( */}
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
                      <div className="col-md-4 border-bottom">
                        <div className={styles.job_request_content}>
                          <h2 className="fs-16">{data?.custom_project_name}</h2>
                        </div>
                      </div>

                      <div className="col-md-4 border-bottom">
                        <div className={styles.job_request_content}>
                          <h2 className="fs-14 grey">{data?.status}</h2>
                        </div>
                      </div>

                      <div className="col-md-4 border-bottom">
                        <div className="row">
                          <div className="col-md-2 col-lg-4 col-xl-6"></div>

                          <ContractDescription
                            openDescription={setTabs}
                            data={data}
                          />
                          {/* <Link className='color' href={data?.contract_pdf_url} target='_blank'> </Link> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
        </div>
        {/* )} */}
        {/* {tabs === "description" && ( */}
        {/* <div>
            <ContractDescription
              // openDescription={setTabs}
              data={descriptionData}
            />
          </div> */}
        {/* )} */}
      </div>
    </div>
  );
};
export default InactiveContractCard;
