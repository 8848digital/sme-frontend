import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/wizard.module.css";
import { useSelector } from "react-redux";

const Step3of3SelectAvailability = ({
  formData,
  onFormDataChange,
  preference,
  preferenceLoading,
}: any) => {
  const handleAvailabilityChange = (event: any) => {
    const availability = event.target.value;
    onFormDataChange("preferences", availability);
  };
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <div className="container">
      <div
        className={`card p-4 ${styles.common_wizard_wrapper}`}
        style={{ maxWidth: "800px", height: "300px" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="text-center mt-3">
              <h1>
                {/* {translationDataFromStore?.data?.step}  */}
                {/* 6{" "}
                {translationDataFromStore?.data?.of} 7 */}
              </h1>
              <h2>{translationDataFromStore?.data?.signup_step6_preference}</h2>
            </div>
            <form>
              <div className="mb-3 d-flex flex-column justify-content-center align-items-center mt-5">
                <label htmlFor="availability" className="form-label mt-2 pe-2">
                  {translationDataFromStore?.data?.signup_step6_availability}
                </label>
                <select
                  id="availability"
                  name="availability"
                  className="form-select w-25"
                  value={formData.preferences}
                  onChange={handleAvailabilityChange}
                >
                  <option value="Select">
                    {translationDataFromStore?.data?.select}
                  </option>
                  {preference &&
                    preference.length > 0 &&
                    preference.map((data: any, index: number) => {
                      return (
                        <>
                          <option value={data?.name}>
                            {data?.name}{" "}
                            {data?.label && (
                              <span>&#40;{data?.label}&#41;</span>
                            )}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3of3SelectAvailability;
