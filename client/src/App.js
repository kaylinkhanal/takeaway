import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./containers/admin/register";
import Login from "./containers/admin/login";
import DashBoard from "./containers/auth/dashBoard";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashBoard />} />
    </Routes>
  );
}

export default App;
