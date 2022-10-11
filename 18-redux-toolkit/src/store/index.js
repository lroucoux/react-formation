import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter-slice";
import authReducer from "./auth-slice";

const store = configureStore({
  reducer: {
    counterReducer: counterReducer,
    authReducer: authReducer,
  },
});

export default store;
