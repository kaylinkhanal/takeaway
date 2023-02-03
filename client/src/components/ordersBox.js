import React, { useState } from 'react'
import './button.css'
import {Button, Popover} from 'antd'
import axios from 'axios'
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_API_URL);

const OrdersBox = (props) => {
   const selectDynamicColor = () => {
     
       if(props.item.orderStatus=="Pending"){
         return 'orange'
       }else if(props.item.orderStatus=="Accepted"){
         return '#4BB543'
       }else{
         return 'red'
       }
   }

   const changeStatus = (status)=>{
      const orderDetails = {
         status: status,
         id: props.item._id
      }
    socket.emit('orderRequest',orderDetails )
   }
   const content = (
      <div>
       Reasons: <input placeholder="reasons for rejection"/>
      </div>
    );
   return (
      <>
         <div className='orderCategory' id={'adminCardTheme'} style={{backgroundColor: selectDynamicColor()}}>
         {props.item._id}<br/>

         {props.item.unitItems}
         {props.item.weight}
         {props.item.pickupDate}
         {props.item.receiverPhoneNo}
         {props.item.pickupTime}
         <Button onClick={()=>changeStatus('accept')}>Accept</Button>
         {/* <Popover content={content} title="Title"> */}
            <Button  onClick={()=>changeStatus('reject')} type="primary">Reject</Button>
         {/* </Popover> */}
   
            <div className='categoryName'>  {props.item.receiverName} </div>
         </div>
      </>
   )
}
export default OrdersBox;