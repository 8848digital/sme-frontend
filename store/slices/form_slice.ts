// formSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';

// Define the initial state interface for the form data
interface FormState {
  usr: string;
  password: any;
  first_name: string;
  last_name: string;
  phone_no: string;
  upload_cv: File | null; // Add the cvFile key
  preferences:string,
  hourly_rates:any,
  academic_background:any
  professional_experience:any
}

const initialState: FormState = {
  usr: '',
  password: '',
  first_name: '',
  last_name: '',
  phone_no: '',
  upload_cv: null, // Initialize cvFile to null
  preferences:'',
  hourly_rates:'',
  academic_background:[],
  professional_experience:[],
};

// Create a form slice with reducers
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
    resetFormData: (state) => {
      return { ...initialState }; // Reset the state to its initial values
    },  
  },
});

export const form_details_from_store = (state: RootState) =>
  state.form;
// Export the action creator

export const { setFormData , resetFormData } = formSlice.actions;

// Export the reducer
export default formSlice.reducer;
