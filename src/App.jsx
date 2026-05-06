import React from 'react';
import Home from './pages/Home';
import Item from './pages/Item';
import { Link, Route, Routes } from 'react-router-dom';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import ItemInsert from './pages/ItemInsert';

const App = () => {

  const { count } = useSelector((state)=> state.counter)

  return (
    <div>
      <h1>Hello World</h1>
      <p>count : {count}</p><br />

      <Link to="/"><Button type="primary">Home</Button></Link>
      <Link to="/item" style={{ marginLeft: "20px" }}><Button type="primary">item</Button></Link>
      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<Item />} />
        <Route path="/item/insert" element={<ItemInsert />} />
      </Routes>
    </div>
  );
};

export default App;