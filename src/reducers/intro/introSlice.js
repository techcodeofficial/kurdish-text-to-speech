import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    isIntro: true
};

const introSlice = createSlice({
    name: "intro",
    initialState,
    reducers: {
        seted: (state, action) => {
            state.isIntro = true;
        },
        unSeted: (state, action) => {
            state.isIntro = false;
        },
    }
});

//selectors here
export const getStatusIntro = state => state.intro.isIntro;
//actions here
export const { seted,unSeted } = introSlice.actions;
//reducer here
export default introSlice.reducer;
