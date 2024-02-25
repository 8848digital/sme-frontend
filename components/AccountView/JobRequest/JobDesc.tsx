import React from 'react'
import UpdateJobRequestAPI from "@/services/api/job_request_api/update_Job_request_api";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { fetchJobRequest, job_request_data_from_Store } from "@/store/slices/job_request_slice/job_request_slice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "@/styles/job_request.module.css";
const JobDesc = () => {

    const [jobCost, setJobCost] = useState<number>();
    console.log("job cost", jobCost);
    const router = useRouter();
    const dispatch = useDispatch();
    let response: any;
    // console.log(jobData.name, "job cost");
    const token = useSelector(get_access_token);
    const jobRequestFromStore = useSelector(job_request_data_from_Store);
    console.log("profile token", token.token);
    let approveStatus = "Approved";
    let rejectStatus = "Rejected";
    //     const handleApproveClick = async () => {
    //       console.log("approve button clicked");
    //       response = await UpdateJobRequestAPI(
    //         token?.token,
    //         jobData.supplier,
    //         jobData.name,
    //         approveStatus,
    //         jobCost
    //       );
    //     console.log("job approve", response);
    //     if (response[0].msg === "success") {
    //         toast.success(
    //             response[0]?.data?.data === "RFQ Supplier status updated to Approved" &&
    //             translationDataFromStore?.data?.toast_approve_job_request_success,
    //             {
    //                 autoClose: 3000, 
    //                 className: "custom-toast", 
    //             }
    //         );
    //     }
    //     dispatch(fetchJobRequest(token?.token) as any);
    //     setTimeout(() => {
    //         router.push("./job-approve-thankyou");
    //         dispatch(fetchJobRequest(token?.token) as any);
    //     }, 3000);
    //     return response;
    // };
    // const handleRejectClick = async () => {
    //   console.log("reject button clicked");
    //   response = await UpdateJobRequestAPI(
    //     token?.token,
    //     jobData.supplier,
    //     jobData.name,
    //     rejectStatus,
    //     jobCost
    //   );
    //   console.log("job reject", response);
    //   console.log("job approve", response);
    //   if (response[0].msg === "success") {
    //     toast.success(
    //       response[0]?.data?.data === "RFQ Supplier status updated to Rejected" &&
    //         translationDataFromStore?.data?.toast_reject_job_request_success,
    //       {
    //         autoClose: 3000, // Time in milliseconds (5 seconds)
    //         className: "custom-toast", // Close the notification after 3 seconds
    //       }
    //     );
    //     dispatch(fetchJobRequest(token?.token) as any);
    //     setTimeout(() => {
    //       router.push("./job-rejected");
    //     }, 3000);
    //   }
    //   return response;
    // };
    // const handleReadContractClick = () => {
    //   console.log("approve button clicked");
    //   router.push("/");
    // };
    // const isDisabledButton = (status: string) => {
    //     return status === "Received" || status === "Rejected";
    // };

    const translationDataFromStore = useSelector(translation_text_from_Store);
    return (
        <>
            <div className="container">
                <div className={styles.job_request_wrapper}>
                    <div className="row">
                        <div className="col-6">
                            <div>
                                <h1 className='fs-32  fw-600'>Senior Word press Development</h1>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className='text-end'>
                                <button type='button' className={styles.btn_view_contract}>View Full Contract</button>
                            </div>
                        </div>
                        <div className="col-12">
                            <div>
                                <p>Client:xyz</p>
                            </div>
                            <div>
                                <p>Duration:12/04/2024 to present</p>
                            </div>
                        </div>

                        <div className="col-12">
                            <div>
                                <h2>Skills</h2>
                            </div>
                            <div>
                                <ul>
                                    <li>Expert in WordPress theme and plugin development</li>
                                    <li>Proficient in PHP, HTML, CSS, and JavaScript</li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-12">
                            <div>
                                <h2>Requirements</h2>
                            </div>
                            <div>
                                <ul>
                                    <li>Expert in WordPress theme and plugin development</li>
                                    <li>Proficient in PHP, HTML, CSS, and JavaScript</li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-12">
                            <div>
                                <label htmlFor='job_cost'>Job Cost</label>
                                <input
                                    type="text"
                                    className="form-control w-25"
                                    onChange={(e: any) => {
                                        setJobCost(e.target.value);
                                    }}
                                />
                            </div>
                            <div className='mt-3'>
                                <button type='button' className={styles.btn_view_contract}>Approve</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobDesc
