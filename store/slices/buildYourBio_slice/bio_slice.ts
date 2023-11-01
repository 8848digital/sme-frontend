import GetBioAPI from "@/services/api/buildYourBio_api/get_bio_api";
import { RootState } from "@/store/root-reducer";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
    data: any | null
    loading: boolean;
    error: string | null
} = {
    data: [],
    loading: false,
    error: null
}

export const fetchBio = createAsyncThunk(
    "fetch/fetchBio",
    async ({token}: any) => {
        try {
            const response = await GetBioAPI(token)
            return response
        } catch (error) {
            throw error
        }

    }
)

const BioSlice = createSlice({
    name: "bio",
    initialState,
    reducers: {
        clearBioData: (state) => {
            state.data = [];
            state.loading = false;
            state.error = 'Bio data Cleared';
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBio.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchBio.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchBio.rejected, (state, action) => {
                state.loading = true;
                state.data = [];
                state.error = action.error.message || "An error occured";
            })
    }
})

export const bio_data_store = (state: RootState)  => state.getbio
export const { clearBioData } = BioSlice.actions;
export default BioSlice.reducer;