import React from 'react'
import { Formik, Form, Field } from 'formik'
import {Link } from "react-router-dom"
import * as Yup from 'yup';

const Login = () => {
  const userSchema = Yup.object().shape({
      name: Yup.string()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
        email: Yup.string()
        .email()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
        number:Yup.number()
        .required('Required'),
        password:Yup.string()
        .required('Required')
  })
  return (
      <>
<Formik
     initialValues={{
      name: '',
      number:'',
      email:'',
      password:''
     }}>


   {/* validationSchema={userSchema}
   onSubmit={values => {
       alert('User Registered')
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
      };
       fetch('http://localhost:3005/login',requestOptions )
     }}
   >
     {({ errors, touched }) => ( */}

      <div className='form'>
      

       <Form>
       <h3 className='headTitle'>Login form</h3>
         <Field name="name" placeholder="Fullname"/>
         {/* {errors.name && touched.name ? (
           <div>{errors.name}</div>
         ) : null} */}
         <br/>
         <Field name="number" placeholder="Phone Number"/>
         {/* {errors.number && touched.number ? (
           <div>{errors.number}</div>
         ) : null} */}
         <br/> <Field name="email" placeholder="Email Address"/>
         {/* {errors.email && touched.email ? (
           <div>{errors.email}</div>
         ) : null} */}
         <br/>
         <Field name="password"
          placeholder="Password" />
         {/* {errors.password && touched.password ? <div>{errors.password}</div> : null} */}
         <br/>
         <button type="submit">Login</button>
         <p>Dont have an Account? <Link to='/ '> Sign up</Link></p>
       </Form>
       </div>
     {/* )} */}
   </Formik>

      </>
  )
}

export default Login;
