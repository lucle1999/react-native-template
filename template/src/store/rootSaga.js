import { all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";


import authSagas from "./auth/sagas";

function* rootSaga() {
  yield all([
    ...authSagas,
  ]);
}

export default (rootReducer) => {
  const middleware = [];
  const enhancers = [];

  const sagaMiddleware = createSagaMiddleware({
    onError: (e, einfo) => {
      // Dispatch all loading state to false here
      console.error(e, einfo)
    }
  });
  middleware.push(sagaMiddleware);
  enhancers.push(applyMiddleware(...middleware));
  const store = createStore(rootReducer, compose(...enhancers));


  let sagasManager = sagaMiddleware.run(rootSaga);

  return {
    store,
    sagasManager,
    sagaMiddleware
  };
};
