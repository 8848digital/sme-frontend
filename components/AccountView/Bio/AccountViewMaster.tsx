import React from "react";
import AccountSidebar from "../AccountSidebar";
import AccountBio from "./AccountBio";

const AccountViewMaster = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-2">
            <AccountSidebar />
          </div>
          <div className="col-10">
            <AccountBio />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountViewMaster;
