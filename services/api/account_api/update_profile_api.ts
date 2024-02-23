import { CONSTANTS } from "@/services/config/api-config";
import axios from "axios";

const UpdateProfileAPI = async (token?: any, data?: any) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    };

    const response = await axios.put(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}`,
      data,
      { ...config, timeout: 5000 }
    );

    if (response.status === 200) {
      return response.data.message.data; // Return the updated profile data
    } else {
      throw new Error("Failed to update profile"); // Throw an error if the update operation fails
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error; // Re-throw the error to be caught by the calling function
  }
};

export default UpdateProfileAPI;
