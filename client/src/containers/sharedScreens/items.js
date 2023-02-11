import React,{useEffect, useState} from 'react'
import axios from "axios";
import { Modal, Button } from "antd";
import {useSelector} from 'react-redux';
import  Card  from '../../components/card';
import ReusableForm from '../../components/reusableForm'
import { MdOutlineAddCircle } from 'react-icons/md';

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
        <ReusableForm handleCancel={handleCancel} fetchAvailableItems={fetchAvailableItems}/>
      </Modal>

      <div style={{display: 'flex', justifyContent: 'center'}}>
   {role==="admin" ? <Button onClick={()=>showModal()} 
   style={{marginTop:"20px",  height: '10vh', width: '10vw', 
   backgroundColor: '#306660', color: 'white', fontSize: '20px', borderRadius: '10px' }}
   >Add Items <MdOutlineAddCircle /></Button>:""}
   </div>
   <div class="flex-container">
    {validItems.map((item)=>{
       return(
         <Card item={item} role={role} fetchAvailableItems={fetchAvailableItems}/>
         )
    })}
    </div>
</div>

)
}
export default Items