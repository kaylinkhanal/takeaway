import React from "react";
import './App.css';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import Product from "./admin/product";
import Register from "./auth/register";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/admin/products" element={<Product/>} />
        <Route path="/admin/register" element={<Register/>} /> 
    </Routes>
    </BrowserRouter>
  );
}


export default App;
 