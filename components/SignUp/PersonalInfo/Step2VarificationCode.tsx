import Logo from "@/components/Logo";
import { translation_text_from_Store } from "@/store/slices/general_slice/translation_text_slice";
import styles from "@/styles/wizard.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import Material-UI icons
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

interface Step2Props {
  formData: any;
  onFormDataChange: (field: string, value: any) => void;
}

const Step2VarificationCode = ({ formData, onFormDataChange , setInternalStep,
  internalStep,}: any) => {
  const [userPassword, setUserPassword] = useState<any>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const userPwd = e.target.value;
    setUserPassword(userPwd);
    onFormDataChange("password", userPwd);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const translationDataFromStore = useSelector(translation_text_from_Store);

  return (
    <div >
      <div
        className={`${styles.common_wizard_wrapper}`}
     
      >
        <div className="row">
          <div className="col-12">
          <div className="">
              <Logo/>
              </div>
            <div className="mt-5">
              <h1>
                {/* {translationDataFromStore?.data?.step}  */}
                {/* 2{" "}
                {translationDataFromStore?.data?.of} 7 */}
              </h1>
              {/* <h2>{translationDataFromStore?.data?.signup_personal}</h2> */}

             
              <div>
              <h1 style={{fontSize:'20px'}}>Enter Your Password</h1>
                <div className="form-group mt-4">
                <label className="grey" htmlFor="email">Password</label>
                  <TextField
                    className="w-100"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e: any) => handleVerificationCodeChange(e)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    style={{ height: '44px !important' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2VarificationCode;
