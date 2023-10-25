import { combineReducers } from "@reduxjs/toolkit";
import formslice from "./slices/form_slice";
import bioSlice from "./slices/build_bio_slice";
import authSliceScreen from "@/store/slices/auth_slice/login_slice"
import TechnicalSlice from "@/store/slices/account_slice/technical_skill_slice"
import LanguageSlice from "@/store/slices/account_slice/language_slice"
const appReducer = combineReducers({
  authSliceScreen: authSliceScreen,
  form: formslice,
  bio: bioSlice,
  technicalSkill: TechnicalSlice,
  language: LanguageSlice,
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
