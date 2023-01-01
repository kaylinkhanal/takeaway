import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './containers/admin/products';
import Register from './containers/user/register';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/products" element={<Products />}></Route>
        <Route path="/user/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App