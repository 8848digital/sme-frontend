import { CONSTANTS } from "@/services/config/api-config";
import axios from "axios";


const ChangePasswordAPI =async (old_password?:any ,new_password?:any, token?:any) => {

    let response: any;
    const version = CONSTANTS.VERSION;
    const method = "change_password";
    const entity = "registration";

    const params = `?version=${version}&method=${method}&entity=${entity}`;
    const config = {
        headers: {
            Accept: "application/json",
            Authorization: token,
        },
        timeout: 5000,
    };
    await axios
        .post(
            `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}&old_password=${old_password}&new_password=${new_password}`,undefined,config)
        .then((res) => {
            response = res?.data?.message?.msg;
            console.log(response, "pass change response in api");
        })
        .catch((err) => {
            console.log(err, "response in api");
        });
    return response;
}

export default ChangePasswordAPI;
