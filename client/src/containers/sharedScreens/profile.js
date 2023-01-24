import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
const Profile = () => {
  const { _id } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const triggerImgSave = async () => {
    const formdata = new FormData();
    formdata.append("avatar", file);
    formdata.append("_id", _id);
    const res = await fetch('http://localhost:3005/profile', {
      method: "POST",
      body: formdata,
    });
    const data = await res.json();
    if(data){
      fetchUserDetails()
    }
  };
  const fetchUserDetails = () => {
    axios
      .get(`http://localhost:3005/users/${_id}`)
      .then((response) => {
        setUserDetails(response.data.userDetails);
      });
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  console.log(file)
  return (
    <>
      <input type="file" onChange={(e) => {
        setFile(e.target.files[0])
        }} />
      <button onClick={()=>triggerImgSave()}>Save avatar</button>
      {userDetails.avatarName &&<img src={require(`../../uploads/${userDetails.avatarName}`)} alt="Uploaded Image" />}
      <Link to="/settings"><div>Account Settings</div></Link>
    </>
  );
};
export default Profile;
