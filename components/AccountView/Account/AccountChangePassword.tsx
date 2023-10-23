import styles from "@/styles/account.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

const AccountChangePassword = () => {
  const [user, setUser] = useState<any>({});
  const router = useRouter();

  const inputHandle = (e: any) => {
    // TO STORE DATA IN STATE
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandle = () => {
    console.log(user);
    setUser({});
    // NAVIGATE TO ACCOUNT AFTER RESET PASSWORD
    // router.push("/account");
  };
  return (
    <div className="container">
      <div className={`card row ${styles.account_minwrapper}`}>
        <div className="mb-4">
          <h1 className={`${styles.header_text}`}>Change Password</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-9">
            <div className="my-3">
              <input
                className="form-control w-100 me-2 "
                type="text"
                placeholder="Old Password"
                name="old_password"
                onChange={inputHandle}
              />
            </div>
            <div className="my-3">
              <input
                className="form-control w-100 me-2 "
                type="text"
                placeholder="New Password"
                name="new_password"
                onChange={inputHandle}
              />
            </div>
            <div className="my-3">
              <input
                className="form-control w-100 me-2 "
                type="text"
                placeholder="Confirm Password"
                name="confirm_password"
                onChange={inputHandle}
              />
            </div>
            <div className="mt-4 d-flex justify-content-around">
              <button onClick={submitHandle} className="btn btn-later">
                Back
              </button>
              <button onClick={submitHandle} className="btn btn-later">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountChangePassword;
