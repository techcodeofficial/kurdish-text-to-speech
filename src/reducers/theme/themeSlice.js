import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        isDarkTheme: false
    },
    reducers: {
        toggleTheme(state) {
            state.isDarkTheme = !state.isDarkTheme;
        },
        setTheme(state, action) {
            state.isDarkTheme = action.payload.scheme === "dark" ? true : false;
        }
    }
});

export const themeStatus = (state)=>state.theme.isDarkTheme

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
