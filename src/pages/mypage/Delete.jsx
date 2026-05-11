import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../reducer/loggedSlice';
import { Button, Form, Input } from 'antd';

const Delete = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token, isLogin } = useSelector((state) => state.logged);

    const onFinish = async (values) => {
        // 백엔드에서 회원 1인 조회가 필요
        const url = `/api/customer/delete.do`;
        const headers = { "Authorization": `Bearer ${token}` };
        //const { data } = await axios.put(url, values, { headers });
        //console.log(data);
        //if (data.status === 200) {
        //    if (window.confirm('회원 탈퇴하시겠습니까?')) {
        //        dispatch(logout());
        //        navigate("/");
        //    }
        //}
        //else {
        //    alert("비밀번호가 틀립니다!");
        //}
    };

    return (
        <div>
            <h1>회원 탈퇴</h1>
            <Form
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    label='비밀번호'
                    name='password'
                    rules={[{ required: true, message: '비밀번호를 입력하세요!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type='primary' htmlType='submit'>
                        회원 탈퇴
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default Delete;