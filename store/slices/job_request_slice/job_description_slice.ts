import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/root-reducer";
import GetJobRequestAPI from "@/services/api/job_request_api/job_request_api";
import GetJobDescriptionAPI from "@/services/api/job_request_api/job_description_api";



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
export const fetchJobDescription = createAsyncThunk(
  "jobDescription/fetchJobDescription",
  async ({token, name}:any) => {
    console.log('query id',name)
    try {
      const response = await GetJobDescriptionAPI(token , name);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Create a slice for the profile data
const jobDescriptionSlice = createSlice({
  name: "jobDescription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobDescription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobDescription.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log('job request data in slice', state.data);
        state.error = null;
      })
      .addCase(fetchJobDescription.rejected, (state, action) => {
        state.loading = true;
        state.data = null;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export const job_description_data_from_Store = (state: RootState) => state.jobDescription;
// Export the reducer
export default jobDescriptionSlice.reducer;
