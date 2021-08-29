import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Footer from '../components/Footer'
import Block from '../components/Block'
import Navbar from '../components/Navbar'
import SignupForm from '../components/Signup/SignupForm';
import SignupHead from '../components/Signup/SignupHead';
import wallpaper1 from '../pics/katrade-wallpaper1.png';



interface paramsInterface {
    lang?: string
}

const en = [""];
const th = [""];

export default function SignUp() {
    const { lang }: paramsInterface = useParams();
    const [activeLang, setActiveLang] = useState<string[]>(lang === "en" ? en : th);
    const [pw, setPw] = useState<number>(1);

    const history = useHistory();
    function LinkLogin() {
        history.push(`/${lang}/login`);
    };

    return (
        <>
            <Navbar />
            <Block height="200" backgroundImage={wallpaper1}>
                <>
                    <SignupHead/>
                    <SignupForm pw={pw} setPw={setPw}/>
                </>
            </Block>
            <Footer />
        </>
    )
}