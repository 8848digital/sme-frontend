import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/root-reducer";
import TechnicalSkillAPI from "@/services/api/buildYourBio_api/technical_skill_api";


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

// Create an asynchronous thunk for fetching the technical skills
export const fetchTechnicalSkill = createAsyncThunk(
    "account/fetchTechnicalSkill",
    async () => {
        try {
            const response = await TechnicalSkillAPI();
            // console.log(response)
            return response;
        } catch (error) {
            throw error;
        }
    }
);

// Create a slice for the technical skills
const TechnicalSkillSlice = createSlice({
    name: "TechnicalSkill",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalSkill.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTechnicalSkill.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                // console.log('Technical skill is in slice', action.payload);
                state.error = null;
            })
            .addCase(fetchTechnicalSkill.rejected, (state, action) => {
                // state.loading = true;
                state.data = null;
                state.error = action.error.message || "An error occurred.";
            });
    },
});

export const TechnicalSkill = (state: RootState) => state.technicalSkill;
// Export the reducer
export default TechnicalSkillSlice.reducer;
