import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/root-reducer";

interface LanguageState {
  languageToggle: boolean;
  language_abbr: string;
}

const initialState: LanguageState = {
  languageToggle: false,
  language_abbr: "en",
};

const languageSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    languageSliceData(state: any, action: any) {
      state.languageToggle = action.payload.languageToggle;
      state.language_abbr = action.payload.language_abbr;
    },
  },
});

export const language_selector = (state: RootState) => state.htmlLanguage;
export const { languageSliceData } = languageSlice.actions;
export default languageSlice.reducer;
