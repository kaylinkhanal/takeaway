import React, {useState, useEffect} from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
const Register = () => {
    const registerSchema = Yup.object().shape({
        name: Yup.string()
          .min(1, 'Too Short!')
          .max(100, 'Too Long!')
          .required('required'),
      phoneNumber:Yup.number()
      .min(1, 'Too short')
      .max(10, 'Too long')
      .required('required'),
      email: Yup.string().email('Invalid email format').required('Required'),
      password:Yup.string()
      .min(1, 'Password must contains 8 characters')
      .max(8,'Too Long')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.').
      required('required'),
      confirmPassowrd:Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('required')
    })
      return (
 <Formik
       initialValues={{
        name: '',
        phoneNumber:Number(''),
        email:'',
        password:'',
        confirmPassowrd:''
       }}
       validationSchema={registerSchema}
       onSubmit={values => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
         fetch('http://localhost:3005/products',requestOptions )
       }}>
       {({ errors, touched }) => (
         <Form>
           <Field name="name" placeholder="name" type="text"/>
           {errors.name && touched.name ? (
             <div>{errors.name}</div>
           ) : null}
         <Field name="phoneNumber" placeholder="Phone Number"/>
           {errors.price && touched.price ? (
             <div>{errors.phoneNumber}</div>
           ) : null}
          <Field name="email"placeholder="email"/>
           {errors.email && touched.email ? <div>{errors.email}</div> : null}
           <Field name="password"placeholder="Password"/>
           {errors.password && touched.password ? <div>{errors.password}</div> : null}
          <Field name="confirmPassword"placeholder="Please Confirm Password"/>
           {errors.confirmPassowrd && touched.confirmPassowrd ? <div>{errors.confirmPassowrd}</div> : null}
           <button type="submit">Submit</button>
         </Form>
       )}
     </Formik>
    )
}
export default Register;

