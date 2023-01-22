import { Modal } from "antd";
import { useState } from "react";
const AccountingSettings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <>
            <Modal
                // footer={null}
                onCancel={() => setIsModalOpen(false)}
                open={isModalOpen}>
            </Modal>

            <h1>Account Settings</h1>
            <div className="account_settings">

                <button onClick={() => setIsModalOpen(true)}>Change User Name</button>
                <button onClick={() => setIsModalOpen(true)}>Change Profile Picture</button>
                <button onClick={() => setIsModalOpen(true)}>Change Password</button>
                <button onClick={() => setIsModalOpen(true)}>Delete Account</button>

            </div>
        </>
    );
}
export default AccountingSettings;