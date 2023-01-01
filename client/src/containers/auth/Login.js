import React from "react";
// import "./login.css";
import { Button } from "../../components/Button";
import { Formik, Form, Field } from "formik";
import img from "../../image/login.png";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const Login = () => {

    const usersSchema = Yup.object().shape({
        username: Yup.string()
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
                                username: "",
                                password: "",

                            }}
                            validationSchema={usersSchema}
                            onSubmit={(values, { resetForm }) => {
                                const requestOptions = {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(values),

                                };
                                fetch("http://localhost:3005/add-user", requestOptions);
                                console.log(values);
                                resetForm({ values: '' })
                            }}
                        >

                            {({ errors, touched }) => (
                                <div style={{display:"flex",alignItem:'center',justifyContent:'center'}}>
                                <Form >

                                    <div>
                                        <Field name="username" placeholder="Username " />
                                        {errors.username && touched.username ? (
                                                <div className="validaton-message">{errors.username}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <Field name="password" placeholder="Password" type="password" />
                                        {errors.password && touched.password ? (
                                                <div className="validaton-message">{errors.password}</div>
                                        ) : null}
                                    </div>

                                    <Button name='Submit' type="submit" />
                                </Form>
                                </div>
                            )}
                        </Formik>
                    </div>
                    <div className="right-side">

                        <div className="img-box">
                            <img src={img} alt="Logo"width={300}/>
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
