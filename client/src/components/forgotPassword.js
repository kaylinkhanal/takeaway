import React from 'react';
import { Formik, Form, Field } from "formik";
import { CustomButton } from './customButton';
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";



const ForgotPassword = () => {
const usersSchema = Yup.object().shape({
        email: Yup.string()
            .min(3, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),
        });   
const navigate = useNavigate()
  return(

        <>
    <div className="login-area">
        <div className="login-box" >
            <div className="left-side"></div>
            <h3> Forgot Password </h3>
            <Formik
                initialValues={{
                    email: "",
                }}
                validationSchema={usersSchema}>
                {({ errors, touched }) => (
                    <div style={{ display: "flex", alignItem: 'center', justifyContent: 'center' }}>
                        <Form >
                            <div>
                                <Field name="email" placeholder="email"  />
                                {errors.email && touched.email ? (
                                    <div className="validaton-message">{errors.email}</div>
                                ) : null}
                            </div>
                            <CustomButton name='Submit' type="submit" onClick ={() => navigate ('/resetPassword')}/>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    </div>
    </>                
   );
};


export default ForgotPassword;

