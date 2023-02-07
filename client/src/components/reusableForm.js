import { Formik, Field, Form } from 'formik';
import {useState} from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

const ReusableForm =({isAdminEdit, item, handleCancel})=>{
  const [file, setFile] = useState(null)
  const itemSchema = Yup.object().shape({
    catagoryName: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),

    minimumDeliveryPrice: Yup.string()
      .required("Required"),
      file: Yup.mixed().test("hasFile", "Image required", values=> {
        if(file) return true
        console.log(file)
        return false
      })
  });
    return(
        <>
             {/* Start  Add Items */}
             <h1>{isAdminEdit ? 'Edit Items': 'Add Items'}</h1>
        <Formik
          initialValues={item || {}}
          validationSchema={itemSchema}
          onSubmit={async (values, { resetForm }) => {
            //
            //
           
          }}
        >
          {({ errors, touched, handleChange }) => (
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
                <input type="file" onChange={(e)=>{
                  setFile(e.target.files[0])
                  handleChange()
                  }} name="file"/>
                {errors.file && touched.file ? (
                    <div className="validaton-message">{errors.file}</div>
                  ) : null}
                <button className="button" name="Sumbit" type="submit" >{isAdminEdit ? 'Save Item' :'Add Item'}</button>
              </Form>
            </div>
          )}
        </Formik>

        {/* End  Add Items */}
        </>
    )
} 

export default ReusableForm