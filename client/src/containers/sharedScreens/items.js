import React,{useEffect, useState} from 'react'
import axios from "axios";
import { Drawer, Modal, Button,Table } from "antd";
import {faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useSelector} from 'react-redux';
import  Card  from '../../components/card';
import { Link } from "react-router-dom";

const Items = ()=> {
    const {role} = useSelector(state=> state.user)

    const [validItems, setValidItems] = useState([])
    const fetchAvailableItems= ()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/items`).then((response) => {
            setValidItems(response.data.validItemOptions)
          });      
    }
    
    useEffect(()=>{
        fetchAvailableItems()
    }, [])
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

return (
    <div className='home'id={role==="admin"?"adminThemeBackground":"userThemeBackground"}>
    <FontAwesomeIcon icon={faBars}  onClick={showDrawer}className="adminDrawer"></FontAwesomeIcon>
    <Drawer 
    title="Welcome to items"
     placement="left"
     onClose={onClose}
     open={open}> 
    </Drawer>
</div>

)
}
export default Items