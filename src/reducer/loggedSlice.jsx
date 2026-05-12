import { createSlice } from "@reduxjs/toolkit";

// 초기값 설정 함수
const getInitialState = () => {
    // 1. 세션저장소에서 token값을 가져옴
    const token = sessionStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");

    // 2. 토큰이 있으면 isLogin을 true로 설정
    let isLogin = false;
    if (token != null && refreshToken != null) {
        isLogin = true;
    }

    // 3. token과 isLogin을 상태변수로 가지는 객체를 반환
    return { token: token, isLogin: isLogin, refreshToken: refreshToken};
};

export const loggedSlice = createSlice({
    name: "logged",
    initialState: getInitialState(),
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isLogin = true;
            sessionStorage.setItem("token", action.payload.token);
            sessionStorage.setItem("refreshToken", action.payload.refreshToken);
        },
        logout: (state) => {
            state.token = null;
            state.isLogin = false;
            state.refreshToken = null;
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("refreshToken");
        },
        refresh: (state, action) => {
            state.token = action.payload.token;
            sessionStorage.setItem("token", action.payload.token);
        }
    }
});

export const { login, logout, refresh } = loggedSlice.actions;
export default loggedSlice.reducer;