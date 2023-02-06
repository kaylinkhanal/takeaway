import './profile.css'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Profile = () => {
  const { _id } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const triggerImgSave = async () => {
    const formdata = new FormData();
    formdata.append("avatar", file);
    formdata.append("_id", _id);
    debugger;
    const res = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      method: "POST",
      body: formdata,
    });
    const data = await res.json();
    if (data) {
      fetchUserDetails()
    }
  };
  const fetchUserDetails = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${_id}`)
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
     
      <div class="card">
        <input type="file" onChange={(e) => {
          setFile(e.target.files[0])
        }} id="upload" hidden />
        <label htmlFor="upload">
          <FontAwesomeIcon icon={faCamera} className='setFile' />
        </label>
        <div class="imgbx">
          {userDetails.avatarName && <img src={require(`../../uploads/${userDetails.avatarName}`)} alt="Loading.." />}
        </div>
        <div class="contain">
          <div class="detail">
            <h2>{userDetails.name}<div></div>
              <span>{userDetails._id}</span>
            </h2>
            <div class="data">
              <h3>email<div></div><span>{userDetails.email}</span></h3>

              <h3>Phone Number<div></div><span>984780000</span></h3>
            </div>
            <div class="actionBtn">
              <button onClick={() => triggerImgSave()}>Save</button>
              <button><Link to='/settings'> Settings</Link></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
