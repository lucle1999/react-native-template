import axios from "axios";
import * as qs from "query-string";

const instance = axios.create({
  baseURL: "",
  timeout: 20000,
  headers: {}
});

const handleSuccess = (response) => {};

const handleError = (error) => {};

const getRequestConfig = async (config = {}, path) => {
  return {
    ...config
  };
};

export const GET = async (url, params = {}, config = {}) => {
  const queryString = params ? qs.stringify(params) : "";
  const urlWithQuery = lodash.size(params) > 0 ? `${url}?${queryString}` : url;
  const newConfig = await getRequestConfig(config, url);
  return instance
    .get(urlWithQuery, newConfig)
    .then(handleSuccess)
    .catch(handleError);
};

export const POST = async (url, params = {}, config = {}) => {
  const newConfig = await getRequestConfig(config, url);
  return instance
    .post(url, params, newConfig)
    .then(handleSuccess)
    .catch(handleError);
};

export const PUT = async (url, params, config = {}) => {
  const newConfig = await getRequestConfig(config, url);
  return instance
    .put(url, params, newConfig)
    .then(handleSuccess)
    .catch(handleError);
};

export const PATCH = async (url, params, config = {}) => {
  const newConfig = await getRequestConfig(config, url);
  return instance
    .patch(url, params, newConfig)
    .then(handleSuccess)
    .catch(handleError);
};

export const DELETE = async (url, config = {}) => {
  const newConfig = await getRequestConfig(config, url);
  return instance.delete(url, newConfig).then(handleSuccess).catch(handleError);
};

export const setAccessToken = async (accessToken, action = "") => {
  if (accessToken) {
    instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    instance.defaults.headers.common["Access-Token"] = `${accessToken}`;
  } else {
    const error = {
      name: "Attached an invalid token",
      message: `Passing an invalid token into setAccessToken method \n{value = ${accessToken}, dataType: ${typeof accessToken}, action: ${action}}`
    };
    console.error(error);
  }
};

export const setDeviceId = (deviceId) => {
  instance.defaults.headers.common["Device-Id"] = deviceId;
};
export const setDeviceName = (deviceName) => {
  instance.defaults.headers.common["Device-Name"] = deviceName;
};
export const setIpAddress = (ipAddress) => {
  instance.defaults.headers.common["Ip-Address"] = ipAddress;
};
export const setOneSignalUid = (oneSignalUid) => {
  instance.defaults.headers.common["One-Signal"] = oneSignalUid;
};
export const setLanguage = (lang) => {
  instance.defaults.headers.common.Lang = lang;
};

export const setUserAgent = (deviceId, isAndroid) => {
  const osText = isAndroid ? "Android" : "iOs";
  instance.defaults.headers.common[
    "User-Agent"
  ] = `UrBox/${APP_VERSION_CODE}/${osText}/${deviceId}`;
};

export const getLanguage = () => {
  return instance.defaults.headers.common.Lang
    ? instance.defaults.headers.common.Lang
    : "vi";
};
