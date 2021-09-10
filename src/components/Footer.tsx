import { useState , useEffect , useContext } from 'react';

import { LanguageContext } from '../contexts/Language'

import facebook from '../pics/facebook.png';
import instagram from '../pics/instagram.png';
import github from '../pics/github-white.png';

import Block from './Block'

interface paramsInterface {
    lang?: string
}

const en = ["Explore", "Why Katrade", "Market", "About", "Contact us", "Policies", "Trading policies and advices", "Terms", "Privacy", "Resources", "Arts / Media", "Feedback", "Support us", "Follow us"]
const th = ["สำรวจ", "ทำไมต้อง Katrade", "ตลาด", "เกี่ยวกับเรา", "ติดต่อเรา", "นโยบาย", "ข้อตกลงการเทรดและคำแนะนำ", "ข้อตกลงการใช้งาน", "ความเป็นส่วนตัว", "แหล่งข้อมูล", "ภาพ / สื่อ", "คำแนะนำ", "สนับสนุนเรา", "ติดตาม"]

export default function Footer() {
    const { lang } = useContext(LanguageContext);
    const [activeLang, setActiveLang] = useState<string[]>(lang === "en" ? en : th);

    useEffect(() => {
        setActiveLang(lang === "en" ? en : th)
    }, [ lang ])
    return (
        <>
            <Block height="300px" backgroundColor="rgb(36,36,36)" className="py-5">
                <div className="row m-0 p-0 full-width" >
                    <div className="col-sm">
                        <h6 className="white">{activeLang[0]}</h6>
                        <hr />
                        <a href={`/articles/why-katrade`} className="no-underline"><p className="footer-desc">{activeLang[1]}</p></a>
                        <a href={`/app/market`} className="no-underline"><p className="footer-desc">{activeLang[2]}</p></a>
                        <a href={`/articles/about/developers`} className="no-underline"><p className="footer-desc">{activeLang[3]}</p></a>
                        <a href={`/articles/contact-us`} className="no-underline"><p className="footer-desc">{activeLang[4]}</p></a>
                    </div>
                    <div className="col-sm">
                        <h6 className="white">{activeLang[5]}</h6>
                        <hr />
                        <a href={`/articles/trading-policies`} className="no-underline"><p className="footer-desc">{activeLang[6]}</p></a>
                        <a href={`/articles/terms`} className="no-underline"><p className="footer-desc">{activeLang[7]}</p></a>
                        <a href={`/articles/privacy`} className="no-underline"><p className="footer-desc">{activeLang[8]}</p></a>
                    </div>
                    <div className="col-sm">
                        <h6 className="white">{activeLang[9]}</h6>
                        <hr />
                        <a href={`/articles/arts-media`} className="no-underline"><p className="footer-desc">{activeLang[10]}</p></a>
                        <a href={`/articles/feedback`} className="no-underline"><p className="footer-desc">{activeLang[11]}</p></a>
                        <a href={`/articles/support-us`} className="no-underline"><p className="footer-desc">{activeLang[12]}</p></a>
                    </div>
                    <div className="col-lg">
                        <h6 className="white">{activeLang[13]}</h6>
                        <hr />
                        <a href="https://facebook.com" target="_blank"><img src={facebook} width="30" className="m-2" /></a>
                        <a href="https://instagram.com" target="_blank"><img src={instagram} width="30" className="m-2" /></a>
                        <a href="https://github.com/nutpedteam/katrade" target="_blank"><img src={github} width="30" className="m-2" /></a>
                    </div>
                </div>
            </Block>
        </>
    )
}