import '../../App.css';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

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

    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    email: Yup.string().email('Invalid email').required('Required')
});
const Register = () => (
    <div className='register'>
        <h1>Signup</h1>
        <Formik
            initialValues={{
                name: '',
                password: '',
                conformPassword: '',
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
                        <select className='dropdown' name="userRole" id="userRole">
                            <option value="users" id="userRole" name="userRole">Users</option>
                            <option value="rider" id="userRole" name="userRole">Rider</option>

                        </select>
                    </div>
                    <div >

                        <button className='button' type="submit">Submit</button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
);

export default Register