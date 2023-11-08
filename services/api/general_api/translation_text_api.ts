import { CONSTANTS } from "@/services/config/api-config";
import axios from "axios";


const StaticTranslationTextApi = async (language?:any) => {

    let response: any;
    const version = CONSTANTS.VERSION;
    const method = "get_translation_text";
    const entity = "utils";

    const params = `?version=${version}&method=${method}&entity=${entity}&language=${language}`;
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
            console.log(response, "Translation Text Api response");
        })
        .catch((err) => {
            console.log(err, "response in api");
        });
    return response;
}

export default StaticTranslationTextApi;
