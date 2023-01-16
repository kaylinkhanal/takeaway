import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { CustomButton } from "./customButton";
import * as Yup from "yup";
import axios from "axios";

const CustomForm = (props) => {
  const usersSchema = Yup.object().shape({
    password: Yup.string()
      .min(5, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
  });
  const [formStep, setFormStep] = useState(1);

  const handleBackClick = () => {
    if (formStep !== 1) {
      setFormStep(formStep - 1);
    }
  };

  return (
    <Formik
      initialValues={{}}
      // validationSchema={usersSchema}
      onSubmit={async (values, { resetForm }) => {
        if (formStep === 1) {
          setFormStep(formStep + 1);
        } else {
          axios.post(`http://localhost:3005/${props.endpoint}`, values);
        }
      }}
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
            {formStep === 1 ? (
              <>
                {props.itemDetails.map((item) => {
                  return (
                    <div>
                      <Field
                        name={item}
                        key={item}
                        placeholder={item}
                        type={item == "password" ? "password" : "text"}
                      />
                      {errors[item] && touched[item] ? (
                        <div className="validaton-message">{errors[item]}</div>
                      ) : null}
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {props.senderDetails.map((item) => {
                  return (
                    <div>
                      <Field
                        name={item}
                        key={item}
                        placeholder={item}
                        type={item == "password" ? "password" : "text"}
                      />
                      {errors[item] && touched[item] ? (
                        <div className="validaton-message">{errors[item]}</div>
                      ) : null}
                    </div>
                  );
                })}
              </>
            )}

            {formStep >= 2 && (
              <CustomButton
                name="Back"
                onClick={handleBackClick}
                type="submit"
              />
            )}
            <CustomButton
              name={formStep === 1 ? "Next" : "Submit"}
              type="submit"
            />
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CustomForm;
