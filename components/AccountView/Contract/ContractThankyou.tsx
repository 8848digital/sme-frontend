import React from "react";
import styles from "@/styles/account.module.css";
import thankyouImg from "../../../public/assets/thankyou-1.png";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
const ContractThankyou = ({ show, onHide }: any) => {
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
          <p className="fs-20 fw-400 lh-24">
            {translationDataFromStore?.data?.thank_you_approving_contract}
          </p>
          <p className="fs-14 grey fw-400 lh-24 mt-0 pt-0">
            {translationDataFromStore?.data?.we_are_excited}
          </p>
        </Modal.Body>
        <Modal.Footer className="mt-0 pt-0">
          <Button onClick={onHide} className="btn_blue  mt-0">
            {translationDataFromStore?.data?.go_back_home}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center my-4">
            <div
              className={`  row justify-content-md-center card  ${styles.account_wrapper}`}
            >
              <div className="mb-5 pt-4">
                <img src={thankyouImg.src} alt="" width="100px" />
              </div>
              <h4 className="color">
                {translationDataFromStore?.data?.job_approve_thankyou_desp1}
              </h4>
              <h4 className="mt-2 color">
                {translationDataFromStore?.data?.job_approve_thankyou_desp2}
              </h4>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ContractThankyou;
