import Link from "next/link";
import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import styles from "@/styles/account.module.css";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useProfile from "@/hooks/profile_hooks/profile_hooks";
import AccounDeletePage from "./AccountDeletePage";
import UpdateProfileAPI from "@/services/api/account_api/update_profile_api";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { toast } from "react-toastify";
import Loaders from "@/components/Loaders";

const AccountSettingPage = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store);

  const { profileData, loading }: any = useProfile();
  const [profileDatas, setProfileDatas] = useState<any>(null);
  const initialValues = {
    first_name: profileData?.first_name,
    last_name: profileData?.last_name,
    email: profileData?.email,
    phone_no: profileData?.phone_no,
  };

  useEffect(() => {
    if (profileData) {
      setProfileDatas(profileData);
    }
  }, [profileData]);
  const token = useSelector(get_access_token);
  console.log("profile token", token.token);
  console.log("profileData", profileDatas);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileDatas({
      ...profileDatas,
      [name]: e.target.value,
    });
  };
  const handleSubmit = async (values: any) => {};

  const handleSave = async (values: any) => {
    try {
      const response = await UpdateProfileAPI(token.token, {
        version: "v1",
        method: "update_profile",
        entity: "profile",
        first_name: profileDatas?.first_name,
        last_name: profileDatas?.last_name,
        email: profileDatas?.email_id || profileDatas?.email,
        phone_no: profileDatas?.phone_no,
      });

      console.log(response, "edit");
      if (response) {
        // Update profile data in component state
        setProfileDatas({
          first_name: profileDatas?.first_name,
          last_name: profileDatas?.last_name,
          email: profileDatas?.email_id || profileDatas?.email,
          phone_no: profileDatas?.phone_no,
        });

        // Disable edit mode
        setEditMode(false);
        toast.success(response);
      } else {
        console.error("Empty response received from API");
        toast.error("User Does Not Exist.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    // Reset profileDatas to initial values
    setProfileDatas({
      first_name: initialValues.first_name,
      last_name: initialValues.last_name,
      email: profileDatas?.email_id || profileDatas?.email,
      phone_no: initialValues.phone_no,
    });
    // Disable edit mode
    setEditMode(false);
  };

  return (
    <>
      {!loading ? (
        <div className={`col-md-3 col-lg-5 col-xl-4 mt-4`}>
          <p className="fs-20 fw-400 lh-24">
            {translationDataFromStore?.data?.additional_information}:
          </p>
          <div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ errors, touched }) => (
                <Form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="firstName" className="form-label grey">
                          {translationDataFromStore?.data?.first_name}
                        </label>
                        {editMode ? (
                          <Field
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="first_name"
                            onChange={handleChange}
                            value={profileDatas?.first_name}
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="first_name"
                            value={profileDatas?.first_name}
                            disabled
                          />
                        )}
                        {/* <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error_message"
                /> */}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="lastName" className="form-label grey">
                          {translationDataFromStore?.data?.last_name}
                        </label>
                        {editMode ? (
                          <Field
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="last_name"
                            onChange={handleChange}
                            value={profileDatas?.last_name}
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="last_name"
                            value={profileDatas?.last_name}
                            disabled
                          />
                        )}

                        {/* <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error_message"
                /> */}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label grey">
                      {translationDataFromStore?.data?.phone_number}
                    </label>
                    {editMode ? (
                      <Field
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        name="phone_no"
                        onChange={handleChange}
                        value={profileDatas?.phone_no}
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        name="phone_no"
                        value={profileDatas?.phone_no}
                        disabled
                      />
                    )}
                    {/* <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="error_message"
                /> */}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label grey">
                      {translationDataFromStore?.data?.email}
                    </label>
                    {editMode ? (
                      <Field
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={profileDatas?.email_id || profileDatas?.email}
                      />
                    ) : (
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={profileDatas?.email_id || profileDatas?.email}
                        disabled
                      />
                    )}
                    {/* <ErrorMessage
                  name="email"
                  component="div"
                  className="error_message"
                /> */}
                  </div>
                  {/* <button type="submit" className="btn btn-primary">
                Submit
              </button> */}
                  <div className="row">
                    <div className="col-lg-6 col-md-4">
                      <button
                        className="btn btn_blue_border  mt-3"
                        type="button"
                        onClick={handleCancel}
                      >
                        {translationDataFromStore?.data?.cancel}
                      </button>
                    </div>
                    <div className="col-lg-6 col-md-4">
                      <div className="pt-3">
                        {editMode ? ( // Show "Save" button when in edit mode
                          <button
                            className="btn btn_blue"
                            type="submit"
                            onClick={handleSave}
                          >
                            {translationDataFromStore?.data?.Save}
                          </button>
                        ) : (
                          <button
                            className="btn btn_blue"
                            type="button"
                            onClick={handleEdit}
                          >
                            {translationDataFromStore?.data?.edit}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* 
              <div className="mt-3">
                <AccounDeletePage />
              </div> */}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      ) : (
        <Loaders />
      )}
    </>
  );
};

export default AccountSettingPage;
