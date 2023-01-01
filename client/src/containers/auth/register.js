import React from 'react'
import { Formik, Form, Field } from 'formik'
import {Link } from "react-router-dom"
import * as Yup from 'yup';
import'./auth.css';

const Register = () => {
  const userSchema = Yup.object().shape({
      name: Yup.string()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
        address:Yup.string()
        .required(),
        email: Yup.string()
        .email()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
        number:Yup.number()
        .required('Required'),
        password:Yup.string()
        .required('Required'),
        passwordConfirm: Yup.string()
       .label('Password Confirmd')
        .required()
        .oneOf([Yup.ref('password')], 'Passwords does not match')
    });
  return (
      <>
      
      <div className='body-box'>


        <div className='left-side'>
         <center><h1 > Take_Away</h1></center>
          

        </div>
        <div className='right-box'>
<Formik
     initialValues={{
      name: '',
      address:'',
      number:'',
      email:'',
      password:'',
      confirmPassword:''
     }}
     validationSchema={userSchema}
     onSubmit={values => {
      alert('User Registered')
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
      };
       fetch('http://localhost:3005/register',requestOptions )
     }}
   >
     {({ errors, touched }) => (
      <div className='form'>
      

       <Form>
        <center>
          
          
       <h2 className='head-file'>Register form</h2>
       <br/>
         <Field name="name" placeholder="Fullname" id="fields"/>
         {errors.name && touched.name ? (
           <div>{errors.name}</div>
         ) : null}
         <br/><br/>
          <Field name="address" placeholder="Address" id="fields"/>
         {errors.address && touched.address ? (
           <div>{errors.address}</div>
         ) : null}
         <br/><br/>
         <Field name="number" placeholder="Phone Number"id="fields"/>
         {errors.number && touched.number ? (
           <div>{errors.number}</div>
         ) : null}
         <br/> <br/><Field name="email" placeholder="Email Address"id="fields"/>
         {errors.email && touched.email ? (
           <div>{errors.email}</div>
         ) : null}
         <br/><br/>
         <Field name="password" 
          placeholder="Password" type="password" id="fields"/>
         {errors.password && touched.password ? <div>{errors.password}</div> : null}
         <br/><br/>
         <Field name="passwordConfirm"
          placeholder="PasswordConfirm"
          type="password" id="fields" />
         {errors.passwordConfirm && touched.passwordConfirm ? <div>{errors.passwordConfirm}</div> : null}
         <br/><br/>
         <select name="role"id="fields" >
                    <option value="" label="Select a Role">Role</option>
                    <option value="user" label="User">User</option>
                    <option value="rider" label="Rider">Rider</option>
                  </select>
                  {errors.role && touched.role ? <div className="error">{errors.role}</div> : null}<br/><br/>
         <button type="submit"id='button'>Register</button><br/>
         <p>Already have an Account? <Link to='/'> login</Link></p>
         </center>
       </Form>
       
       </div>
     )}
     
   </Formik>
   
   </div>

</div>

      </>
  )
}

export default Register;