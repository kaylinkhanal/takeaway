import React,{useEffect, useState} from 'react'
import { useSelector} from 'react-redux'
import axios from "axios";
import  Card  from '../../components/Card';
function UserDashboard() {
    const {name} = useSelector(state=>state.user)
    const [validItems, setValidItems] = useState([])
    const fetchAvailableItems= ()=>{
        axios.get(`${process.env.REACT_APP_NOT_SECRET_CODE}+/items`).then((response) => {
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
