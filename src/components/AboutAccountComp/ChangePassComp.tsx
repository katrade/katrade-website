import { useState } from 'react';
import { useForm } from '../../utils/useForm';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLoading from '../../hooks/useLoading';
import axios from 'axios';
import { API } from '../../app.setting.json';
import useAuthorization from '../../hooks/useAuthorization';
import InputValidation from "../InputValidation";

export default function AccountComp(data: any) {
    const accountData = data.data;
    const history = useHistory();
    const [form, handleForm] = useForm();
    const [show, hide] = useLoading();
    const [showPassword, setShowPassword] = useState(1);
    const {changePasswordSubmit} = useAuthorization();

    const [currentPassword , setCurrentPassword] = useState<string>("");
    const [newPassword , setNewPassword] = useState<string>("");
    const [confirmNewPassword , setConfirmNewPassword] = useState<string>("");

    const [validType, setValidType] = useState("0")
    const [showAlert1, setShowAlert1] = useState("0")
    const [showAlert2, setShowAlert2] = useState("0")
    const [showAlert3, setShowAlert3] = useState("0")
    
    useEffect(() => {
        if (newPassword != confirmNewPassword) {
            setValidType("does not match");
            setShowAlert3("1");
        }
        if (newPassword == confirmNewPassword) {
            setShowAlert3("0");
        }
        if (newPassword == null && confirmNewPassword == null) {
            setShowAlert3("0");
        }
    }, [confirmNewPassword, newPassword])
    
    
    return (
        <div>
            <div className="bg-white row mx-auto mb-4 p-3" style={{ width: "100%" }}>
                <div className="">
                    <h4 className="mb-4">Change Password</h4>
                        <div className="row mb-3" style={{width:"100%"}}>
                            <label className="col-lg-3 col-form">Current Password</label>
                            <input 
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                name="currentPassword"
                                className={"input-register w-100 px-3 col-lg-6 mx-3"} type={showPassword === 1 ? "password" : "text"} 
                                placeholder="Enter your current password"
                            />
                            <a className="blue-font-link col-auto text-end px-4" href={`/app/forgotpassword`} target="_blank">Forgot Password?</a>
                            <div className="offset-lg-3 px-3"><InputValidation valid={validType} name="current password" showMes={showAlert1} /></div>
                        </div>
                        <div className="row mb-3" style={{width:"100%"}}>
                            <label className="col-lg-3 col-form">New Password</label>
                            <input
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                name="newPassword" 
                                className={"input-register w-100 px-3 col-lg-6 mx-3"} type={showPassword === 1 ? "password" : "text"} 
                                placeholder="Enter your new password"
                            />
                            <div className="offset-lg-3 px-3"><InputValidation valid={validType} name="new password" showMes={showAlert2} /></div>
                        </div>
                        <div className="row mb-5" style={{width:"100%"}}>
                            <label className="col-lg-3 col-form">Confirm New Password</label>
                            <input
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                name="confirmNewPassword" 
                                className={"input-register w-100 px-3 col-lg-6 mx-3"}  type={showPassword === 1 ? "password" : "text"} 
                                placeholder="Confirm your new password"
                            />
                            <div className="offset-lg-3 px-3"><InputValidation valid={validType} name="confirm new password" showMes={showAlert3} /></div>
                        </div>
                        <div className="row mb-3"  style={{width:"100%"}}>
                            <div className="offset-lg-3">
                                <button type="button" className="btn btn-success px-2 mx-1" onClick={() => changePasswordSubmit(currentPassword, newPassword, confirmNewPassword)}>Save Changes</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}