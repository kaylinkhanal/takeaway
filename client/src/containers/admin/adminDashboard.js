import React, { useState } from "react";
import { Drawer, Modal, Button } from "antd";
import {faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../../App.css";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
// import {useDispatch} from "react-redux";
// import {logoutResetDetails} from "../../redux/actions/userAction"
import NavBar from '../../components/navBar';
const AdminDashboard = () => {
  // const dispatch= useDispatch()
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
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

    minimumDeliveryPrice: Yup.string()
      .required("Required"),
  });

  // const triggerLogout = () => {
  //   dispatch(logoutResetDetails())
  // }

  return (
    <>
      <NavBar />
       <FontAwesomeIcon icon={faBars}  onClick={showDrawer}className="adminDrawer"></FontAwesomeIcon>
      <Button onClick={showModal} className="addItems">Add Items</Button>
      <Modal
        title="Add Items"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        {/* Start  Add Items */}
        <h1>Add Items</h1>
        <Formik
          initialValues={{
            catagoryName: "",
            minimumDeliveryPrice: "",
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
                    name="minimumDeliveryPrice"
                    placeholder="minimum delivery price"
                    type="number"
                  />
                  {errors.minimumDeliveryPrice && touched.minimumDeliveryPrice ? (
                    <div className="validaton-message">{errors.minimumDeliveryPrice}</div>
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
      {/* <button onClick={()=> triggerLogout()}>Log out</button> */}
    </>
  );
};
export default AdminDashboard;
