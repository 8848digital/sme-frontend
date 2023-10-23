import React from "react";

const JobApprove = ({ details, onclick }: any) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center overflow-hidden">
          <img src={details.pdf} style={{width:"100%"}}  alt="pdf" />
        </div>
        <div className="col-12 my-3 text-center">
          <button
            className="btn btn-later"
            onClick={() => onclick(details, "thank")}
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobApprove;
