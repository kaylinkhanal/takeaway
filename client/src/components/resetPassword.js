import React from 'react';
import { Formik, Form, Field } from "formik";
import { CustomButton } from './customButton';
import * as Yup from "yup";

    const ResetPassword = () => {
    const usersSchema = Yup.object().shape({
        password: Yup.string()
            .min(5, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),
        });   
  return(

        <>
    <div className="login-area">
        <div className="login-box" >
            <div className="left-side"></div>
            <h3> Reset Password </h3>
            <Formik
                initialValues={{
                    email: "",
                }}
                validationSchema={usersSchema}>
                {({ errors, touched }) => (
                    <div style={{ display: "flex", alignItem: 'center', justifyContent: 'center' }}>
                        <Form >
                        <div>
                    <Field name="password" placeholder="Password" type="password"/>
                    {errors.password && touched.password ? (
                      <div className="validaton-message">{errors.password}</div>
                    ) : null}
                  </div>
                            <CustomButton name='Submit' type="submit" />
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    </div>
    </>                
   );
};


export default ResetPassword;

