import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // initialState will check local storage
    userInfo: localStorage.getItem("userInfo")
        ? // if there is 'userInfo', convert to json and use it
          JSON.parse(localStorage.getItem("userInfo"))
        : // else 'null'
          null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        // Clear credential from local storage on frontend
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

// Not confirm these concepts!!
// What we call is action
// What we change is reducer
