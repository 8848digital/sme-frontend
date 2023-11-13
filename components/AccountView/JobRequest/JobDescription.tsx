import UpdateJobRequestAPI from "@/services/api/job_request_api/update_Job_request_api";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { fetchJobRequest } from "@/store/slices/job_request_slice/job_request_slice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const JobDescription = ({ jobData, onclick }: any) => {
  const [jobCost, setJobCost] = useState<number>();
  console.log("job cost", jobCost);
  const router = useRouter();
  const dispatch = useDispatch();
  let response: any;
  console.log(jobData, "jobb");
  const token = useSelector(get_access_token);
  console.log("profile token", token.token);
  let approveStatus = "Approved";
  let rejectStatus = "Rejected";
  const handleApproveClick = async () => {
    console.log("approve button clicked");
    response = await UpdateJobRequestAPI(
      token?.token,
      jobData.supplier,
      jobData.project_id,
      approveStatus,
      jobCost
    );
    console.log("job approve", response);
    if (response[0].msg === "success") {
      toast.success(
        response[0]?.data?.data === "RFQ Supplier status updated to Approved" &&
          translationDataFromStore?.data?.toast_approve_job_request_success,
        {
          autoClose: 3000, // Time in milliseconds (5 seconds)
          className: "custom-toast", // Close the notification after 3 seconds
        }
      );
      dispatch(fetchJobRequest(token?.token) as any);
      setTimeout(() => {
        router.push("./job-approve-thankyou");
        dispatch(fetchJobRequest(token?.token) as any);
      }, 3000);
    }
    return response;
  };
  const handleRejectClick = async () => {
    console.log("reject button clicked");
    response = await UpdateJobRequestAPI(
      token?.token,
      jobData.supplier,
      jobData.project_id,
      rejectStatus,
      jobCost
    );
    console.log("job reject", response);
    console.log("job approve", response);
    if (response[0].msg === "success") {
      toast.success(
        response[0]?.data?.data === "RFQ Supplier status updated to Rejected" &&
          translationDataFromStore?.data?.toast_reject_job_request_success,
        {
          autoClose: 3000, // Time in milliseconds (5 seconds)
          className: "custom-toast", // Close the notification after 3 seconds
        }
      );
      dispatch(fetchJobRequest(token?.token) as any);
      setTimeout(() => {
        router.push("./job-rejected");
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

  const translationDataFromStore = useSelector(translation_text_from_Store);
  return (
    <div className="container">
      <div className="job-desc-wrapper border p-3 rounded">
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">{jobData.project_id} </h2>
          </div>
          <div className="col-6 text-center ">
            <h4 className="text-capitalize">{jobData.project_id}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">
              {translationDataFromStore?.data?.project_name}{" "}
            </h2>
          </div>
          <div className="col-6 text-center ">
            <h4 className="text-capitalize">{jobData.project_name}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">
              {translationDataFromStore?.data?.job_request_client_name}{" "}
            </h2>
          </div>
          <div className="col-6 text-center">
            <h4 className="text-capitalize">{jobData.client_name}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">
              {translationDataFromStore?.data?.job_request_duration}
            </h2>
          </div>
          <div className="col-6 text-center">
            <h4 className="text-capitalize">{jobData.duration}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">
              {translationDataFromStore?.data?.job_request_supplier}
            </h2>
          </div>
          <div className="col-6 text-center">
            <h4 className="text-capitalize">{jobData.supplier}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">
              {translationDataFromStore?.data?.job_request_payment}
            </h2>
          </div>
          <div className="col-6 text-center">
            <h4 className="text-capitalize">{jobData.total_payment}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">
              {translationDataFromStore?.data?.job_request_cost}
            </h2>
          </div>
          <div className="col-6 text-center">
            <div className="mb-3">
              {jobData?.job_cost.length> 0  ? (
                <h4 className="text-capitalize">{jobData.job_cost}</h4>
              ) : (
                <input
                  type="text"
                  className="form-control"
                  onChange={(e: any) => {
                    setJobCost(e.target.value);
                  }}
                />
              )}
            </div>
          </div>
          <hr />
        </div>
        <div className="col-12 text-center">
          <div className="row">
            <div className="col-md-4">
              <Link href={jobData?.rfq_pdf_url} target="_blank">
                <button
                  className="btn btn-later"
                  style={{ width: "auto" }}
                  // onClick={handleReadContractClick}
                >
                  {translationDataFromStore?.data?.read_full_contract}
                </button>
              </Link>
            </div>

            <div className="col-md-4">
              <button
                className="btn btn-later"
                style={{ width: "auto" }}
                onClick={handleApproveClick}
                disabled={
                  jobData.status === "Approved" || jobData.status === "Rejected"
                }
              >
                {jobData.status === "Pending"
                  ? `${translationDataFromStore?.data?.approve}`
                  : `${translationDataFromStore?.data?.approved}`}
              </button>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-later "
                style={{ width: "auto" }}
                onClick={handleRejectClick}
                disabled={
                  jobData.status === "Approved" || jobData.status === "Rejected"
                }
              >
                {jobData.status === "Pending"
                  ? `${translationDataFromStore?.data?.reject_btn}`
                  : `${translationDataFromStore?.data?.rejected}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
