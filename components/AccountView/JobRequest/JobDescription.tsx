import React, { useState } from "react";
import { useRouter } from "next/router";
import UpdateJobRequestAPI from "@/services/api/job_request_api/update_Job_request_api";
import { useSelector } from "react-redux";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { toast } from "react-toastify";
const JobDescription = ({ jobData, onclick }: any) => {

  const router = useRouter();
  let response: any;
  const token = useSelector(get_access_token);
  console.log('profile token', token.token);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  let approveStatus = 'Received'
  let rejectStatus = 'Rejected'
  const handleApproveClick = async () => {
    console.log('approve button clicked')
    response = await UpdateJobRequestAPI(token?.token, jobData.supplier, jobData.project_name, approveStatus)
    console.log('job approve', response);
    if (response.msg === 'success') {
      toast.success(response?.data);
      setTimeout(() => {
        router.push('./job-approve-thankyou');
      }, 5000)
    }
    return response
  };
  const handleRejectClick = async () => {
    console.log('reject button clicked')
    response = await UpdateJobRequestAPI(token?.token, jobData.supplier, jobData.project_name, rejectStatus)
    console.log('job reject', response);
    if (response.msg === 'success' || response.data === '') {
      toast.error(response?.data);
      setTimeout(() => {
        //  router.push('./job-approve-thankyou');
      }, 5000)
    }
    return response
  };
  const handleReadContractClick = () => {
    console.log('approve button clicked')
    router.push('/');
  };

  return (
    <div className="container">
      <div className="job-desc-wrapper border p-3 rounded">
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">Project Name </h2>
          </div>
          <div className="col-6 text-center ">
            <h4 className="text-capitalize">{jobData.project_name}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">Client Name </h2>
          </div>
          <div className="col-6 text-center">
            <h4 className="text-capitalize">{jobData.client_name}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">Duration</h2>
          </div>
          <div className="col-6 text-center">
            <h4 className="text-capitalize">{jobData.duration}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">Supplier</h2>
          </div>
          <div className="col-6 text-center">
            <h4 className="text-capitalize">{jobData.supplier}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">Total Payment</h2>
          </div>
          <div className="col-6 text-center">
            <h4 className="text-capitalize">{jobData.total_payment}</h4>
          </div>
          <hr />
        </div>
        <div className="col-12 text-center">
          <div className="row">
            <div className="col-md-4">
              <button
                className="btn btn-later  px-2"
                style={{ width: "auto" }}
                onClick={handleReadContractClick}
              >
                Read Full Contract
              </button>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-later"
                style={{ width: "auto" }}
                onClick={handleApproveClick}
              >
                Approve
              </button>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-later "
                style={{ width: "auto" }}
                onClick={handleRejectClick}
              >
                Reject
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDescription;
