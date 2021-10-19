import { SolidButton } from '../standard/Button';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../utils/useForm';
import { useEffect, useState, useContext } from 'react';
import useLoading from '../../hooks/useLoading';
import { API } from '../../app.setting.json';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import InputValidation from "../InputValidation";

import { H4, H5 }  from '../standard/H';
import Div from '../standard/Div';
import P from '../standard/P';
import Input from '../standard/Input'

import { LanguageContext } from '../../contexts/Language'

const queryString = require("query-string");

interface paramsInterface {
    lang?: string;
}

const th = ["ตั้งค่ารหัสผ่านใหม่", "อีเมล", "กรอกอีเมลของคุณ", "ยืนยัน", "ยืนยันอีเมลของคุณ", "ลิงค์เปลี่ยนรหัสผ่านของคุณถูกส่งไปที่", "กรุณาตั้งค่ารหัสผ่านใหม่", "ตั้งค่ารหัสผ่านใหม่", "รหัสผ่านใหม่", "กรอกรหัสผ่านใหม่", "ยืนยันรหัสผ่าน", "ยืนยันรหัสผ่านใหม่อีกครั้ง", "ยืนยัน", "ตั้งค่ารหัสผ่านใหม่เสร็จสิ้น", "รหัสผ่านของคุณได้ถูกเปลี่ยนแล้ว", "คุณสามารถปิดแท็บนี้ได้"]
const en = ["Setting Your New Password", "Email", "Enter your email.", "Confirm", "Verify Your Email", "Veryfy link is sent to", "Please setting new password.", "Setting Your New Password", "New Password", "Enter your new password.", "Confirm New Password", "Confirm your new password", "Confirm", "Successfull Setting Your New Password", "Your password is reset.", "You can close this tab."]

export function ForgotPasswordForm() {
    const history = useHistory();
    const [show, hide] = useLoading();
    const [email , setEmail] = useState<string>("");
    const [validType, setValidType] = useState("0");
    const [showAlert, setShowAlert] = useState("0");

    const { lang } = useContext(LanguageContext);
    const [ content, setContent ] = useState<string[]>(lang === "en" ? en : th)

    useEffect(() => {
        setContent(lang === "en" ? en : th)
    }, [ lang ])

    const submitEmail = async () => {
        let data: any = {
            email: email,
        }
        if (data.email != "" && data.email != null) {
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
            // alert("Please enter you email.")
            setValidType("empty");
            setShowAlert("1");
        }
    }

    useEffect(() => {
        if(email != "" && email != null) {
            setShowAlert("0");
        }
    }, [email])

    return (
        <>
            <div className="" style={{ width: "1000px", minWidth: "500px", height: "auto", margin: "70px auto"}}>
                <H4 className="mt-5">{content[0]}</H4>
                <Div className="bgColor-white mb-5 py-3 round-window" style={{ padding: "0 4%" }} dynamicPair={["#ffffff","#1c1c1c"]}>
                    <div className="row mb-3 py-3">
                        <div className="mb-3">
                            <P>{content[1]}</P>
                            <Div dynamicPair={["#ffffff","#1c1c1c"]}><Input
                                    dynamicPair={["#ffffff","#1c1c1c"]}
                                    className={"input-register w-100 px-2 col-md-6"} 
                                    type="text" 
                                    placeholder={content[2]}
                                    value={email || ""}
                                    onChange={(e) => setEmail(e.target.value)}
                            /></Div>
                            <InputValidation valid={validType} name="Email or Username" showMes={showAlert} />
                        </div>
                    </div>
                    <SolidButton className="mb-3" width="120px" buttonColor="#2BC986" padding="5px" margin="0" onClick={() => submitEmail()}>{content[3]}</SolidButton>
                </Div>
            </div>
        </>
    ) 
}

export function AfterEnterEmailForm() {
    const { search } = useLocation();
    const { email } = queryString.parse(search);

    const { lang } = useContext(LanguageContext);
    const [ content, setContent ] = useState<string[]>(lang === "en" ? en : th)

    useEffect(() => {
        setContent(lang === "en" ? en : th)
    }, [ lang ])

    return (
        <div className="" style={{ width: "1000px", minWidth: "500px", height: "auto", margin: "70px auto"}}>
            <H4>{content[4]}</H4>
            <Div className="p-5 mt-3" style={{ height: "auto" }} dynamicPair={["#ffffff","#1c1c1c"]}>
                <P>{content[5]}</P>
                <P><span className="text-primary">{email}</span></P>
                <P>{content[6]}</P>
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
    const [validType, setValidType] = useState("0");
    const [showAlert1, setShowAlert1] = useState("0");
    const [showAlert2, setShowAlert2] = useState("0");

    const { lang } = useContext(LanguageContext);
    const [ content, setContent ] = useState<string[]>(lang === "en" ? en : th)

    useEffect(() => {
        setContent(lang === "en" ? en : th)
    }, [ lang ])

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
            // alert("Password and Confirm Password does not match.")
            setValidType("does not match")
            setShowAlert2("1")
        }
    }

    useEffect (() => {
        if(password === confirmPassword) {
            setShowAlert2("0")
        }
        if(password === confirmPassword) {
            setValidType("does not match")
            setShowAlert2("1")
        }
    }, [password, confirmPassword])

    return (
        <>
        <div className="" style={{ width: "1000px", minWidth: "500px", height: "auto", margin: "70px auto"}}>
            <h4 className="mt-5">{content[7]}</h4>
            <Div className="bgColor-white mb-5 py-3 round-window" style={{ padding: "0 4%" }} dynamicPair={["#ffffff","#1c1c1c"]}>
                <div className="row mb-3 py-3">
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">{content[8]}</label>
                        <p><Input
                                dynamicPair={["#ffffff","#1c1c1c"]}
                                className={"input-register w-100 px-2 col-md-6"} 
                                type="password" 
                                placeholder={content[9]}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                        /></p>
                        <InputValidation valid={validType} name="Email or Username" showMes={showAlert1} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">{content[10]}</label>
                        <p><input 
                                className={"input-register w-100 px-2 col-md-6"} 
                                type="password" 
                                placeholder={content[11]}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                        /></p>
                        <InputValidation valid={validType} name="Email or Username" showMes={showAlert2} />
                    </div>
                </div>
                <SolidButton className="mb-3" width="120px" buttonColor="#2BC986" padding="5px" margin="0"onClick={() => submitResetPass(password, confirmPassword)}>{content[12]}</SolidButton>
            </Div>
        </div>
        </>
    )
}

export function CompleteResetPasswordForm() {
    const { lang } = useContext(LanguageContext);
    const [ content, setContent ] = useState<string[]>(lang === "en" ? en : th)

    useEffect(() => {
        setContent(lang === "en" ? en : th)
    }, [ lang ])

    return (
        <div className="" style={{ width: "1000px", minWidth: "500px", height: "auto", margin: "70px auto" }}>
            <H4>{content[13]}</H4>
            <Div className="bg-white p-5 mt-3" style={{ height: "auto" }}  dynamicPair={["#ffffff","#1c1c1c"]}>
                <P>{content[14]}</P>
                <P className="mb-5">{content[15]}</P>
            </Div>
        </div>
    );
}