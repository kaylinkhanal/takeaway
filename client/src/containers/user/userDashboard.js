import React,{useEffect, useState} from 'react'
// import { useSelector, useDispatch} from 'react-redux'
import axios from "axios";
import  Card  from '../../components/card';
// import {logoutResetDetails} from "../../redux/actions/userAction"
import NavBar from '../../components/navBar';
function UserDashboard() {
    // const dispatch = useDispatch()
    // const {name} = useSelector(state=>state.user)
    const [validItems, setValidItems] = useState([])
    const fetchAvailableItems= ()=>{
        axios.get("http://localhost:3005/items").then((response) => {
            setValidItems(response.data.validItemOptions)
          });
          
    }
    useEffect(()=>{
        fetchAvailableItems()
    }, [])


  // const triggerLogout = () => {
  //   dispatch(logoutResetDetails())
  // }
  return (
    <>
    <NavBar/>
        {/* Hi {name} welcome to home */}
       <div>
         Welcome to home
        </div> 
    <div className='mainCard'>
        {validItems.map((item)=>{
           return( <Card item={item}/>)
        })}
    </div>
         {/* <button onClick={()=> triggerLogout()}>Log out</button> */}
    </>
  )
}

export default UserDashboard
