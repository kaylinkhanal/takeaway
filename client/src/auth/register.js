import React, {useState, useEffect} from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
const Register = () => {
    const registerSchema = Yup.object().shape({
            name: Yup.string()
              .min(2, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Required'),
            userName: Yup.string()
              .min(2, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Required'),  
            number: Yup.number()
                .min(0, 'Too Short!')
                .required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().required(),
            confirm_password: Yup.string().label('confirm password')
            .required()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
          });
    return (
        <>
 <Formik
       initialValues={{
        name: '',
        userName: '',
        number: '',
        role:'',
        email:'',
        password: ''
       }}
       validationSchema={registerSchema}
       onSubmit={values => {
        console.log(values)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
    
         fetch('http://localhost:3005/user',requestOptions )
       }}
     >
       {({ errors, touched }) => (
         <Form>
         name <Field name="name" />
         {errors.name && touched.name ? (
           <div>{errors.name}</div>
         ) : null}<br/>

         userName <Field name="userName" />
         {errors.userName && touched.userName ? (
           <div>{errors.userName}</div>
         ) : null}<br/>

          number<Field name="number" />
         {errors.number && touched.number ? (
           <div>{errors.number}</div>
         ) : null}<br/>

        role <select name="role" >
        <option value="" label="Role">Role</option>
        <option value="passenger" label="passenger">passenger</option>
        <option value="rider" label="rider">rider</option>
        </select>
        {errors.role && touched.role && <div className="role">{errors.role}</div>}<br/>

         email<Field name="email" />
         {errors.email && touched.email && <div>{errors.email}</div>}<br/>

         password<Field name="password" />
         {errors.password && touched.password ? (
           <div>{errors.password}</div>
         ) : null}<br/>

         confirm_password <Field name="confirm_password" />
         {errors.confirm_password && touched.confirm_password ? (
           <div>{errors.confirm_password}</div>
         ) : null}<br/>

         <button type="submit">Submit</button>
       </Form>
       )}
     </Formik>
        </>
    )
}

export default Register;