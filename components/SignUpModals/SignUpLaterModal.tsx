import { translation_text_from_Store } from '@/store/slices/general_slice/translation_text_slice';
import Link from 'next/link';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";
import styles from "@/styles/signupmodal.module.css"
import featuedIconImg from "@/public/assets/modal_first_icon.png"
import subscriptionApi from "@/services/api/general_api/subscription_api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface FormValues {
    usr: string;
}

const validationSchema = Yup.object({
    usr: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
});
const SignUpLaterModal = ({ show, onHide }: any) => {
    const initialValues: FormValues = {
        usr: "",
    };
    const translationDataFromStore = useSelector(translation_text_from_Store);
    const handleSubmit = async (
        values: FormValues,
        { setSubmitting, resetForm }: any
    ) => {
        try {
            // Logging the values to see if they are captured correctly
            console.log("Form Values:", values);

            const response = await subscriptionApi(values.usr);
            console.log("API Response:", response);
            if (response.msg === "success") {
                toast.success(
                    response.data === "Subscriber Added"
                        ? translationDataFromStore?.data?.toast_added_subscribe_success
                        : translationDataFromStore?.data?.toast_already_subscribe_success,
                    {
                        autoClose: 3000,
                        className: "custom-toast", // Close the notification after 3 seconds
                    }
                );
            }
            resetForm();
            onHide();
            // Handle the response here, you can show a success message or handle errors
        } catch (error) {
            console.error("API Error:", error);
            // Handle the error, show an error message, etc.
        } finally {
            setSubmitting(false);
        }
    };
  
    return (
        <div>
            <Modal show={show} dialogClassName={styles['custom-modal-dialog']} contentClassName={styles['custom-modal-content']} onHide={onHide}>
            <Modal.Header  closeButton className={styles['custom-modal-header']}>  
                </Modal.Header>
                <Modal.Body>
                
                    <div className={`${styles.signup_modal_wrapper}`}>
                        <div className={styles.subscribe_heading}>
                            <h1>{translationDataFromStore?.data?.subscribe_modal_heading}</h1>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    {/* <p>Enter Your Email Address To get updates !!</p> */}
                                    <div >
                                        <div className="form-group text-start mt-3  rtl_margin_common">
                                            <label htmlFor="email">
                                            {translationDataFromStore?.data?.email}<span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                type="email"
                                                id="usr"
                                                name="usr"
                                                required
                                                className="form-control"
                                                placeholder={
                                                    translationDataFromStore?.data?.email_placeholder
                                                }
                                            />
                                            {/* <ErrorMessage
                                                name="usr"
                                                component="div"
                                                className="text-danger"
                                            /> */}
                                        </div>

                                        <div className={styles.signup_subscribe_wrapper}>
                                            <div>
                                                <Link
                                                    href=""
                                                    className={`btn ${styles.later_btn}`}
                                                    onClick={onHide}
                                                >
                                                    <span className={styles.centeredText}>{translationDataFromStore?.data?.cancel}</span>
                                                </Link>

                                            </div>
                                            <div>

                                                {/* <Link href="" className={`btn ${styles.start_btn}`} onClick={() => handleNextClick(initialValues, {})}>
                                                    <span className={styles.centeredText}>{translationDataFromStore?.data?.next}</span>
                                                </Link> */}

                                                <button
                                                    type="submit"
                                                    className={`btn ${styles.start_btn}`}
                                                    disabled={isSubmitting}
                                                >
                                                    <span className={styles.centeredText}>{translationDataFromStore?.data?.next}</span>
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SignUpLaterModal;
