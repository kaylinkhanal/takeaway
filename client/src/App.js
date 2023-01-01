import React, {useState, useEffect} from "react";
import './App.css';
import { Routes, Route } from "react-router-dom"
import Products from "./containers/admin/products";
import Register from "./containers/admin/register";
function App() {
  return (
    <Routes>
        <Route path="/admin/products" element={ <Products/> } />
        <Route path='/admin/register/' element={<Register/>}/>
      </Routes>
  );
}

export default App;
