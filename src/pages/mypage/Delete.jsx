import api from '../../api/axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../reducer/loggedSlice';
import { Button, Form, Input } from 'antd';

const Delete = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        console.log(values);
        if (window.confirm('회원 탈퇴하시겠습니까?')) {
            const url = `/customer/delete.do`;
            const { data } = await api.put(url, values);
            console.log(data);
            if (data.status === 200) {
                dispatch(logout());
                navigate("/");
            }
            else {
                alert('비밀번호가 틀립니다.');
            }
        }
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