import React, { useState } from 'react';
import { Drawer, Modal, Button } from 'antd';

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <button type="primary" onClick={showDrawer}>
        Open
      </button>
      <Button type="primary" onClick={showModal}>
        Add Items
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        category name: 
        minimum price: 
      </Modal>
      <Drawer title="Admin options" placement="left" onClose={onClose} open={open}>
        <li>Delivery Items</li>
        <li>Update crendentials</li>
      </Drawer>
    </>
  );
};
export default AdminDashboard;

