
import React from 'react'
import { Formik, Form, Field } from 'formik'
import {Link } from "react-router-dom"
import * as Yup from 'yup';

const Login = () => {
  const userSchema = Yup.object().shape({
     
        email: Yup.string()
        .email()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    
        password:Yup.string()
        .required('Required')
  })
  return (
      <>
                <div className='body-box'>


<div className='left-side'>
<center><h1 > Take_Away</h1></center>

</div>
<div className='right-boxs' >

         
<Formik
     initialValues={{
    
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
        <center>
        <br />
         
       <h3 className='head-file'>Login </h3>
       <br />
          <br />
      <h3>Enter your email address</h3>
          <Field name="email" placeholder="Email Address" id = "field"/>
         {/* {errors.email && touched.email ? (
           <div>{errors.email}</div>
         ) : null} */}
         <br/> <br />
          
          <h3>Enter your password</h3>
         <Field name="password"
          placeholder="Password"  id = "field"/>
         {/* {errors.password && touched.password ? <div>{errors.password}</div> : null} */}
         <br/> <br />
          
         <button type="submit" id='button'>Login</button>
         <br />
          <br />
         <p>Dont have an Account? <Link to='/register'> Register</Link></p>
         </center>
       </Form>
       </div>
     {/* )} */}
   </Formik>
   </div>
     </div>
     

      </>
  )
}

export default Login;