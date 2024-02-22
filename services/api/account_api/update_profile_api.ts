import { CONSTANTS } from "@/services/config/api-config";
import axios from "axios";

const UpdateProfileAPI = async (token?: any, values?: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "update_profile";
  const entity = "profile";
  // const params = `?version=${version}&method=${method}&entity=${entity}&supplier=${supplier}&status=${status}&project_name=${project_id}`
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  };

  const requestBody = {
    version,
    method,
    entity,
    email: values.email,
    first_name: values.firstName,
    last_name: values.lastName,
    phone_no: values.phoneNumber,
  };

  await axios
    .put(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}`,
      requestBody,
      { ...config, timeout: 5000 }
    )
    .then((res) => {
      console.log(res, "rrrr");
      response = res?.data?.message;
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

export default UpdateProfileAPI;
