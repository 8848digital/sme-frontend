import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import UploadFileApi from "@/services/api/auth_api/upload_file_api";
import Logo from "@/components/Logo";
import LoaderForSkills from "@/components/LoaderForSkills";
import styles from "@/styles/wizard.module.css";
import uploadImg from "@/public/assets/upload_image.png";
import Image from "next/image";
import Link from "next/link";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
interface Step2Props {
  formData: any;
  onFormDataChange: (field: string, value: any) => void;
  setInternalStep: any;
  internalStep: number;
}

const UploadCv: React.FC<Step2Props> = ({
  formData,
  onFormDataChange,
  setInternalStep,
  internalStep,
}: Step2Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileURL, setFileURL] = useState<any>(formData.upload_cv || null);

  useEffect(() => {
    setSelectedFile(formData.upload_cv);
  }, [formData.upload_cv]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onFormDataChange("upload_cv", file);

    if (file) {
      setLoading(true);
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
        onFormDataChange("upload_cv", response.file_url);
        setFileURL(response.file_url);
      } catch (error) {
        console.error("Upload Error:", error);
      } finally {
        setLoading(false);
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

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setSelectedFile(droppedFile);
    onFormDataChange("upload_cv", droppedFile);

    if (droppedFile) {
      setLoading(true);
      uploadFile(droppedFile);
    }
  };

  return (
    <div className="container" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
      <div className={`${styles.common_wizard_wrapper}`}>
        <div className="row">
          <div className="col-12">
            <div className="">
              <Logo />
            </div>
            <div className=" mt-5">
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
                          <a href={fileURL} target="_blank" rel="noopener noreferrer">
                            {fileURL}
                          </a>
                        </span>
                        <span className="delete-file" onClick={handleDeleteFile} style={{ cursor: "pointer" }}>
                          <HighlightOffIcon className={`${styles.cross_class}`}/>
                        </span>
                      </div>
                    ) : (
                      <div className="file file--upload">
                        <label htmlFor="input-file" className="upload-label label-color d-flex" style={{ maxWidth: "360px", width: '100%', height: "126px" }}>
                          <div className="">
                            <div>
                              <Image src={uploadImg.src} alt="Logo" width={40} height={40} />
                            </div>
                            <div>
                              <h4 className="sg_blue mt-3" style={{ fontSize: '14px', fontWeight: '600', color: '#00b2d4 !important' }}>
                                <Link className="sg_blue" href='' style={{ textDecoration: 'none', color: '#00b2d4 !important' }}>{translationDataFromStore?.data?.upload_btn_label} </Link> <span className="grey">{translationDataFromStore?.data?.drag_and_drop}</span>
                              </h4>
                              <h5 className="grey mb-0" style={{ fontSize: '12px', fontWeight: '600'}}>
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
                            setFieldValue("logo", filePath);
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
