import React from "react";
import style from "../../styles/homepage.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import subscriptionApi from "@/services/api/general_api/subscription_api";
import { toast } from "react-toastify";
import useTranslationText from "@/hooks/general_hooks/transaltion_text_hook";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { useSelector } from "react-redux";
import { language_selector } from "@/store/slices/language_slice";

interface FormValues {
  usr: string;
}

const validationSchema = Yup.object({
  usr: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const StartLater = () => {
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
      // Handle the response here, you can show a success message or handle errors
    } catch (error) {
      console.error("API Error:", error);
      // Handle the error, show an error message, etc.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div
            className="start-later-wrapper card p-4 shadow-lg"
            style={{ maxWidth: "800px", height: "400px" }}
          >
            <h1>{translationDataFromStore?.data?.signup_header}</h1>
            <h2 className="mb-5">
              {translationDataFromStore?.data?.signup_description}
            </h2>
            <div className="">
              <Link href="/wizard-master" className="btn btn-signup mx-3">
                {translationDataFromStore?.data?.start}
              </Link>
              <Link href="/" className="btn btn-later">
                {translationDataFromStore?.data?.later}
              </Link>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {/* <p>Enter Your Email Address To get updates !!</p> */}
                  <div className="d-flex mt-5">
                    <div className="form-group me-2 rtl_margin_common">
                      {/* <label htmlFor="email">
                                            Email Address<span className="text-danger">*</span>
                                        </label> */}
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
                      <ErrorMessage
                        name="usr"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-secondary  background"
                      disabled={isSubmitting}
                    >
                      {translationDataFromStore?.data?.send}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartLater;
