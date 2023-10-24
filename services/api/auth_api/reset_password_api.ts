import { CONSTANTS } from "@/services/config/api-config";
import axios from "axios";


const ResetPasswordAPI =async (email?:any ,new_password?:any, token?:any) => {

    let response: any;
    const version = CONSTANTS.VERSION;
    const method = "reset_password";
    const entity = "registration";

    const params = `?version=${version}&method=${method}&entity=${entity}`;
    const config = {
        headers: {
            Accept: "application/json",
            // Authorization: token,
        },
        timeout: 5000,
    };
    await axios
        .post(
            `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}&email=${email}&new_password=${new_password}`,undefined,config)
        .then((res) => {
            response = res?.data?.message?.msg;
            console.log(response, "pass reset response in api");
        })
        .catch((err) => {
            console.log(err, "response in api");
        });
    return response;
}

export default ResetPasswordAPI;
