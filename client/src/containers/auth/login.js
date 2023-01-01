import { useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const UserSchema = Yup.object().shape({
   email: Yup.string()
  .email('Invalid email').required('Required'),
  password:Yup.string()
  .min(8,'atleast 8 character')
  .matches('/[0-9]/','number is required')
  .matches('/[A-Z]/','atleast 1 capital letter')
  });

export const Login =(props)=>{
    const [email, setEmail]= useState('');
    const [pass, setPass] = useState('');
    console.log(email)

    return(
        <div className='auth-form-container'>
            <h2> Login </h2>
        <Formik
       initialValues={{
         email: '',
         password: '',
        
       }}
       validationSchema={UserSchema}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
        
       {({ errors, touched }) => (
         <Form className="login-form">
           <Field value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="youremail@gmail.com" />
           {errors.email && touched.email ? <div>{errors.email}</div> : null}
           <br/>
           <Field value={pass} onChange={(e) => setPass(e.target.value)} name="password" type="password" placeholder="**********" />
           {errors.password && touched.password ? <div>{errors.password}</div> : null}
            <br/>
           <button type="submit">Log In</button>
            <br/>
           <button className="link-btn" onClick={()=> props.onFormSwitch('register')}> Don't have an accoutn? Register here. </button>
         </Form>
        
       )}
     </Formik>
     </div>
    )
}

export default Login;