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

import Product from "./containers/admin/Product";
import Register from "./containers/auth/Register";
import Login from "./containers/auth/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App