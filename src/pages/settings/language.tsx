import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { H4 } from "../../components/standard/H";
import P from "../../components/standard/P";
import { LanguageContext } from "../../contexts/Language";
import { ThemeContext } from "../../contexts/Theme";

const th = [
    "ภาษา",
    "เลือกภาษาที่คุณต้องการ"
]
const en = [
    "Language",
    "Select your preferred language"
]
const meow = [
    "meOOO",
    "meow meow meow meow mee muu"
]

export default function LanguageSetting() {
    const [displayContent, setDisplayContent] = useState<string[]>(th);
    const { lang } = useContext(LanguageContext);
    useEffect(() => {
        switch (lang) {
            case "th":
                setDisplayContent(th);
                break;
            case "en":
                setDisplayContent(en);
                break;
            default:
                setDisplayContent(th);
                break;
                
        }
    }, [lang]);
    return (
        <div>
            <H4>{displayContent[0]}</H4>
            <P>{displayContent[1]}</P>
            <div className="d-flex mt-4">
                <Lang symbol="EN" name="English US" value="en" active={lang === "en"}/>
                <Lang symbol="TH" name="ไทย" value="th" active={lang === "th"}/>
                <Lang symbol="MW" name="Meow" value="mw" active={lang === "mw"}/>
            </div>
        </div>
    )
}

interface ILang {
    value: string;
    name: string;
    symbol: string;
    active: boolean;
}

const Container = styled.div`
    width: 26%;
    max-width: 150px;
    heigth: auto;
    aspect-ratio: 1 / 1;
    
    box-shadow: 0 0 10px rgba(0,0,0,0.06);
    margin: 10px;
    border-radius: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`


function Lang({ name, value, symbol, active }: ILang) {
    const { setLangCookie } = useContext(LanguageContext);
    const { theme } = useContext(ThemeContext);

    return (
        <Container style={{ border: active ? "solid 2px #0022bd" : "solid 2px transparent", backgroundColor: theme === "light" ? "#fff" : "#1c1c1c"}} onClick={() => setLangCookie(value)}>
            <div className="text-center">
                <div className="m-0 p-0 noselect" style={{ color: theme === "light" ? "#0022bd" : "#fff", fontWeight: 600, fontSize: "300%", height: "fit-content" }}>{symbol}</div>
                <div className="m-0 p-0 noselect" style={{ color: theme === "light" ? "#0022bd" : "#fff", fontWeight: 400, fontSize: "140%", height: "fit-content" }}>{name}</div>
            </div>
        </Container>
    )
}