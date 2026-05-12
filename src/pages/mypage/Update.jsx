import { Button, Form, Input } from 'antd';
import api from '../../api/axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log(values);
        const url = `/customer/update.do`;
        const { data } = await api.put(url, values);
        console.log(data);
        if (data.status === 200) {
            alert('회원 정보가 변경되었습니다.');
            navigate('/customer/mypage');
        }
    };

    const handleUpdate = async () => {
        const { data } = await api.get('/customer/info.do');
        console.log(data);
        if (data.status === 200) {
            form.setFieldsValue(data.result[0]);
        }
    };

    useEffect(() => {
        handleUpdate();
    }, []);

    return (
        <div>
            <h1>회원정보 수정</h1>
            <Form
                form={form}
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
                    label="이름"
                    name="name"
                    rules={[{ required: true, message: '이름을 입력하세요!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="연락처"
                    name="phone"
                    rules={[{ required: true, message: '연락처를 입력하세요!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        회원정보 수정
                    </Button>
                </Form.Item>
            </Form>

        </div>
    );
};

export default Update;