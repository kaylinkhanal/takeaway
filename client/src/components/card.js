import React, { useState } from 'react'
import './button.css'
import axios from "axios";
import { Drawer, Modal, Button } from "antd";
import CustomForm from "../components/customForm"
import ReusableForm from "../components/reusableForm"
import Items from '../containers/sharedScreens/items';

const Card = (props) => {
   const [isModalOpen, setIsModalOpen] = useState(false)
   const itemDetails = [
      'pickupDate',
      'pickupTime',
      'weight',
      'unitItems',
      'maxLength'
   ]
   const senderDetails = [
      'receiverName',
      'receiverPhoneNo'
   ]
 const [delItems,setDelItems]=useState([])

   const triggerDelete = async()=>{
   
      const requestOptions = {
         method:"DELETE",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({_id: props.item._id}),
       };
       const res = await fetch(
         "http://localhost:3005/items",
         requestOptions
       );
      if(res.status == 204) props.fetchAvailableItems()
   }
   return (
      <>
         <Modal
            footer={null}
            onCancel={() => setIsModalOpen(false)}
            open={isModalOpen}>
            {props.item.catagoryName}
            {
              props.role === 'admin' ? <ReusableForm item={props.item} isAdminEdit={true}/> : <CustomForm endpoint="orders" itemDetails={itemDetails} senderDetails={senderDetails} /> 
            }
         </Modal>
         <div className='category'id={props.role==='admin'?'adminCardTheme':'userCardTheme'}>
            <button onClick={() => setIsModalOpen(true) }>Edit</button>
            <button onClick={() => triggerDelete()}>Delete</button>
            <div className='categoryName'> {props.item.catagoryName} </div>
         </div>
      </>
   )
}
export default Card;