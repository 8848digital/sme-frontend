import { combineReducers } from "@reduxjs/toolkit";
import formslice from "./slices/auth_slice/form_slice";
import bioSlice from "./slices/buildYourBio_slice/build_bio_slice";
import authSliceScreen from "@/store/slices/auth_slice/login_slice"
import SignUpUserAccessToken from "@/store/slices/auth_slice/signup_user_access_token_slice"
import profileSlice from "@/store/slices/profile_slice/profile_slice"
import TechnicalSlice from "@/store/slices/buildYourBio_slice/technical_skill_slice"
import LanguageSlice from "@/store/slices/buildYourBio_slice/language_slice"
import BioSlice from "@/store/slices/buildYourBio_slice/bio_slice"
import jobRequestSlice from "@/store/slices/job_request_slice/job_request_slice"
import contractSlice from "@/store/slices/contract_slice/get_contract_slice"
import LandningSlice from "@/store/slices/general_slice/landing_page_slice"
import EducationLevelSlice from "@/store/slices/auth_slice/education_level_slice"
import HTMLLanguageSlice from "@/store/slices/general_slice/language_slice"
import translationTextSlice from "@/store/slices/general_slice/translation_text_slice"
import PriceBasisSlice from "@/store/slices/general_slice/price_basis_slice"
import PreferencesSlice from "@/store/slices/general_slice/get_preferences_slice"
import ourSerivceSlice from "@/store/slices/general_slice/our_service_slice"
import industryListSlice from "@/store/slices/general_slice/industry_list_slice"
import regionListSlice from "@/store/slices/general_slice/region_list_slice"
import serviceListSlice from "@/store/slices/general_slice/service_list_slice"
import yearOfExpListSlice from "@/store/slices/general_slice/year_of_exp_list_slice"
import jobDescriptionSlice from "@/store/slices/job_request_slice/job_description_slice"
const appReducer = combineReducers({
  authSliceScreen: authSliceScreen,
  form: formslice,
  bio: bioSlice,
  SignUpUserAccessToken: SignUpUserAccessToken,
  profile: profileSlice,
  technicalSkill: TechnicalSlice,
  language: LanguageSlice,
  getbio: BioSlice,
  jobRequest:jobRequestSlice,
  contractList:contractSlice,
  landingPage:LandningSlice,
  educationLevel:EducationLevelSlice,
  htmlLanguage:HTMLLanguageSlice,
  translationText:translationTextSlice,
  priceBasis:PriceBasisSlice,
  preferences:PreferencesSlice,
  ourService:ourSerivceSlice,
  industryList:industryListSlice,
  regionList:regionListSlice,
  serviceList:serviceListSlice,
  yearOfExpList:yearOfExpListSlice,
  jobDescription:jobDescriptionSlice
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
