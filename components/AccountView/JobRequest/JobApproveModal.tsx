import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import Link from 'next/link';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";
import styles from "@/styles/signupmodal.module.css"
import featuedIconImg from "@/public/assets/modal_first_icon.png"
import { useRouter } from 'next/router';
const JobApproveModal = ({ show, onHide }: any) => {
    const [showLaterModal, setShowLaterModal] = useState(false); // State to manage visibility of SignUpLaterModal
    const translationDataFromStore = useSelector(translation_text_from_Store);

    const handleLaterClick = () => {
        setShowLaterModal(true); // Show SignUpLaterModal when "Later" button is clicked
        onHide();
    };
    const router = useRouter();
    const handleStart = () => {
        router.push('/wizard-master')
        onHide();
    }
    return (
        <div>
            <Modal show={show} dialogClassName={styles['custom-modal-dialog']} contentClassName={styles['custom-modal-content']} onHide={onHide}>
                <Modal.Header closeButton className={styles['custom-modal-header']}>
                    {/* <Modal.Title>Modal heading</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <div className={`${styles.signup_modal_wrapper}`}>
                        <div className={styles.featured_image}>
                            <img src={featuedIconImg.src} height="48px" width="48px" alt="" />
                        </div>
                        <h1 className="">
                            {translationDataFromStore?.data?.signup_header}
                        </h1>

                        <h2 className="">
                            {translationDataFromStore?.data?.signup_description}
                        </h2>
                        <div className={styles.signup_btn_wrapper}>
                            <div>
                                <Link
                                    href=""
                                    className={`btn ${styles.later_btn}`}
                                    onClick={handleLaterClick}
                                >
                                    <span className={styles.centeredText}>{translationDataFromStore?.data?.later}</span>
                                </Link>

                            </div>
                            <div>

                                <Link href="/wizard-master" className={`btn ${styles.start_btn}`} onClick={handleStart}>
                                    <span className={styles.centeredText}>{translationDataFromStore?.data?.start}</span>
                                </Link>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
              
            </Modal>
        </div>
    );
};

export default JobApproveModal;
