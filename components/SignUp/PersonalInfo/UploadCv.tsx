import LoaderForSkills from "@/components/LoaderForSkills";
import Logo from "@/components/Logo";
import UploadFileApi from "@/services/api/auth_api/upload_file_api";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/wizard.module.css";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import uploadImg from "@/public/assets/upload_image.png"
import Image from "next/image";
import Link from "next/link";
interface Step2Props {
  formData: any;
  onFormDataChange: (field: string, value: any) => void;
  setInternalStep:any;
  internalStep:number;
}

const UploadCv: React.FC<Step2Props> = ({
  formData,
  onFormDataChange,
  setInternalStep,
  internalStep,
}: Step2Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setSelectedFile(formData.upload_cv);
  }, [formData.upload_cv]);

  const [fileURL, setFileURL] = useState<any>(formData.upload_cv || null);

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onFormDataChange("upload_cv", file);

    if (file) {
      setLoading(true);
      // Handle file upload and set file URL
      uploadFile(file);
    }
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
    onFormDataChange("upload_cv", null);
  };

  const uploadFile = async (file: File | null) => {
    if (file) {
      try {
        const response = await UploadFileApi({ file });
        console.log("Upload Response:", response.file_url);

        // Use the upload response as needed (e.g., store it in your form data)
        onFormDataChange("upload_cv", response.file_url);
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
      upload_cv: null,
    },
    onSubmit: () => {
      // Do nothing here, as we are handling file upload when the file is selected
    },
  });

  const { handleSubmit, setFieldValue } = formik;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <div className="container">
      <div
        className={`${styles.common_wizard_wrapper}`}
       
      >
        <div className="row">
          <div className="col-12">
            <div className="">
              <Logo />
            </div>
            <div className=" mt-5">
              <h1>
                {/* {translationDataFromStore?.data?.step}  */}
                {/* 4{" "}
                {translationDataFromStore?.data?.of} 7 */}
              </h1>
              {/* <h2>{translationDataFromStore?.data?.professional_experience}</h2> */}
              <h1 className="fs-20 lh-24">{translationDataFromStore?.data?.upload_cv_heading}</h1>
              <p className="grey lh-20">{translationDataFromStore?.data?.upload_cv_sub_heading}</p>

            </div>
            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="row mt-3">
                  <div className="col-md-12">
                    {loading ? (
                      <LoaderForSkills />
                    ) : selectedFile ? (
                      <div className="selected-file">
                        <span>
                          {/* Display the file URL as a link */}
                          <a
                            href={fileURL}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {fileURL}
                          </a>
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
                      <div className="file file--upload"

                      >
                        <div>

                        </div>
                        <label
                          htmlFor="input-file"
                          className="upload-label label-color d-flex"
                          style={{ maxWidth: "360px", width: '100%', height: "126px" }}
                        >
                          <div className="">
                            <div>

                              <Image
                                src={uploadImg.src}
                                alt="Logo"
                                width={40}
                                height={40}
                              />
                            </div>
                            <div>
                              <h4 className="sg_blue" style={{fontSize:'14px',fontWeight:'600',color:'#00b2d4 !important'}}>
                                <Link className="sg_blue" href=''  style={{textDecoration:'none',color:'#00b2d4 !important'}}>{translationDataFromStore?.data?.upload_btn_label}</Link>
                              </h4>
                              <h5 className="grey" style={{fontSize:'12px',fontWeight:'600',lineHeight:'24px'}}>
                              {translationDataFromStore?.data?.file_supporting_text}
                                </h5>
                            </div>
                          </div>

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

export default UploadCv;

