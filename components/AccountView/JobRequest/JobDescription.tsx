import React from "react";

const JobDescription = ({ details, onclick }: any) => {
  console.log(onclick);
  return (
    <div className="container">
      <div className="job-desc-wrapper border p-3 rounded">
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">Project Name </h2>
          </div>
          <div className="col-6 text-center ">
            <h4 className="text-capitalize">{details.project}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">Client Name </h2>
          </div>
          <div className="col-6 text-center">
            <h4 className="text-capitalize">{details.client}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">Duration</h2>
          </div>
          <div className="col-6 text-center">
            <h4 className="text-capitalize">{details.duration}</h4>
          </div>
          <hr />
        </div>
        <div className="row align-items-center p-2">
          <div className="col-6">
            <h2 className="border-end">Total Payment</h2>
          </div>
          <div className="col-6 text-center">
            <h4 className="text-capitalize">{details.payment}</h4>
          </div>
          <hr />
        </div>
        <div className="col-12 text-center">
          <button
            className="btn btn-later "
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
