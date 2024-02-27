import React from "react";
import { HashLoader } from "react-spinners";

const Loaders = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
          margin: "150px 0",
        }}
      >
        <HashLoader color="#00A5CD" />
      </div>
      
    </>
  );
};

export default Loaders;
