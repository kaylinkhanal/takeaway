import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const ReusableForm =(props)=>{
  const itemSchema = Yup.object().shape({
    catagoryName: Yup.string()
      .min(5, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    minimumDeliveryPrice: Yup.string()
      .required("Required"),
  });
    return(
        <>
             {/* Start  Add Items */}
             <h1>Add Items</h1>
        <Formik
          initialValues={props.item}
          validationSchema={itemSchema}
          onSubmit={async (values, { resetForm }) => {
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            };
            const res = await fetch(
              "http://localhost:3005/additem",
              requestOptions
            );
            const data = await res.json();
            if (res.status === 200) {
              alert(data.msg)
            } else {
              alert(data.msg);
            }
            resetForm({ values: "" });
          }}
        >
          {({ errors, touched }) => (
            <div>
              <Form>
                <div>
                  <Field name="catagoryName" placeholder="Catagory Name" />
                  {errors.catagoryName && touched.catagoryName ? (
                    <div className="validaton-message">{errors.catagoryName}</div>
                  ) : null}
                </div>
                <div>
                  <Field
                    name="minimumDeliveryPrice"
                    placeholder="minimum delivery price"
                    type="number"
                  />
                  {errors.minimumDeliveryPrice && touched.minimumDeliveryPrice ? (
                    <div className="validaton-message">{errors.minimumDeliveryPrice}</div>
                  ) : null}
                </div>
                <button className="button" name="Sumbit" type="submit">Add Item</button>
              </Form>
            </div>
          )}
        </Formik>

        {/* End  Add Items */}
        </>
    )
} 

export default ReusableForm