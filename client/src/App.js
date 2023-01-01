
import './App.css';
import {  Routes, Route } from "react-router-dom";
import Product from './containers/admin/productsList'
import Register from './containers/admin/Register';
import './App.css'
function App() {
  return (
      <Routes>
        <Route path="/admin/products" element={ <Product /> } />
        <Route path="/admin/register" element={ <Register /> } />
      </Routes>
  );
}

export default App;
