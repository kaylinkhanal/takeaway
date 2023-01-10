import React from "react";
import { Formik, Form, Field, } from "formik";
import { Link } from "react-router-dom";
import { Button } from "./Button"
import * as Yup from "yup";

const CustomForm = () => {
  const usersSchema = Yup.object().shape({
    password: Yup.string()
      .min(5, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
  });
  return (
    <Formik
      // initialValues={}
      validationSchema={usersSchema}
      // onSubmit={async (values, { resetForm }) => {
      //   null;
      // }}
    >
      {({ errors, touched }) => (
        <div
          style={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
          }}
        >
          <Form>
            <div>
              <Field name="password" placeholder="Password" type="password" />
              {errors.password && touched.password ? (
                <div className="validaton-message">{errors.password}</div>
              ) : null}
            </div>
            <Button name="Submit" type="submit" />
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CustomForm;
