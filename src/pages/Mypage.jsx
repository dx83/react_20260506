import React from 'react';
import logo from '../assets/hero.png';
import { Button } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Mypage = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <p><img src={logo} alt="hero" width={100} /></p>
            <Link to='/customer/mypage/update'><Button>회원정보 변경</Button></Link>
            <Link to='/customer/mypage/password'><Button>비밀번호 변경</Button></Link>
            <Link to='/customer/mypage/delete'><Button>회원 탈퇴</Button></Link>
            <Link to='/customer/mypage/purchase'><Button>주문 내역</Button></Link>

            <Outlet />
        </div>
    );
};

export default Mypage;