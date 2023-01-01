import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Products = () => {
 
   
      const productsSchema = Yup.object().shape({
      Name: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
     price: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
 });
 return (
  <div>
  <h1>Signup</h1>
  <Formik
    initialValues={{
      Name: '',
      price: '',
      feedback: '',
    }}
    validationSchema={productsSchema}
    
    onSubmit={values => {  
      console.log(values);
       const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };
  fetch('http://localhost:3005/products',requestOptions)
      // same shape as initial values
     console.log(values)
    }}
  >
    {({ errors, touched }) => (
      <Form>
        <Field name="Name" placeholder ="name"/>
        {errors.Name && touched.Name ? (
          <div>{errors.Name}</div>
        ) : null}
        <br/>
        <Field name="price" placeholder="price"/>
        {errors.price && touched.price ? (
          <div>{errors.price}</div>
        ) : null}
        <br/>
        <Field name="feedback" placeholder="feedback"/>
        {errors.feedback && touched.feedback ? <div>{errors.feedback}</div> : null}
        
        <button type="submit">Submit</button>
      </Form>
    )}
  </Formik>
</div>
  );
}

export default Products
