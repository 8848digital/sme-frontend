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
import useJobDescription from '@/hooks/job_request_hooks/job_description_hooks';
import Loaders from '@/components/Loaders';
import JobRequestActionModal from './JobRequestActionModal';
import { fetchJobDescription } from '@/store/slices/job_request_slice/job_description_slice';
const JobDesc = () => {

    const [jobCost, setJobCost] = useState<number>();
    const [showModal, setShowModal] = useState(false);
    console.log("job cost", jobCost);
    const router = useRouter();
    const { query } = useRouter();
    const name = query.id;
    const dispatch = useDispatch();
    let response: any;
    // console.log(jobData.name, "job cost");
    const token = useSelector(get_access_token);
    const jobRequestFromStore = useSelector(job_request_data_from_Store);
    const { jobDescriptionData, loading } = useJobDescription();
    const translationDataFromStore = useSelector(translation_text_from_Store);
    console.log('job request data', jobRequestFromStore)
    console.log('job desc data', jobDescriptionData)
    console.log("profile token", token.token);
    let approveStatus = "Approved";
    const handleApproveClick = async (supplier: any, name: any) => {
        console.log("approve button clicked");
        response = await UpdateJobRequestAPI(
            token?.token,
            supplier,
            name,
            approveStatus,
            jobCost
        );
        console.log("job approve", response);
        if (response[0].msg === "success") {
            toast.success(
                response[0]?.data?.data === "RFQ Supplier status updated to Approved" &&
                translationDataFromStore?.data?.toast_approve_job_request_success,
                {
                    autoClose: 3000,
                    className: "custom-toast",
                }
            );
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 10000)
            dispatch(fetchJobDescription({ token: token?.token, name }) as any);
        }
        return response;
    };
    const formatDate = (dateString: any) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    }
    const currentDate = new Date();
    const fourteenDaysAhead = new Date();
    fourteenDaysAhead.setDate(currentDate.getDate() + 14);
    return (
        <>
            <div className="container">
                {
                    !loading ? (
                        <div className={styles.job_request_wrapper}>
                            {
                                jobDescriptionData?.map((data: any, index: any) => {
                                    return (
                                        <>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div>

                                                        {
                                                            data?.job_title !== "" ?
                                                                <div>
                                                                    <h1 className='fs-32  fw-600'>{data?.job_title}</h1>
                                                                </div> : ''
                                                        }
                                                    </div>

                                                    <div className='mt-5'>
                                                        {
                                                            data?.client_name !== "" ?
                                                                <div>

                                                                    <p><span className='pe-1'>{translationDataFromStore?.data?.client}:</span>{data?.client_name}</p>
                                                                </div>
                                                                : ''
                                                        }

                                                        <div>
                                                            <p><span className='pe-1'>{translationDataFromStore?.data?.duration}:</span>{formatDate(data?.from_date)} {translationDataFromStore?.data?.to} {formatDate(data?.to_date)}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="col-sm-6">
                                                    <div className={styles.contract_btn_wrapper}>
                                                        <button type='button' className={styles.btn_view_contract}
                                                            onClick={() => {
                                                                window.open(`${data?.rfq_pdf_url}`, '_blank');
                                                            }}>{translationDataFromStore?.data?.view_full_job_request}</button>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div>
                                                        {data?.skills?.length > 0 ? (
                                                            <h2 className='fs-16'>{translationDataFromStore?.data?.skills}</h2>
                                                        ) : (
                                                            ''
                                                        )}

                                                    </div>
                                                    <div>
                                                        <ul>
                                                            {
                                                                data?.skills?.map((skills: any, index: any) => {
                                                                    return (
                                                                        <>
                                                                            <li>{skills?.skill}</li>
                                                                        </>
                                                                    )
                                                                })
                                                            }


                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div>
                                                        {data?.experience?.length > 0 ? (
                                                            <h2 className='fs-16'>{translationDataFromStore?.data?.requirements}</h2>
                                                        ) : (
                                                            ''
                                                        )}

                                                    </div>
                                                    <div>
                                                        <ul>
                                                            {
                                                                data?.experience?.map((exp: any, index: number) => {
                                                                    return (
                                                                        <>
                                                                            <li>{exp?.experience}</li>
                                                                        </>
                                                                    )
                                                                }
                                                                )
                                                            }


                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    {
                                                        data.total_payment > 0 ? <div>
                                                            <p><span className='pe-1'>{translationDataFromStore?.data?.project_cost}:</span>{data.total_payment}</p>
                                                        </div> : ''
                                                    }


                                                </div>
                                                <div className="col-12">
                                                    {/* {
                                                        data.status === "Approved" || data.status === "Rejected" || data?.job_cost.length > 0 ? (
                                                            <>
                                                                {
                                                                    data?.job_cost.length > 0 ?
                                                                        < div >
                                                                            <p><span className='pe-1'> {translationDataFromStore?.data?.job_request_cost}:</span>{data?.job_cost}</p>
                                                                        </div> : ''
                                                                }
                                                            </>
                                                        ) : (
                                                            <>

                                                                <div className={`form-group ${styles.job_cost_wrapper}`}>
                                                                    <label htmlFor='job_cost'>{translationDataFromStore?.data?.job_request_cost}</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={(e: any) => {
                                                                            setJobCost(e.target.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </>
                                                        )
                                                    } */}
                                                    <div className='mt-3'>

                                                        <div className="col-md-4">
                                                            <div className={styles.btn_wrapper}>


                                                                {
                                                                    data.status === "Pending" ? (
                                                                        <>
                                                                            {new Date(data.date) <= fourteenDaysAhead ? (
                                                                                <button
                                                                                    className={`${styles.btn_view_contract}`}

                                                                                    onClick={() => { handleApproveClick(data?.supplier, data?.name) }}
                                                                                    disabled={
                                                                                        data.status === "Approved" || data.status === "Rejected"
                                                                                    }
                                                                                >
                                                                                    {data.status === "Pending"
                                                                                        ? `${translationDataFromStore?.data?.approve}`
                                                                                        : `${translationDataFromStore?.data?.approved}`}
                                                                                </button>) : (
                                                                                    <button
                                                                                    className={`${styles.btn_disabled} `}
                                                                                   disabled
                                                                                  >
                                                                                    Expired
                                                                                  </button>
                                                                                )
                                                                            }
                                                                        </>
                                                                    ) : ('')
                                                                }
                                                                {
                                                                    data.status === "Rejected" ? (
                                                                        <button
                                                                            className={`${styles.btn_disabled_approved}`}

                                                                            // onClick={() => { handleRejectClick(data.supplier, data.name) }}
                                                                            disabled={
                                                                                data.status === "Approved" || data.status === "Rejected"
                                                                            }
                                                                        >
                                                                            {translationDataFromStore?.data?.declined}
                                                                        </button>

                                                                    ) : ('')
                                                                }

                                                                {
                                                                    data.status === "Approved" ? (
                                                                        <button
                                                                            className={`${styles.btn_disabled_approved} `}

                                                                            // onClick={() => { handleRejectClick(data.supplier, data.name) }}
                                                                            disabled={
                                                                                data.status === "Approved" || data.status === "Rejected"
                                                                            }
                                                                        >
                                                                            {translationDataFromStore?.data?.approved}
                                                                        </button>

                                                                    ) : ('')
                                                                }
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div >
                                        </>
                                    )
                                })
                            }

                        </div>
                    ) : (
                        <Loaders />
                    )
                }
                <JobRequestActionModal show={showModal} onHide={() => { setShowModal(false) }} />
            </div >
        </>
    )
}

export default JobDesc
