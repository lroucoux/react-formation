import uiReducer from "./ui-slice";
import cartReducer from "./cart-slice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
  },
});

export default store;
