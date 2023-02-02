import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { CustomButton } from "./customButton";
import axios from "axios";
import {toast} from "react-toastify";
import { useSelector } from "react-redux";
import priceMap from "../config/priceMap.json"
import 'react-toastify/dist/ReactToastify.css';
import Map from "./map"
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
// toast.configure()
const CustomForm = (props) => {
  const {_id} =useSelector(state=>state.user)
  const [formStep, setFormStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleBackClick = () => {
      setFormStep(formStep - 1);
  };

  toast.success(JSON.stringify(props.orderLists))
 
  return (
    <Formik
      initialValues={props.orderList || {}}
      onSubmit={async (values, { resetForm }) => {
        
        if (formStep <=2) {
          setFormStep(formStep + 1);
        } else {
          values.senderId = _id
          values.totalPrice = totalPrice
          console.log(values)
          axios.post(`${process.env.REACT_APP_API_URL}/${props.endpoint}`, values);
        }
        const {weight, unitItems, maxLength} = values
        const finalPrice= weight* unitItems* maxLength * props.basePrice 
        setTotalPrice(finalPrice - finalPrice * priceMap[props.categoryName].discountPerUnitPrice)
      }}
    >
      {({ errors, touched }) => (
        <div
          style={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
          }}
        >
          <Form>
            {formStep === 1 ? (
              <>
                {props.itemDetails.map((item) => {
                  return (
                    <div>
                      <Field
                        name={item}
                        key={item}
                        placeholder={item}
                        type={item === "password" ? "password":item==="pickupDate"?'date':item==="pickupTime"?'time' :"text"}
                      />
                      {errors[item] && touched[item] ? (
                        <div className="validaton-message">{errors[item]}</div>
                      ) : null}
                    </div>
                  );
                })}
             
              </>
            ) : null}
            {
              formStep ===2 && (
               <Map/>
              )
            }
            {formStep ===3  && (
                <>
                {totalPrice}
                  {props.senderDetails.map((item) => {
                    return (
                      <div>
                        <Field
                          name={item}
                          key={item}
                          placeholder={item}
                          type={item === "password" ? "password" : "text"}
                        />
                        {errors[item] && touched[item] ? (
                          <div className="validaton-message">{errors[item]}</div>
                        ) : null}
                      </div>
                    );
                  })}
                </>
            )}
                <CustomButton
                name="Back"
                onClick={handleBackClick}
                type="submit"
              />
            <CustomButton
              name={formStep === 1 ? "Next" : "Submit"}
              type="submit"
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CustomForm;
