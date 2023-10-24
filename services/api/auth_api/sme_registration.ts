import { CONSTANTS } from '@/services/config/api-config';
import axios from 'axios';
import React from 'react'

const SmeRegistrationApi = async (request:any) => {
    let response:any;
    const version = CONSTANTS.VERSION;
    const method = "candidate_signup";
    const entity = "registration";
    const encodedPassword = encodeURIComponent(request.password);
    const config = {
        headers: {
            Accept: "application/json",
          },
      };

      const requestBody = {
        version,
        method,
        entity,
        usr: request.usr,
        password:encodedPassword,
        first_name:request.first_name,
        last_name:request.last_name,
        phone_no:request.phone_no,
        upload_cv:request.upload_cv,
        preferences:request.preferences,
        hourly_rates:request.hourly_rates,
        academic_background:request.academic_background,
        professional_experience:request.professional_experience
      };

      await axios
      .post(
        `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}`,requestBody,{ ...config, timeout: 5000 }
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

export default SmeRegistrationApi
