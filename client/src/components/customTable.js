import React, { useState, useEffect } from "react";
import axios from "axios";
import { Drawer, Modal, Button,Table } from "antd";
import "../App.css";
import { useSelector } from "react-redux";
import CustomForm from "../components/customForm"
import { message } from 'antd';

const CustomTable = () => {
  const {role, _id, token} =useSelector(state=>state.user)
  const [orders, setOrders]= useState([])
  const [itemSelectedForEdit, setItemSelectedForEdit] = useState({})
  const triggerDelete = async(id)=>{
   const requestOptions = {
    method:"DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({_id: id}),
  };
  const res = await fetch(`${process.env.REACT_APP_API_URL}/orders`,requestOptions);
  if(res.status===200){
    fetchAvailableItems()
    message.success("Orders deleted successfully",[2])
  }
  }
  const title=["Pickup Date", "Pickup Time", "Weight", "unitItems", "Max Length"]

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

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const setIdAndShowModal = (item) => {
    // setItemSelectedForEdit(item)
    showModal()
  }
  const [columns, setColumns]=useState([
  ])

  const fetchAvailableItems= ()=>{
    const requestOptions = {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }
    axios.get(`${process.env.REACT_APP_API_URL}/orders?senderId=${_id}`, requestOptions).then((response) => {
        setOrders(response.data.orders)
      });
}
useEffect(()=>{
    fetchAvailableItems()
    const firstOrder=orders[0]||{} 
    const {_id, __v,...updatedOrder}=firstOrder
    const cols=[] 
    console.log(firstOrder)
  for (const key in updatedOrder) {
    const col={
      title:key.toUpperCase(),
      dataIndex:key,
    }
    cols.push(col)
  }
  const col2=[{
    title:'Actions',
    key: 'key',
    dataIndex:'key',
    render: (_, item) => (
      <>
      <Button onClick={()=>setIdAndShowModal(item)}>
       {role==='admin'?'Accept':'Edit'}
     </Button>
     <Button onClick={()=> triggerDelete(item._id)}>
       {'Delete'}
     </Button>
      </>
    ),
  }]
  const newCol=cols.concat(col2)
  setColumns(newCol)
}, [])
  return (
    <>   

<Modal
        title="Edit Items"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        
        <CustomForm itemDetails={itemDetails} senderDetails={senderDetails} /> 
        
      </Modal>

      <div>
      <Table dataSource={orders} columns={columns} />;
      </div>
    </>
  );
};
export default CustomTable;
