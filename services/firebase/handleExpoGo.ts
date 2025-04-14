// this wrapper is used so that Firebase is turned
// off while using expo go so the app can run

import Constants from "expo-constants";

const appIsRunningOnExpoGo = Constants.executionEnvironment == "storeClient";

let getAnalytics: any = () => {};
let logEvent: any = () => {};

if (!appIsRunningOnExpoGo) {
  const analytics = require("@react-native-firebase/analytics");
  getAnalytics = analytics.getAnalytics;
  logEvent = analytics.logEvent;
}

export { getAnalytics, logEvent };
