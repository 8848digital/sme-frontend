import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/root-reducer";
import GetContractAPI from "@/services/api/contract_api/get_contract_api";
import LandingPageApi from "@/services/api/general_api/landingPage_api";
import OurServicesApi from "@/services/api/general_api/our_services_api";

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
export const fetchOurService = createAsyncThunk(
    "ourService/fetchOurService",
    async ({language_abbr}:any) => {
        try {
              const response = await OurServicesApi(language_abbr)
              return response;
        } catch (error) {
            throw error;
        }
    }
);

// Create a slice for the landing Page
const ourSerivceSlice = createSlice({
    name: "ourService",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOurService.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchOurService.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                console.log('our services data in slice', state.data);
                state.error = "";
            })
            .addCase(fetchOurService.rejected, (state, action) => {
                state.loading = true;
                state.data = [];
                state.error = action.error.message || "An error occurred.";
            });
    },
});

export const our_service_data_from_Store = (state: RootState) => state.ourService;
// Export the reducer
export default ourSerivceSlice.reducer;
