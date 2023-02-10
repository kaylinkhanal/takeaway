import React, { useEffect, useState } from 'react'
import './button.css'
import { Button, Popover } from 'antd'
import { AiOutlineSend } from 'react-icons/ai';
import axios from 'axios'
import io from 'socket.io-client';
import { BsCalendar2Date } from 'react-icons/bs'
import orderStatusMap from "../config/orderStatusMap.json"
import { BiTime, BiMobileAlt } from 'react-icons/bi'
import { MdOutlineDeliveryDining } from 'react-icons/md'
import { GiAirplaneArrival } from 'react-icons/gi'
const socket = io(process.env.REACT_APP_API_URL);


const OrdersBox = (props) => {
   const rescueMe = () => {
      socket.emit('rescueRequest', "hi")
   }
   return (
      <>
        <button onClick={()=>rescueMe() }> please rescue me</button>
      </>
   )
}
export default OrdersBox;