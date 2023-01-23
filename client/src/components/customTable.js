import React, { useState, useEffect } from "react";
import axios from "axios";
import { Drawer, Modal, Button,Table } from "antd";
import "../App.css";
import { useSelector } from "react-redux";


const CustomTable = () => {
  const {role} =useSelector(state=>state.user)
  const [orders, setOrders]= useState([])
  const triggerDelete = (id)=>{
  ///to hit the enndpoint and delete
  }
  const [columns, setColumns]=useState([
    {
      title: 'Pickup Date',
      dataIndex: 'pickupDate',
    },
    {
      title: 'Max Length',
      dataIndex: 'maxLength',
    },
    {
      title: 'Pickup Time',
      dataIndex: 'pickupTime',
    },
    {
      title: 'Reciver Name',
      dataIndex: "receiverName"
    },
    {
      title: 'Phone Number',
      dataIndex: "receiverPhoneNo",
    },
    {
      title: 'Unit Items',
      dataIndex: 'unitItems',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
    },
    {
      title:'User Id',
      dataIndex:'userId'
    },
    {
      title: 'Actions',
      key: 'key',
      dataIndex: 'key',
      render: (_, item) => (
        <>
        <Button>
         {role==='admin'?'Accept':'Edit'}
       </Button>
       <Button onClick={()=> triggerDelete(item._id)}>
         {'Delete'}
       </Button>
        </>
      ),
    },
  ])

  const fetchAvailableItems= ()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/orders`).then((response) => {
        setOrders(response.data.orders)
      });
}
useEffect(()=>{
    fetchAvailableItems()
}, [])


  return (
    <>   
      <div>
      <Table dataSource={orders} columns={columns} />;
      </div>
    </>
  );
};
export default CustomTable;
