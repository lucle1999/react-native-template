import MyStack from "navigation";
import React from "react";
import { Provider } from "react-redux";
import createStore from "./src/store";

const store = createStore();

export default function App() {
  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
  );
}
