import React from "react";
// import "./register.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/Button";
import img from '../../image/register.jpg';
import { Link } from 'react-router-dom';
import { useState} from "react";

const Register = () => {

    const usersSchema = Yup.object().shape({
        name: Yup.string()
            .min(1, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),

        address: Yup.string()
            .min(5, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),

        email: Yup.string()
            .email("Invalid email")
            .required("Required"),

        phone: Yup.number()
            .required("Required"),

        username: Yup.string()
            .min(5, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),

        password: Yup.string()
            .min(5, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),

        role: Yup.string()
            .required("Required"),

        confirmPassword: Yup.string()
            .min(5, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),
    });




    const [input, setInput] = useState({

        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState({

        password: '',
        confirmPassword: ''
    })

    const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
        validateInput(e);
    }

    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (input.confirmPassword && value !== input.confirmPassword) {
                        stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
                    } else {
                        stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (input.password && value !== input.password) {
                        stateObj[name] = "Password and Confirm Password does not match.";
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    }





    return (
        <>
            <div className="register-area">
                <div className="register-box">
                    <div className="left-side">
                        <h3>Create an account</h3>
                        <Formik
                            initialValues={{
                                name: "",
                                address: "",
                                email: "",
                                username: "",
                                phone: "",
                                password: "",
                                confirmPassword: "",
                                role: "",
                            }}
                            validationSchema={usersSchema}
                            onSubmit={(values, { resetForm }) => {
                                const requestOptions = {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(values),

                                };
                                fetch("http://localhost:3005/register", requestOptions);
                                console.log(values);
                                resetForm({ values: '' })
                            }}
                        >

                            {({ errors, touched }) => (
                                <Form>
                                    <div>
                                        <Field name="name" placeholder="Name" />
                                        {errors.name && touched.name ? (
                                            <div className="validaton-message">{errors.name}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <Field name="address" placeholder="Address" />
                                        {errors.address && touched.address ? (
                                            <div className="validaton-message">{errors.address}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <Field name="email" placeholder="Email.." />
                                        {errors.email && touched.email ? (
                                            <div className="validaton-message">{errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <Field name="phone" placeholder="Phone.." />
                                        {errors.phone && touched.phone ? (
                                            <div className="validaton-message">{errors.phone}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <Field name="username" placeholder="Username " />
                                        {errors.username && touched.username ? (
                                            <div className="validaton-message">{errors.username}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder='Enter Password'
                                            value={input.password}
                                            onChange={onInputChange}
                                            onBlur={validateInput}></input>
                                        {error.password && <span className='err'>{error.password}</span>}
                                    </div>

                                    <div>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder='Enter Confirm Password'
                                            value={input.confirmPassword}
                                            onChange={onInputChange}
                                            onBlur={validateInput}></input>
                                        {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
                                    </div>

                                    <div>
                                        <Field as="select" name="role" placeholder="Account Type">
                                            <option value="">Account Type</option>
                                            <option value="user">User</option>
                                            <option value="rider">Rider</option>

                                        </Field>
                                        {errors.role && touched.role ? (
                                            <div className="validaton-message">{errors.role}</div>
                                        ) : null}</div>
                                    {/* <button className="btn" type="submit">
                                        Submit
                                    </button> */}
                                    <Button name='Submit' type="submit" />
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="right-side">

                        <div className="img-box">
                            <img src={img} alt="Logo" />
                            <div className="">
                                <span>Already have an account <Link to='/'>Login..</Link></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Register;
