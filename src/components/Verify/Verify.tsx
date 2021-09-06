import { SolidButton } from '../standard/Button';

export function AfterSignUp() {
    return (
        <div className="" style={{width:"1000px",minWidth:"500px",height:"auto",margin:"70px auto"}}>
            <h4>Verify Your Email</h4>
            <div className="bg-white p-5 mt-3" style={{height:"314px"}}>
                <p>ลิงค์ยืนยัน Email ถูกส่งไปที่</p>
                <p>{"nikkunraho.s@ku.th"}</p>
                <p className="mb-5" >กรุณายืนยัน Email ก่อนเข้าสู่ระบบ</p>
                <SolidButton width="120px" buttonColor="#2BC986" padding="5px" margin="0">OK</SolidButton>
            </div>
        </div>
    );
}

export function EmailComplete() {
    return (
        <div className="" style={{width:"1000px",minWidth:"500px",height:"auto",margin:"70px auto"}}>
            <h4>Verify Email Complete</h4>
            <div className="bg-white p-5 mt-3" style={{height:"314px"}}>
                <p>ยืนยัน Email เสร็จสิ้น</p>
                <p className="mb-5">ยินดีต้อนรับสู่ Katrade</p>
                <SolidButton width="120px" buttonColor="#2BC986" padding="5px" margin="0">Login</SolidButton>
            </div>
        </div>
    );
}

export function EmailResetPass() {
    return (
        <div className="" style={{width:"1000px",minWidth:"500px",height:"auto",margin:"70px auto"}}>
            <h4>Setting Your New Password</h4>
            <div className="bg-white p-5 mt-3" style={{height:"314px"}}>
                <p>กรุณาใส่ Email ยืนยันเพื่อเปลี่ยนรหัสผ่าน</p>
                <p>Email</p>
                <div className="input-group mb-5">
                    <input type="text" className="form-control" placeholder="Please enter your email"/>
                </div>
                <SolidButton width="120px" buttonColor="#2BC986" padding="5px" margin="0">Continue</SolidButton>
            </div>
        </div>
    );
}

export function AfterEmailResetPass() {
    return (
        <div className="" style={{width:"1000px",minWidth:"500px",height:"auto",margin:"70px auto"}}>
            <h4>Setting Your New Password</h4>
            <div className="bg-white p-5 mt-3" style={{height:"314px"}}>
                <p>ลิงค์รีเซ็ตรหัสผ่านใหม่จะถูกส่งไปท่ี Email</p>
                <p>{"nikkunraho.s@ku.th"}</p>
                <p className="mb-5" >กรุณาตั้งค่ารหัสผ่านใหม่</p>
                <SolidButton width="120px" buttonColor="#2BC986" padding="5px" margin="0">OK</SolidButton>
            </div>
        </div>
    );
}

export function ResetPass() {
    return (
        <div className="" style={{width:"1000px",minWidth:"500px",height:"auto",margin:"70px auto"}}>
            <h4>Setting Your New Password</h4>
            <div className="bg-white p-5 mt-3" style={{height:"314px"}}>
                <div className="input-group mb-4">
                    <p style={{width:"200px"}}>New Password</p>
                    <input type="text" className="form-control" placeholder="Please enter your email" style={{width:"500px"}}/>
                </div>
                <div className="input-group mb-4">
                    <p style={{width:"200px"}}>Confirm New Password</p>
                    <input type="text" className="form-control" placeholder="Please enter your email" style={{width:"500px"}}/>
                </div>
                <SolidButton width="120px" buttonColor="#2BC986" padding="5px" margin="0">Continue</SolidButton>
            </div>
        </div>
    );
}

export function ResetPassComplete() {
    return (
        <div className="" style={{width:"1000px",minWidth:"500px",height:"auto",margin:"70px auto"}}>
            <h4>Successfull Setting Your New Password</h4>
            <div className="bg-white p-5 mt-3" style={{height:"314px"}}>
                <p>ตั้งค่ารหัสผ่านใหม่เสร็จสิ้น</p>
                <p className="mb-5">ขอบคุณที่ใช้บริหาร</p>
                <SolidButton width="120px" buttonColor="#2BC986" padding="5px" margin="0">OK</SolidButton>
            </div>
        </div>
    );
}