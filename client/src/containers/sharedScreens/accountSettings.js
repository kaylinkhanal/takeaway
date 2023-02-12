import { Modal } from "antd";
import { useState } from "react";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { message } from 'antd';
import { CustomButton } from "../../components/customButton";
import { useNavigate } from "react-router-dom";
import { responseHandler } from "../../utils/responseHandler"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { logoutResetDetails } from "../../redux/actions/userAction"
const AccountingSettings = () => {
    const [showPassword, setShowPassword] = useState(true)
    const dispatch = useDispatch()
    const { _id } = useSelector(state => state.user)
    const usersSchema = Yup.object().shape({

        currentPassword: Yup.string()
            .min(5, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),

        newPassword: Yup.string()
            .min(5, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),

        confirmPassword: Yup.string()
            .min(5, "Too Short!")
            .max(100, "Too Long!")
            .required("Required")
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),

    });
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <>
            <Modal
                footer={null}
                onCancel={() => setIsModalOpen(false)}
                open={isModalOpen}>
                <h3>Change Password</h3>
                <Formik
                    initialValues={{

                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    }}
                    validationSchema={usersSchema}
                    onSubmit={async (values) => {
                        const { confirmPassword, ...updatedValues } = values
                        const requestOptions = {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(updatedValues),
                        };
                        try {
                            const res = await fetch(`${process.env.REACT_APP_API_URL}/changePassword?_id=${_id}`, requestOptions)
                            const data = await res.json()
                            const notify = responseHandler(res, data.errorMsg)
                            toast(notify)
                            if (res.status === 200) {
                                message.success(data.msg, [2])
                                dispatch(logoutResetDetails())
                                navigate('/')
                            } else {
                                message.error(data.msg, [2])
                            }
                        } catch (error) {
                            toast.error('error', { position: toast.POSITION.TOP_CENTER });
                        }
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div>
                                <Field
                                    name="currentPassword"
                                    placeholder="Current Password"
                                    type={showPassword ? 'password' : 'text'}
                                />
                                {errors.currentPassword && touched.currentPassword ? (
                                    <div className="validaton-message">{errors.currentPassword}</div>
                                ) : null}
                            </div>
                            <div>
                                <Field
                                    name="newPassword"
                                    placeholder="New Password"
                                    type={showPassword ? 'password' : 'text'}
                                />
                                {errors.newPassword && touched.newPassword ? (
                                    <div className="validaton-message">{errors.newPassword}</div>
                                ) : null}
                            </div>
                            <div>
                                <Field
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    type={showPassword ? 'password' : 'text'}
                                />
                                <div onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Show" : "Hide"}</div>
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <div className="validaton-message">
                                        {errors.confirmPassword}
                                    </div>
                                ) : null}
                            </div>
                            <CustomButton name="Change Password" type="submit" />
                        </Form>
                    )}
                </Formik>
            </Modal>

            <h1>Account Settings</h1>
            <div className="account_settings">
                <button>Change User Name</button>
                <button onClick={() => setIsModalOpen(true)}>Change Password</button>
                <button >Deactivate Account</button>
            </div>
        </>
    );
}
export default AccountingSettings;