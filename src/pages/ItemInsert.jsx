import { Button, Form, Input, InputNumber } from 'antd';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItemInsert = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const url = `/api/item/insert.do`;
        const { data } = await axios.post(url, values);
        console.log(data);
        if (data.result.affectedRows === 1) {
            alert('물품등록완료');
            navigate('/item');
        } else {
            alert('물품등록실패');
        }
    };

    return (
        <div>
            <h3>ItemInsert</h3>
            <Form
                name="itemInsert"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="물품명"
                    name="name"
                    rules={[{ required: true, message: '물품명을 입력하세요!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="물품설명"
                    name="detail"
                    rules={[{ required: true, message: '물품설명을 입력하세요!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="가격"
                    name="price"
                    rules={[{ required: true, message: '가격을 입력하세요!' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="수량"
                    name="qty"
                    rules={[{ required: true, message: '수량을 입력하세요!' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="판매자"
                    name="phone"
                    rules={[{ required: true, message: '판매자 전화번호를 입력하세요!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        등록
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ItemInsert;