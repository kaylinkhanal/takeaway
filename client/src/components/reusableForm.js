import { Formik, Field, Form } from 'formik';
import { useState } from 'react'
import { message } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { addItems } from '../utils/addItems';

const ReusableForm = ({ isAdminEdit, item, handleCancel, fetchAvailableItems }) => {
  const [file, setFile] = useState("")
  const itemSchema = Yup.object().shape({
    catagoryName: Yup.string()
      .min(3, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    minimumDeliveryPrice: Yup.string()
      .required("Required"),
    file: Yup.mixed().test("hasFile", "Image required", values => {
      if (file) return true
      console.log(file)
      return false
    })
  });
  return (
    <>
      {/* Start  Add Items */}
      <h1>{isAdminEdit ? 'Edit Items' : 'Add Items'}</h1>
      <Formik
        initialValues={item ||
        {
          catagoryName: "",
          minimumDeliveryPrice: "",
          photo: ""
        }
        }
        validationSchema={itemSchema}

        onSubmit={async (values) => {
          debugger;
          addItems(values, file, isAdminEdit, message, fetchAvailableItems, handleCancel)

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
              <div>
                <input type='file' onChange={(e) => setFile(e.target.files[0])} className=''></input>
              </div>
              <button className="button" onClick={() => file ? addItems() : message.error("Please Fill the form completely", [2])}>{isAdminEdit ? 'Save Item' : 'Add Item'}</button>
            </Form>
          </div>
        )}
      </Formik>

      {/* End  Add Items */}
    </>
  )
}

export default ReusableForm