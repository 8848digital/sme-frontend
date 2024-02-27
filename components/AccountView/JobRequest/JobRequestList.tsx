import React from 'react'
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/job_request.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useJobRequest from "@/hooks/job_request_hooks/job_request_hooks";
import { fetchJobRequest } from "@/store/slices/job_request_slice/job_request_slice";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import UpdateJobRequestAPI from '@/services/api/job_request_api/update_Job_request_api';
import { toast } from "react-toastify";
import Link from 'next/link';
import Loaders from '@/components/Loaders';
const JobRequestList = ({ jobRequestData, loading }: any) => {
    const translationDataFromStore = useSelector(translation_text_from_Store);
    let rejectStatus = "Rejected";
    let response: any;
    const token = useSelector(get_access_token);
    const jobCost = "";
    console.log('job Request data', jobRequestData)
    const dispatch = useDispatch();
    const router = useRouter();
    const handleRejectClick = async (supplier: any, name: any) => {
        console.log("reject button clicked");
        response = await UpdateJobRequestAPI(
            token?.token,
            supplier,
            name,
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
                // router.push("./job-rejected");
            }, 3000);
        }
        return response;
    };
    return (
        <>
            <div className='container'>
                {
                    !loading ? (
                        <div className={styles.job_request_wrapper}>
                            <div className={styles.job_request_heading}>
                                <h1>{translationDataFromStore?.data?.job_request}</h1>
                            </div>
                            <div className="row border rounded">
                                <div className={`col-12 ${styles.job_request_content_heading}`}>
                                    <div className="row">
                                        <div className="col-md-4 border-bottom">
                                            <div >
                                                <h2>{translationDataFromStore?.data?.job_request_project_id}</h2>
                                            </div>
                                        </div>
                                        <div className="col-md-4 border-bottom">
                                            <div>
                                                <h2>{translationDataFromStore?.data?.project_name}</h2>
                                            </div>
                                        </div>
                                        <div className="col-md-4 border-bottom">
                                            <div className='text-end'>
                                                <h2>{translationDataFromStore?.data?.action}</h2>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-12">
                                    {
                                        jobRequestData &&
                                        jobRequestData.length > 0 &&
                                        jobRequestData.map((data: any, index: number) => {
                                            return (
                                                <div className="row">
                                                    <div className="col-md-4 border-bottom">
                                                        <div className={styles.job_request_content}>
                                                            <h2 className='fs-16 fw-500 '>{data.project_id}</h2>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 border-bottom">
                                                        <div className={styles.job_request_content}>
                                                            <h2 className='fs-14 grey'>{data.project_name}</h2>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 border-bottom">
                                                        <div className={` ${styles.job_request_action}`}>

                                                            
                                                            <button
                                                                className={` ${styles.btn_decline} ${data.status === "Approved" || data.status === "Rejected" ? styles.btn_disabled_decline : ''} `}

                                                                onClick={() => { handleRejectClick(data.supplier, data.name) }}
                                                                disabled={
                                                                    data.status === "Approved" || data.status === "Rejected"
                                                                }
                                                            >
                                                                {data.status === "Pending"
                                                                    ? `${translationDataFromStore?.data?.decline}`
                                                                    : `${translationDataFromStore?.data?.declined}`}
                                                            </button>

                                                            <button className={styles.btn_view} type='button'
                                                                onClick={() => { router.push(`${data.url}`) }}
                                                            >{translationDataFromStore?.data?.view}</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    ) : (<Loaders />)
                }

            </div>
        </>
    )
}

export default JobRequestList
