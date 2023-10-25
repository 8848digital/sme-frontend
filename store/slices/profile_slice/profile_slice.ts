import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/root-reducer";
import GetProfileAPI from "@/services/api/profile_api/profile_api";


// Define an initial state for your slice
const initialState: {
  data: any | null;
  loading: boolean;
  error: string | null;
} = {
  data: null,
  loading: false,
  error: null,
};

// Create an asynchronous thunk for fetching the profile data
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (token: any) => {
    try {
      const response = await GetProfileAPI(token);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// Create a slice for the profile data
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log('profile data in slice', state.data);
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = true;
        state.data = null;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export const profile_data_Store = (state: RootState) => state.profile;
// Export the reducer
export default profileSlice.reducer;
