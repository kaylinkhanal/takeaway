import React, { useState, useEffect } from "react";
import axios from "axios";
import { Drawer, Modal, Button,Table } from "antd";
import "../App.css";
import { useSelector } from "react-redux";


const CustomTable = () => {
  const {role} =useSelector(state=>state.user)
  const [orders, setOrders]= useState([])
  const [columns, setColumns]=useState([
    {
      title: 'Pickup Date',
      dataIndex: 'pickupDate',
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
      title: 'Actions',
      key: 'key',
      dataIndex: 'key',
      render: () => (
        <>
        <Button>
         {role==='admin'?'Accept':'Edit'}
       </Button>
       <Button>
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
