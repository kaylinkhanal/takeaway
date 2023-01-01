import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from 'formik';
import { faUser, faLock, faHome, faAddressBook, faContactBook, faCheck, faDisplay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from 'yup';
const Register = () => {
  const loginSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Required'),
  });
  return (
    <div style={{ display: 'flex', marginTop: '200px' }}>

      <Formik
        initialValues={{
          name: '',
          address: '',
          email: '',
          Number: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={loginSchema}
        onSubmit={values => {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
          };
          fetch('http://localhost:3005/register', requestOptions)
        }}

      >
        {({ errors, touched }) => (
          <Form style={{ margin: 'auto' }}>
            
            <div style={{ marginBottom: "10px" }}><FontAwesomeIcon icon={faUser} />
              <Field name="name" placeholder="name" />
              {errors.name && touched.name ? (
                <div>{errors.name}</div>
              ) : null}
            </div>

            <div style={{ marginBottom: "10px" }}>    <FontAwesomeIcon icon={faHome} />
              <Field name="address" placeholder="address" />
              {errors.price && touched.price ? (
                <div>{errors.price}</div>
              ) : null}
            </div>

            <div style={{ marginBottom: "10px" }}> <FontAwesomeIcon icon={faAddressBook} />
              <Field name="email"
                placeholder="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </div>

            <div style={{ marginBottom: "10px" }}> <FontAwesomeIcon icon={faContactBook} />
              <Field name="Number"
                placeholder="Number" />
              {errors.Number && touched.Number ? <div>{errors.Number}</div> : null}
            </div>

            <div style={{ marginBottom: "10px" }}><FontAwesomeIcon icon={faLock} />
              <Field name="password"
                placeholder="password" type="password" />
              {errors.password && touched.password ? <div>{errors.password}</div> : null}
            </div>

            <div style={{ marginBottom: "10px" }}>  <FontAwesomeIcon icon={faLock} />
              <Field name="confirmPassword"
                placeholder="confirm password" type="password" />
              {errors.confirmPassword && touched.confirmPassword ? <div>{errors.confirmPassword}</div> : null}
            </div>

            <div style={{ marginBottom: "10px" }}>
              <FontAwesomeIcon icon={faCheck} />
              <button type="submit" >Register</button>
            </div>

          </Form>
        )}
      </Formik>

    </div>
  )
}

export default Register;

