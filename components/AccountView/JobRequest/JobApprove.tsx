import React from "react";

const JobApprove = ({ details, onclick }: any) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <img src={details.pdf} alt="pdf" />
        </div>
        <div className="col-12 text-center">
          <button
            className="btn btn-next"
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
