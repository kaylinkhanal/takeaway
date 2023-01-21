import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const Profile = () => {
  const { _id } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [imageName, setImageName]=useState('')
  const triggerImgSave = async () => {
    const formdata = new FormData();
    formdata.append("avatar", file);
    formdata.append("_id", _id);
    const res = await fetch('http://localhost:3005/profile', {
      method: "POST",
      body: formdata,
    });
    const data = await res.json();
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
  console.log(imageName) 
  return (
    <>
      <input type="file" onChange={(e) => {
        setFile(e.target.files[0])
        setImageName(e.target.files[0].name)
        }} />
      <button onClick={()=>triggerImgSave()}>Save avatar</button>
      {imageName &&<img src={require(`../../uploads/${imageName}`)} alt="Uploaded Image" />}
      {JSON.stringify(userDetails)}
    </>
  );
};
export default Profile;
