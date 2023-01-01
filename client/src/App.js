import React from "react";
import "./App.css";
// import { useEffect,useState } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// function App() {
//   const [product, setProduct] = useState([]);

//   // const fetchData = () => {
//   //   return 
//   // }

//   useEffect(() => {
//     fetch("http://localhost:3005/products")
//       .then((res) => res.json())
//       .then((data) => setProduct(data.productsList));
//   }, [])
//   return
//    <div className="App">
//     <ul>
//       {product && product.length > 0 && product.map((item, id) => (
//         <li >{item }</li>
//       ))}
//     </ul>
//   </div>;
// }



// export default App;

import Product from "./container/admin/Product";
import Resgister from "./container/auth/Resgister";
import Login from "./container/auth/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/products" element={<Product />} />
        <Route path="/auth/register" element={<Resgister />} />
        <Route path="/auth/Login" element={<Login />} />
        <Route path="" element={
          <><h1>this is home page</h1><br /> <Link to='/admin/products'>Add Prodcut</Link><br />
            <Link to='/auth/register'>Add user</Link></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App