import { CONSTANTS } from "@/services/config/api-config";
import axios from "axios";

const RegisterFetch = async (request: any) => {
  let response: any;
  const version = "v1";
  const method = "customer_signup";
  const entity = "registration";
  console.log(request, "body");
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const encodedPassword = encodeURIComponent(request.password);
console.log(" submit clicked res in Api",request);
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  //    const val= JSON.stringify(body)

  await axios
    .post(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}&usr=${request.usr}&password=${encodedPassword}&name=${request.name}&designation=${request.designation}&full_organization_name=${request.full_organization_name}&reference=${request.reference}&is_existing=${request.is_existing}&organization_abbreviation=${request.organization_abbreviation}&agree_terms_conditions=${request.agree_terms_conditions}&want_updates=${request.want_updates}&contact_email=${request.contact_email}&contact_phone=${request.contact_phone}&logo=${request.logo}`,
      undefined,
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

const RegistrationApi = (request: any) => RegisterFetch(request);

export default RegistrationApi;
