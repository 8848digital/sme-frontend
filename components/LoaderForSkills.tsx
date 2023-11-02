import React from 'react'
import { HashLoader } from "react-spinners";

const LoaderForSkills = () => {
  return (
    <>
   <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // height: "500px",
            // margin:"150px 0"
          }}
        >
          <HashLoader color="#00578A" />
        </div>
        
    </>
  )
}

export default LoaderForSkills;