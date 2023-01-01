import React from "react";
// import "./register.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/Button";
import img from "../../image/register.jpg";

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

    email: Yup.string().email("Invalid email").required("Required"),

    phone: Yup.number().required("Required"),

    username: Yup.string()
      .min(5, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    password: Yup.string()
      .min(5, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    role: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="register-container">
        <div className="form-container">
          <h1 className="title">Create an account !!!</h1>

          <div className="innerform">
            <Formik
              initialValues={{
                name: "",
                address: "",
                email: "",
                username: "",
                phone: "",
                password: "",
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
                resetForm({ values: "" });
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
                    <Field
                      name="password"
                      placeholder="Password"
                      type="password"
                    />
                    {errors.password && touched.password ? (
                      <div className="validaton-message">{errors.password}</div>
                    ) : null}
                  </div>
                  <div>
                    <Field
                      as="select"
                      name="role"
                      placeholder="Account Type"
                      className="acc_type"
                    >
                      <option value="">Account Type</option>
                      <option value="user">User</option>
                      <option value="rider">Rider</option>
                    </Field>
                    {errors.role && touched.role ? (
                      <span className="validaton-message">{errors.role}</span>
                    ) : null}
                  </div>
                 
                  <div className="btn-cont">
                    <Button name="Submit" type="submit" />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="image-container">
          <img src={img} alt="hero-avatar" />
        </div>
      </div>
    </>
  );
};

export default Register;
