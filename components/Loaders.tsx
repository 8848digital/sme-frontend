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
            height: "500px"
            
          }}
        >
          <HashLoader color="#00578A" />
        </div>
        
    </>
  )
}

export default Loaders