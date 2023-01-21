import React, { useState } from "react";
// import "./login.css";
import { CustomButton } from "../../components/customButton";
import { Formik, Form, Field } from "formik";
import img from "../../image/login.png";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { addUserDetails } from "../../redux/actions/userAction"
import { useDispatch } from "react-redux";
import { message } from 'antd';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(true)
    const usersSchema = Yup.object().shape({
        email: Yup.string()
            .min(3, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),

        password: Yup.string()
            .min(5, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),
    });
    return (
        <>
            <div className="login-area">
                <div className="login-box" >
                    <div className="left-side">
                        <h3>Welcome to login page</h3>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validationSchema={usersSchema}
                            onSubmit={async (values, { resetForm }) => {
                                // console.log(process.env.REACT_APP_API_URL)
                                const requestOptions = {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(values),
                                };
                                const res = await fetch('http://localhost:3005/login', requestOptions);
                                const data = await res.json()
                                if (data.isLogedin) {
                                    dispatch(addUserDetails(data.userData))
                                    message.success(data.msg, [3])
                                } else {
                                    message.error(data.errorMsg, [3])
                                }
                                resetForm({ values: '' })
                            }}
                        >
                            {({ errors, touched }) => (
                                <div style={{ display: "flex", alignItem: 'center', justifyContent: 'center' }}>
                                    <Form >
                                        <div>
                                            <Field name="email" placeholder="email" />
                                            {errors.email && touched.email ? (
                                                <div className="validaton-message">{errors.email}</div>
                                            ) : null}
                                        </div>
                                        <div className="password-field">
                                            <Field name="password" placeholder="Password" type={showPassword ? 'password' : 'text'} />
                                            <FontAwesomeIcon onClick={() => setShowPassword(!showPassword)} icon={showPassword ? faEye : faEyeSlash} className="show-password" />
                                        </div>
                                        {errors.password && touched.password ? (
                                            <div className="validaton-message">{errors.password}</div>
                                        ) : null}
                                        <CustomButton name='Submit' type="submit" />
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </div>
                    <div className="right-side">
                        <div className="img-box">
                            <img src={img} alt="Logo" width={300} />
                            <div className="">
                                <span><Link to='/register'>Create an account </Link></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Login;
