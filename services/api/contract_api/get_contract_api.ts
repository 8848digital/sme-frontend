import { CONSTANTS } from "@/services/config/api-config";
import axios from "axios";

const GetContractAPI = async (token?: any, language?: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_contract";
  const entity = "contract";

  const params = `?version=${version}&method=${method}&entity=${entity}&language=${language}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  };
  await axios
    .get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
      ...config,
      timeout: 5000,
    })
    .then((res) => {
      response = res?.data?.message?.data;
      console.log(response, "job contract response in api");
    })
    .catch((err) => {
      console.log(err, "response in api");
    });
  return response;
};

export default GetContractAPI;
