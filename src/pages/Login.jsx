import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../reducer/loggedSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        //const url = `/api/customer/login.do`;
        const url = `/api/customer/login_token.do`;
        const { data } = await axios.post(url, values);
        //console.log(data);
        if (data.result === 1) {
            alert("로그인 성공");
            // 로그인시 access, refresh token 둘자 저장해야됨
            dispatch(login({ token: data.accessToken, refreshToken: data.refreshToken }));
            navigate("/", { replace: true });
        }
    };

    return (
        <div>
            <h1>로그인</h1>
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
                <Form.Item wrapperCol={{ offset: 1 }}>
                    <Button type="primary" htmlType='submit'>로그인</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;