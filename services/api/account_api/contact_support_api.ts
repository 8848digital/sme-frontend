import { CONSTANTS } from "@/services/config/api-config";
import axios from "axios";

const GetContactSupportAPI = async (language_abbr?: any, token?: any) => {
  let response: any;
  const version = CONSTANTS.VERSION;
  const method = "get_contact_support";
  const entity = "services";

  const params = `?version=${version}&method=${method}&entity=${entity}&language=${language_abbr}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  };
  await axios
    .get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
      ...config,
      timeout: 15000,
    })
    .then((res) => {
      response = res?.data?.message;
      console.log(response, "profile response in api");
    })
    .catch((err) => {
      console.log(err, "response in api");
    });
  return response;
};

export default GetContactSupportAPI;
