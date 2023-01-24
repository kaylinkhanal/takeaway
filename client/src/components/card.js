import React, { useState } from 'react'
import './button.css'
import { Modal } from "antd";
import CustomForm from "../components/customForm"
import ReusableForm from "../components/reusableForm"

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

   const triggerDelete = async()=>{
   
      const requestOptions = {
         method:"DELETE",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({_id: props.item._id}),
       };
       const res = await fetch(`${process.env.REACT_APP_API_URL}/items`,requestOptions)
      if(res.status === 204) props.fetchAvailableItems()
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
         <div onClick={()=>props.role === 'admin'? null: setIsModalOpen(true) } className='category'id={props.role==='admin'?'adminCardTheme':'userCardTheme'}>
         {props.role === 'admin' ?  <button onClick={() => setIsModalOpen(true) }>Edit</button>: ''}
         {props.role === 'admin' ?  <button onClick={() => triggerDelete()}>Delete</button>: ''}
            <div className='categoryName'> {props.item.catagoryName} </div>
         </div>
      </>
   )
}
export default Card;