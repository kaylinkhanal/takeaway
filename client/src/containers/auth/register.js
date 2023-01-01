import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const UserSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password:Yup.string()
    .min(8,'atleast 8 character')
    .matches('/[0-9]/','number is required')
    .matches('/[A-Z]/','atleast 1 capital letter'),
    phoneNumber: Yup.string()
    .min(10,'atleast 10 numbers')
      .max(10, 'Too Long!')
      .required('Required'),
      country: Yup.string()
      .required('Required'),
      address: Yup.string()
      .required('Required'),
      userRole:Yup.string()
      .required('Required'),
  });
  
 export const Register = (props) => (
    <div className='auth-form-container'>
      <h2> Register </h2>
    <Formik
       initialValues={{
        fullName: '',
         email: '',
        password: '',
        phoneNumber:'',
        country:'',
        address:'',
        userRole:'',
       }}
       validationSchema={UserSchema}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ errors, touched }) => (
         <Form className="register-form">
           <Field name="fullName" type="fullName" id="fullName" placeholder="fullName" />
           {errors.fullName && touched.fullName ? (<div>{errors.fullName}</div>
           ) : null}
           <br/>
           <Field name="email" type="email" placeholder="youremail@gmail.com" />
           {errors.email && touched.email ? <div>{errors.email}</div> : null}
           <br/>
           <Field name="password" type="password" placeholder="**********" />
           {errors.password && touched.password ? <div>{errors.password}</div> : null}
           <br/>
           <Field name="phoneNumber" type="phoneNumber" placeholder="phoneNumber" />
           {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
           <br/>
           <Field name="country" type="country" placeholder="country" />
           {errors.country && touched.country ? <div>{errors.country}</div> : null}
           <br/>
           <Field name="address" type="address" placeholder="address" />
           {errors.address && touched.address ? <div>{errors.address}</div> : null}
           <br/>
           <Field name="userRole" type="userRole" placeholder="userRole" />
           {errors.userRole && touched.userRole ? <div>{errors.userRole}</div> : null}
           <br/>
           <button type="submit">Register</button>
           <br/>
           <button className="link-btn" onClick={()=> props.onFormSwitch('login')}> Already have an account? Login here. </button>
         </Form>
       )}
     </Formik>
     </div>
     
 );
 export default Register;