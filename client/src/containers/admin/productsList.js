import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
const productListSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  price: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});
export const productsList = () => {
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          price: "",
          description: "",
        }}
        validationSchema={productListSchema}
        onSubmit={ (values) => {
          fetch("http://localhost:3005/products", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body:JSON.stringify(values),
          });
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="name" placeholder="Name of Products" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <br />
            <Field name="price" placeholder="price" />
            {errors.price && touched.price ? <div>{errors.price}</div> : null}
            <br />
            <Field
              name="description"
              type="description"
              placeholder="Description"
            />
            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default productsList;
