import '../../App.css';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({

});
const Login = () => (
    <div className='register'>
        <h1>Login</h1>
        <Formik
            initialValues={{
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
                // const requestOptions = {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(values)
                // };
                // fetch('http://localhost:3005/register', requestOptions)
            }}
        >
            {({ errors, touched }) => (
                <Form className='registerForm'>


                    <div>
                        <Field name="phoneNumber" placeholder="Phone Number" />
                        {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
                    </div>


                    <div>
                        <Field name="password" type="password" placeholder='Password' />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                    </div>

                    <div>
                        <select className='dropdown' name="userRole" id="userRole">
                            <option value="users">Users</option>
                            <option value="rider">Rider</option>

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

export default Login;