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

const AccountSettingPage = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store);
  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  };
  const { profileData }: any = useProfile();
  const [profileDatas, setProfileData] = useState(null);
  useEffect(() => {
    if (profileData) {
      setProfileData(profileData);
    }
  }, [profileData]);
  const token = useSelector(get_access_token);
  console.log("profile token", token.token);
  console.log("profileData", profileDatas);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
  };
  const handleSubmit = async (values: any) => {
    try {
      // Call API to update profile data
      const response = await UpdateProfileAPI(token.token, {
        version: "v1",
        method: "update_profile",
        entity: "profile",
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone_no: values.phone_no,
      });
      // Handle response
      console.log(response, "edit");
      if (response) {
        // Update profile data in component state
        setProfileData({
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone_no: values.phone_no,
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

  return (
    <div className={`col-md-3 col-lg-5 col-xl-4 mt-4`}>
      {/* <div className="mb-4">
        <DeleteOutlineIcon sx={{ fontSize: "45px", color: "#00b2d4" }} />
      </div> */}
      <div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <Form>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label grey">
                      {translationDataFromStore?.data?.first_name_placeholder
                        .split("Enter ")
                        .pop()}
                    </label>
                    {editMode ? (
                      <Field
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="first_name"
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="first_name"
                        value={profileDatas?.first_name}
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
                      {translationDataFromStore?.data?.last_name_placeholder
                        .split("Enter ")
                        .pop()}
                    </label>
                    {editMode ? (
                      <Field
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="last_name"
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="last_name"
                        value={profileDatas?.last_name}
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
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phone_no"
                    value={profileDatas?.phone_no}
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
                  />
                ) : (
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={profileDatas?.email_id || profileDatas?.email}
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
              <div className="pt-3">
                {editMode ? ( // Show "Save" button when in edit mode
                  <button
                    className="btn btn_blue"
                    type="submit"
                    onSubmit={handleSubmit}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn_blue"
                    type="button"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="mt-3">
                {/* <Link href="/account-delete" legacyBehavior> */}
                <AccounDeletePage />
                {/* </Link> */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AccountSettingPage;
