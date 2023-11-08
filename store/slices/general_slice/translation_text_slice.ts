import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/root-reducer";
import StaticTranslationTextApi from "@/services/api/general_api/translation_text_api";


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

// Create an asynchronous thunk for fetching the landing Page
export const fetchStaticTranslationText = createAsyncThunk(
    "translationText/fetchStaticTranslationText",
    async ({language_abbr}:any) => {
        try {
              const response = await StaticTranslationTextApi(language_abbr)
              return response;
        } catch (error) {
            throw error;
        }
    }
);

// Create a slice for the landing Page
const translationTextSlice = createSlice({
    name: "translationText",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStaticTranslationText.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchStaticTranslationText.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                console.log('translation text data in slice', state.data);
                state.error = "";
            })
            .addCase(fetchStaticTranslationText.rejected, (state, action) => {
                state.loading = true;
                state.data = [];
                state.error = action.error.message || "An error occurred.";
            });
    },
});

export const translation_text_from_Store = (state: RootState) => state.translationText;
// Export the reducer
export default translationTextSlice.reducer;
