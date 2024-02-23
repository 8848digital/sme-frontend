import React from "react";
import styles from "@/styles/bio.module.css";

const AddButton: any = ({ translationDataFromStore, onClick }: any) => {
  return (
    <div className="mt-3">
      <button className={styles.add_button} onClick={onClick}>
        {translationDataFromStore.data?.add_row_btn}
      </button>
    </div>
  );
};

export default AddButton;
