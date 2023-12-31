import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/account.module.css";
import { useSelector } from "react-redux";

const AccounDeletePage = () => {
  const translationDataFromStore = useSelector(translation_text_from_Store);
  return (
    <div className="container">
      <div className={`card  row ${styles.account_wrapper} `}>
        <div className="mb-4">
          <h1 className={`${styles.header_text}`}>
            {translationDataFromStore?.data?.delete_account}
          </h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-10 text-center">
            <div>
              <h1>{translationDataFromStore?.data?.delete_account_header}</h1>
              <p>
                {translationDataFromStore?.data?.delete_account_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccounDeletePage;
