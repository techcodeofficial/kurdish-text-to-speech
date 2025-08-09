import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    lang: "ckb",
    direction: "rtl"
};

const languageSlice = createSlice({
    name: "lang",
    initialState,
    reducers: {
        languageChanged: (state, action) => {
            state.lang = action.payload.lang;
            state.direction = action.payload.direction;
        }
    }
});

export const getLanguage = state => state.lang;

export const { languageChanged, directionChanged } = languageSlice.actions;
export default languageSlice.reducer;
