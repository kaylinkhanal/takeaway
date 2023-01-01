import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const loginSchema = Yup.object().shape({
        name: Yup.string()
          .min(1, 'Too Short!')
          .max(100, 'Too Long!')
          .required('Required'),
          password:Yup.string()
          .required()
      });
  return (
    <>
      <Formik
       initialValues={{
        name: '',
        password:''
       }}
       validationSchema={loginSchema}
       onSubmit={values => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
         fetch('http://localhost:3005/login',requestOptions )
       }}
     >
       {({ errors, touched }) => (
         <Form >
            <h1>Login Page</h1>
           <Field name="userid" placeholder="user id"/>
           {errors.userid && touched.userid ? (
             <div>{errors.userid}</div>
           ) : null}
           <br/>
           <Field name="password" type="password" placeholder="enter password"/>
           {errors.password && touched.password ? (
             <div>{errors.password}</div>
           ) : null}
           <br/>
           
           <button type="submit">Login</button>
         </Form>
       )}
     </Formik>
    </>
  )
}

export default Login
