// rootReducer.js

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import appReducer from "./appReducer";
import userReducer from "./userReducer";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { useReducer } from "react";
import adminReducer from "./adminReducer";

// Common configuration for redux-persist
const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

// Configuration specific to persisting the user part of the state
const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["isLoggedIn", "userInfo"],
};

const appPersistConfig = {
  ...persistCommonConfig,
  key: "app",
  wwhitelist: ["language"],
};

// Combine reducers
const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    admin: adminReducer,
  });

export default rootReducer;
