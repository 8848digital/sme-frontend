// formSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';

// Define the initial state interface for the form data
interface FormState {
  email: string;
  verificationCode: string[];
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cvFile: File | null; // Add the cvFile key
  selectAvailability:string,
  rates:any
}

const initialState: FormState = {
  email: '',
  verificationCode: [],
  firstName: '',
  lastName: '',
  phoneNumber: '',
  cvFile: null, // Initialize cvFile to null
  selectAvailability:'',
  rates:''
};

// Create a form slice with reducers
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const form_details_from_store = (state: RootState) =>
  state.form;
// Export the action creator

export const { setFormData } = formSlice.actions;

// Export the reducer
export default formSlice.reducer;
