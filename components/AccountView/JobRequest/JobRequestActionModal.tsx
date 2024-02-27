import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import Link from 'next/link';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";
import styles from "@/styles/job_request.module.css"
import featuedIconImg from "@/public/assets/modal_first_icon.png"
import { useRouter } from 'next/router';
const JobRequestActionModal = ({ show, onHide }: any) => {
    const [showLaterModal, setShowLaterModal] = useState(false); // State to manage visibility of SignUpLaterModal
    const translationDataFromStore = useSelector(translation_text_from_Store);

    const handleLaterClick = () => {
        setShowLaterModal(true); // Show SignUpLaterModal when "Later" button is clicked
        onHide();
    };
    const router = useRouter();

    return (
        <div>
            <Modal show={show} dialogClassName={styles['custom-modal-dialog']} contentClassName={styles['custom-modal-content']} onHide={onHide}>
                <Modal.Header closeButton className={styles['custom-modal-header']}>
                    {/* <Modal.Title>Modal heading</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        {/* <div className={styles.featured_image}>
                            <img src={featuedIconImg.src} height="48px" width="48px" alt="" />
                        </div> */}
                        <h1 className="fs-20">
                        {translationDataFromStore?.data?.thankyou_for_approve_job_request}
                        </h1>

                        <h2 className="fs-16">
                        {translationDataFromStore?.data?.thankyou_for_approve_job_our_team}
                        </h2>
                    </div>
                    <div className='mt-5'>
                        <button type='button' className={styles.btn_go_home}
                        onClick={()=>{router.push('/')}}
                        >
                        {translationDataFromStore?.data?.go_back_home}
                        </button>
                    </div>
                </Modal.Body>
              
            </Modal>
        </div>
    );
};

export default JobRequestActionModal;
