import React, { useState, useEffect } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom"
import Products from "./containers/admin/products";
import Register from "./containers/auth/register";
import Login from "./containers/auth/login";
function App() {
  return (
    <>
      <Login />
      <Routes>
        <Route path="/admin/products" element={<Products />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
