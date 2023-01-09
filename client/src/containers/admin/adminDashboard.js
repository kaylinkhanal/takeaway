import React, { useState } from "react";
import { Drawer, Modal, Button } from "antd";
import "../../App.css";
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup';

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

  const itemSchema = Yup.object().shape({
    catagoryName: Yup.string()
        .min(5, "Too Short!")
        .max(100, "Too Long!")
        .required("Required"),

    price: Yup.string()
        .required("Required"),
});
  return (
    <>
      <button type="primary" onClick={showDrawer}>
        Open
      </button>
      <Button type="primary" onClick={showModal}>
        Add Items
      </Button>
      <Modal
        title="Add Items"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* Start  Add Items */}
        <h1>Add Items</h1>    
        <Formik
          initialValues={{
            catagoryName: "",
            price: "",
          }}
          validationSchema={itemSchema}
          onSubmit={async (values, { resetForm }) => {
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            };
            const res = await fetch(
              "http://localhost:3005/additem",
              requestOptions
            );
            const data = await res.json();
            if (res.status === 200) {
              alert(data.msg)
            } else {
              alert(data.msg);
            }
            resetForm({ values: "" });
          }}
        >
          {({ errors, touched }) => (
            <div>
              <Form>
                <div>
                  <Field name="catagoryName" placeholder="Catagory Name" />
                  {errors.catagoryName && touched.catagoryName ? (
                    <div className="validaton-message">{errors.catagoryName}</div>
                  ) : null}
                </div>
                <div>
                  <Field
                    name="price"
                    placeholder="Price"
                    type="number"
                  />
                  {errors.price && touched.price ? (
                    <div className="validaton-message">{errors.price}</div>
                  ) : null}
                </div>
                <button className="button" name="Sumbit" type="submit">Add Item</button>
              </Form>
            </div>
          )}
        </Formik>
    
        {/* End  Add Items */}
      </Modal>
      <Drawer
        title="Admin options"
        placement="left"
        onClose={onClose}
        open={open}
      >
        <li>Delivery Items</li>
        <li>Update crendentials</li>
      </Drawer>
    </>
  );
};
export default AdminDashboard;
