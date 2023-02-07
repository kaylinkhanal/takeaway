import React, { useState } from 'react'
import './button.css'
import '../App.css'
import { Button, Popover } from 'antd'
import { AiOutlineSend } from 'react-icons/ai';
import axios from 'axios'
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_API_URL);


const OrdersBox = (props) => {
   const selectDynamicColor = () => {

      if (props.item.orderStatus === "Pending") {
         return '#d3c86b'
      } else if (props.item.orderStatus === "Accepted") {
         return '#4BB543'
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
         <div className='orderCategory' id={'adminCardTheme'} style={{ backgroundColor: selectDynamicColor() }}>
            <div className='categoryName'>
               <div>{"ID: " + props.item._id}</div>
               <div>{"Name: " + props.item.receiverName}</div>
               <div>{"Phone Number: " + props.item.receiverPhoneNo}</div>
            </div>
            <div className='categoryName'>

               <div>{props.item.weight}{props.item.unitItems}</div>
               <div>{"Pickup Date: " + props.item.pickupDate}</div>
               <div>{"Pickup Time " + props.item.pickupTime}</div>
            </div>
            <div className='categoryName'>

               <div >Status:  <span className='orderStatus'>{props.item.orderStatus}</span></div>
               <Button onClick={() => changeStatus('accept')}>Accept</Button>
               <Popover content={content} >
                  <Button onClick={() => changeStatus('reject')} type="primary">Reject</Button>
               </Popover>
            </div>

         </div>
      </>
   )
}
export default OrdersBox;