import React from 'react'
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
            margin:"150px 0"
          }}
        >
          <HashLoader color="white" />
        </div>
        
    </>
  )
}

export default Loaders