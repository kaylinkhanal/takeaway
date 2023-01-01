import React from "react";
<<<<<<< HEAD
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
=======
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
  )
>>>>>>> 1116cf309c576cad60e1484e9cb419e6fab9f747
}

export default App