import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Link } from 'react-router-dom';
import App from './App';
import Login from './containers/auth/login';
import reportWebVitals from './reportWebVitals';
// import {Provider} from "react-redux";
// import store from "./store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider store={store}> */}
      <div style={{display:'flex',flexDirection:'row',}}>
        <div style={{marginLeft:'150px'}}>
          <Link to="./products">Products</Link>
        </div >

        <div style={{marginLeft:'1000px'}}>
          <Link to="./login">Login</Link>
        </div>
        <div style={{marginLeft:'50px'}}>
          <Link to="./register">Register</Link>
        </div>
      </div>



      <App />
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
