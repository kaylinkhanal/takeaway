import React from "react";
import { Formik, Form, Field, } from "formik";
import { Link } from "react-router-dom";
import { CustomButton } from "./customButton"
import * as Yup from "yup";

const CustomForm = (props) => {
  const usersSchema = Yup.object().shape({
    password: Yup.string()
      .min(5, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
  });
  const tempObj = {}
  props.inputFields.map((item)=>{
    tempObj[item] = ''
  })
  return (
    <Formik
      initialValues={tempObj}
      // validationSchema={usersSchema}
      onSubmit={async (values, { resetForm }) => {
        
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
              {props.inputFields.map((item)=>{
                return (
                  <div>
                  <Field name={item} placeholder={item} type= {item=="password" ? "password" : "text"} />
                  {errors[item] && touched[item] ? (
                    <div className="validaton-message">{errors[item]}</div>
                  ) : null}
                </div>
                )
              })}
             
            <CustomButton name="Submit" type="submit" />
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CustomForm;
