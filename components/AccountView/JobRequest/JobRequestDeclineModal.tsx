import React from "react";
import styles from "@/styles/account.module.css";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
const JobRequestDeclineModal = ({ show, onHide }: any) => {
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <>
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={onHide}
      >
        <Modal.Header closeButton className="mb-0 pb-0"></Modal.Header>
        <Modal.Body className="text-center my-0 py-0 ">
          <img
            src="/assets/featured_icon.png"
            alt="Featured Icon"
            className="mb-2"
          />
          <p className="fs-20 fw-400 lh-24">
            {translationDataFromStore?.data?.request_decline}
          </p>
          {/* <p className="fs-14 grey fw-400 lh-24 mt-0 pt-0">
            {translationDataFromStore?.data?.we_are_excited}
          </p> */}
        </Modal.Body>
        <Modal.Footer className="mt-0 pt-0">
          <Button onClick={onHide} className="btn_blue  mt-0">
            {translationDataFromStore?.data?.go_back_home}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JobRequestDeclineModal;
