import { CONSTANTS } from "@/services/config/api-config";
import axios from "axios";

const DeleteAccountAPI = async (token?: any, email?: string) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    };

    const params = {
      version: "v1",
      method: "disable_account",
      entity: "registration",
      email: email,
    };

    const response = await axios.delete(
      `${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}`,
      { ...config, params, timeout: 5000 }
    );

    if (response.status === 200) {
      return response.data.message.data; // Return the response data if successful
    } else {
      throw new Error("Failed to delete account"); // Throw an error if the delete operation fails
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error; // Re-throw the error to be caught by the calling function
  }
};

export default DeleteAccountAPI;
