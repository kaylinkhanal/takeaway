import "../../App.css";
import {useState,useEffect} from "react"
import {useSelector} from "react-redux"
import CustomTable from "../../components/customTable";
import { Link } from "react-router-dom";
import AllOrdersList from "../../components/allOrdersList";
import axios from 'axios'
// import {logoutResetDetails} from "../../redux/actions/userAction"
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_API_URL);
const AdminDashboard = () => {
  const {_id} = useSelector(state=> state.user)
  const [userList, setUserList] = useState([])
  const [messagesList, setMessagesList] = useState([])
  
  const [selectedUserDetails, setSelectedUserDetails] = useState({})
  const fetchAllUsersList = async() => {
   await axios.get(`${process.env.REACT_APP_API_URL}/users` ).then(res=> setUserList(res.data.userList))
  }
  const fetchMessages = async() => {
    await axios.get(`${process.env.REACT_APP_API_URL}/messages/${selectedUserDetails._id}/${_id}` ).then(res=> setMessagesList(res.data.messagesList))
   }
  useEffect(()=>{
    fetchAllUsersList()
  },[])

  useEffect(async()=>{
    await socket.on('messageRequest',(messageRequest)=>{
     const bckUpMessage = [...messagesList]
     bckUpMessage.push(messageRequest)
     setMessagesList(bckUpMessage)
  })
})
  const handleChange= (e)=> {
    if(e.key == 'Enter'){
      const messageRequest = {
        "senderId": _id,
        "message": e.target.value,
        "members": [
          _id,
          selectedUserDetails._id
        ]
      }
      socket.emit('messageRequest', messageRequest)
      const bckUpMessage = [...messagesList]
      bckUpMessage.push(messageRequest)
      setMessagesList(bckUpMessage)
      console.log("enter key press")
    }else{
      console.log("enter key not press")
    }
  }
  return (
    <>
    <div style={{backgroundColor:'pink', height:'80px', width:'800px'}}>
      {userList.map((item)=>{
        if(item._id !=  _id){
          return (<button onClick={()=> {
            setSelectedUserDetails(item)
             fetchMessages()
           }} style={{backgroundColor:'white', margin:'10px'}}>{item.name}</button>)
        }
      })}
    </div>
    <div style={{ height:'500px', width:'800px'}}>
      <h1>{selectedUserDetails.name}</h1>

      {messagesList?.map((item)=>{
        return <li style={{backgroundColor: item.senderId == _id ? 'grey' : 'blue'}}>{item.message}</li>
      })}

    </div>
    <div style={{backgroundColor:'red', height:'80px', width:'800px'}}>
      <input placeholder="Send a message" onKeyUp={handleChange}/>
    </div>
    </>
  );
};

export default AdminDashboard;
