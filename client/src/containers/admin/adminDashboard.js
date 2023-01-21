import React, { useState, useEffect } from "react";
import { Drawer, Modal, Button,Table } from "antd";
import {faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../../App.css";
import CustomTable from "../../components/customTable";
import { Link } from "react-router-dom";

// import {logoutResetDetails} from "../../redux/actions/userAction"

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);


  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

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

      <CustomTable/>
    </>
  );
};
export default AdminDashboard;
