import React, { useState } from 'react'
import { Field } from "formik";
import './handlePassword.css'
import { BsFillEyeFill,BsFillEyeSlashFill } from "react-icons/bs";

const HandlePassword = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return (
        <>
        <div className='pass-wrapper'>
            <Field name="password" placeholder="Password"
                type={passwordVisible ? "text" : "password"} id="password" />
            <button type="button" onClick={togglePasswordVisibility}>
                {passwordVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill/>}
            </button>
            </div>
        </>
    )
}

export default HandlePassword