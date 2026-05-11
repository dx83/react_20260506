import React from 'react';

// 뭎품정보(item)도 알아야하지 않나?
// 페이징 문제
const Purchase = () => {
    const columns = [
        { title: '주문일', dataIndex: 'create_at', key: 'create_at' },
        { title: '물품코드', dataIndex: 'code', key: 'code' },
        { title: '주문수량', dataIndex: 'cnt', key: 'cnt' },
    ];

    //const [itemList, setItemList] = useState([]);
    //const [page, setPage] = useState(1);
    //const [cnt, setCnt] = useState(10);
    //const [search, setSearch] = useState("");
    //const [total, setTotal] = useState(0);

    const handleData = async () => {
        //const url = `/api/item/list.do?page=${page}&cnt=${cnt}&search=${search}`;
        //const { data } = await axios.get(url);
        //console.log(data);
        //setItemList(data.result);
        //setTotal(data.total);
    }

    //useEffect(() => {
    //    handleData();
    //}, [page, search, cnt]);


    return (
        <div>
            <h1>주문 내역</h1>
        </div>
    );
};

export default Purchase;