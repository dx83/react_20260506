import { createSlice } from "@reduxjs/toolkit"

// 공유할 변수 count 초기값은 10으로 설정
const initialState = {
    count: 10,
}

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment: (state) => {
            state.count = state.count + 1
        },

        decrement: (state) => {
            state.count = state.count - 1
        },

        reset: (state, action) => {
            state.count = action.payload
        }
    }
})

export const { increment, decrement, reset } = counterSlice.actions
// store.js를 다른 파일로 만들 경우 필요한 부분
export default counterSlice.reducer