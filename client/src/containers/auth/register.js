import '../../App.css';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string().required("Not a valid password")
        .oneOf([Yup.ref('password'), null]).min(8, 'Error')
        .oneOf([Yup.ref('password'), null]).matches(/[a-z]/, "Error")
        .oneOf([Yup.ref('password'), null]).matches(/[A-Z]/, "Error")
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Atlease one character')
        .matches(/[0-9]/, 'Atleast  one number'),

        conformPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    role: Yup.string().required('Required'),

});
const Register = () => (
    <div className='register'>
        <h1>Signup</h1>
        <Formik
            initialValues={{
                name: "",
                email: "",
                phoneNumber: "",
                password: "",
                conformPassword: "",
                country: "",
                address: "",
                role: ""
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values)
                };
                fetch('http://localhost:3005/register', requestOptions)
            }}
        >
            {({ errors, touched }) => (
                <div className='form'>
                    <Form className='registerForm'>
                        <div>
                            <Field name="name" placeholder='Name' />
                            {errors.name && touched.name ? (
                                <div>{errors.name}</div>
                            ) : null}
                        </div>
                        <div>
                            <Field name="email" type="email" placeholder="Email eg tul@gmail.com" />
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}
                        </div>
                        <div>
                            <Field name="phoneNumber" placeholder="Phone Number" />
                            {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
                        </div>
                        <div>
                            <Field name="country" placeholder='Country' />{errors.country && touched.country ? (
                                <div>{errors.country}</div>
                            ) : null}
                        </div>
                        <div>
                            <Field name="address" placeholder='Address' />{errors.address && touched.address ? (
                                <div>{errors.address}</div>
                            ) : null}
                        </div>
                        <div>
                            <Field name="password" type="password" placeholder='Password' />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                        </div>
                        <div>
                            <Field name="conformPassword" type="password" placeholder='Conform Password' />
                            {errors.conformPassword && touched.conformPassword ? <div>{errors.conformPassword}</div> : null}
                        </div>
                        <div>
                            <Field as="select" className="dropdown" name="role" placeholder="Account Type">
                                <option value="">Account Type</option>
                                <option value="user">User</option>
                                <option value="rider">Rider</option>

                            </Field>
                            {errors.role && touched.role ? (
                                <div className="validaton-message">{errors.role}</div>
                            ) : null}</div>
                        <div >
                            <button className='button' type="submit">Submit</button>
                            <Link to="/"className='createnew'> <button className='button' type="submit">Back to login</button></Link>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    </div>
);
export default Register