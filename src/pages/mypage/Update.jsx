import { Button, Form, Input } from 'antd';
import React from 'react';

const Update = () => {

    const [form] = Form.useForm();

    const onFinish = async (values) => {

    };

    const handleData = async() => {
      // 백엔드에서 회원 1인 조회가 필요
    };

    return (
        <div>
            <h1>회원정보 변경</h1>
            <Form
                form={form}
                name="itemInsert"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="이메일"
                    name="email"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="전화번호"
                    name="phone"
                    rules={[{ required: true, message: '전화번호를 입력하세요!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="이름"
                    name="name"
                    rules={[{ required: true, message: '이름을 입력하세요!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        회원정보 변경
                    </Button>
                </Form.Item>
            </Form>

        </div>
    );
};

export default Update;