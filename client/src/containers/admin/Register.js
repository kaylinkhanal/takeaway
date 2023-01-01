import React from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
const Register = () => {
  const userSchema = Yup.object().shape({
    fname: Yup.string()
      .min(1, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
      lname: Yup.string()
      .min(1, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
    address: Yup.string().required(),
    email: Yup.string()
      .email()
      .min(1, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
    number: Yup.number().required("Required"),
    password: Yup.string().required("Required"),
    passwordConfirm: Yup.string()
      .label("Password Confirmd")
      .required()
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });
  return (
    <>
      <Formik
        initialValues={{
          fname: "",
          lname:"",
          address: "",
          number: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={userSchema}
        onSubmit={(values) => {
          console.log(values);
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          };
          fetch("http://localhost:3005/register", requestOptions);
        }}
      >
        {({ errors, touched }) => (
          <div className="form">
            <Form>
              <h3 className="headTitle">Register</h3>
              <label>First Name: </label>
              <Field name="fname" placeholder="First Name" />
              {errors.fname && touched.fname ? <div>{errors.fname}</div> : null}
              <br /> 

              <label>Last Name: </label>
              <Field name="lname" placeholder="Last Name" />
              {errors.lname && touched.lname ? <div>{errors.lname}</div> : null}
              <br/>
              <label>Phone No: </label>
              <Field name="number" placeholder="Phone Number" />
              {errors.number && touched.number ? (
                <div>{errors.number}</div>
              ) : null}
              <br/>
              <label>Address : </label>
              <Field name="address" placeholder="Address" />
              {errors.address && touched.address ? (
                <div>{errors.address}</div>
              ) : null}
              <br /> 
              
              <label>Email Address: </label>
              <Field name="email" placeholder="Email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <br />

              <label>Password: </label>
              <Field name="password" placeholder="Password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <br />

              <label>Confirm Password: </label>
              <Field name="passwordConfirm" placeholder="PasswordConfirm" />
              {errors.passwordConfirm && touched.passwordConfirm ? (
                <div>{errors.passwordConfirm}</div>
              ) : null}
              <br />
              <button type="submit">Register</button>
              <p>
                Already have an Account? <Link to="/Login"> Log in</Link>
              </p>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Register;
