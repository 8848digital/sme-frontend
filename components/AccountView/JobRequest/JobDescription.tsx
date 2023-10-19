import React from "react";

const JobDescription = ({ details, onclick }: any) => {
  console.log(onclick);
  return (
    <div className="container">
      <div className="job-desc-wrapper border p-3 rounded">
        <div className="row align-items-center p-3">
          <div className="col-3">
            <h3>Project Name </h3>
          </div>
          <div className="col-9">
            <h4>{details.project}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-3">
          <div className="col-3">
            <h3>Client Name </h3>
          </div>
          <div className="col-9">
            <h4>{details.client}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-3">
          <div className="col-3">
            <h3>Duration</h3>
          </div>
          <div className="col-9">
            <h4>{details.duration}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-3">
          <div className="col-3">
            <h3>Total Payment</h3>
          </div>
          <div className="col-9">
            <h4>{details.payment}</h4>
          </div>
          <hr />
        </div>
        <div className="col-12 text-center">
          <button
            className="btn btn-next "
            style={{ width: "auto" }}
            onClick={() => onclick(details, "approve")}
          >
            Read Full Contract
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
