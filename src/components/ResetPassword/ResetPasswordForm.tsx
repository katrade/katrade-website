import { SolidButton } from '../standard/Button';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../utils/useForm';
import { useEffect, useState } from 'react';
import useLoading from '../../hooks/useLoading';
import { API } from '../../app.setting.json'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

import { H4, H5 }  from '../standard/H';
import Div from '../standard/Div';
import P from '../standard/P';

const queryString = require("query-string");

export function ForgotPasswordForm() {
    const history = useHistory();
    const [show, hide] = useLoading();
    const [email , setEmail] = useState<string>("");

    const submitEmail = async () => {
        let data: any = {
            email: email,
        }
        if (data.email != null) {
            show("Checking your email . . .")
            let result: any = await fetch(`${API}/auth/sendResetPasswordEmail`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            }).then(res => res.json());

            hide();
            if (result.value === true) {
                history.push(`/app/forgotpassword/verify?email=${email}`)
            }
            else {
                alert("Your email never register before.")
            }
        }
        else {
            alert("Please enter you email.")
        }
    }

    return (
        <>
            <div className="" style={{ width: "1000px", minWidth: "500px", height: "auto", margin: "70px auto"}}>
                <h4 className="mt-5">Setting Your New Password</h4>
                <div className="bgColor-white mb-5 py-3 round-window" style={{ padding: "0 4%" }}>
                    <div className="row mb-3 py-3">
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Email</label>
                            <p><input 
                                    className={"input-register w-100 px-2 col-md-6"} 
                                    type="text" 
                                    placeholder="Enter your email."
                                    value={email || ""}
                                    onChange={(e) => setEmail(e.target.value)}
                            /></p>
                        </div>
                    </div>
                    <SolidButton className="mb-3" width="120px" buttonColor="#2BC986" padding="5px" margin="0" onClick={() => submitEmail()}>Confirm</SolidButton>
                </div>
            </div>
        </>
    ) 
}

export function AfterEnterEmailForm() {
    const { search } = useLocation();
    const { email } = queryString.parse(search);

    return (
        <div className="" style={{ width: "1000px", minWidth: "500px", height: "auto", margin: "70px auto"}}>
            <H4>Verify Your Email</H4>
            <Div className="p-5 mt-3" style={{ height: "auto" }} dynamicPair={["#ffffff","#1c1c1c"]}>
                <P>ลิงค์เปลี่ยนรหัสผ่านของคุณถูกส่งไปที่</P>
                <P><span className="text-primary">{email}</span></P>
                <P>กรุณาตั้งค่ารหัสผ่านใหม่</P>
            </Div>
        </div>
    )
}

export function ResetPasswordForm() {
    const history = useHistory();
    const { search } = useLocation();
    const { token } = queryString.parse(search);
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }

    }
    const [password , setPassword] = useState<string>("");
    const [confirmPassword , setConfirmPassword] = useState<string>("");

    const submitResetPass = (password: string, confirmPassword: string) => {
        if (password === confirmPassword) {
        let data: any = {
            password: password,
        }
        axios.patch(`${API}/auth/resetPassword`, {password: password}, config)
            .then(response => {
                if (response.data.value === true) {
                    history.push('/app/completeresetpassword')
                }
            })
        }
        else {
            alert("Password and Confirm Password does not match.")
        }
    }

    return (
        <>
        <div className="" style={{ width: "1000px", minWidth: "500px", height: "auto", margin: "70px auto"}}>
            <h4 className="mt-5">Setting Your New Password</h4>
            <div className="bgColor-white mb-5 py-3 round-window" style={{ padding: "0 4%" }}>
                <div className="row mb-3 py-3">
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">New Password</label>
                        <p><input 
                                className={"input-register w-100 px-2 col-md-6"} 
                                type="password" 
                                placeholder="Enter your new password."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                        /></p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Confirm New Password</label>
                        <p><input 
                                className={"input-register w-100 px-2 col-md-6"} 
                                type="password" 
                                placeholder="Confirm your new password."
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                        /></p>
                    </div>
                </div>
                <SolidButton className="mb-3" width="120px" buttonColor="#2BC986" padding="5px" margin="0"onClick={() => submitResetPass(password, confirmPassword)}>Confirm</SolidButton>
            </div>
        </div>
        </>
    )
}

export function CompleteResetPasswordForm() {
    const history = useHistory();

    return (
        <div className="" style={{ width: "1000px", minWidth: "500px", height: "auto", margin: "70px auto" }}>
            <H4>Successfull Setting Your New Password</H4>
            <div className="bg-white p-5 mt-3" style={{ height: "auto" }}>
                <P>ตั้งค่ารหัสผ่านใหม่เสร็จสิ้น</P>
                <P className="mb-5">ขอบคุณที่ใช้บริการ</P>
                <SolidButton width="120px" buttonColor="#2BC986" padding="5px" margin="0" onClick={() => history.push(`/app/signin`)}>OK</SolidButton>
            </div>
        </div>
    );
}