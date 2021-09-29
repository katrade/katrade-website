import { useState } from 'react';
import { useForm } from '../../utils/useForm';
import { useHistory } from 'react-router-dom';
import useLoading from '../../hooks/useLoading';

export default function AccountComp(data: any) {
    const accountData = data.data;
    const [show, hide] = useLoading();
    const [showPassword, setShowPassword] = useState(1);

    return (
        <div>
            <div className="bg-white row mx-auto mb-4" style={{ width: "100%" }}>
                <div className="p-3">
                    <h4 className="mb-4">Change Password</h4>
                        <div className="row mb-3" style={{width:"100%"}}>
                            <label className="col-lg-3 col-form">Current Password</label>
                            <input 
                                className="input-none form-control border border-secondary px-2 col-lg-6 mx-3"  type={showPassword === 1 ? "password" : "text"} 
                                placeholder="current password"
                            />
                            <label className="blue-font-link col-auto text-end px-4" >Forgot Password?</label>
                        </div>
                        <div className="row mb-3" style={{width:"100%"}}>
                            <label className="col-lg-3 col-form">New Password</label>
                            <input 
                                className="input-none form-control border border-secondary px-2 col-lg-6 mx-3"  type={showPassword === 1 ? "password" : "text"} 
                                placeholder="new password"
                            />
                        </div>
                        <div className="row mb-4" style={{width:"100%"}}>
                            <label className="col-lg-3 col-form">Confirm New Password</label>
                            <input 
                                className="input-none form-control border border-secondary px-2 col-lg-6 mx-3"  type={showPassword === 1 ? "password" : "text"} 
                                placeholder="confirm new password"
                            />
                        </div>
                        <div className="row mb-3"  style={{width:"100%"}}>
                            <div className="offset-lg-3">
                                <button type="button" className="btn btn-success px-2 mx-1">Save Changes</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}