import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/root-reducer";
import TechnicalSkillAPI from "@/services/api/buildYourBio_api/technical_skill_api";
import GetPriceBasisAPI from "@/services/api/general_api/get_price_basis_api";


// Define an initial state for your slice
const initialState: {
    data: any | null;
    loading: boolean;
    error:  any;
} = {
    data: [],
    loading: false,
    error: null,
};

// Create an asynchronous thunk for fetching the technical skills
export const fetchPriceBasis = createAsyncThunk(
    "priceBasis/fetchPriceBasis",
    async ({language_abbr}:any) => {
        try {
            const response = await GetPriceBasisAPI(language_abbr);
            // console.log(response)
            return response;
        } catch (error) {
            throw error;
        }
    }
);

// Create a slice for the technical skills
const PriceBasisSlice = createSlice({
    name: "priceBasis",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPriceBasis.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPriceBasis.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                // console.log('Technical skill is in slice', action.payload);
                state.error = null;
            })
            .addCase(fetchPriceBasis.rejected, (state, action) => {
                state.loading = true;
                state.data = null;
                state.error =  action.error  || "An error occurred.";
            });
    },
});

export const price_basis_from_store = (state: RootState) => state.priceBasis;
// Export the reducer
export default PriceBasisSlice.reducer;
