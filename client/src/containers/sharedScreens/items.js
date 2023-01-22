import React,{useEffect, useState} from 'react'
import axios from "axios";
import { Drawer, Modal, Button,Table } from "antd";
import {faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useSelector} from 'react-redux';
import  Card  from '../../components/card';
import ReusableForm from '../../components/reusableForm'
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

return (
    <div className='home'id={role==="admin"?"adminThemeBackground":"userThemeBackground"}>
    <Modal
        title="Add Items"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <ReusableForm handleCancel={handleCancel}/>
      </Modal>
      
   {role==="admin" ? <Button onClick={()=>showModal()} >Add Items</Button>:""}
    {validItems.map((item)=>{
       return( <Card item={item} role={role} fetchAvailableItems={fetchAvailableItems}/>)
    })}
</div>

)
}
export default Items