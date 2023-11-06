import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/root-reducer";
import LanguageApi from "@/services/api/buildYourBio_api/language_api";


// Define an initial state for your slice
const initialState: {
    data: any | null;
    loading: boolean;
    error:  any;
} = {
    data: [],
    loading: false,
    error:null,
};

// Create an asynchronous thunk for fetching the technical skills
export const fetchLanguage = createAsyncThunk(
    "language/fetchLanguage",
    async () => {
        try {
            const response = await LanguageApi();
            // console.log(response)
            return response;
        } catch (error) {
            throw error;
        }
    }
);

// Create a slice for the technical skills
const LanguageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLanguage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLanguage.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                // console.log('language is in slice', action.payload);
                state.error = null;
            })
            .addCase(fetchLanguage.rejected, (state, action) => {
                state.loading = true;
                state.data = [];
                state.error =  action.error  || "An error occurred.";
            });
    },
});

export const our_language = (state: RootState) => state.language;
// Export the reducer
export default LanguageSlice.reducer;
