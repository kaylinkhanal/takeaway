import React, {useState, useEffect} from "react";
import './App.css';
import { Routes, Route } from "react-router-dom"
import Products from "./containers/admin/products";
import Register from "./containers/admin/Register";
import Login from "./containers/admin/Login";
function App() {
  return (
    <Routes>
        <Route path="/admin/products" element={ <Products/> } />
        <Route path="/" element={ <Register/> } />
        <Route path="/login" element={ <Login/> } />
      </Routes>
  );
}

export default App;
