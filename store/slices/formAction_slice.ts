// formActions.ts
import { Dispatch } from 'redux';


// yourFormDataTypes.ts
export interface YourFormDataInterface {
    email: string;
    verificationCode: any[];
    firstName: string;
    lastName: string;
    phoneNumber: string;
    // Add other fields as needed
}

// Define action types
export const STORE_FORM_DATA = 'STORE_FORM_DATA';
export const STORE_FORM_DATA_SUCCESS = 'STORE_FORM_DATA_SUCCESS';
export const STORE_FORM_DATA_ERROR = 'STORE_FORM_DATA_ERROR';

// Define the action creator function
export const storeFormDataAction = (formData: YourFormDataInterface) => {
    console.log('form data',formData)
    return async (dispatch: Dispatch) => {
        try {
            // Simulate an API call (you can replace this with your actual API call)
            // For example, using axios or fetch:
            // await axios.post('/api/your-endpoint', formData);

            // Dispatch a success action if the API call was successful
            dispatch({
                type: STORE_FORM_DATA_SUCCESS,
            });
        } catch (error) {
            // Dispatch an error action if the API call fails
            dispatch({
                type: STORE_FORM_DATA_ERROR,
                payload: '', // You can pass additional error details if needed
            });
        }
    };
};
