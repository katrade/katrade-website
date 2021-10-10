import { useState } from 'react';
import { useForm } from '../../utils/useForm';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLoading from '../../hooks/useLoading';

export default function AccountComp(data: any) {
    const accountData = data.data;
    const [form, handleForm] = useForm();
    const [show, hide] = useLoading();
    const [showPassword, setShowPassword] = useState(1);

    const onFormSubmit  = async () =>  {
        alert("ยังไม่เสร็จ!!!")
    }

    return (
        <div>
            <div className="bg-white row mx-auto mb-4 p-3" style={{ width: "100%" }}>
                <div className="">
                    <h4 className="mb-4">Change Password</h4>
                        <div className="row mb-3" style={{width:"100%"}}>
                            <label className="col-lg-3 col-form">Current Password</label>
                            <input 
                                //value={form.password || ""}
                                onChange={handleForm}
                                name="currentPassword"
                                className={"input-register w-100 px-3 col-lg-6 mx-3"} type={showPassword === 1 ? "password" : "text"} 
                                placeholder="Enter your current password"
                            />
                            <a className="blue-font-link col-auto text-end px-4" href={`/app/forgotpassword`} target="_blank">Forgot Password?</a>
                        </div>
                        <div className="row mb-3" style={{width:"100%"}}>
                            <label className="col-lg-3 col-form">New Password</label>
                            <input
                                onChange={handleForm}
                                name="newPassword" 
                                className={"input-register w-100 px-3 col-lg-6 mx-3"} type={showPassword === 1 ? "password" : "text"} 
                                placeholder="Enter your new password"
                            />
                        </div>
                        <div className="row mb-4" style={{width:"100%"}}>
                            <label className="col-lg-3 col-form">Confirm New Password</label>
                            <input
                                onChange={handleForm}
                                name="confirmNewPassword" 
                                className={"input-register w-100 px-3 col-lg-6 mx-3"}  type={showPassword === 1 ? "password" : "text"} 
                                placeholder="Confirm your new password"
                            />
                        </div>
                        <div className="row mb-3"  style={{width:"100%"}}>
                            <div className="offset-lg-3">
                                <button type="button" className="btn btn-success px-2 mx-1" onClick={onFormSubmit}>Save Changes</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}