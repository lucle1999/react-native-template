import { createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";
import { AuthTypes } from "./actions";

export const INITIAL_STATE = Immutable({});

export const login = (state) => {
  return state;
};

export const reducer = createReducer(INITIAL_STATE, {
  [AuthTypes.LOGIN]: login
});
