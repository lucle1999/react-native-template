import { combineReducers } from "redux";
import createStoreWithSaga from "./rootSaga";

import { reducer as auth } from "./auth/reducer";

const reducers =  combineReducers({
  auth
});
export default () => {
  let { store } = createStoreWithSaga(
    reducers
  );
  return store;
};
