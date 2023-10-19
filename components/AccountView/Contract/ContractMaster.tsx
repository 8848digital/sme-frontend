import React from "react";
import AccountSidebar from "../AccountSidebar";

const ContractMaster = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-2 pl-0">
            <AccountSidebar />
          </div>
          <div className="col-10">
            <div>
                Master
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractMaster;
