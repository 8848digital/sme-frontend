import { CONSTANTS } from '@/services/config/api-config';
import { SignUpUserAccessToken_from_store } from '@/store/slices/auth_slice/signup_user_access_token_slice';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BuildYourBioAPI = async (request: any, token: any) => {
    let response: any;
    // console.log(request)
    const version = CONSTANTS.VERSION;
    // const accessToken: any = useSelector(SignUpUserAccessToken_from_store); 
    // console.log(accessToken)
    const method = "build_your_bio";
    const entity = "registration";
    // const supplier = "Ascra Tech"
    // const is_verified = "1"
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
        // supplier,
        // is_verified,
        bio: request.bio,
        photo_url: request.photo_url,
        technical_skills: request.technical_skills,
        certifications: request.certifications,
        language: request.language,
    };
    // console.log(requestBody)
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

export default BuildYourBioAPI
