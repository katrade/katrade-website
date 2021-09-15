import useAuthorization from '../hooks/useAuthorization';
import Block from '../components/Block';
import SignInForm from "../components/SignIn/SignInForm"; //Nick watch porn
import wallpaper1 from '../pics/katrade-wallpaper1.png';
import { useEffect } from 'react';

const SignIn = () => {
    const { isUserActive } = useAuthorization();
    useEffect(() => {
        isUserActive();
    }, [])
    return (
        <>
            <Block height="100vh" backgroundImage={wallpaper1} className="pt-3">
                <div>
                    <p className="text-end px-4 mt-5">New member? <a href="/app/register">Register</a> here.</p>
                    <SignInForm />
                </div>
            </Block>
        </>
    );
}

export default SignIn;
