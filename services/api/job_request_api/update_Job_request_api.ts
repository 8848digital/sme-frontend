import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';


const UpdateJobRequestAPI = async (token: any, supplier: any, project_name: any, status: any,) => {
    let response: any;
    const version = CONSTANTS.VERSION;
    const method = "update_rfq_status";
    const entity = "job_request";
    // const params = `?version=${version}&method=${method}&entity=${entity}&supplier=${supplier}&status=${status}&project_name=${project_id}`
    const config = {
        headers: {
            Accept: "application/json",
            Authorization: token,
        },

    };

    const requestBody = {
        version,
        method,
        entity,
        supplier,
        project_name:project_name,
        status
    };

    await axios
        .put(
            `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}`, requestBody, { ...config, timeout: 5000 }
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

}

export default UpdateJobRequestAPI
