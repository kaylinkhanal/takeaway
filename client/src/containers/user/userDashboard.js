import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import axios from "axios";
import  Card  from '../../components/card';
import {logoutResetDetails} from "../../redux/actions/userAction"
function UserDashboard() {
    const dispatch = useDispatch()
    const {name} = useSelector(state=>state.user)
    const [validItems, setValidItems] = useState([])
    const fetchAvailableItems= ()=>{
        axios.get("http://localhost:3005/items").then((response) => {
            setValidItems(response.data.validItemOptions)
          });
          
    }
    useEffect(()=>{
        fetchAvailableItems()
    }, [])


  const triggerLogout = () => {
    dispatch(logoutResetDetails())
  }
  return (
    <div>
        Hi {name} welcome to home
        {validItems.map((item)=>{
           return( <Card item={item}/>)
        })}
         <button onClick={()=> triggerLogout()}>Log out</button>
    </div>
  )
}

export default UserDashboard
