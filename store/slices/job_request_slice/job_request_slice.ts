import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/root-reducer";
import GetJobRequestAPI from "@/services/api/job_request_api/job_request_api";



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
export const fetchJobRequest = createAsyncThunk(
  "jobRequest/fetchJobRequest",
  async (token: any) => {
    try {
      const response = await GetJobRequestAPI(token);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Create a slice for the profile data
const jobRequestSlice = createSlice({
  name: "jobRequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log('job request data in slice', state.data);
        state.error = null;
      })
      .addCase(fetchJobRequest.rejected, (state, action) => {
        state.loading = true;
        state.data = null;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export const job_request_data_from_Store = (state: RootState) => state.jobRequest;
// Export the reducer
export default jobRequestSlice.reducer;
