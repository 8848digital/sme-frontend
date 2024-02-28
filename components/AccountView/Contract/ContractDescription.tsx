"use client";
import UpdateContractAPI from "@/services/api/contract_api/update_contract_api";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { fetchContractList } from "@/store/slices/contract_slice/get_contract_slice";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { fetchJobRequest } from "@/store/slices/job_request_slice/job_request_slice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "../../../styles/contract.module.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ContractApproveModal from "./ContractApproveModal";

const ContractDescription = ({ data }: any) => {
  const dispatch = useDispatch();
  let response: any;
  const translationDataFromStore = useSelector(translation_text_from_Store);
  const [modalShow, setModalShow] = useState(false);

  const token = useSelector(get_access_token);
  console.log("profile token", token.token);
  let approveStatus = "Approved";

  const handleApproveClick = async () => {
    console.log("approve button clicked");
    console.log(data?.name, " data?.name");
    response = await UpdateContractAPI(token?.token, approveStatus, data?.name);
    console.log("job approve", response);
    if (response[0]?.msg === "success") {
      toast.success(response[0]?.data?.data);
      dispatch(fetchJobRequest(token?.token) as any);
      setModalShow(true);
      setTimeout(() => {
        dispatch(fetchContractList(token?.token) as any);
      }, 5000);
    } else {
      toast.error(response.error);
    }
    return response;
  };

  useEffect(() => {
    if (modalShow) {
      const timer = setTimeout(() => {
        setModalShow(false); // Close the modal after 5000ms
      }, 5000);

      // Clear the timeout if the modal is closed before 5000ms
      return () => clearTimeout(timer);
    }
  }, [modalShow]);

  return (
    <>
      <div className={`col-md-6 col-lg-5 col-xl-4 col-xxl-4 text-start`}>
        {data?.status === "Inactive" ? (
          ""
        ) : (
          <>
            {data?.status !== "Active" && (
              <button
                className={` ${styles.btn_sign}`}
                onClick={handleApproveClick}
                disabled={data.status === "Active"}
              >
                {translationDataFromStore?.data?.sign}
              </button>
            )}
            <ContractApproveModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </>
        )}
      </div>
      <div className={`col-md-6 col-lg-4 col-xl-3 col-xxl-3 text-end `}>
        <Link href={data?.contract_pdf_url} target="_blank">
          <button className={`btn ${styles.btn_view} `}>
            {translationDataFromStore?.data?.view}
          </button>
        </Link>
      </div>
    </>
  );
};

export default ContractDescription;
