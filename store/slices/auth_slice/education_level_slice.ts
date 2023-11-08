import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/root-reducer";
import LanguageApi from "@/services/api/buildYourBio_api/language_api";
import GetEducationLevelApi from "@/services/api/auth_api/education_level_api";


// Define an initial state for your slice
const initialState: {
    data: any | null;
    loading: boolean;
    error: string | null;
} = {
    data: [],
    loading: false,
    error: "",
};

// Create an asynchronous thunk for fetching the technical skills
export const fetchEducationLevel = createAsyncThunk(
    "educationLevel/fetchEducationLevel",
    async ({language_abbr}:any) => {
        try {
            const response = await GetEducationLevelApi(language_abbr);
            // console.log(response)
            return response;
        } catch (error) {
            throw error;
        }
    }
);

// Create a slice for the technical skills
const EducationLevelSlice = createSlice({
    name: "educationLevel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEducationLevel.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchEducationLevel.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                // console.log('language is in slice', action.payload);
                state.error = "";
            })
            .addCase(fetchEducationLevel.rejected, (state, action) => {
                state.loading = true;
                state.data = [];
                state.error = "An error occurred.";
            });
    },
});

export const eudcation_level_from_store = (state: RootState) => state.educationLevel;
// Export the reducer
export default EducationLevelSlice.reducer;
