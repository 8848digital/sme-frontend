'use client'
import React, { useState } from "react";
import { useRouter } from "next/router";
import UpdateJobRequestAPI from "@/services/api/job_request_api/update_Job_request_api";
import { useDispatch, useSelector } from "react-redux";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { toast } from "react-toastify";
import Link from "next/link";
import { fetchJobRequest } from "@/store/slices/job_request_slice/job_request_slice";
import styles from "@/styles/account.module.css";
import UpdateContractAPI from "@/services/api/contract_api/update_contract_api";
import { fetchContractList } from "@/store/slices/contract_slice/get_contract_slice";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
const ContractDescription = ({ data, openDescription }: any) => {

  const router = useRouter();
  const dispatch = useDispatch();
  let response: any;
  const translationDataFromStore = useSelector(translation_text_from_Store)

  const token = useSelector(get_access_token);
  console.log('profile token', token.token);
  let approveStatus = 'Approved'
  let rejectStatus = 'Rejected'
  let tableValue = "table"
  const handleApproveClick = async () => {
    console.log('approve button clicked')
    response = await UpdateContractAPI(token?.token, approveStatus , data?.name)
    console.log('job approve', response);
    if (response[0].msg === 'success') {
      toast.success(response[0]?.data?.data, {
        autoClose: 3000, // Time in milliseconds (5 seconds)
        className: 'custom-toast',// Close the notification after 3 seconds
      });
      dispatch(fetchJobRequest(token?.token) as any);
      setTimeout(() => {
        router.push('./contract-approved-thankyou');
        dispatch(fetchContractList(token?.token) as any);
      }, 5000)
    }
    return response
  };
  const handleRejectClick = async () => {
    console.log('reject button clicked')
    response = await UpdateContractAPI(token?.token, rejectStatus , data?.name)
    console.log('job reject', response);
    console.log('job approve', response);
    if (response[0].msg === 'success') {
      toast.success(response[0]?.data?.data, {
        autoClose: 3000, // Time in milliseconds (5 seconds)
        className: 'custom-toast',// Close the notification after 3 seconds
      });
      dispatch(fetchContractList(token?.token) as any);
      setTimeout(() => {
        router.push('./contract-rejected');
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
      <div className='row'>
        <table className="table table-bordered">
          <thead className="p-2">
            <tr className="">
              <th>{translationDataFromStore?.data?.project_name}</th>
              <th className="text-center">{translationDataFromStore?.data?.status}</th>
              <th className="text-center">{translationDataFromStore?.data?.action}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h2>{data?.custom_project_name}</h2>
              </td>
              <td className="text-center">
                <h2>{data?.status}</h2>
              </td>
              <td className="text-center">

                <button
                  className="btn btn-later"
                  style={{ width: "auto",padding:"10px", margin:"0" }}
                  onClick={() => { openDescription(tableValue) }}
                >
                  View Less
                </button>

              </td>
            </tr>
          </tbody>


        </table>
        <div className="col-12 text-center p-2">
          <div className="row">
            <div className="col-md-6">
              <Link href={data?.contract_pdf_url} target="_blank">
                <button
                  className="btn btn-later"
                  style={{ width: "auto" }}
                // onClick={handleReadContractClick}
                >
                  {translationDataFromStore?.data?.read_full_contract}
                </button>
              </Link>
            </div>


            <div className="col-md-6">
              <button
                className="btn btn-later"
                style={{ width: "auto" }}
                onClick={handleApproveClick}
                disabled={data.status === 'Active' || data.status === 'Rejected'}
              >
                {data.status === `${translationDataFromStore?.data?.contract_active}` ? `${translationDataFromStore?.data?.contract_active}` : `${translationDataFromStore?.data?.sign}`}
              </button>
            </div>
            {/* <div className="col-md-4">
              <button
                className="btn btn-later "
                style={{ width: "auto" }}
                onClick={handleRejectClick}
                disabled={data.status === 'Active' || data.status === 'Rejected'}
              >
                {data.status === 'Rejected' ? 'Rejected' : 'Reject'}
              </button>
            </div> */}
          </div>

        </div>
      </div>
    </div>



  );
};

export default ContractDescription;
