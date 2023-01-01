import React, {useState, useEffect} from "react";
import './App.css';
import { Routes, Route } from "react-router-dom"
import Products from "./containers/admin/products";
import Login from "./containers/auth/login";
import Register from "./containers/auth/register";
function App() {
  return (
    <Routes>
      
        <Route path="/admin/products" element={ <Products/> } />
        <Route path="/auth/login" element={ <Login/> } />
        <Route path="/auth/register" element={ <Register/> } />
      </Routes>
  );
}

export default App;
