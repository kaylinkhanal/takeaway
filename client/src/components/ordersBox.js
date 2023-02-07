import React, { useEffect, useState } from 'react'
import './button.css'
import { Button, Popover } from 'antd'
import { AiOutlineSend } from 'react-icons/ai';
import axios from 'axios'
import io from 'socket.io-client';
import { BsCalendar2Date } from 'react-icons/bs'
import { BiTime, BiMobileAlt } from 'react-icons/bi'
import { MdOutlineDeliveryDining } from 'react-icons/md'
import { GiAirplaneArrival } from 'react-icons/gi'
const socket = io(process.env.REACT_APP_API_URL);


const OrdersBox = (props) => {

   const selectDynamicColor = () => {

      if (props.item.orderStatus === "Pending") {
         return '#F29339'
      } else if (props.item.orderStatus === "Accepted") {
         return '#077E8C'
      } else {
         return 'red'
      }
   }

   const changeStatus = (status) => {
      const orderDetails = {
         status: status,
         id: props.item._id
      }
      socket.emit('orderRequest', orderDetails)
   }
   const content = (
      <div style={{ display: 'flex', alignItems: 'center' }}>
         <input placeholder="reasons for rejection" />{<AiOutlineSend size={30} marginLeft={8} />}
      </div>
   );
   return (
      <>

         <div className='order-box'>
            <div className='order-head' >
               <h4 >order id # {props.item._id}</h4>
               <span style={{ backgroundColor: selectDynamicColor() }}>{props.item.orderStatus}</span>
            </div>
            <div className="order-body">
               <div className='order-letter'>
                  <h1 >p</h1>
               </div>
               <div className='order-tilte-box'>
                  <h2>{props.item.productName ? props.item.productName : "product name"} </h2>
                  <div className='flex ' style={{ marginTop: '1rem' }} >
                     <MdOutlineDeliveryDining size={25} className="order-icon" /><h4>{props.item.senderName}Sender Name</h4>
                     <GiAirplaneArrival size={25} className="order-icon" /> <h4>{props.item.receiverName}</h4>
                  </div>
               </div >
               <div>
                  <div className='flex order-subtitle-box'>
                     <p> Unit:   {props.item.unitItems}</p>
                     <p> Weight:   {props.item.weight}</p>
                  </div>
                  <div class="flex order-subtitle-box ">
                     <p> Distance:   {props.item.unitItems}</p>
                     <p> Total Price:   {props.item.weight}</p>

                  </div>
               </div>
               <div style={{ marginBottom: '20px', marginRight: '20px' }}>
                  <div style={{ margin: '20px 0' }}>
                     <Button onClick={() => changeStatus('accept')}>Accept</Button>
                  </div>
                  <div><Button onClick={() => changeStatus('reject')} type="primary">Reject</Button></div>
               </div>
            </div>
            <div className="order-footer">
               <div className='flex '>
                  <BsCalendar2Date /><h4>{props.item.pickupDate}</h4>
                  <BiTime /><h4>{props.item.pickupTime}</h4>
                  <BiMobileAlt /><h4>+977 - {props.item.receiverPhoneNo}</h4>
               </div>
            </div>
         </div>





      </>
   )
}
export default OrdersBox;