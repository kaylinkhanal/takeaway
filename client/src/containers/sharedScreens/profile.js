import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
const Profile = () => {
    const {_id} = useSelector(state=> state.user)
    const [file, setFile] = useState(null)
    const [userDetails, setUserDetails] = useState({})
    const triggerImgSave = async ()=> {
        const formdata = new FormData()
        formdata.append('avatar', file)
        formdata.append('_id', _id)
        const res = await fetch(`${process.env.REACT_APP_API_URL}/profile`,{
            method: "POST",
            body: formdata,
        });
        const data = await res.json()
    }
    const fetchUserDetails= ()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/users/${_id}`).then((response) => {
            setUserDetails(response.data.userDetails)
          });
    }
    useEffect(()=>{
        fetchUserDetails()
    },[])
    return (
    <>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
        <button onClick={()=> triggerImgSave()}>Save avatar</button>
        <img src={require(`../../uploads/${userDetails.avatarName}`)} width={100} height={100}/>
        {JSON.stringify(userDetails)}
    </>
    )
}
export default Profile