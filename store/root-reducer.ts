import { combineReducers } from "@reduxjs/toolkit";
import formslice from "./slices/form_slice";
import bioSlice from "./slices/build_bio_slice";
import authSliceScreen from "@/store/slices/auth_slice/login_slice"
import SignUpUserAccessToken from "@/store/slices/auth_slice/signup_user_access_token_slice"
import profileSlice from "@/store/slices/profile_slice/profile_slice"

const appReducer = combineReducers({
  authSliceScreen:authSliceScreen,
  form: formslice,
  bio:bioSlice,
  SignUpUserAccessToken:SignUpUserAccessToken,
  profile:profileSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "Login/LogoutSuccess") {
    state = undefined;

    state = {} as RootState;
  }
  return appReducer(state, action);
};

export default rootReducer;
export type RootState = ReturnType<typeof appReducer>;
