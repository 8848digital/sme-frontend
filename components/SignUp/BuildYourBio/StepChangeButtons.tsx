import React from "react";
import styles from "../../../styles/bio.module.css";

const StepChangeButtons: any = ({
  handleNext,
  handlePrevious,
  translationDataFromStore,
}: any) => {
  return (
    <div className="d-flex flex-wrap justify-content-center ">
      <div className="mx-2">
        <button
          className={`${styles.step_change_button} bg-white`}
          onClick={handlePrevious}
        >
          {translationDataFromStore?.data?.previous}
        </button>
      </div>
      <div className="mx-2">
        <button
          className={` ${styles.step_change_button} bg_blue`}
          style={{ color: "white" }}
          onClick={handleNext}
        >
          {translationDataFromStore?.data?.next}
        </button>
      </div>
    </div>
  );
};

export default StepChangeButtons;
