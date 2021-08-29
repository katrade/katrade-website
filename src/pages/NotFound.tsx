import { useState } from 'react';
import Notfound from '../pics/notfound.jpg'


const h2Style = {
    fontSize: "300%"
}
const pStyle = {
    fontSize: "150%"
}
interface paramsInterface {
    lang?: string
}

export default function NotFound() {
    const [ lang , setLang ] = useState<boolean>(true);
    function toggleLanguage() {
        setLang(!lang);
    }
    return (
        <>
            <div className="full-width text-end px-5 py-3">
                <button className="mybutton" onClick={toggleLanguage}>{!lang ? "Switch to english": "เปลี่ยนภาษา"}</button>
            </div>
            <div className="fix-screen-size d-flex justify-content-center align-items-center p-5">
                <div className="row">
                    <div className="col-lg">
                        <img src={Notfound} alt="404 image" width="100%"></img>
                    </div>
                    <div className="col-lg d-flex align-items-center">
                        <div>
                            <h2 style={h2Style}>{lang ? "404 | Page not found" : "404 | ไม่พบหน้าที่ต้องการ"}</h2>
                            <p style={pStyle}>{lang ? "This page may be deleted or not even exist.": "หน้าเวปไซต์นี้อาจถูกลบออก หรือ อาจไม่มีอยู่จริง"}</p>
                            <a href="/">{lang ? "Back to homepage.": "กลับไปที่หน้าหลัก"}</a>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}