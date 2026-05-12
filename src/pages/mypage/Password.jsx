import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Password = () => {
    const navigate = useNavigate();

    const { token, isLogin } = useSelector((state) => state.logged);

    const onFinish = async (values) => {
        if (values.newPassword === values.newPasswordConfirm) {
            const url = `/api/customer/password.do`;
            const headers = { "Authorization": `Bearer ${token}` };
            const { data } = await axios.put(url, values, { headers });
            //console.log(data);
            if (data.status === 200) {
                alert("비밀번호 변경 완료");
                navigate("/customer/mypage");
            }
            else {
                alert("기존 비밀번호가 맞지 않습니다.");
            }
        }
        else {
            alert("새 비밀번호 확인이 다릅니다.");
        }
    };

    return (
        <div>
            <h1>비밀번호 변경</h1>
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
                    label="현재 비밀번호"
                    name="password"
                    rules={[{ required: true, message: '비밀번호를 입력하세요!' }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="새 비밀번호"
                    name="newPassword"
                    rules={[{ required: true, message: '새 비밀번호를 입력하세요!' }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="새 비밀번호 확인"
                    name="newPasswordConfirm"
                    rules={[{ required: true, message: '새 비밀번호를 입력하세요!' }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        비밀번호 변경
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Password;