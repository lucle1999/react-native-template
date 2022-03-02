// @flow

import I18n from "react-native-i18n";

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true;

// English language is the main language for fall back:
I18n.translations = {
  en: require("./languages/en.json"),
  vi: require("./languages/vi.json")
};

let languageCode = I18n.locale.substr(0, 2);
// All other translations for the app goes to the respective language file:
switch (languageCode) {
  case "en":
    I18n.translations.uk = require("./languages/en.json");
    break;
  case "vi":
    I18n.translations.vi = require("./languages/vi.json");
    break;
}

export const changeLocale = (locale) => {
  I18n.locale = locale;
};

const translateOrFallback = (initialMsg, options) => {
    if (typeof initialMsg !== "string") {
      __DEV__ &&
        console.log(
          `I18n: you must give a string to translate instead of "${typeof initialMsg}"`
        );
  
      return "";
    }
  
    return I18n.t(initialMsg, options);
  };
  
  export default {
    ...I18n,
    t: translateOrFallback
  };
  
