import React from 'react';
import Home from './pages/Home';
import Item from './pages/Item';
import { Link, Route, Routes } from 'react-router-dom';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import ItemInsert from './pages/ItemInsert';
import ItemDetail from './pages/ItemDetail';
import ItemImageInsert from './pages/ItemImageInsert';
import Login from './pages/Login';
import Join from './pages/Join';
import Logout from './pages/Logout';
import Mypage from './pages/Mypage';
import MemberUpdate from './pages/mypage/MemberUpdate';
import MemberPassword from './pages/mypage/MemberPassword';
import MemberDelete from './pages/mypage/MemberDelete';
import MemberPurchase from './pages/mypage/MemberPurchase';

const App = () => {

  const { count } = useSelector((state) => state.counter)
  const { token, isLogin } = useSelector((state) => state.logged);

  return (
    <div>
      <p>{count}, {isLogin ? "로그인상태" : "로그인필요"}</p>
      <p>{token}</p>
      <br />

      <Link to="/"><Button>Home</Button></Link>
      <Link to="/item"><Button>item</Button></Link>

      {isLogin ? (
        <span>
          <Link to="/customer/mypage"><Button>Mypage</Button></Link>
          <Link to="/customer/logout"><Button>Logout</Button></Link>
        </span>
      ) : (
        <span>
          <Link to="/customer/login"><Button>Login</Button></Link>
          <Link to="/customer/join"><Button>Join</Button></Link>
        </span>
      )}

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<Item />} />
        <Route path="/item/insert" element={<ItemInsert />} />
        <Route path="/item/detail" element={<ItemDetail />} />
        <Route path="/itemimage/insert" element={<ItemImageInsert />} />
        <Route path="/customer/login" element={<Login />} />
        <Route path="/customer/join" element={<Join />} />
        <Route path="/customer/logout" element={<Logout />} />
        <Route path="/customer/mypage" element={<Mypage />}>
          <Route path="update" element={<MemberUpdate />} />
          <Route path="password" element={<MemberPassword />} />
          <Route path="delete" element={<MemberDelete />} />
          <Route path="purchase" element={<MemberPurchase />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;