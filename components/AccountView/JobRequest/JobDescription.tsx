import React, { useState } from "react";
import { useRouter } from "next/router";
import UpdateJobRequestAPI from "@/services/api/job_request_api/update_Job_request_api";
import { useDispatch, useSelector } from "react-redux";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { toast } from "react-toastify";
import Link from "next/link";
import { fetchJobRequest } from "@/store/slices/job_request_slice/job_request_slice";
const JobDescription = ({ jobData, onclick }: any) => {
const [jobCost , setJobCost] = useState<number>()
console.log('job cost',jobCost)
  const router = useRouter();
  const dispatch = useDispatch();
  let response: any;
  const token = useSelector(get_access_token);
  console.log('profile token', token.token);
  let approveStatus = 'Received'
  let rejectStatus = 'Rejected'
  const handleApproveClick = async () => {
    console.log('approve button clicked')
    response = await UpdateJobRequestAPI(token?.token, jobData.supplier, jobData.project_id, approveStatus , jobCost)
    console.log('job approve', response);
    if (response[0].msg === 'success') {
      toast.success(response[0]?.data?.data, {
        autoClose: 3000, // Time in milliseconds (5 seconds)
        className: 'custom-toast',// Close the notification after 3 seconds
      });
      dispatch(fetchJobRequest(token?.token) as any);
      setTimeout(() => {
        router.push('./job-approve-thankyou');
        dispatch(fetchJobRequest(token?.token) as any);
      }, 3000)
    }
    return response
  };
  const handleRejectClick = async () => {
    console.log('reject button clicked')
    response = await UpdateJobRequestAPI(token?.token, jobData.supplier, jobData.project_id, rejectStatus , jobCost)
    console.log('job reject', response);
    console.log('job approve', response);
    if (response[0].msg === 'success') {
      toast.success(response[0]?.data?.data, {
        autoClose: 3000, // Time in milliseconds (5 seconds)
        className: 'custom-toast',// Close the notification after 3 seconds
      });
      dispatch(fetchJobRequest(token?.token) as any);
      setTimeout(() => {
        router.push('./job-rejected');
      }, 3000)
    }
    return response
  };
  const handleReadContractClick = () => {
    console.log('approve button clicked')
    router.push('/');
  };
  const isDisabledButton = (status: string) => {
    return status === 'Received' || status === 'Rejected';
  };
  return (
    <div className="container">
      <div className="job-desc-wrapper border p-3 rounded">
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">Project Id </h2>
          </div>
          <div className="col-6 text-center ">
            <h4 className="text-capitalize">{jobData.project_id}</h4>
          </div>
          <hr />
        </div>
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
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">Job Cost</h2>
          </div>
          <div className="col-6 text-center">
            <div className="mb-3">
              {
                jobData?.job_cost !== null ? (
                  <h4 className="text-capitalize">{jobData.job_cost}</h4>
                ):(

                  <input type="text" className="form-control" onChange={(e:any)=>{setJobCost(e.target.value)}} />
                )
              }
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
                  Read Full Contract
                </button>
              </Link>
            </div>
            {/* {
              jobData?.status === 'Pending' ? (
                <div className="col-md-4">
                  <button
                    className="btn btn-later"
                    style={{ width: "auto" }}
                    // onClick={handleApproveClick}
                    disabled
                  >
                    Received
                  </button>
                </div>
              ) : (
                <div className="col-md-4">
                  <button
                    className="btn btn-later"
                    style={{ width: "auto" }}
                    onClick={handleApproveClick}
                  >
                    Approve
                  </button>
                </div>
              )
            } */}

            <div className="col-md-4">
              <button
                className="btn btn-later"
                style={{ width: "auto" }}
                onClick={handleApproveClick}
                disabled={jobData.status === 'Received' || jobData.status === 'Rejected'}
              >
                {jobData.status === 'Received' ? 'Received' : 'Approve'}
              </button>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-later "
                style={{ width: "auto" }}
                onClick={handleRejectClick}
                disabled={jobData.status === 'Received' || jobData.status === 'Rejected'}
              >
                {jobData.status === 'Rejected' ? 'Rejected' : 'Reject'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDescription;
