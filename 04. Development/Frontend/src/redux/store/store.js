import { configureStore } from "@reduxjs/toolkit";
import collapsedReducer from "../slices/collapsedSlice";
import authReducer from "../slices/authSlice";
import budgetReducer from "../slices/budgetSlice";
import categoryReducer from "../slices/categorySlice";

const store = configureStore({
  reducer: {
    collapsed: collapsedReducer,
    auth: authReducer,
    budget: budgetReducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddle) =>
    getDefaultMiddle({ serializableCheck: false }),
});

export default store;
