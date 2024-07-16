import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: localStorage.getItem("themeMode") || "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    darkTheme: (state) => {
      state.themeMode = "dark";
      localStorage.setItem("themeMode", "dark");
    },
    lightTheme: (state) => {
      state.themeMode = "light";
      localStorage.setItem("themeMode", "light");
    },
  },
});

export const { darkTheme, lightTheme } = themeSlice.actions;

export default themeSlice.reducer;
