// formSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';

// Define the initial state interface for the form data
interface FormState {
  enter_your_bio:string,
  upload_photo: File | null; // Add the cvFile key
  technical_skills:any,
  certifications:any
  language:any
}

const initialState: FormState = {

  enter_your_bio:"",
  upload_photo:null,
  technical_skills:[],
  certifications:[],
  language:[],
};

// Create a form slice with reducers
const bioSlice = createSlice({
  name: 'bio',
  initialState,
  reducers: {
    setBuildBioData: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const form_details_from_store = (state: RootState) =>
  state.bio;
// Export the action creator

export const { setBuildBioData } = bioSlice.actions;

// Export the reducer
export default bioSlice.reducer;
