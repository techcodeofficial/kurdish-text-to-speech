import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "../reducers/lang/languageSlice";
import introReducer from "../reducers/intro/introSlice";
import themeReducer from "../reducers/theme/themeSlice";
export const store = configureStore({
    reducer: {
        lang: languageReducer,
        intro: introReducer,
        theme: themeReducer
    }
});
