import LoaderForSkills from "@/components/LoaderForSkills";
import BioUploadFileAPI from "@/services/api/buildYourBio_api/bio_upload_file_api";
import { CONSTANTS } from "@/services/config/api-config";
import { get_access_token } from "@/store/slices/auth_slice/login_slice";
import { SignUpUserAccessToken_from_store } from "@/store/slices/auth_slice/signup_user_access_token_slice";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/bio.module.css";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Step2of3UploadPhoto = ({ bioData, onFormDataChange }: any) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setSelectedFile(bioData?.photo_url);
  }, [bioData?.photo_url]);

  const [fileURL, setFileURL] = useState<any>(bioData?.photo_url || null);

  const signuptoken: any = useSelector(SignUpUserAccessToken_from_store);
  const translationDataFromStore = useSelector(translation_text_from_Store);
  console.log(signuptoken);
  const loginToken: any = useSelector(get_access_token);
  console.log(loginToken);
  let accessToken: any;
  if (loginToken?.token?.length > 0) {
    accessToken = loginToken?.token;
  } else {
    accessToken = signuptoken?.data?.acess_token;
  }
  console.log(accessToken);

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onFormDataChange("photo_url", file);

    if (file) {
      setLoading(true);
      // Handle file upload and set file URL
      uploadFile(file);
    }
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
    onFormDataChange("photo_url", null);
  };

  const uploadFile = async (file: File | null) => {
    if (file) {
      try {
        const response = await BioUploadFileAPI({ file }, accessToken);
        console.log("Upload Response:", response.file_url);

        // Use the upload response as needed (e.g., store it in your form data)
        onFormDataChange("photo_url", response.file_url);
        setFileURL(response.file_url);
      } catch (error) {
        console.error("Upload Error:", error);
      } finally {
        setLoading(false); // Set loading to false when the upload is done (whether successful or not)
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      photo_url: null,
    },
    onSubmit: () => {
      // Do nothing here, as we are handling file upload when the file is selected
    },
  });

  const { handleSubmit, setFieldValue } = formik;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="container">
      <div
        className={`card p-4 ${styles.common_bio_wrapper}`}
        style={{ maxWidth: "800px" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-2">
              <h1>
                {translationDataFromStore?.data?.build_your_bio_step1_header}
              </h1>
              <h2>
                {
                  translationDataFromStore?.data
                    ?.build_your_bio_step1_description
                }
              </h2>
            </div>
            <div className="mt-5 text-center">
              <form onSubmit={handleSubmit}>
                <div className="row mt-3">
                  <div className="col-md-12">
                    {loading ? (
                      <LoaderForSkills />
                    ) : selectedFile ? (
                      <div className={`${styles.selected_file}`}>
                        <span>
                          <img
                            src={`${CONSTANTS.API_BASE_URL}${selectedFile}`}
                            alt="Selected File"
                            style={{ width: "120px" }}
                          />
                        </span>
                        <span
                          className="delete-file"
                          onClick={handleDeleteFile}
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className={`fas fa-times-circle ${styles.cross_class}`}
                          ></i>
                        </span>
                      </div>
                    ) : (
                      <div className="file file--upload">
                        <label
                          htmlFor="input-file"
                          className="upload-label label-color"
                        >
                          <div className="upload-circle">
                            <i className="fas fa-upload "></i>
                          </div>
                          {translationDataFromStore?.data?.upload_photo}
                        </label>
                        <input
                          id="input-file"
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => {
                            handleFileChange(e);
                            const fileName = e.target.files?.[0]?.name;
                            const filePath = `/files/${fileName}`;
                            setFieldValue("logo", filePath); // Set the file path as value
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2of3UploadPhoto;
