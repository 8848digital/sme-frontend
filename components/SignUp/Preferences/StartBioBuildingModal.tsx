import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import Link from 'next/link';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";
import styles from "@/styles/signupmodal.module.css"
import featuedIconImg from "@/public/assets/featured_yes_icon.png"

import { useRouter } from 'next/router';
const StartBioBuildingModal = ({ show, onHide }: any) => {
    const [showLaterModal, setShowLaterModal] = useState(false); // State to manage visibility of SignUpLaterModal
    const translationDataFromStore = useSelector(translation_text_from_Store);
    const router = useRouter();

    const handleLaterClick = () => {
        router.push('/')
    };
    const handleStart = () => {
        router.push('/build-your-bio')
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
                            {translationDataFromStore?.data?.start_bio_building_modal_heading}
                          
                        </h1>

                        <h2 className="grey">
                        {translationDataFromStore?.data?.start_bio_building_modal_description}
                        </h2>
                        <div>
                            <div>

                                <Link href='' className={`btn ${styles.btn_start_bio_build}`} onClick={handleStart}>
                                    <span className={styles.centeredText}>
                                        {translationDataFromStore?.data?.start_bio_building_btn_label}
                                       
                                    </span>
                                </Link>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onHide}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    );
};

export default StartBioBuildingModal;
