import React, {useState} from "react";
import './App.css';
import{Login} from "./containers/auth/login"
import{Register} from "./containers/auth/register"
function App() {
  const [currentForm, setcurrentForm]= useState('login');
  const toggleForm= (formName) =>{
    setcurrentForm (formName);
  }
  return (
    <div className="App">
      {
        currentForm=== "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>
      }
    </div>
  );
}

export default App;
