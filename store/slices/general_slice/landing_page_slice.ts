import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/root-reducer";
import GetContractAPI from "@/services/api/contract_api/get_contract_api";
import LandingPageApi from "@/services/api/general_api/landingPage_api";

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
export const fetchLandingPage = createAsyncThunk(
    "landingPage/fetchLandingPage",
    async ({language_abbr}:any) => {
        try {
              const response = await LandingPageApi(language_abbr)
              return response;
        } catch (error) {
            throw error;
        }
    }
);

// Create a slice for the landing Page
const landingSlice = createSlice({
    name: "landingPage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLandingPage.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchLandingPage.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                console.log('Landing data in slice', state.data);
                state.error = "";
            })
            .addCase(fetchLandingPage.rejected, (state, action) => {
                state.loading = true;
                state.data = [];
                state.error = action.error.message || "An error occurred.";
            });
    },
});

export const landing_data_from_Store = (state: RootState) => state.landingPage;
// Export the reducer
export default landingSlice.reducer;
