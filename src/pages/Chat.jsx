import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd';
import mqtt from 'mqtt';


const Chat = () => {

    // 상태변수
    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);

    // 브로커 접속 및 구독 설정
    useEffect(() => {
        // broker에 접속하기, connect옵션 : clean(true:접속종료시 구독해지, false:연속유지)
        // reconnectPeriod(연결끊어지면 재접속할 시간간격) : 2초
        // clientId(고유한 식별자) : client
        const client = mqtt.connect("ws://localhost:9001", {
            clean: true,
            reconnectPeriod: 2000,
            clientId: "client" + new Date().getTime()
        });


        // 연결 성공
        client.on("connect", () => {
            console.log("MQTT 브로커 접속 성공");
            client.subscribe("/pknu/class207/#", (err) => {
                if (err) {
                    console.log("구독 실패 : ", err);
                } else {
                    console.log("구독 성공 : chat 주제");
                }
            })
        })

        // broker 접속 실패
        client.on("error", (err) => {
            console.log("접속 실패: ", err);
        })

        // 메시지 수신
        client.on("message", (topic, message) => {
            const msg = message.toString();
            console.log("메시지 수신 : " + topic + " -> " + msg);
            setMessages((prev) => [...prev, { topic, msg }])
        })

        setClient(client);

        return () => {
            client.end();
        }
    }, []);

    const onFinish = (values) => {
        if (!client) return;
        client.publish(values.topic, values.message)
    }


    return (
        <div>
            <h3>chat 실습</h3>
            <Form onFinish={onFinish}>
                <Form.Item label="주제" name="topic" initialValue={"/pknu/class207/id1"}>
                    <Input />
                </Form.Item>
                <Form.Item label="메시지" name="message">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">메시지 전송</Button>
                </Form.Item>
            </Form>

            <div>
                <h4>수신 메시지</h4>
                {messages.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.topic}:</strong> {msg.msg}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Chat