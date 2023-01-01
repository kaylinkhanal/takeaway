import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const productSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number().required('Price is required'),
  description: Yup.string().required('Description is required'),
});

const Products = () => {
  return (
    <Formik
      initialValues={{ name: '', 
                    price: '', 
                    description: '' }}
      validationSchema={productSchema}
      onSubmit={(values) => {
        const postRequest={
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }
        
        fetch('http://localhost:3005/products',postRequest)

      }
    }
  
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name" type="text" placeholder="Name" />
          {errors.name && touched.name ? <div>{errors.name}</div> : null}

          <Field name="price" type="number" placeholder="Price" />
          {errors.price && touched.price ? <div>{errors.price}</div> : null}

          <Field name="description" type="text" placeholder="Description" />
          {errors.description && touched.description ? (
            <div>{errors.description}</div>
          ) : null}
          
          <button type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default Products
