import React from "react";
// import "./register.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/Button";
import img from "../../image/register.jpg";
import { Link } from "react-router-dom";

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

    confirmPassword: Yup.string()
      .min(5, "Too Short!")
      .max(100, "Too Long!")
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),

    role: Yup.string().required("Required"),
  });

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
                try {
                  fetch("http://localhost:3005/register", requestOptions).then(
                    (response) => {
                      if (!response.ok) {
                        console.log(response);
                        alert(response.statusText);
                      }
                    }
                  );
                  resetForm({ values: "" });
                } catch (err) {
                  alert(err);
                }
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
                      name="confirmPassword"
                      placeholder="confirmPassword"
                      type="password"
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div className="validaton-message">
                        {errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <Field as="select" name="role" placeholder="Account Type">
                      <option value="">Account Type</option>
                      <option value="user">User</option>
                      <option value="rider">Rider</option>
                    </Field>
                    {errors.role && touched.role ? (
                      <div className="validaton-message">{errors.role}</div>
                    ) : null}
                  </div>
                  {/* <button className="btn" type="submit">
                                        Submit
                                    </button> */}
                  <Button name="Submit" type="submit" />
                </Form>
              )}
            </Formik>
          </div>
          <div className="right-side">
            <div className="img-box">
              <img src={img} alt="Logo" />
              <div className="">
                <span>
                  Already have an account <Link to="/">Login..</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
