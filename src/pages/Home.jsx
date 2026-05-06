import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { decrement, increment, reset } from '../reducer/counterSlice'

const Home = () => {

    const dispatch = useDispatch()

    const incrementClick = () => {
        dispatch(increment())
    }

    const decrementClick = () => {
        dispatch(decrement())
    }

    const resetClick = () => {
        dispatch(reset(50))
    }

    return (
        <div>
            <h1>Home</h1>
            <Button type="primary" onClick={incrementClick}>increment</Button>
            <Button type="primary" onClick={decrementClick}>decrement</Button>
            <Button type="primary" onClick={resetClick}>reset</Button>
        </div>
    )
}

export default Home