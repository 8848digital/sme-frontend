import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/root-reducer";
import TechnicalSkillAPI from "@/services/api/buildYourBio_api/technical_skill_api";
import GetPriceBasisAPI from "@/services/api/general_api/get_price_basis_api";
import GetIndustryListAPI from "@/services/api/general_api/get_industry_list_api";
import GetRegionListAPI from "@/services/api/general_api/get_region_list_api";
import GetServiceListAPI from "@/services/api/general_api/get_service_list_api";


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
export const fetchServiceList = createAsyncThunk(
    "serviceList/fetchServiceList",
    async ({language_abbr}:any) => {
        try {
            const response = await GetServiceListAPI(language_abbr);
            // console.log(response)
            return response;
        } catch (error) {
            throw error;
        }
    }
);

// Create a slice for the technical skills
const serviceListSlice = createSlice({
    name: "serviceList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServiceList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServiceList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                // console.log('Technical skill is in slice', action.payload);
                state.error = null;
            })
            .addCase(fetchServiceList.rejected, (state, action) => {
                state.loading = true;
                state.data = null;
                state.error =  action.error  || "An error occurred.";
            });
    },
});

export const service_list_from_store = (state: RootState) => state.serviceList;
// Export the reducer
export default serviceListSlice.reducer;
