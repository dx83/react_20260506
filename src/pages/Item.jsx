import { Button, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Item = () => {

    // 컬럼명 설정
    const columns = [
        { title: '코드', dataIndex: 'code', key: 'code' },
        { title: '물품명', dataIndex: 'name', key: 'name' },
        { title: '내용', dataIndex: 'detail', key: 'detail' },
        { title: '가격', dataIndex: 'price', key: 'price' },
        { title: '수량', dataIndex: 'qty', key: 'qty' },
        { title: '등록일', dataIndex: 'create_at', key: 'create_at' },
        { title: '판매자', dataIndex: 'phone', key: 'phone' },
    ];
    // 목록 데이터 보관 상태 변수
    const [itemList, setItemList] = useState([]);
    const [page, setPage] = useState(1);
    const [cnt, setCnt] = useState(10);
    const [search, setSearch] = useState("");
    const [total, setTotal] = useState(0);

    const handleData = async () => {
        const url = `/api/item/list.do?page=${page}&cnt=${cnt}&search=${search}`;
        const { data } = await axios.get(url);
        //console.log(data);
        setItemList(data.result);
        setTotal(data.total);
    }

    useEffect(() => {
        handleData();
    }, [page, search, cnt]);

    return (
        <div>
            <Link to="/item/insert"><Button type="primary">물품등록</Button></Link>
            <br /><br />

            <Table
                dataSource={itemList}
                columns={columns}
                rowKey={"code"}
                pagination={{
                    total: total,
                    pageSize: cnt,
                    current: page,
                    onChange: (page, pageSize) => {
                        setPage(page);
                        setCnt(pageSize);
                    },
                    placement: ["bottomCenter"],
                    showTotal: (total) => `게시물 ${total}개`,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "50", "100"],
                }}
            />
        </div>
    );
};

export default Item;