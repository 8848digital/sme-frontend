import { CONSTANTS } from "@/services/config/api-config";
import axios from "axios";

const getLoginThemeApi = async (language?: any) => {
  let response: any;
  const config = {
    headers: {
      Accept: "application/json",
    },
    withCredentials: true,
  };

  await axios
    .get(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}?version=v1&method=get_login_theme&entity=logintheme&language=${language}`,

      {
        ...config,
        timeout: 5000,
      }
    )
    .then((res) => {
      response = res?.data?.message;
      console.log("login api res", response);
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
};

export default getLoginThemeApi;
