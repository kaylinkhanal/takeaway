import React, { useState } from "react";
// import "./login.css";
import { CustomButton } from "../../components/customButton";
import { Formik, Form, Field } from "formik";
import img from "../../image/login.png";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { addUserDetails } from "../../redux/actions/userAction"
import { useDispatch } from "react-redux";
// import { message, Alert,Space } from 'antd'
import { responseHandler } from "../../utils/responseHandler"
import HandlePassword from "../../components/handlePassword";



const Login = () => {

    // const [passwordVisible, setPasswordVisible] = useState(false);

    // const togglePasswordVisibility = () => {
    //     setPasswordVisible(!passwordVisible);
    // };

    console.log(`${process.env.REACT_APP_API_URL}/login`)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const usersSchema = Yup.object().shape({
        email: Yup.string()
            .min(5, "Too Short!")
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
                                const requestOptions = {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(values),
                                };
                                try {
                                    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, requestOptions);
                                    const data = await response.json()
                                    const alertMessage = responseHandler(response, data.errorMsg)
                                    alert(alertMessage)
                                    setTimeout(() => {
                                        dispatch(addUserDetails(data.userData))
                                    }, 2500)
                                    //   resetForm({ values: '' })
                                }
                                catch (error) {
                                    alert(error)
                                }

                            }}
                        >

                            {({ errors, touched }) => (
                                <div style={{ display: "flex", alignItem: 'center', justifyContent: 'center' }}>


                                    <Form  >

                                        <div>
                                            <Field name="email" placeholder="email" />
                                            {errors.email && touched.email ? (
                                                <div className="validaton-message">{errors.email}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                                {<HandlePassword />}

                                            {errors.password && touched.password ? (
                                                <div className="validaton-message">{errors.password}</div>
                                            ) : null}
                                        </div>

                                        <CustomButton name='Submit' type="submit" />
                                    </Form >
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
