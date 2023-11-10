import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/account.module.css";
import { useSelector } from "react-redux";
import rejectImg from "../../../public/assets/reject_img.jpg";
const JobRejected = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center my-4">
            <div
              className={`  row justify-content-md-center card  ${styles.account_wrapper}`}
            >
              <div className="mb-5 pt-4">
                <img src={rejectImg.src} alt="" width="100px" />
              </div>
              <h4 className="color">
                {translationDataFromStore?.data?.job_reject_description}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobRejected;
