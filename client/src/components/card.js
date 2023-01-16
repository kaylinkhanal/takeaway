import React, { useState } from 'react'
import './button.css'
import { Drawer, Modal, Button } from "antd";
import CustomForm from "../components/customForm"
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
   return (
      <>
         <Modal
            footer={null}
            onCancel={() => setIsModalOpen(false)}
            open={isModalOpen}>
            {props.item.catagoryName}
            <CustomForm endpoint="orders" itemDetails={itemDetails} senderDetails={senderDetails} />
         </Modal>
         <div onClick={() => setIsModalOpen(true)}className='category'>
            <div className='categoryImage'>Image Area</div>
            <div className='categoryName'> {props.item.catagoryName} </div>
         </div>
      </>
   )
}
export default Card