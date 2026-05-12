import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Card, List } from 'antd';

// 뭎품정보(item)도 알아야하지 않나?
// 페이징 문제
const Purchase = () => {

    const [rows, setRows] = useState([]);

    const handleData = async () => {
        const url = `/purchase/list.do`;
        const { data } = await api.get(url);
        console.log(data);
        setRows(data.result);
    }

    useEffect(() => {
        handleData();
    }, []);

    return (
        <div>
            <h1>주문 내역</h1>
            <List
                dataSource={rows}
                renderItem={(item) => (
                    <List.Item>
                        <Card title={item.no}>
                            <p>제품명: {item.iname}</p>
                            <p>가격: {item.price}</p>
                            <p>수량: {item.cnt}</p>
                        </Card>
                    </List.Item>
                )} />
        </div>
    );
};

export default Purchase;