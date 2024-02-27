import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ContractDescription from "@/components/AccountView/Contract/ContractDescription";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/contract.module.css";
import UpdateContractAPI from "@/services/api/contract_api/update_contract_api";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { toast } from "react-toastify";
import { fetchJobRequest } from "@/store/slices/job_request_slice/job_request_slice";
import { fetchContractList } from "@/store/slices/contract_slice/get_contract_slice";

const ActiveContractCard = ({ filteredContractsActiveUnsigned }: any) => {
  console.log("job contract active in card", filteredContractsActiveUnsigned);
  const [tabs, setTabs] = useState<any>("table");
  const router = useRouter();
  const dispatch = useDispatch();
  const [descriptionData, setDescriptionData] = useState<any>([]);
  const token = useSelector(get_access_token);
  console.log("profile token", token.token);

  const openDescription = (e: any, tabs: string) => {
    setDescriptionData(e);
    setTabs(tabs);
  };
  let response: any;
  let approveStatus = "Approved";
  let rejectStatus = "Rejected";
  const handleApproveClick = async () => {
    console.log("approve button clicked");
    response = await UpdateContractAPI(
      token?.token,
      approveStatus,
      descriptionData?.name
    );
    console.log("job approve", response);
    if (response[0].msg === "success") {
      toast.success(
        response[0]?.data?.data === "Contract status updated to Approved" &&
          translationDataFromStore?.data
            ?.toast_approve_contract_request_success,
        {
          autoClose: 3000, // Time in milliseconds (5 seconds)
          className: "custom-toast", // Close the notification after 3 seconds
        }
      );
      dispatch(fetchJobRequest(token?.token) as any);
      setTimeout(() => {
        router.push("./contract-approved-thankyou");
        dispatch(fetchContractList(token?.token) as any);
      }, 5000);
    }
    return response;
  };

  const translationDataFromStore = useSelector(translation_text_from_Store);
  console.log("descriptionData", descriptionData);

  return (
    <div className="container">
      {/* <div className="row border rounded"> */}
      {/* {tabs === "table" && ( */}
      <div className="row border rounded">
        <div className={`col-12 ${styles.contract_content_heading}`}>
          <div className="row">
            <div className="col-md-4 border-bottom">
              <div>
                <h2>{translationDataFromStore?.data?.project_name}</h2>
              </div>
            </div>
            <div className="col-md-4 border-bottom">
              <div>
                <h2 className="">{translationDataFromStore?.data?.status}</h2>
              </div>
            </div>

            <div className="col-md-4 border-bottom">
              <div>
                <h2 className="text-end">
                  {translationDataFromStore?.data?.action}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          {filteredContractsActiveUnsigned &&
            filteredContractsActiveUnsigned.length > 0 && (
              <>
                {filteredContractsActiveUnsigned.map(
                  (data: any, index: any) => {
                    return (
                      <div className="row">
                        <div
                          className={`col-md-4 border-bottom ${styles.border_bottom_none}`}
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
                          className={`col-md-4 border-bottom ${styles.border_bottom_none}`}
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

                        <div className="col-md-4 border-bottom">
                          <div className="row">
                            <div className="col-md-2 col-lg-4 col-xl-5 col-xxl-6"></div>
                            <ContractDescription
                              openDescription={setTabs}
                              data={data}
                            />
                          </div>
                        </div>

                        {/* <Link className='color' href={data?.contract_pdf_url} target='_blank'> </Link> */}
                      </div>
                    );
                  }
                )}
              </>
            )}
        </div>

        {filteredContractsActiveUnsigned &&
        filteredContractsActiveUnsigned.length > 0 ? (
          <></>
        ) : (
          <div className="text-center">
            <p>{translationDataFromStore?.data?.no_data_available}</p>
          </div>
        )}
      </div>
      {/* )} */}
      {/* {tabs === "description" && (
        <div>
          <ContractDescription
            openDescription={setTabs}
            data={descriptionData}
          />
        </div>
      )} */}
      {/* </div> */}
    </div>
  );
};
export default ActiveContractCard;
