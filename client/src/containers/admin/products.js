import React, {useState, useEffect} from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { faBook, faCheck, faDollar, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Products = () => {
    const productsSchema = Yup.object().shape({
        name: Yup.string()
          .min(1, 'Too Short!')
          .max(100, 'Too Long!')
          .required('Required'),
      });
    return (
      <div style={{ display: 'flex', marginTop: '200px'}}>
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
         <Form style={{ margin: 'auto' }}>
           <div style={{ marginBottom: "10px" }}>
              <FontAwesomeIcon icon={faUser} />
              <Field name="name" placeholder="name" />
              {errors.name && touched.name ? (
                <div>{errors.name}</div>
              ) : null}
            </div>
           
            <div style={{ marginBottom: "10px" }}>
              <FontAwesomeIcon icon={faDollar} />
           <Field name="price" placeholder="price"/>
           {errors.price && touched.price ? (
             <div>{errors.price}</div>
           ) : null}
           </div>
          
           <div style={{ marginBottom: "10px" }}>
              <FontAwesomeIcon icon={faBook} />
           <Field name="description"
            placeholder="description" type="description" />
           {errors.description && touched.description ? <div>{errors.description}</div> : null}
           </div>
           <div style={{ marginBottom: "10px" }}>
              <FontAwesomeIcon icon={faCheck} />
           <button type="submit">Submit</button>
           </div>
         </Form>
       )}
     </Formik>
        </div>
    )
}

export default Products;

