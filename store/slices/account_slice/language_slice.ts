import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/root-reducer";
import LanguageApi from "@/services/api/account_api/language_api";


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
export const fetchLanguage = createAsyncThunk(
    "account/fetchLanguage",
    async () => {
        try {
            const response = await LanguageApi();
            console.log(response)
            return response;
        } catch (error) {
            throw error;
        }
    }
);

// Create a slice for the technical skills
const LanguageSlice = createSlice({
    name: "Language",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLanguage.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchLanguage.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                console.log('language is in slice', action.payload);
                state.error = "";
            })
            .addCase(fetchLanguage.rejected, (state, action) => {
                state.loading = true;
                state.data = [];
                state.error = action.error.message || "An error occurred.";
            });
    },
});

export const our_language = (state: RootState) => state.language;
// Export the reducer
export default LanguageSlice.reducer;
