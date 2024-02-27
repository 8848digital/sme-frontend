import Logo from "@/components/Logo";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/wizard.module.css";
import { useSelector } from "react-redux";

const PreferencesInfo = ({
  preference,
  priceBasis,
  preferenceLoading,
  priceBasisLoading,
  formData,
  onFormDataChange,
  setInternalStep,
  internalStep,
  loading,
  educationLevel
}: any) => {
  const handleRatesChange = (event: any) => {
    const rates = event.target.value;
    console.log("form rate", rates);
    onFormDataChange("hourly_rates", rates);
  };
  const handleSelectPriceBasis = (event: any) => {
    const rates = event.target.value;
    console.log("form rate", rates);
    onFormDataChange("price_basis", rates);
  };
  const handleAvailabilityChange = (event: any) => {
    const availability = event.target.value;
    onFormDataChange("preferences", availability);
  };
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <div>
      <div
        className={` ${styles.common_wizard_wrapper}`}
      >
        <div className="row">
          <div className="col-12">
            <div className="">
              <Logo />
            </div>
            <div className="row">
              <div className={styles.wizard_content}>
              <div className="col-12">
                <div className="mt-5">
                  <h1 className="fs-20"> 
                  {translationDataFromStore?.data?.select_availability}</h1>
                  {preference &&
                    preference.length > 0 &&
                    preference.map((data: any, index: number) => (
                      <div className={`radio-item  ${formData.preferences === data?.name ? styles.radio_border : styles.radio_btn_border} `} key={index}>
                        <input
                          type="radio"
                          id={`availability_${index}`}
                          name="availability"
                          value={data?.name}
                          checked={formData.preferences === data?.name}
                          onChange={handleAvailabilityChange}
                        />
                        <label className="ps-2" htmlFor={`availability_${index}`}>
                          {data?.name} {data?.label && <span>&#40;{data?.label}&#41;</span>}
                        </label>
                      </div>
                    ))}
                </div>

                <div className="mt-5">
                <h1 style={{ fontSize: '20px' }}>                <h1 style={{ fontSize: '20px' }}>{translationDataFromStore?.data?.select_rates_preferences}</h1>
</h1>
                  {priceBasis &&
                    priceBasis.length > 0 &&
                    priceBasis.map((data: any, index: number) => (
                      <div className={`radio-item  ${formData.price_basis === data?.name ? styles.radio_border : styles.radio_btn_border} `} key={index}>
                        <input
                          type="radio"
                          id={`price_basis_${index}`}
                          name="price_basis"
                          value={data?.name}
                          checked={formData.price_basis === data?.name}
                          onChange={handleSelectPriceBasis}
                        />
                        <label className="ps-2" htmlFor={`price_basis_${index}`}>
                          {data?.name} {data?.label && <span>&#40;{data?.label}&#41;</span>}
                        </label>
                      </div>
                    ))}
                </div>
                <div className="mt-5">
                  <label className="grey" htmlFor="rates">{translationDataFromStore?.data?.enter_rates_preferences}</label>
                  <input
                    className="form-control w-100  input-filed-height"
                    type="text"
                    placeholder={
                      translationDataFromStore?.data?.signup_step7_rate_placeholder
                    }
                    value={formData.hourly_rates}
                    onChange={handleRatesChange}
                  />
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesInfo;
