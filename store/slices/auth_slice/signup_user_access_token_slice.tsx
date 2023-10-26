import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from '../../root-reducer';


interface SignUpUserAccessTokenState {
    data: any;
  }
  
  const initialState: SignUpUserAccessTokenState = {
    data: {}, // Provide an initial value
  };

  
  const SignUpUserAccessTokenSlice = createSlice({
    name: "SignUpUserAccessToken",
    initialState,
    reducers: {
        setSignUpUserAccessToken(state, action : PayloadAction<SignUpUserAccessTokenState>) {
        state.data = action.payload;
       const  access_token =  state.data.acess_token
        console.log('form signup access token',state.data )
        console.log('form signup access token 1',access_token)
      },
      clearSignUpUserAccessToken(state, action : PayloadAction<SignUpUserAccessTokenState>) {
        state.data  = '';
      },
    },
  });

  export const SignUpUserAccessToken_from_store = (state: RootState) =>
  state.SignUpUserAccessToken;
// Export the action creator

export const { setSignUpUserAccessToken , clearSignUpUserAccessToken } = SignUpUserAccessTokenSlice.actions;

// Export the reducer
export default SignUpUserAccessTokenSlice.reducer;
