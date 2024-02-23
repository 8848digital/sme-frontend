import React from "react";
import styles from "@/styles/bio.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
const CommonInputField: any = ({
  placeholder,
  onChange,
  deleteButton,
  name,
  index,
  value,
}: any) => {
  return (
    <div className="position-relative mt-3">
      <input
        type="text"
        className={styles.common_input_field}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => onChange(index, name, e.target.value)}
      />
      <div onClick={() => deleteButton(index)}>
        <DeleteIcon className={styles.delete_icon} />
      </div>
    </div>
  );
};

export default CommonInputField;
