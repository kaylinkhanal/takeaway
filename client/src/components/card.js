import React, { useState } from 'react'
import './button.css'
import '../App.css'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from "antd";
import CustomForm from "../components/customForm"
import ReusableForm from "../components/reusableForm"
import { Popconfirm } from 'antd';

const Card = (props) => {

   const [isModalOpen, setIsModalOpen] = useState(false)
   const itemDetails = [
      'productName',
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

   const triggerDelete = async () => {

      const requestOptions = {
         method: "DELETE",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ _id: props.item._id }),
      };
      const res = await fetch(
         `${process.env.REACT_APP_API_URL}/items`,
         requestOptions
      );
      if (res.status === 204) props.fetchAvailableItems()
   }
   return (
      <>
         <Modal
            footer={null}
            onCancel={() => setIsModalOpen(false)}
            open={isModalOpen}>
            {props.item.categoryName}
            {
               props.role === 'admin' ? <ReusableForm item={props.item} isAdminEdit={true} /> : <CustomForm endpoint="orders" basePrice={props.item.minimumDeliveryPrice} categoryName={props.item.categoryName} itemDetails={itemDetails} senderDetails={senderDetails} photo={props.item.photo}/>
            }
         </Modal>
         <div onClick={() => props.role === 'admin' ? null : setIsModalOpen(true)} className='category'>
            <div className='categoryImage'>
               {props.item.photo && <img src={require(`../uploads/${props.item.photo}`)} alt='Loading...' />}
            </div>
            <div>{props.item.categoryName}</div>
            <div className='editDelete'>{props.role === 'admin' ? <div onClick={() => setIsModalOpen(true)}>
               <FontAwesomeIcon icon={faEdit} className='edit_icon' />
            </div> : ''}
               {props.role === 'admin' ? (
                  <Popconfirm
                     title="Delete the task"
                     description="Are you sure to delete this task?"
                     okText="Yes"
                     cancelText="No"
                     onConfirm={triggerDelete}
                  >
                     <div ><FontAwesomeIcon icon={faTrash} className='delete_icon' /></div>
                  </Popconfirm>
               ) : (
                  ''
               )}
            </div>

         </div>
      </>
   )
}
export default Card;