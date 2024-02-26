"use client";
import UpdateContractAPI from "@/services/api/contract_api/update_contract_api";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { fetchContractList } from "@/store/slices/contract_slice/get_contract_slice";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { fetchJobRequest } from "@/store/slices/job_request_slice/job_request_slice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "../../../styles/contract.module.css";

const ContractDescription = ({ data, openDescription }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  let response: any;
  const translationDataFromStore = useSelector(translation_text_from_Store);

  const token = useSelector(get_access_token);
  console.log("profile token", token.token);
  let approveStatus = "Approved";
  let rejectStatus = "Rejected";
  let tableValue = "table";
  const handleApproveClick = async () => {
    console.log("approve button clicked");
    response = await UpdateContractAPI(token?.token, approveStatus, data?.name);
    console.log("job approve", response);
    if (response.msg === "success") {
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
  const handleRejectClick = async () => {
    console.log("reject button clicked");
    response = await UpdateContractAPI(token?.token, rejectStatus, data?.name);
    console.log("job reject", response);
    console.log("job approve", response);
    if (response.msg === "success") {
      toast.success(response[0]?.data?.data, {
        autoClose: 3000, // Time in milliseconds (5 seconds)
        className: "custom-toast", // Close the notification after 3 seconds
      });
      dispatch(fetchContractList(token?.token) as any);
      setTimeout(() => {
        router.push("./contract-rejected");
      }, 3000);
    }
    return response;
  };
  const handleReadContractClick = () => {
    console.log("approve button clicked");
    router.push("/");
  };
  const isDisabledButton = (status: string) => {
    return status === "Received" || status === "Rejected";
  };
  return (
    <>
      <div className={`col-md-5 col-lg-4 col-xl-3 `}>
        {data?.status === "Inactive" ? (
          ""
        ) : (
          <>
            {data?.status !== "Active" && (
              <button
                className={` ${styles.btn_decline}`}
                onClick={handleApproveClick}
                disabled={
                  data.status === "Active" || data.status === "Rejected"
                }
              >
                {/* {data.status ===
          `${translationDataFromStore?.data?.contract_active}`
            ? `${translationDataFromStore?.data?.contract_active}`
            : `${translationDataFromStore?.data?.sign}`} */}
                {translationDataFromStore?.data?.sign}
              </button>
            )}
          </>
        )}
      </div>
      <div className={`col-md-5 col-lg-4 col-xl-3 `}>
        <Link href={data?.contract_pdf_url} target="_blank">
          <button
            className={`btn ${styles.btn_view} `}

            // onClick={handleReadContractClick}
          >
            {translationDataFromStore?.data?.view}
          </button>
        </Link>
      </div>
    </>
  );
};

export default ContractDescription;
