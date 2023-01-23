import React, { useState } from 'react'
import './button.css'
const OrdersBox = (props) => {
   return (
      <>
         <div className='orderCategory' id={'adminCardTheme'}>
         {props.item._id}
         {props.item.unitItems}
         {props.item.weight}
         {props.item.pickupDate}
         {props.item.receiverPhoneNo}
         {props.item.pickupTime}
            <div className='categoryName'>  {props.item.receiverName} </div>
         </div>
      </>
   )
}
export default OrdersBox;