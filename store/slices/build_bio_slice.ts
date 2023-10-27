// formSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';

// Define the initial state interface for the form data
interface BioFormState {
  enter_your_bio: string,
  upload_photo: File | null; // Add the cvFile key
  technical_skills: any,
  certifications: any
  language: any
}

const initialState: BioFormState = {

  enter_your_bio: "",
  upload_photo: null,
  technical_skills: [],
  language: [],
  certifications: [],
};

// Create a form slice with reducers
const bioSlice = createSlice({
  name: 'bio',
  initialState,
  reducers: {
    setBuildBioData: (state, action: PayloadAction<BioFormState>) => {
      return { ...state, ...action.payload };
    },
    setResetBuildBioData: (state) => {
      return { ...initialState }; // Reset the state to its initial values
    },
  },

});

export const form_details_from_store = (state: RootState) =>
  state.bio;
// Export the action creator

export const { setBuildBioData, setResetBuildBioData } = bioSlice.actions;

// Export the reducer
export default bioSlice.reducer;
