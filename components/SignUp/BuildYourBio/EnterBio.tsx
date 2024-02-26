import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/bio.module.css";
import { useSelector } from "react-redux";

const EnterBio = ({ bioData, onFormDataChange }: any) => {
  const translationDataFromStore = useSelector(translation_text_from_Store);

  const handleBioChange = (event: any) => {
    const bio = event.target.value;
    onFormDataChange("bio", bio);
  };
  return (
    <div className={styles.enter_bio_wrapper}>
      <div className=" p-4">
        <div className="col-12">
          <div className="">
            <h5>
              {translationDataFromStore?.data?.build_your_bio_step2_header}
            </h5>
            {/* <p className="m-0">
              {translationDataFromStore?.data?.ai_option_text}
            </p> */}
          </div>
          <div className="mt-3">
            <div className="mb-3">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={6}
                value={bioData?.bio}
                onChange={handleBioChange}
                style={{ resize: "none" }}
                placeholder={`${translationDataFromStore?.data?.ai_example_bio}.`}
                maxLength={500}
              ></textarea>
              <p>
                {500 - bioData?.bio?.length}{" "}
                {translationDataFromStore?.data?.characters_left}
              </p>
            </div>
          </div>
          {/* <div className="mt-4">
            <button className={styles.AI_text_button}>
              <i className="fas fa-star pe-2 sg_blue"></i>
              {translationDataFromStore?.data?.ai_button_text}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default EnterBio;
