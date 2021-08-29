import { useState, useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'

// contexts
import { ThemeContext } from '../contexts/Theme'
import { LanguageContext } from '../contexts/Language'


import Icon from '../components/Icon';

// icons
import moon from '../pics/moon.png';
import sunrise from '../pics/sunrise.png';
import logo_black from '../pics/mainlogo-dark.png'
import logo_white from '../pics/mainlogo-white.png'
import translate from '../pics/translate.png'

import en from '../pics/en.png';
import th from '../pics/th.png';

interface navPropsInterface {
    forAuth?: any
}

interface paramsInterface {
    lang?: string | null | undefined
}

const thLangSelector = "TH"
const enLangSelector = "EN"

interface NavBGProps {
    theme: boolean
}

const NavBG = styled.div`
    margin: 0;
    width: 100%;
    min-height: 70px;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 40px;
    padding-right: 40px;

    position: sticky;
    top: 0;
    z-index: 3;
    margin-bottom: 70px;

    transition 400ms ease;
`



export default function StaticNav({ forAuth }: navPropsInterface) {

    const { theme, setTheme } = useContext(ThemeContext);
    const { lang, toggleLanguage } = useContext(LanguageContext);
    const [mobile, setMobile] = useState<boolean>(false);
    const history = useHistory();
    window.addEventListener("resize", resize)

    const ArticleStyle = {
        fontSize: mobile ? "20px" : "30px",
        marginLeft: "10px",
        marginRight: "10px",
        color: theme === "light" ? "#808080" : "#ededed"
    }

    function resize() {
        if (window.innerWidth < 576) {
            setMobile(true);
        }
        else {
            setMobile(false);
        }
    }


    function toggleTheme() {
        var newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
    }
    
    useEffect(() => {
        resize()
    }, [])

    return (
        <>
            <NavBG style={{
                backgroundColor: theme === "light" ? "white" : "#141414",
                paddingLeft: mobile ? "14px" : "40px",
                paddingRight: mobile ? "14px" : "40px",

            }}>
                <div className="row m-0 p-0 full-width">
                    <div className="col-auto p-0 d-flex align-items-center my-3">
                        <img src={theme === "light" ? logo_black : logo_white} width={mobile ? "100px" : "120px"} className="link-logo" onClick={() => history.push(`/`)} />
                    </div>
                    <div className={"col p-0 d-flex align-items-center my-3 justify-content-end"}>
                        <LanguageSelector />
                        <Icon src={theme === "dark" ? moon : sunrise} width="30px" onClick={toggleTheme} />
                    </div>
                </div>

            </NavBG>
        </>
    )
}
function LanguageSelector() {

    const { theme, setTheme } = useContext(ThemeContext);
    const { lang, toggleLanguage } = useContext(LanguageContext);

    function preToggleLanguage(setToLang: string) {
        if (setToLang != lang) {
            toggleLanguage()
        }
        return
    }

    return (
        <div className={theme === "light" ? "dropdown" : "dropdown-dark"}>
            <button className={theme === "light" ?"dropbtn" : "dropbtn-dark"}> {
                lang === 'en' ? (<><img src={en} width="20" className="mx-2" />EN</>) :
                    (<><img src={th} width="20" className="mx-2" />TH</>)
            } </button>
            <div className={theme === "light" ?"dropdown-content" : "dropdown-content-dark"}>
                <a onClick={() => preToggleLanguage('en')}><img src={en} width="20" className="mx-2" />EN</a>
                <a onClick={() => preToggleLanguage('th')}><img src={th} width="20" className="mx-2" />TH</a>
            </div>
        </div>
    )
}