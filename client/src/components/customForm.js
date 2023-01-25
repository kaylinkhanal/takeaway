import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { CustomButton } from "./customButton";
import * as Yup from "yup";
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// toast.configure()
const CustomForm = (props) => {
  const {_id} =useSelector(state=>state.user)
  const usersSchema = Yup.object().shape({
    password: Yup.string()
      .min(5, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
  });
  const [formStep, setFormStep] = useState(1);

  const handleBackClick = () => {
    if (formStep !== 1) {
      setFormStep(formStep - 1);
    }
  };
// const[orderLists,setOrderLists]=useState({})
// props.orderLists.map(item=>setOrderLists(item))
<<<<<<< HEAD
  toast.success(JSON.stringify(props.orderLists))
=======

>>>>>>> 3f618714531b83af90be96a3e95b2fc4a1147b02
  return (
    <Formik
      // initialValues={{orderLists}}
      initialValues={props.orderList || {}}
      // validationSchema={usersSchema}
      onSubmit={async (values, { resetForm }) => {
        if (formStep === 1) {
          setFormStep(formStep + 1);
        } else {
          values.senderId = _id
          axios.post(`http://localhost:3005/${props.endpoint}`, values);
        }
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
            ) : (
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
              </>
            )}

            {formStep >= 2 && (
              <CustomButton
                name="Back"
                onClick={handleBackClick}
                type="submit"
              />
            )}
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
