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
  )
}

export default App