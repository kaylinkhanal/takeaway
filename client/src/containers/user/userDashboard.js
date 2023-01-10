import React,{useEffect, useState} from 'react'
import { useSelector} from 'react-redux'
import axios from "axios";
import  Card  from '../../components/card';
function UserDashboard() {
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
  return (
    <div>
        Hi {name} welcome to home
        {validItems.map((item)=>{
           return( <Card item={item}/>)
        })}
    </div>
  )
}

export default UserDashboard
