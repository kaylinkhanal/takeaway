import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Register from "./containers/auth/Register";
import Login from "./containers/auth/Login";
import UserDashboard from "./containers/user/userDashboard";
import RiderDashboard from "./containers/rider/riderDashboard";

import { useSelector } from "react-redux";

function App() {
  const {role} =useSelector(state=>state.user)
    if(role==='rider'){
      return <RiderScreens/>
    }else if(role === 'user'){
      return <UserScreens/>
    }
      return <AuthScreens/>
}

const AuthScreens = () => {
  return (
    <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Login />} />
  </Routes>
  )
}


const UserScreens = () => {
  return (
    <Routes>
    <Route exact path="/" element={<UserDashboard />} />
    </Routes>
  )
}

const RiderScreens = () => {
  return (
    <Routes>
    <Route exact path="/" element={<RiderDashboard/>} />
  </Routes>
  )
}
export default App


