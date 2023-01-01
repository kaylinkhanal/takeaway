import './App.css';
import { Routes, Route } from "react-router-dom"
import Register from "./containers/auth/register";
import Login from './containers/auth/login';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
