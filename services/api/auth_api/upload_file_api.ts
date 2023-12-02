import { CONSTANTS } from "@/services/config/api-config";
import axios from "axios";

const UploadFileApi = async (request: any) => {
  let response: any;

  const formData = new FormData();
  console.log("register api formData", formData);
  formData.append("file", request.file);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      // Authorization: 'token 24ae92b92e5c1c4:96d49062b55e9d8',
      Authorization: 'token 7d70b4faf9e715f:3a6206e2b47bd04',
    },
    timeout: 5000,
  };
  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}/api/method/upload_file`,
      formData,
      config
    )
    .then((res) => {
      console.log(res, "response in api");
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

export default UploadFileApi;
