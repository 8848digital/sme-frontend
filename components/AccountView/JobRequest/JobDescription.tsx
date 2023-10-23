import React from "react";

const JobDescription = ({ details, onclick }: any) => {
  console.log(onclick);
  return (
    <div className="container">
      <div className="job-desc-wrapper border p-3 rounded">
        <div className="row align-items-center p-2">
          <div className="col-4">
            <p className="border-end">Project Name </p>
          </div>
          <div className="col-8">
            <h4>{details.project}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-4">
            <p className="border-end">Client Name </p>
          </div>
          <div className="col-8">
            <h4>{details.client}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-4">
            <p className="border-end">Duration</p>
          </div>
          <div className="col-8">
            <h4>{details.duration}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-4">
            <p className="border-end">Total Payment</p>
          </div>
          <div className="col-8">
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
