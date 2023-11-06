import { CONSTANTS } from "@/services/config/api-config";
import axios from "axios";


const LandingPageApi = async () => {

    let response: any;
    const version = CONSTANTS.VERSION;
    const method = "get_landing_page";
    const entity = "sme_landing_page";

    const params = `?version=${version}&method=${method}&entity=${entity}`;
    const config = {
        headers: {
            Accept: "application/json",
        }

    };
    await axios
        .get(
            `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
            ...config,
            timeout: 5000,
        })
        .then((res) => {
            response = res?.data?.message?.data;
            console.log(response, "Landing Page Api response");
        })
        .catch((err) => {
            console.log(err, "response in api");
        });
    return response;
}

export default LandingPageApi;
