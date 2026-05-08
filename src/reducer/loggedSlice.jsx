import { createSlice } from "@reduxjs/toolkit";

// 초기값 설정 함수
const getInitialState = () => {
    // 1. 세션저장소에서 token값을 가져옴
    const token = sessionStorage.getItem("token");

    // 2. 토큰이 있으면 isLogin을 true로 설정
    let isLogin = false;
    if (token != null) {
        isLogin = true;
    }

    // 3. token과 isLogin을 상태변수로 가지는 객체를 반환
    return { token: token, isLogin: isLogin };
};

export const loggedSlice = createSlice({
    name: "logged",
    initialState: getInitialState(),
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.isLogin = true;
            sessionStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.token = null;
            state.isLogin = false;
            sessionStorage.removeItem("token");
        }
    }
});

export const { login, logout } = loggedSlice.actions;
export default loggedSlice.reducer;