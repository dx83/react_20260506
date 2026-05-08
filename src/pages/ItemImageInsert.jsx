import { Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ItemImageInsert = () => {

    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");
    const [fileList, setFileList] = useState([]);

    const props = {
        name: 'file',
        multiple: true,
        fileList: fileList,
        maxCount: 1,
        beforeUpload: () => {
            return false;
        },
        onChange(info) {
            setFileList(info.fileList);
        }
    };

    const handleInsertImage = async () => {
        const url = `/api/itemimage/insert.do`;
        const headers = { 'Content-Type': 'multipart/form-data' };

        if (fileList && fileList.length > 0) {
            const body = new FormData();
            body.append("code", code);
            body.append("image", fileList[0].originFileObj);

            const { data } = await axios.post(url, body, { headers });
            console.log(data);
            if (data.result.affectedRows === 1) {
                alert('이미지등록성공');
                setFileList([]);
            } else {
                alert('이미지등록실패');
            }
        }
    };

    return (
        <div>
            <h3>물품이미지등록</h3>
            <Link to={`/item/detail?code=${code}`}>
                <Button type="primary">이전페이지</Button>
            </Link>
            <Link to="/item">
                <Button type="primary">목록으로</Button>
            </Link>

            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text" style={{ color: 'white' }}>
                    Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint" style={{ color: 'white' }}>
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>
            <br /><br />
            <Button onClick={handleInsertImage}>이미지등록</Button>
        </div>
    );
};

export default ItemImageInsert;