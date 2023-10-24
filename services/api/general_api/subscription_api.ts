import { CONSTANTS } from "@/services/config/api-config";
import axios from "axios";

const subscriptionApi = async (usr:any) =>{
    let response: any;

    const version = CONSTANTS.VERSION;
    const method = "add_subscriber";
    const entity = "registration";
    const params = `?version=${version}&method=${method}&entity=${entity}&usr=${usr}`;
    const config = {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      };

      await axios.post(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`,undefined, {
        ...config,
        timeout: 5000,
      })
      .then((res: any) => {
        console.log('@@post subscriptionApi api',res);
        response = res?.data?.message;
    
      })
      .catch((err: any) => {
        if (err.code === "ECONNABORTED") {
          response = "Request timed out";
        } else if (err.code === "ERR_BAD_REQUEST") {
          response = "Bad Request";
        } else if (err.code === "ERR_INVALID_URL") {
          response = "Invalid URL";
        } else {
          response = err;
        }
      });
  
    return response;

}

export default subscriptionApi;
