import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice"; // Adjust the path as needed

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export default store;
