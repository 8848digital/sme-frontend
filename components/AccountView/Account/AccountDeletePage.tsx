import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/account.module.css";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import featured_icon from "../../../public/assets/Featured_icon.png";

const AccounDeletePage = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      className={`modal show `}
      style={{ display: "block", position: "initial" }}
    >
      <Button onClick={handleShow} className="btn  btn_grey_border ">
        {translationDataFromStore?.data?.delete_account}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        className={styles.modal_wrapper}
      >
        <Modal.Header closeButton className="p-0 m-0">
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="text-center p-0 m-0">
          <img
            src="/assets/featured_icon.png"
            alt="Featured Icon"
            className="mb-2"
          />
          <p className={styles.delete_heading}>
            {translationDataFromStore?.data?.delete_account}
          </p>
          <div className={styles.delete_para}>
            {translationDataFromStore?.data?.delete_account_header}

            {translationDataFromStore?.data?.delete_account_description}
          </div>
        </Modal.Body>
        <Modal.Footer className="pb-0 mb-0">
          <div className="row w-100">
            <div className="col-md-6">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="btn_grey_border "
              >
                {translationDataFromStore?.data?.cancel}
              </Button>
            </div>
            <div className="col-md-6">
              <button onClick={handleClose} className="btn btn_red">
                {/* {translationDataFromStore?.data?.delete_row_btn.split(" ")[0]} */}
                Delete
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccounDeletePage;
