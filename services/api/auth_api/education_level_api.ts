import { CONSTANTS } from "@/services/config/api-config";
import axios from "axios";

const GetEducationLevelApi = async (language?:any) => {
    let response: any;
    const version = CONSTANTS.VERSION;
    const method = "get_education_level";
    const entity = "utils";

    const params = `?version=${version}&method=${method}&entity=${entity}&language=${language}`;
    const config = {
        headers: {
            Accept: "application/json",
        },

    };

    await axios
        .get(
            `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`,
            {
                ...config,
                // timeout: 15000,
            }
        )
        .then((res: any) => {
            console.log("@our education api", res);
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
};

export default GetEducationLevelApi;
