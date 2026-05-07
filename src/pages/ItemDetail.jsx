import { Button, Image, Modal } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const ItemDetail = () => {

    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");

    const [row, setRow] = useState({});
    const [imageList, setImageList] = useState([]);

    // 삭제 클릭시 변경할 상태변수
    const [chk, setChk] = useState(false);

    // 이미지변경 모달을 표시유뮤 상태변수
    const [modalOpen, setModalOpen] = useState(false);

    // 변경할 이미지 번호와 변경할 이미지 정보
    const [changeNo, setChangeNo] = useState(0);
    const [fileList, setFileList] = useState([]);

    const handleData = async () => {
        const url = `/api/item/select.do?code=${code}`;
        const { data } = await axios.get(url);
        //console.log(data);
        if (data.status === 200) {
            setRow(data.result[0]);
        } else {
            alert('물품정보 조회실패');
        }
    };

    const handleImage = async () => {
        const url = `/api/itemimage/list.do?code=${code}`;
        const { data } = await axios.get(url);
        //console.log(data);
        setImageList(data.result);
    };

    const handleDeleteImage = async (no) => {
        //console.log(no);
        if (window.confirm('이미지 삭제할까요?')) {
            const url = `/api/itemimage/delete.do`;
            const body = { no: no };
            const { data } = await axios.delete(url, { data: body });
            console.log(data);
            if (data.result.affectedRows === 1) {
                setChk(!chk);
                alert('이미지삭제완료');
            } else {
                alert('이미지삭제실패');
            }
        }
    };

    const props = {
        name: 'file',
        multiple: false,
        fileList: fileList,
        maxCount: 1,
        beforeUpload: () => {
            return false;
        },
        onChange(info) {
            setFileList(info.fileList);
        },
    };

    const handleUpdateImage = async (no) => {
        setModalOpen(true);
        setChangeNo(no);
    };

    // 모달창을 취소할 때 모달 숨기기, 파일목록 초기화
    const handleCancel = () => {
        setModalOpen(false);
        setFileList([]);
    };

    // 이미지를 변경할 때
    const handleOk = async () => {
        setModalOpen(false);
        const url = `/api/itemimage/update.do`;
        const headers = { 'Content-Type': 'multipart/form-data' };

        // 폼 데이터 생성
        if (fileList && fileList.length > 0) {
            const body = new FormData();
            body.append("no", changeNo);
            body.append("image", fileList[0].originFileObj);

            const { data } = await axios.put(url, body, { headers });
            console.log(data);
            if (data.result.affectedRows === 1) {
                alert('이미지변경성공');
                setChk(!chk);
            } else {
                alert('이미지변경실패');
            }
        }
    };

    useEffect(() => {
        handleData();
        handleImage();
    }, [code, chk]);

    return (
        <div>
            <h3>물품상세</h3>
            <p>물폼코드: {code}</p>
            <p>물품명: {row.name}</p>
            <p>내용: {row.detail}</p>
            <p>가격: {row.price}</p>
            <p>수량: {row.qty}</p>
            <p>등록일: {row.create_at}</p>
            <p>판매자: {row.phone}</p>
            <Link to={`/itemimage/insert?code=${code}`}>
                <Button type="primary">물품이미지등록</Button>
            </Link>

            {imageList.map((item) => (
                <div key={item.no}>
                    <Image src={item.src} alt="물품이미지" width={200} height={200} />
                    <Button onClick={() => { handleDeleteImage(item.no) }}>이미지 삭제</Button>
                    <Button onClick={() => { handleUpdateImage(item.no) }}>이미지 변경</Button>
                </div>
            ))}

            <Modal open={modalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                title="이미지변경">

                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
            </Modal>
        </div>
    );
};

export default ItemDetail;