import { combineReducers } from "@reduxjs/toolkit";
import formslice from "./slices/form_slice";
import bioSlice from "./slices/build_bio_slice";
import authSliceScreen from "@/store/slices/auth_slice/login_slice"
import SignUpUserAccessToken from "@/store/slices/auth_slice/signup_user_access_token_slice"
import profileSlice from "@/store/slices/profile_slice/profile_slice"
import TechnicalSlice from "@/store/slices/buildYourBio_slice/technical_skill_slice"
import LanguageSlice from "@/store/slices/buildYourBio_slice/language_slice"
import jobRequestSlice from "@/store/slices/job_request_slice/job_request_slice"
import contractSlice from "@/store/slices/contract_slice/get_contract_slice"
const appReducer = combineReducers({
  authSliceScreen: authSliceScreen,
  form: formslice,
  bio: bioSlice,
  SignUpUserAccessToken: SignUpUserAccessToken,
  profile: profileSlice,
  technicalSkill: TechnicalSlice,
  language: LanguageSlice,
  jobRequest:jobRequestSlice,
  contractList:contractSlice
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
