import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./reducer/counterSlice"
import loggedReducer from "./reducer/loggedSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        logged: loggedReducer
    }
})