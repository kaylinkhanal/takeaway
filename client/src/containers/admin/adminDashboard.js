import React, { useState, useEffect } from "react";
import axios from "axios";
import { Drawer,Button,Table } from "antd";
import {faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../../App.css";
import { Link } from "react-router-dom";
// import {logoutResetDetails} from "../../redux/actions/userAction"

const AdminDashboard = () => {
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
         {'Accept'}
       </Button>
       <Button>
         {'Delete'}
       </Button>
        </>
      ),
    },
  ])
  const [open, setOpen] = useState(false);


  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const fetchAvailableItems= ()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/orders`).then((response) => {
        setOrders(response.data.orders)
      });
}
useEffect(()=>{
    fetchAvailableItems()
}, [])



  // const triggerLogout = () => {
  //   dispatch(logoutResetDetails())
  // }

  return (
    <>
      <FontAwesomeIcon icon={faBars}  onClick={showDrawer}className="adminDrawer"></FontAwesomeIcon>

     <Drawer
        title="Admin options"
        placement="left"
        onClose={onClose}
        open={open}
      >
        <Link to="/items"><li>Delivery Items</li></Link>
        <li>Update crendentials</li>
      </Drawer>
   
      <div>
      <Table dataSource={orders} columns={columns} />;
      </div>
    </>
  );
};
export default AdminDashboard;
