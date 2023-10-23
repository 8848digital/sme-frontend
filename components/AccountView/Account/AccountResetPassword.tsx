import React from "react";
import styles from "@/styles/account.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
const AccountResetPassword = () => {
  const [user, setUser] = useState({});
  const router = useRouter();

  const inputHandle = (e: any) => {
    // TO STORE DATA IN STATE
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandle = () => {
    console.log(user);
    // NAVIGATE TO ACCOUNT AFTER RESET PASSWORD
    // router.push("/account");
  };
  return (
    <div className="container">
      <div className={`card row ${styles.account_minwrapper}`}>
        <div className=" my-3">
          <h1 className={`${styles.header_text}`}>Reset Password</h1>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="col-8">
            <div className="my-3">
              <input
                className="form-control w-100 me-2 "
                type="text"
                placeholder="Enter Email"
                name="name"
                onChange={inputHandle}
              />
            </div>
            <div className="my-3">
              <input
                className="form-control w-100 me-2 "
                type="text"
                placeholder="New Password"
                name="password"
                onChange={inputHandle}
              />
            </div>
            <div className="my-3">
              <input
                className="form-control w-100 me-2 "
                type="text"
                placeholder="Confirm Password "
                name="confirm-password"
                onChange={inputHandle}
              />
            </div>
            <div className="my-3 text-center">
              <button onClick={submitHandle} className="btn btn-signup">
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountResetPassword;
