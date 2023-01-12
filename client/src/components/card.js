import React, {useState} from 'react'
import './button.css'
import { Drawer, Modal, Button } from "antd";
import CustomForm from "../components/customForm"
 const Card = (props) => {
 const [isModalOpen, setIsModalOpen] = useState(false)
 const itemDetails=[
     'pickupDate',
     'pickupTime',
     'weight',
     'unitItems',
     'maxLength'
 ] 
 const senderDetails= [
    'receiverName',
    'receiverPhoneNo'
 ]
 return (
      <>
      <Modal 
      footer={null}
      onCancel={()=>setIsModalOpen(false)}
      open={isModalOpen}>
         {props.item.catagoryName}
         <CustomForm endpoint="orders" itemDetails={itemDetails} senderDetails={senderDetails}/>
      </Modal>
    <div onClick={()=> setIsModalOpen(true)}style={{padding:'30px', backgroundColor:'pink',width:'100px', margin:'10px'}}>
       {props.item.catagoryName}
    </div>
    </>
  )
}
export default Card