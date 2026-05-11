import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../reducer/loggedSlice';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.confirm('로그아웃 할까요?')) {
            dispatch(logout());
        }
        navigate("/");
    }, [dispatch]);
};

export default Logout;