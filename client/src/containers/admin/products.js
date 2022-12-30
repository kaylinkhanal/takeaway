import React, {useState, useEffect} from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
const Products = () => {
    const productsSchema = Yup.object().shape({
        name: Yup.string()
          .min(1, 'Too Short!')
          .max(100, 'Too Long!')
          .required('Required'),
      });
    return (
        <>
 <Formik
       initialValues={{
        name: '',
       }}
       validationSchema={productsSchema}
       onSubmit={values => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
         fetch('http://localhost:3005/products',requestOptions )
       }}
     >
       {({ errors, touched }) => (
         <Form>
           <Field name="name" placeholder="name"/>
           {errors.name && touched.name ? (
             <div>{errors.name}</div>
           ) : null}
           <br/>
           <Field name="price" placeholder="price"/>
           {errors.price && touched.price ? (
             <div>{errors.price}</div>
           ) : null}
           <br/>
           <Field name="description"
            placeholder="description" type="description" />
           {errors.description && touched.description ? <div>{errors.description}</div> : null}
           <button type="submit">Submit</button>
         </Form>
       )}
     </Formik>
        </>
    )
}

export default Products;

