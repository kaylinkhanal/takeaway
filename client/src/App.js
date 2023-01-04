import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Register from "./containers/auth/Register";
import Login from "./containers/auth/Login";
import UserDashboard from "./containers/user/userDashboard";

function App() {
  return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
  )
}

export default App