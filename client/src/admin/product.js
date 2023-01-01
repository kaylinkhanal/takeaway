// import React, { Component } from 'react'
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';

// const SignupSchema = Yup.object().shape({
//     firstName: Yup.string()
//       .min(2, 'Too Short!')
//       .max(50, 'Too Long!')
//       .required('Required'),
//     lastName: Yup.number()
//       .min(0, 'Too Short!')
//       .max(50, 'Too Long!')
//       .required('Required'),
//     email: Yup.string().email('Invalid email').required('Required'),
//   });

//   const a = () => {
//     fetch(
//         "http://localhost:3005/products")
//         .then((res) => res.json())
//         .then((json) => {
//             this.setState({
//                 items: json,
//                 DataisLoaded: true
//             });
//         })
//         console.log(JSON.stringify())
//   }
  
//   export const Product = () => (
//     <div>
//       <h1>Signup</h1>
//       <Formik
//         initialValues={{
//           firstName: '',
//           lastName: '',
//           email: '',
//         }}
//         validationSchema={SignupSchema}
//         onSubmit={values => {
//           // same shape as initial values
//           console.log(values);
//         }}
//       >
//         {({ errors, touched }) => (
//           <Form>
//             <Field name="firstName" />
//             {errors.firstName && touched.firstName ? (
//               <div>{errors.firstName}</div>
//             ) : null}
//             <Field name="lastName" />
//             {errors.lastName && touched.lastName ? (
//               <div>{errors.lastName}</div>
//             ) : null}
//              <Field name="firstName" />
//             {errors.firstName && touched.firstName ? (
//               <div>{errors.firstName}</div>
//             ) : null}
//             <button type="submit" onClick={()=> {a()}}>Submit</button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );

// export default Product


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