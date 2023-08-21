import { configureStore } from "@reduxjs/toolkit";
import collapsedReducer from "../slices/collapsedSlice";

const store = configureStore({
  reducer: {
    collapsed: collapsedReducer,
  },
  middleware: (getDefaultMiddle) =>
    getDefaultMiddle({ serializableCheck: false }),
});

export default store;
