// formSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';

// Define the initial state interface for the form data
interface BioFormState {
  bio: string,
  photo_url: File | null; // Add the cvFile key
  technical_skills: any,
  other_technical_skills:any,
  certifications: any,
  language: any,
  other_languages:any
}

const initialState: BioFormState = {

  bio: "",
  photo_url: null,
  technical_skills: [],
  other_technical_skills:"",
  certifications: [],
  language: [],
  other_languages:"",
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
