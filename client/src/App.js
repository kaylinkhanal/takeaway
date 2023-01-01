<<<<<<< HEAD
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
=======
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Register from "./containers/auth/Register";
import Login from "./containers/auth/Login";

function App() {
  return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
>>>>>>> 1116cf309c576cad60e1484e9cb419e6fab9f747
  )
}

export default App