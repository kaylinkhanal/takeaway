import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phone: Yup.string()
      .matches(/^9\d{9}$/, 'Phone number must be a 10-digit number starting with 9')
      .required("Phone is required"),
    email: Yup.string().email("Invalid email")
      .required("Email is required"),
    address: Yup.string()
      .required("Address is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required")
  });

  return (
    <div className="reg">
      <Formik
        initialValues={{
          userName: "",
          phone: "",
          email: "",
          address: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          const postRequest={
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            }
          
          fetch('http://localhost:3007/register',postRequest)
  
        }
      }
      >
        {(props) => (
          <Form>
            <Field type="text" name="userName" placeholder="Enter your name" />
            <ErrorMessage name="userName" component="div" /><br></br>
            <Field type="number" name="phone" placeholder="Enter your phone number" />
            <ErrorMessage name="phone" component="div" /><br></br>
            <Field type="text" name="email" placeholder="Enter your valid email" />
            <ErrorMessage name="email" component="div" /><br></br>
            <Field type="text" name="address" placeholder="Enter your address" />
            <ErrorMessage name="address" component="div" /><br></br>
            <Field type="password" name="password" placeholder="Enter a new password" />
            <ErrorMessage name="password" component="div" /><br></br>
            <Field type="password" name="confirmPassword" placeholder="Confirm your password" />
            <ErrorMessage name="confirmPassword" component="div" /><br></br>
            <button type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register