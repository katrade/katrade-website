import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { SolidButton } from '../standard/Button';
import { useHistory } from 'react-router';

import { H4, H5 }  from '../standard/H';
import Div from '../standard/Div';
import P from '../standard/P';
import useAuthorization from '../../hooks/useAuthorization'

interface IParams {
    email: string
}

const queryString = require("query-string");

export function AfterSignUp() {
    const { search } = useLocation();
    const { email, firstname, lastname } = queryString.parse(search);
    const history = useHistory();

    return (
        <div className="" style={{ width: "1000px", minWidth: "500px", height: "auto", margin: "70px auto"}}>
            <H4>Verify Your Email</H4>
            <Div className="p-5 mt-3" style={{ height: "314px" }} dynamicPair={["#ffffff","#1c1c1c"]}>
                <H5>ยินดีต้อนรับ คุณ {firstname} {lastname}</H5>
                <P>ลิงค์ยืนยัน Email ของคุณถูกส่งไปที่ <span className="text-primary">{email}</span>, กรุณายืนยัน Email ก่อนเข้าสู่ระบบ</P>
    
                <SolidButton width="120px" buttonColor="#2BC986" padding="5px" margin="0" onClick={() => history.push(`/app/signin`)}>OK</SolidButton>
            </Div>
        </div>
    );
}

export function EmailComplete() {
    return (
        <div className="" style={{ width: "1000px", minWidth: "500px", height: "auto", margin: "70px auto" }}>
            <H4>Verify Email Complete</H4>
            <div className="bg-white p-5 mt-3" style={{ height: "314px" }}>
                <P>ยืนยัน Email เสร็จสิ้น</P>
                <P className="mb-5">ยินดีต้อนรับสู่ Katrade</P>
                <SolidButton width="120px" buttonColor="#2BC986" padding="5px" margin="0">Login</SolidButton>
            </div>
        </div>
    );
}

export function EmailResetPass() {
    return (
        <div className="" style={{ width: "1000px", minWidth: "500px", height: "auto", margin: "70px auto" }}>
            <H4>Setting Your New Password</H4>
            <div className="bg-white p-5 mt-3" style={{ height: "314px" }}>
                <P>กรุณาใส่ Email ยืนยันเพื่อเปลี่ยนรหัสผ่าน</P>
                <P>Email</P>
                <div className="input-group mb-5">
                    <input type="text" className="form-control" placeholder="Please enter your email" />
                </div>
                <SolidButton width="120px" buttonColor="#2BC986" padding="5px" margin="0">Continue</SolidButton>
            </div>
        </div>
    );
}

export function AfterEmailResetPass() {
    return (
        <div className="" style={{ width: "1000px", minWidth: "500px", height: "auto", margin: "70px auto" }}>
            <H4>Setting Your New Password</H4>
            <div className="bg-white p-5 mt-3" style={{ height: "314px" }}>
                <P>ลิงค์รีเซ็ตรหัสผ่านใหม่จะถูกส่งไปท่ี Email</P>
                <P>{"nikkunraho.s@ku.th"}</P>
                <P className="mb-5" >กรุณาตั้งค่ารหัสผ่านใหม่</P>
                <SolidButton width="120px" buttonColor="#2BC986" padding="5px" margin="0">OK</SolidButton>
            </div>
        </div>
    );
}

export function ResetPass() {
    return (
        <div className="" style={{ width: "1000px", minWidth: "500px", height: "auto", margin: "70px auto" }}>
            <H4>Setting Your New Password</H4>
            <div className="bg-white p-5 mt-3" style={{ height: "314px" }}>
                <div className="input-group mb-4">
                    <P style={{ width: "200px" }}>New Password</P>
                    <input type="text" className="form-control" placeholder="Please enter your email" style={{ width: "500px" }} />
                </div>
                <div className="input-group mb-4">
                    <P style={{ width: "200px" }}>Confirm New Password</P>
                    <input type="text" className="form-control" placeholder="Please enter your email" style={{ width: "500px" }} />
                </div>
                <SolidButton width="120px" buttonColor="#2BC986" padding="5px" margin="0">Continue</SolidButton>
            </div>
        </div>
    );
}

export function ResetPassComplete() {
    return (
        <div className="" style={{ width: "1000px", minWidth: "500px", height: "auto", margin: "70px auto" }}>
            <H4>Successfull Setting Your New Password</H4>
            <div className="bg-white p-5 mt-3" style={{ height: "314px" }}>
                <P>ตั้งค่ารหัสผ่านใหม่เสร็จสิ้น</P>
                <P className="mb-5">ขอบคุณที่ใช้บริหาร</P>
                <SolidButton width="120px" buttonColor="#2BC986" padding="5px" margin="0">OK</SolidButton>
            </div>
        </div>
    );
}

export function SetUsername() {
    const { search } = useLocation();
    const history = useHistory();
    const { setUsername, getUserData } = useAuthorization();
    const [u, setU] = useState("")
    useEffect(() => {
        async function init() {
            const u = await getUserData();
            if (u?.username) {
                history.push('/app/market');
            }
        }
        init()
    }, [])
    return (
        <div className="" style={{ width: "1000px", minWidth: "500px", height: "auto", margin: "70px auto"}}>
            <H4>Create your username</H4>
            <Div className="p-5 mt-3" style={{ height: "314px" }} dynamicPair={["#ffffff","#1c1c1c"]}>
                <H5>username</H5>
                <input type="text" className="input-register w-100 px-2" style={{ maxWidth: '500px'}} onChange={(e) => setU(e.target.value)} value={u}/>
                <SolidButton width="120px" buttonColor="#2BC986" padding="5px" margin="0" className="my-3" onClick={() => setUsername(u)}>Confirm</SolidButton>
            </Div>
        </div>
    );
}