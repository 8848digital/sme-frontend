import axios from "axios";
import { CONSTANTS } from "@/services/config/api-config";

const GetBioAPI = async (token?: any) => {
    let response: any
    const version = CONSTANTS.VERSION
    const method = "get_bio"
    const entity = "profile"

    const params = `?version=${version}&method=${method}&entity=${entity}`
    const config = {
        headers: {
            Accept: "application/json",
            Authorization: token
        }
        
    }

    await axios.
        get(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}`, {
            ...config,
            // timeout: 15000,
        })
        .then((res) => {
            console.log(res.data)
            response = res?.data?.message?.data
        })
        .catch((err) => {
            console.log(err, "response in api");
        })
    return response
}
export default GetBioAPI;