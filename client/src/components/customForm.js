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
  const {distance} =useSelector(state=>state.location)

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
          values.minimumDeliveryPrice = props.basePrice
          values.categoryName  = props.categoryName
          values.senderId = _id
          values.totalPrice = totalPrice
          values.distance = distance
          values.discount =  priceMap[props.categoryName].discountPerUnitPrice
          axios.post(`${process.env.REACT_APP_API_URL}/${props.endpoint}`, values);
          console.log(values)
        }
        const {weight, unitItems} = values
        const finalPrice= weight* unitItems* props.basePrice * distance
        setTotalPrice(finalPrice -((finalPrice * priceMap[props.categoryName].discountPerUnitPrice)/100))
        
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
                <>
               <Map/>
               <CustomButton
               name="Back"
               onClick={handleBackClick}
             />
               Total distance is: {distance} km
               Rs. {totalPrice || 0}
               </>
              
              )
            }
            {formStep ===3  && (
                <>
         
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
                     <CustomButton
               name="Back"
               onClick={handleBackClick}
             />
                </>
            )}
             
            <CustomButton
              name={formStep <= 2 ? "Next" : "Submit"}
              type="submit"
            />
            
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CustomForm;
