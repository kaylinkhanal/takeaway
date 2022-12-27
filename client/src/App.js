import React, {useState, useEffect} from "react";
import './App.css';

function App() {
  const [name,setName] = useState('')
  //first render
  useEffect(()=>{
    fetch('http://localhost:3005/products')
    .then(res=> res.json())
    .then(data=> alert(data.productsList))
  },[])
  return (
    <div className="App">
    <input onKeyUp={(e)=>setName(e.target.value)} placeholder="name"/>
    </div>
  );
}

export default App;
