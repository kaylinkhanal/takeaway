import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Products from "./containers/admin/products";
import Register from "./containers/admin/register";
import Login from "./containers/admin/login";

function App() {
  return (
    <Routes>
      <Route path="/admin/products" element={<Products />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/admin/login" element={<Login />} />

    </Routes>
  );
}

export default App;
