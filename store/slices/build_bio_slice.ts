// formSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';

// Define the initial state interface for the form data
interface FormState {
  image: File | null; // Add the cvFile key
  user_bio:string,
  technical_skills:any,
  languages:any
  certification_in_bio:any
}

const initialState: FormState = {
   image:  null,
  user_bio:"",
  technical_skills:"",
  languages:"",
  certification_in_bio:[]
};

// Create a form slice with reducers
const bioSlice = createSlice({
  name: 'bio',
  initialState,
  reducers: {
    setBioData: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const form_details_from_store = (state: RootState) =>
  state.bio;
// Export the action creator

export const { setBioData } = bioSlice.actions;

// Export the reducer
export default bioSlice.reducer;
