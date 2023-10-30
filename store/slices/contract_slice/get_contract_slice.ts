import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/root-reducer";
import GetContractAPI from "@/services/api/contract_api/get_contract_api";

// Define an initial state for your slice
const initialState: {
  data: any | null;
  loading: boolean;
  error: string | null;
} = {
  data: [],
  loading: false,
  error: null,
};

// Create an asynchronous thunk for fetching the profile data
export const fetchContractList = createAsyncThunk(
  "jobRequest/fetchContractList",
  async (token: any, status:any) => {
    try {
      const response = await GetContractAPI(token);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Create a slice for the profile data
const contractSlice = createSlice({
  name: "jobRequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContractList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContractList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log('job contract data in slice', state.data);
        state.error = null;
      })
      .addCase(fetchContractList.rejected, (state, action) => {
        state.loading = true;
        state.data = null;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export const contract_data_from_Store = (state: RootState) => state.contractList;
// Export the reducer
export default contractSlice.reducer;
