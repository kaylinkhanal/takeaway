import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./containers/auth/register";
import Login from "./containers/auth/login";
import UserDashboard from "./containers/user/userDashboard";
import RiderDashboard from "./containers/rider/riderDashboard";
import AdminDashboard from "./containers/admin/adminDashboard";
import NavBar from "./components/navBar";
import Items from "./containers/sharedScreens/items";
import { useSelector } from "react-redux";
import Profile from "./containers/sharedScreens/profile";
import AccountingSettings from "./containers/sharedScreens/accountSettings";
import NotFoundPage from "./components/notFoundPage";
import UserOrders from "./containers/user/userOrders";
// import ForgotPassword from "./components/forgotPassword";

function App() {
  const {role , token} =useSelector(state=>state.user)
    if(role==='rider' &&  token){
      return <><NavBar/><RiderScreens/></>
    }else if(role === 'user' && token){
      return <><NavBar/><UserScreens/></>
    }else if(role === 'admin' && token){
    return <><NavBar/><AdminScreens/></>
    }
      return <AuthScreens/>
}

const AuthScreens = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      {/* <Route path="/forgot" element={<ForgotPassword/>}/> */}
    </Routes>
  );
};

const AdminScreens = () => {
  return (
    <Routes>
    <Route exact path="/" element={<AdminDashboard />} />
    <Route exact path="/items" element={<Items />} />
    <Route exact path="/profile" element={<Profile />} />
    <Route exact path="/settings" element={<AccountingSettings />} />
    <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const UserScreens = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/orders" element={<UserOrders />} />

      <Route exact path="/" element={<UserDashboard />} />
    </Routes>
  );
};

const RiderScreens = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route exact path="/" element={<RiderDashboard />} />
    </Routes>
  );
};
export default App;
