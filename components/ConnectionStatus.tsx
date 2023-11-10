import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    function networkfn() {
      if (window.navigator.onLine === false) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    }
    const network = setInterval(networkfn, 1000);
    return () => clearInterval(network);
  }, []);

  useEffect(() => {
    if (isOnline) {
      toast.error("Lost internet connection");
    }
  }, [isOnline]);

  return <></>;
};

export default ConnectionStatus;
