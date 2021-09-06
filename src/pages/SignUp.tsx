import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Block from '../components/Block'
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
            <Block height="200" backgroundImage={wallpaper1} className="fix-screen-size">
                <>
                    <SignupHead/>
                    <SignupForm pw={pw} setPw={setPw}/>
                </>
            </Block>
        </>
    )
}