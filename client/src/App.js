import React, {useState, useEffect} from "react";
import './App.css';
import { Routes, Route } from "react-router-dom"
import Products from "./containers/admin/products";
function App() {
  return (
    <Routes>
        <Route path="/admin/products" element={ <Products/> } />
      </Routes>
  );
}

export default App;
