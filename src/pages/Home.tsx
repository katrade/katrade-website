import { useState , useContext , useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../components/Footer'

import main1 from '../pics/main1.png';
import main2 from '../pics/main2.png';
import main3 from '../pics/main3.png';
import main4 from '../pics/Ku-home.png';
import main5 from '../pics/main5.png';

import StaticNav from '../components/StaticNav'

import Block from '../components/Block'
import Background from '../components/Background';

import { H3 } from '../components/standard/H';
import P from '../components/standard/P';

import { TransparentButton, DynamicSolidButton , DynamicTransparentButton } from '../components/standard/Button'
import { Button } from '@material-ui/core';

import { LanguageContext } from '../contexts/Language';

import usePopup from '../hooks/popup'


const popup1Content = (
    <div className="text-center">
        <h5>Seriously? This page is nmnnnbkjbot ready.</h5>
        <TransparentButton buttonColor="#1f6ab5" margin="50px auto" onClick={() => window.location.href = "/app/market"}>Yeah, I know. Just take me there !!</TransparentButton>
    </div>
)
const popup2Content = (
    <div className="text-center">
        <h5>Seriously? This page is not ready.</h5>
        <TransparentButton buttonColor="#1f6ab5" margin="50px auto" onClick={() => window.location.href = "/app/signin"}>Yeah, I know. Just take me there !!</TransparentButton>
    </div>
)


interface paramsInterface {
    lang?: string
}

const en = ["Trade your items with others", "Exchange your items to whatever you want, to whoever need your things.", "Market >", "Sign in", "Start Katrade", "Create an account and join our KU community.",
    "Sign up", "Live chat with your duo", "Stay connect with your trade duo and make the conversation easier.", "Make KU community better", "New way to interact with other KU students. Make new friends, and let our KU community larger.",
    "Ready for trading?", "Visit our market and find some perfectly matched items for yourself."]
const th = ["แลกเปลี่ยนของของคุณกับของที่ใช่", "นำของที่คุณอยากจะแลกเปลี่ยนมาแลกกับของที่คุณอยากได้ที่นี่", "ตลาด >", "เข้าสู่ระบบ", "มาเริ่มเทรดกัน", "สร้างบัญชีผู้ใช้ของ คาเทรด แล้วมาร่วมเทรดกับชุมชน KU กันเถอะ",
    "สมัคร", "แชทกับคู่เทรด", "คุณสามารถติดต่อสื่อสารกับคู่เทรดของคุณผ่านระบบแชทของ คาเทรด", "สร้างสังคม KU ให้ยิ่งใหญ่", "กิจกรรมรูปแบบใหม่ที่จะทำให้สังคมมหาวิทยาลัยเกษตรศาสตร์ของเราพัฒนาไปอีกระดับ",
    "พร้อมเทรดหรือยัง?", "ไปที่ตลาดของเราแล้วหาสิ่งที่เหมาะกับคุณดูสิ"]

export default function Home() {

    const { lang } = useContext(LanguageContext);
    const [activeLang, setActiveLang] = useState<string[]>(lang === "en" ? en : th);

    // test popup
    const [ popup1 ] = usePopup(popup1Content)
    const [ popup2 ] = usePopup(popup2Content)


    const history = useHistory();
    function LinkMarket() {
        popup1()
        //history.push(`/app/market`);
    };
    function LinkSignIn() {
        popup2()
        //history.push(`/app/signin`);
    }
    function LinkRegister() {
        history.push(`/app/register`);
    }

    useEffect(() => {
        setActiveLang(lang === "en" ? en : th);
    }, [lang] )

    return (
        <>
            <Background>
                <StaticNav />
                <Block height="300" className="my-5">
                    <div className="row m-0 py-5 full-width">
                        <div className="col-lg d-flex align-items-center">
                            <div className="center-content-screen">
                                <H3>{activeLang[0]}</H3>
                                <P>{activeLang[1]}</P>
                                <div className="d-flex justify-content-center">
                                    <DynamicTransparentButton buttonColor="limegreen" width="140px" onClick={LinkMarket}>{activeLang[2]}</DynamicTransparentButton>
                                    <DynamicSolidButton width="140px" onClick={LinkSignIn}>{activeLang[3]}</DynamicSolidButton>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg text-center">
                            <img src={main1} width="100%" />
                        </div>
                    </div>
                </Block>
                <Block height="300" backgroundColor="rgba(246, 248, 249, 1)" darkBackgroundColor="#141414">
                    <div className="row m-0 py-5 full-width">
                        <div className="col-lg text-center">
                            <img src={main2} width="85%" className="m-2" />
                        </div>
                        <div className="col-lg d-flex align-items-center">
                            <div className="center-content-screen"> 
                                <H3>{activeLang[4]}</H3>
                                <P>{activeLang[5]}</P>
                                <DynamicSolidButton width="140px" onClick={LinkRegister}>{activeLang[6]}</DynamicSolidButton>
                            </div>
                        </div>
                    </div>
                </Block>
                <Block height="300">
                    <div className="row m-0 py-5 full-width">
                        <div className="col-lg d-flex align-items-center">
                            <div className="center-content-screen">
                                <H3>{activeLang[7]}</H3>
                                <P>{activeLang[8]}</P>
                            </div>
                        </div>
                        <div className="col-lg text-center">
                            <img src={main3} width="85%" className="m-2" />
                        </div>
                    </div>
                </Block>
                <Block height="300" backgroundColor="rgba(246, 248, 249, 1)" darkBackgroundColor="#141414">
                    <div className="row m-0 py-5 full-width">
                        <div className="col-lg text-center">
                            <img src={main4} width="90%" className="m-2" />
                        </div>
                        <div className="col-lg d-flex align-items-center">
                            <div className="center-content-screen">
                                <H3>{activeLang[9]}</H3>
                                <P>{activeLang[10]}</P>
                            </div>
                        </div>
                    </div>
                </Block>
                <Block height="300">
                    <div className="m-3 pt-5 ta-center">
                        <div>
                            <H3>{activeLang[11]}</H3>
                            <P>{activeLang[12]}</P>
                            <button type="button" className="mybutton mr-3 pl-5 pr-5 mt-4" onClick={LinkMarket}>{activeLang[2]}</button>
                            <div className="col-lg text-center">
                                <img src={main5} width="90%" className="m-2" />
                            </div>
                        </div>
                    </div>
                </Block>
                <Footer />
            </Background>
        </>
    )
}