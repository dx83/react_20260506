import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log(values);
        const url = `/api/customer/join.do`;
        const { data } = await axios.post(url, values);
        //console.log(data);
        if (data.result.affectedRows === 1) {
            alert("회원가입 성공!");
            navigate("/customer/login");
        }
    };

    return (
        <div>
            <h1>회원가입</h1>
            <Form
                name="register"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item name="email" label="이메일"
                    rules={[{ required: true, message: '이메일을 입력하세요!' }]}>
                    <Input></Input>
                </Form.Item>
                <Form.Item name="password" label="비밀번호"
                    rules={[{ required: true, message: '비밀번호를 입력하세요!' }]}>
                    <Input.Password></Input.Password>
                </Form.Item>
                <Form.Item name="name" label="이름"
                    rules={[{ required: true, message: '이름을 입력하세요!' }]}>
                    <Input></Input>
                </Form.Item>
                <Form.Item name="phone" label="전화번호"
                    rules={[{ required: true, message: '전화번호를 입력하세요!' }]}>
                    <Input></Input>
                </Form.Item>
                <Form.Item  wrapperCol={{ offset: 1}}>
                    <Button type="primary" htmlType='submit'>회원가입</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Join;