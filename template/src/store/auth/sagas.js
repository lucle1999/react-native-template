import { AuthTypes } from "./actions";
import { call, put, takeLatest } from "redux-saga/effects";

export function* login(action) {
  try {
  } catch (err) {}
}

const authSagas = [takeLatest(AuthTypes.LOGIN, login)];
export default authSagas;
