import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Register = () => {
  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    email: Yup.string().email().required("Required"),

    phone: Yup.number()
      .min(9, "invalid number")
      .required("Required")
      .positive()
      .integer()
   ,

    password: Yup.string().min(6, "min 6").required("Required"),

    country: Yup.string().required("Required"),

    address: Yup.string().required("Required"),
  });
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          Phone: "",
          paassword: "",
          country: "",
          address: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          };
          fetch("http://localhost:3005/register", requestOptions);
        }}
      >
        {({ errors, touched }) => (
          <Form
            style={{
                display:"block",
              padding: "12px 20px",
              margin: " 5px   ",
              border: "1px solid #ccc",
              width: "500px",
              height:"800px"
             
            }}
          >
            <h1 style={{ color: "blue", fontSize: "20px" }}>REGISTRATION</h1>
            <label>Full Name</label>
            <Field name="name" placeholder="name" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <br />
            <label>Email</label>
            <Field name="email" placeholder="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <br />
            <label>Phone</label>
            <Field name="phone" placeholder="phone" type="phone" />
            {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
            <br />
            <label>Password</label>
            <Field name="password" placeholder="password" type="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <br />
            <label>Country</label>
            <Field name="country" placeholder="country" type="country" />
            {errors.country && touched.country ? (
              <div>{errors.country}</div>
            ) : null}
            <br />
            <label>Address</label>
            <Field name="address" placeholder="address" type="address" />
            {errors.address && touched.address ? (
              <div>{errors.address}</div>
            ) : null}
            <br />
            <label for="role">
              user Role
              <select name="role" id="role">
                <option value="user">user</option>
                <option value="rider">rider</option>
              </select>
            </label>

            <br />
            <button type="submit">Register</button>
           
            <a href="./login"> Already have an account</a>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Register;
