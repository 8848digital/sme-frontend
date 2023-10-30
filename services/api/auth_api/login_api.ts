import { CONSTANTS } from "@/services/config/api-config";
import axios from "axios";


const getAccessTokenApi = async (usr:any , password:any) => {
    let response:any;
    const config = {
        headers: {
          Accept: 'application/json'
        },
        withCredentials:true
      };
      const encodedPassword = encodeURIComponent(password);

    await axios
    .post(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=v1&method=get_access_token&entity=access_token&usr=${usr}&password=${encodedPassword}`,undefined,{
      ...config,
      timeout: 5000,
    })
    .then((res) => {
      response = res?.data?.message;
      console.log("login api res",response)
    })
    .catch((err) => {
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

export default getAccessTokenApi;