import React, { useState, useEffect } from "react";
import { Drawer} from "antd";
import "../App.css";
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faBars } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux'
import { logoutResetDetails } from "../redux/actions/userAction"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import img from "../image/logo22.png";
import navItems from '../config/navItems.json'
const NavBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { name, role } = useSelector(state => state.user)
    const triggerLogout = () => {
        dispatch(logoutResetDetails())
        navigate('/')
    }
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
    return (
        <>
            <div className="navBox1">
            <div style={{textDecoration:"none", color:"white"}}>
            {/* <img src={img} alt="Logo" width={200} height={100} margin-bottom={100}/> */}
            </div>
            <Link to="/" style={{color:"#FFFFFF" }}>Home</Link>
            </div>
            <FontAwesomeIcon icon={faBars}  onClick={showDrawer}className="adminDrawer"></FontAwesomeIcon>

                <Drawer
                title="Admin Panel"
                placement="left"
                onClose={onClose}
                open={open}
                >
                {navItems[role].map(item=>  <Link to={item.link}><li onClick={()=>setOpen(false)}>{item.label}</li></Link> )}
                </Drawer>
            <div className="navBox2" id={role === 'admin' ? 'adminTheme' : 'userTheme'}>

                <div className="icon">
                    <div className="user_details">
                        <Link to="/profile" className="user_name">{name}</Link>
                        <button className="button_logout" onClick={() => triggerLogout()}>Logout</button>
                    </div>
                    <FontAwesomeIcon icon={faUser} className="user_icon" />
                </div>
               {role==='admin'? <div className="name_admin">Admin</div>:""}
            </div>
        </>
    );

}
export default NavBar;