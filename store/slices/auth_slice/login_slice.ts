import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CONSTANTS } from '@/services/config/api-config';
import { RootState } from "../../root-reducer";
import getAccessTokenApi from '@/services/api/auth_api/login_api';
interface AuthState {
    token: any;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string;
}

const initialState: AuthState = {
    token: '',
    loading: 'idle',
    error: '',
};

export const getAccessToken: any = createAsyncThunk(
    'auth/getAccessToken',
    async ({ usr, password }: { usr: any; password: any }) => {
        try {
            console.log('login value check',usr , password)
            const AccessTokenData = await getAccessTokenApi(usr, password);
            console.log(AccessTokenData, "login thunk AccessTokenData");

            return AccessTokenData;
        } catch (err: any) {
            if (axios.isCancel(err)) {
                throw new Error('Request canceled');
            }

            if (err.code === 'ECONNABORTED') {
                throw new Error('Request timed out');
            } else if (err.code === 'ERR_BAD_REQUEST') {
                throw new Error('Bad Request');
            } else if (err.code === 'ERR_INVALID_URL') {
                throw new Error('Invalid URL');
            } else {
                throw err;
            }
        }
    }
);

const authSliceScreen = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        ClearToken(state?: any, action?: any) {
            state.token = "";
            state.error = "";
            state.loading = "idle";
        },
        updateAccessToken(state?: any, action?: any) {
            console.log("login new access token payload", action.payload);
            state.token = action?.payload;
            state.error = "";
            state.loading = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAccessToken.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getAccessToken.fulfilled, (state, action) => {
                if (action?.payload?.data?.hasOwnProperty("access_token")) {
                    state.token = action?.payload?.data?.access_token;
                    console.log("login new access token payload", state.token);
                    localStorage.setItem("LoggedIn", "true");
                    state.loading = "succeeded";
                  }
              
            })
            .addCase(getAccessToken.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message || 'An error occurred';
            });
    },
});

export const get_access_token = (state: RootState) =>
  state.authSliceScreen;
export const { ClearToken, updateAccessToken }: any =
authSliceScreen.actions;

export default authSliceScreen.reducer;
