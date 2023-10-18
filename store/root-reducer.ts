import { combineReducers } from "@reduxjs/toolkit";
import formslice from "./slices/form_slice";
const appReducer = combineReducers({
  form: formslice,
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
