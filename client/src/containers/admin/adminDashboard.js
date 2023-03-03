import "../../App.css";
import {useState,useEffect} from "react"
import {useSelector} from "react-redux"
import CustomTable from "../../components/customTable";
import { Link } from "react-router-dom";
import AllOrdersList from "../../components/allOrdersList";
import axios from 'axios'
// import {logoutResetDetails} from "../../redux/actions/userAction"

const AdminDashboard = () => {
  const {_id} = useSelector(state=> state.user)
  const [userList, setUserList] = useState([])
  const [messagesList, setMessagesList] = useState([])
  
  const [selectedUserDetails, setSelectedUserDetails] = useState({})
  const fetchAllUsersList = async() => {
   await axios.get(`${process.env.REACT_APP_API_URL}/users` ).then(res=> setUserList(res.data.userList))
  }
  const fetchMessages = async() => {
    await axios.get(`${process.env.REACT_APP_API_URL}/messages/dsfnksd` ).then(res=> setMessagesList(res.data.messagesList))
   }
  useEffect(()=>{
    fetchAllUsersList()
  },[])

  const handleChange= (e)=> {
    if(e.key == 'Enter'){
      console.log("enter key press")
    }else{
      console.log("enter key not press")
    }
  }
  return (
    <>
    <div style={{backgroundColor:'pink', height:'80px', width:'800px'}}>
      {userList.map((item)=>{
       return (<button onClick={()=> {
         setSelectedUserDetails(item)
          fetchMessages()
        }} style={{backgroundColor:'white', margin:'10px'}}>{item.name}</button>)
      })}
    </div>
    <div style={{backgroundColor:'green', height:'500px', width:'800px'}}>
      {selectedUserDetails.name}

      {messagesList?.map((item)=>{
        return <li style={{marginLeft: item.senderId == _id ? '90px' : '2px'}}>{item.message}</li>
      })}

    </div>
    <div style={{backgroundColor:'red', height:'80px', width:'800px'}}>
      <input placeholder="Send a message" onKeyUp={handleChange}/>
    </div>
    </>
  );
};

export default AdminDashboard;
