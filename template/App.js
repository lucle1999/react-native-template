import MyStack from "navigation";
import React from "react";
import { Provider } from "react-redux";
import createStore from "./src/store";
import {
  setJSExceptionHandler,
  setNativeExceptionHandler
} from "react-native-exception-handler";
import { Alert } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, ModalService } from "@ui-kitten/components";

const store = createStore();

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert(
      "Có lỗi xảy ra",
      `
        Error: ${isFatal ? "Fatal:" : ""} ${e.name} ${e.message}
        Chúng tôi đã báo lỗi này cho đội ngũ phát triển! Vui lòng đóng ứng dụng và mở lại!
        `,
      [
        {
          text: "Đóng",
          onPress: () => {}
        }
      ]
    );
  } else {
    console.log(e);
  }
};

const nativeErrorHandler = (errorString) => {
  console.log(errorString);
};

setJSExceptionHandler(errorHandler, true);
setNativeExceptionHandler(nativeErrorHandler);

ModalService.setShouldUseTopInsets = true;

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <MyStack />
      </Provider>
    </ApplicationProvider>
  );
}
